<template>
  <Layout>
    <b-modal
      id="payment-result"
      title="Product Cart"
      :active.sync="$store.state.isCartOpen"
      :width="840"
      :height="400"
    >
      <h3 class="is-size-4">Payment Successfull</h3>

      <p>You have sucessfully purchased</p>

      <div class="w-100 p-2 border-top">
        <b-button type="is-primary" class="float-right font-weight-bold" @click="clearCart">Ok</b-button>
      </div>
    </b-modal>
  </Layout>
</template>

<script>
export default {
  name: 'PaymentResultModal',
  // components: {  },
  props: { isCartOpen: Boolean },
  data() {
    return {
      value: '',
      cart: this.$store.state.cart
    }
  },
  methods: {
    clearCart() {
      this.$store.commit('openCart', false)
      this.$store.commit('removeAllFromCart')

      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>