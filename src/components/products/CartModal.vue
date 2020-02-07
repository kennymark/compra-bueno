<template>
  <b-modal
    id="product-modal"
    title="Product Cart"
    :active.sync="$store.state.isCartOpen"
    :width="840"
    :height="400"
    scroll="keep"
  >
    <div
      v-for="(product, key) in cart"
      :key="key"
      class="border-bottom bg-white px-5 py-2"
    >
      <cart-product
        :length="cart.length"
        :product="product"
      />
    </div>
    <h5
      v-if="!cart.length"
      class="text-center m-3 border-0"
    >
      Cart is Empty
    </h5>

    <div class="w-100 p-2 border-top">
      <b-button
        type="is-primary"
        class="float-right font-weight-bold"
        @click="checkOut"
      >
        Checkout
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import CartProduct from './CartProduct'
export default {
  name: 'ProductModal',
  components: { CartProduct },
  props: { isCartOpen: Boolean },
  data() {
    return {
      value: '',
      cart: this.$store.state.cart
    }
  },
  methods: {
    checkOut() {
      this.$store.commit('openCart', false)
      this.$store.commit('setBuyNow', null)

      this.$router.push('/checkout')
    }
  }
}
</script>

<style scoped>
</style>