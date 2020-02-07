<template>
  <Layout>
    <h3 class="my-3 is-size-4">Your Cart</h3>
    <div class="row">
      <div v-if="!buyNowProduct" class="col-lg-5">
        <div v-for="(item, key) in cart" :key="key">
          <CartProduct :length="cart" :product="item" class="border-bottom" />
        </div>
      </div>

      <div v-if="buyNowProduct" class="col-md">
        <CartProduct :length="cart" :product="buyNowProduct" />
      </div>

      <div class="col-md rounded px-3 pt-3 offset-lg-1 bg-white h-auto shadow-sm">
        <h5 class="is-size-5">Shipping Details</h5>
        <div class="my-2">
          <label for="shipping_name" class="text-muted is-size-7">Shipping Name</label>
          <b-input id="shipping_name" v-model="form.shipping_name" />
        </div>
        <div class="my-2">
          <label for="address" class="text-muted is-size-7">Address</label>
          <b-input id="address" v-model="form.address" />
        </div>

        <div class="my-2">
          <label for="address-line-2" class="text-muted is-size-7">Address Line 2</label>
          <b-input id="address-line-2" v-model="form.address_line_2" />
        </div>

        <div class="row my-2">
          <div class="col-lg col-xs-12">
            <label for="post-code" class="text-muted is-size-7">Postcode</label>
            <b-input
              id="post-code"
              v-model="form.post_code"
              size="is-medium"
              placeholder="CH1 4BR"
            />
          </div>
          <div class="col-lg col-xs-12">
            <label for="city" class="text-muted is-size-7">City</label>
            <b-input id="city" v-model="form.city" size="is-medium" placeholder="Chester" />
          </div>
        </div>
        <div class="row my-2">
          <div class="col-lg col-xs-12">
            <label for="county" class="text-muted is-size-7">County</label>
            <b-input id="county" v-model="form.county" placeholder="Cheshire" />
          </div>
          <div class="col-lg col-xs-12">
            <label for="country" class="text-muted is-size-7">Country</label>
            <b-autocomplete
              v-model="form.country"
              autocomplete="off"
              placeholder="Country"
              :open-on-focus="true"
              :data="filteredDataObj"
              field="name"
              native-type="search"
              @select="option => selected = option"
            />
          </div>
        </div>
        <h5 class="is-size-5 mt-4">Card Details</h5>
        <div class="row">
          <div class="col-lg-3 col-xs-12">
            <label for="promo-code" class="text-muted is-size-7">Promo Code</label>
            <b-input id="promo-code" v-model="form.promo_code" />
          </div>
          <div class="col-lg col-xs-12">
            <label for="promo-code" class="text-muted is-size-7">Card Name</label>
            <b-input id="card-name" v-model="form.card_name" />
          </div>
        </div>
        <card
          class="complete mt-3 border p-3 rounded"
          stripe="pk_test_eknsTrdNFJZOreWp64bLQ7dE00Z1YhaFbr"
          :options="stripeOptions"
          @change="complete = $event.complete"
        />
        <b-loading :active.sync="isLoading" :can-cancel="true" />
        <div class="pay-buttons d-flex flex-row align-items-center">
          <b-button :disabled="!complete" type="is-primary" class="my-3" @click="pay">Pay with card</b-button>
          <b-button type="is-info" class="my-3 ml-2" disabled>Pay with PayPal</b-button>
          <h5 class="font-weight-bold is-size-5 ml-auto">Total: {{ cartTotal| currency('£') }}</h5>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
import CartProduct from '../components/products/CartProduct'
import { auth } from '../../firebase.config'
import countries from '../assets/countries'

export default {
  name: 'Checkout',
  components: { CartProduct, Card },

  data() {
    return {
      cart: this.$store.state.cart,
      isLoading: false,
      buyNowProduct: this.$store.state.buyNowProduct,
      complete: false,
      stripeOptions: {},
      countries,
      form: {
        card_name: null,
        promo_code: null,
        country: 'United Kingdom',
        shipping_name: null,
        address: null,
        address_line_2: null,
        city: '',
        post_code: null,
        county: ''
      },
      timeout: null
    }
  },
  computed: {
    cartTotal() {
      return this.$store.getters.totalPrice
    },
    filteredDataObj() {
      return this.countries.filter(option =>
        option.name.toLowerCase().includes(this.form.country.toLowerCase())
      )
    }
  },

  methods: {
    parseCart() {
      const newCart = []
      if (this.buyNowProduct) {
        return {
          id: this.buyNowProduct.id,
          quantity: this.buyNowProduct.quantity
        }
      } else {
        this.cart.map(product => {
          newCart.push(
            Object.assign({}, { id: product.id, quantity: product.quantity })
          )
        })
        return newCart
      }
    },
    pay() {
      const url =
        'https://us-central1-e-commerce-1ac62.cloudfunctions.net/checkout'
      const url2 = 'http://localhost:5000/e-commerce-1ac62/us-central1/checkout'
      const user = auth.currentUser
      this.isLoading = true
      // this.timeout = setTimeout(() => {
      //    this.isLoading = false
      // }, 10*1000);

      createToken().then(data => {
        const productInfo = {
          token: data.token,
          data: this.form,
          cart: this.parseCart(),
          email: user.email || 'anynomous@random.com',
          user_id: user.uid
        }
        fetch(url2, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productInfo)
        })
          .then(res => res.json())
          .then(data => {
            if (data.captured) {
              this.isLoading = false
              this.$buefy.notification.open({
                message: 'Payment successful, please check your email',
                type: 'is-success',
                duration: 5000
              })
            } else {
              this.isLoading = false
              console.log(data)
              this.$buefy.notification.open({
                message:
                  data.raw.message || 'Payment failed, please try again later',
                type: 'is-warning',
                duration: 10000
              })
            }
          })
      })
    }
  }
}
</script>

<style scoped>
.stripe-card {
  width: 300px;
  border: 1px solid grey;
  background: white !important;
}
.stripe-card.complete {
  border-color: green;
}

input {
}
</style>