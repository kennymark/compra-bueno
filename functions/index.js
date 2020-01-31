const functions = require('firebase-functions');
const fb = require('firebase')
const stripe = require('stripe')(functions.config().stripe.key)
const cors = require('cors')
const express = require('express')

const app = express()

app.use(cors())
app.use(express.json())

function getActualProduct(req) {
  const db = fb.firestore().collection('products')
  db.where('id', '===', req.body.cart)
}



const chargeMoney = async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'gbp',
  });
}

app.route('*')
  .get((req, res) => res.send('This is the sender'))
  .post((req, res) => {
    res.json({ message: 'striper', body: JSON.parse(req.body) })
  })

exports.checkout = functions.https.onRequest(app)
