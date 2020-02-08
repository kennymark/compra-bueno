<template>
  <div
    class="overlay position-fixed fixed-top h-100 w-100"
    v-if="$store.state.isCartOpen"
    @click="closeCart"
  >
    <div class="has-background-white cart-sidebar p-3 border-right shadow-lg ml-auto" @click.stop>
      <div class="d-flex justify-content-between align-items-center px-3 pb-3 border-bottom">
        <h1 class="is-size-4">Shopping Cart</h1>
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
        <cart-product :length="cart.length" :product="product" />
      </div>
      <h5
        v-if="!cart.length"
        class="text-center m-3 border-0 mt-5 has-text-weight-bold"
      >Cart is empty</h5>
    </div>
  </div>
</template>

<script>
import CartProduct from './CartProduct'
export default {
  name: 'CartSideBar',
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
  max-width: 580px;
}

.overlay {
  background: #00000069;
  overflow-y: scroll;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>