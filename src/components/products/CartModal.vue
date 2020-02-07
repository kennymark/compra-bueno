<template>
  <div
    class="has-background-white position-fixed fixed-top h-100 cart-sidebar p-3 border-right shadow-lg ml-auto"
    v-if="$store.state.isCartOpen"
  >
    <div class="d-flex justify-content-between align-items-center px-3">
      <h1 class="is-size-4">Your Cart</h1>
      <div class="buttons">
        <b-button
          type="is-warning"
          class="float-right font-weight-bold shadow-sm"
          @click="checkOut"
        >Checkout</b-button>
        <b-button type="is-dark" class="shadow-sm border" @click="closeCart">Close X</b-button>
      </div>
    </div>

    <div v-for="(product, key) in cart" :key="key" class="border-bottom bg-white px-4 py-2">
      <cart-product :length="cart.length" :product="product"></cart-product>
    </div>
    <h5 v-if="!cart.length" class="text-center m-3 border-0">Cart is Empty</h5>
  </div>
</template>

<script>
import CartProduct from './CartProduct'
export default {
  name: 'ProductModal',
  components: { CartProduct },
  props: { isCartOpen: { type: Boolean, default: () => false } },
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
    },
    closeCart() {
      this.$store.commit('openCart', false)
    }
  }
}
</script>

<style scoped>
.cart-sidebar {
  z-index: 100;
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  scroll-behavior: smooth;
  overflow-y: scroll;
  max-width: 570px;
}
</style>