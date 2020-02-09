import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin'
import Stripe from 'stripe'
import * as cors from 'cors'
import * as  express from 'express'

const app = express()
const stripeConfig: Stripe.StripeConfig = { maxNetworkRetries: 2, typescript: true, apiVersion: '2019-12-03' }
const stripe = new Stripe('sk_test_RDF8NobT5x5gUJ4mhGAIVGW600KSVRKSG1', stripeConfig)
admin.initializeApp()
const db = admin.firestore().collection('products')
const orders = admin.firestore().collection('orders')

app.use(cors())
app.use(express.json())

/**Calculates total based on whether its a cart or bynowproduct */
async function getTotal(cart: any) {
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
 Gets all the cart data and checks for firebase to get 
its original price as that it can be changes.
Also checks to see if the cart is just a buy product or a real cart */
async function resolveCart(data: any) {
  const cart: any[] = []
  if (Array.isArray(data.cart)) {
    data.cart.map((product: { id: string; quantity: any; }) => {
      const p = db.doc(product.id).get()
        .then(prod => Object.assign({}, { quantity: product.quantity, price: prod.data()?.price }))
      cart.push(p)
    })
    return Promise.all(cart)
  }
  else {
    const p = db.doc(data.cart.id).get().then(prod => Object.assign({}, { quantity: data.cart.quantity, price: prod.data()?.price }))
    return Promise.resolve(p)
  }
}


async function applyDiscount(percentage: number, price: number) {
  return price - (percentage / 100 * price)
}


/**Charges the customer and sets some custom attributes */
async function chargeMoney(data: any, total: any) {
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
async function createOrder(data: any, cart: any) {
  const order = {
    total: data?.amount,
    stripe_id: data?.id,
    fufilled: false,
    created_at: data?.created,
    currency: data?.currency,
    payment_method: data?.payment_method,
    shipping: data?.shipping,
    metadata: data?.metadata,
    customer: data?.shipping?.name,
    cart,
  }
  return await orders.add(order)
}


async function getCustomer(req: express.Request, res: express.Response) {
  const data = await stripe.customers.retrieve(req.body.customer_id)
  res.status(200).json(data)
}

async function createCustomer(req: express.Request, res: express.Response) {
  try {
    const data = await stripe.customers.create(req.body)
    res.status(201).json(data)
  } catch (error) {
    res.json(error)
  }
}

/**App Entry */
app.route('customer')
  .get(getCustomer)
  .post(createCustomer)

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

export const checkout = functions.https.onRequest(app)