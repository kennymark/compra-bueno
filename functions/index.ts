const functions = require('firebase-functions');
const admin = require('firebase-admin')
const stripe = require('stripe')('sk_test_RDF8NobT5x5gUJ4mhGAIVGW600KSVRKSG1', { maxNetworkRetries: 2, })
const cors = require('cors')
const express = require('express')
const app = express()
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp(adminConfig)
const db = admin.firestore().collection('products')
const orders = admin.firestore().collection('orders')

app.use(cors())
app.use(express.json())

/**Calculates total based on whether its a cart or bynowproduct */
async function getTotal(cart) {
  let total = 0
  if (Array.isArray(cart)) {
    cart.map(product => {
      return total += (product.price.max * product.quantity);
    })
    return total
  }
  else {
    total += (cart.price.max * cart.quantity)
    return total
  }
}

/**
@description  Gets all the cart data and checks for firebase to get its original price as that it can be changes. Also checks to see if the cart is just a buy product or a real cart */
async function resolveCart(data) {
  let cart = []
  if (Array.isArray(data.cart)) {
    data.cart.map((product) => {
      const p = db.doc(product.id).get().then(prod => Object.assign({}, { quantity: product.quantity, price: prod.data().price && prod.data().price }))
      cart.push(p)
    })
    return Promise.all(cart)
  }
  else {
    const p = db.doc(data.cart.id).get().then(prod => Object.assign({}, { quantity: data.cart.quantity, price: prod.data().price && prod.data().price }))
    return Promise.resolve(p)
  }
}


async function applyDiscount(percentage, price) {
  return price - (percentage / 100 * price)
}
/**Charges the customer and sets some custom attributes */
async function chargeMoney(data, total) {
  return stripe.charges.create({
    amount: parseInt(total) * 100,
    currency: 'gbp',
    source: data.token.id,
    description: `Payment by ${data.email}`,
    receipt_email: data.email,
    metadata: {
      user_id: data.user_id,
      item_count: data.cart.length || 1,
    },
    shipping: {
      name: data.data.shipping_name,
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

/**Creates an order in firebase */
async function createOrder(data, cart) {
  return await orders.add({
    total: data.amount,
    stripe_id: data.id,
    fufilled: false,
    created_at: data.created,
    currency: data.currency,
    payment_method: data.payment_method,
    shipping: data.shipping,
    metadata: data.metadata,
    customer: data.shipping_name,
    cart,
  })
}

/**App Entry */
app.route('/')
  .get((_, res) => res.send('Welcome to the CompraBueno API'))
  .post(async (req, res) => {
    const unparsed = req.body
    try {
      const resolvedCart = await resolveCart(unparsed)
      const total = await getTotal(resolvedCart)
      const payment = await chargeMoney(unparsed, total)
      await createOrder(payment, unparsed.cart)
      const { captured, created, currency, amount } = payment
      res.status(201).json({ captured, created, currency, amount })
      console.log({ payment })
    } catch (error) {
      console.log('Error has happened', error)
      res.status(401).json(error)
    }

  })

exports.checkout = functions.https.onRequest(app)
