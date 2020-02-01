const functions = require('firebase-functions');
const fb = require('firebase-admin')
const stripe = require('stripe')('sk_test_RDF8NobT5x5gUJ4mhGAIVGW600KSVRKSG1')
const cors = require('cors')
const express = require('express')
const app = express()
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);

fb.initializeApp(adminConfig)
const db = fb.firestore().collection('products')

app.use(cors())
app.use(express.json())


function getTotal(cart) {
  let total = 0;
  cart.map((item) => total += (item.price.max * item.quantity));
  return Number(total.toFixed(2));
}


const chargeMoney = async ({ total, email, token, }) => {
  let paymentData;
  await stripe.charges.create({
    amount: total,
    currency: 'gbp',
    source: token.token.id,
    statement_descriptor: 'Payment by' + email,
    metadata: { email, }
  }, (err, data) => {
    if (err) {
      console.log('there has been an eror')
    }
    paymentData = data
  });
  return paymentData
}

app.route('*')
  .get((_, res) => res.send('Welcome to the CompraBueno API'))
  .post((req, res) => {
    const parsedBody = JSON.parse(req.body)
    if (Array.isArray(parsedBody.cart)) {
      const cart = []
      const total = getTotal(cart)

      parsedBody.cart.map(product => {
        db.where(fb.firestore.FieldPath.documentId(), '==', product.id)
          .onSnapshot(data => data.docs.forEach(prod => {
            cart.push({ id: prod.id, ...prod.data() })
          }))
      })
      res.json({ cart, total, parsedBody, stripePayment: chargeMoney(parsedBody) })
    }
    else {
      res.send('is just a simple buynow ting')
    }
  })

exports.checkout = functions.https.onRequest(app)
