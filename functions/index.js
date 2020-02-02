const functions = require('firebase-functions');
const admin = require('firebase-admin')
const stripe = require('stripe')('sk_test_RDF8NobT5x5gUJ4mhGAIVGW600KSVRKSG1')
const cors = require('cors')
const express = require('express')
const app = express()
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp(adminConfig)
const db = admin.firestore().collection('products')
const orders = admin.firestore().collection('orders')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

console.log(functions.config())

async function getTotal(cart) {
  let total = 0
  cart.map(product => {
    return total += (product.price.max * product.quantity);
  })
  return total
}

async function resolveCart(data) {
  let cart = []
  data.cart.map(async (product) => {
    const p = db.doc(product.id).get().then(prod => Object.assign({}, { quantity: product.quantity, price: prod.data().price && prod.data().price }))
    cart.push(p)
  })
  return await Promise.all(cart)
}

async function chargeMoney(data, total) {
  return stripe.charges.create({
    amount: parseInt(total) * 100,
    currency: 'gbp',
    source: data.token.id,
    description: `Payment by ${data.email}`,
    receipt_email: data.email,
    shipping: {
      name: data.data.card_name,
      address: {
        line1: data.data.address,
        line2: data.data.address_line_2,
        city: data.data.city,
        postal_code: data.data.post_code,
        state: data.data.county
      }
    }
  })
}


async function createOrder(data) {
  orders.add({
    total: data.total,
    stripe_id: data.payment.id,
    fufilled: false,
    created_at: data.payment.created,
    currency: data.payment.currency
  })
}


app.route('*')
  .get((_, res) => res.send('Welcome to the CompraBueno API'))
  .post(async (req, res) => {
    // const parsedBody = JSON.parse(req.body) || req.body
    const unparsed = req.body
    try {
      const resolvedCart = await resolveCart(unparsed)
      const total = await getTotal(resolvedCart)
      const payment = await chargeMoney(unparsed, total)
      console.log({ total, payment })
      res.status(201).json(payment)
    } catch (error) {
      console.log('Error has happened', error)
      res.status(401).json({ error })
    }

  })

exports.checkout = functions.https.onRequest(app)
