<template>
  <div class="container">
    <h3 class="my-3 is-size-4">Your Cart</h3>
    <div class="row">
      <div class="col-md" v-if="!buyNowProduct">
        <div v-for="(item, key) in cart" :key="key">
          <CartProduct :length="cart" :product="item" class="border-bottom" />
        </div>
      </div>

      <div class="col-md" v-if="buyNowProduct">
        <CartProduct :length="cart" :product="buyNowProduct" />
      </div>

      <div class="col-md border rounded p-3 m-3" style="max-height:710px">
        <div class="d-flex justify-content-between align-items-center mt-2 mb-3">
          <h4 class="font-weight-bold">Pay</h4>
          <h5 class="font-weight-bold is-size-6">Total: {{ cartTotal| currency}}</h5>
        </div>

        <div>
          <label for="promo-code" class="text-muted is-size-7">Promo Code</label>
          <b-input id="promo-code" v-model="form.promo_code" />
        </div>

        <div class="my-2">
          <label for="promo-code" class="text-muted is-size-7">Card Name</label>
          <b-input id="card-name" v-model="form.card_name" />
        </div>

        <div class="my-2">
          <label for="address" class="text-muted is-size-7">Address</label>
          <b-input id="address" v-model="form.address" />
        </div>

        <div class="my-2">
          <label for="address-line-2" class="text-muted is-size-7">Address Line 2</label>
          <b-input id="address-line-2" v-model="form.address_line_2" />
        </div>

        <div class="my-2">
          <label for="post-code" class="text-muted is-size-7">Postcode</label>
          <b-input id="post-code" size="is-medium" v-model="form.post_code" />
        </div>

        <div class="my-2">
          <label for="address" class="text-muted is-size-7">Country</label>
          <b-input id="country" placeholder="United Kingdom" v-model="form.country" />
        </div>
        <card
          class="complete mt-3 border p-3 rounded shadow-sm"
          stripe="pk_test_eknsTrdNFJZOreWp64bLQ7dE00Z1YhaFbr"
          :options="stripeOptions"
          @change="complete = $event.complete"
        />

        <b-button type="is-primary" class="my-3" @click="pay" :disabled="!complete">Pay with card</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import CartProduct from '../components/products/CartProduct'
export default {
  name: 'Checkout',
  components: { CartProduct, Card },

  data() {
    return {
      cart: this.$store.state.cart,
      buyNowProduct: this.$store.state.buyNowProduct,
      complete: false,
      stripeOptions: {},
      form: {
        promo_code: null,
        country: null,
        address: null,
        address_line_2: null,
        post_code: null,
        card_name: null
      }
    }
  },
  computed: {
    cartTotal() {
      return this.$store.getters.totalPrice
    }
  },
  methods: {
    parseCart() {
      const newCart = []
      this.cart.map(product => {
        newCart.push(
          Object.assign({}, { id: product.id, quantity: product.quantities })
        )
      })
      return newCart
    },
    pay() {
      const url =
        'https://us-central1-e-commerce-1ac62.cloudfunctions.net/checkout'
      createToken().then(data => {
        const productInfo = {
          token: data.token,
          form: this.form,
          cart: parseCart(),
          total: this.cartTotal
        }
        fetch(url, { method: 'post', body: JSON.stringify(productInfo) })
          .then(res => res.json())
          .then(console.log)
      })
    }
  }
}
</script>

<style scoped>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
</style>