<template>
  <div
    v-if="length"
    class="row is-hovered"
  >
    <div class="col-3 d-flex justify-content-center align-content-center">
      <img
        :src="product.imageurls.split(',')[0] || product.imageurls"
        class="img-fluid"
        alt
      >
    </div>
    <div class="offset-1 col p-2">
      <h5 class="font-weight-bold text-capitalize">
        {{ product.title }}
        <span class="float-right">
          <b-button
            size="is-small"
            icon-left="delete"
            rounded
            @click="removeFromCart(product)"
          >Delete</b-button>
        </span>
      </h5>

      <p class="text-secondary">
        <small>{{ product.name | truncate(30) }}</small>
        <span class="font-weight-bold text-dark">
          <div class="field has-addons my-3">
            <p class="control">
              <button
                class="button"
                @click="increment(product)"
              >+</button>
            </p>
            <p class="control">
              <button class="button">
                <span>{{ product.quantity }}</span>
              </button>
            </p>
            <p class="control">
              <button
                class="button"
                @click="decrease(product)"
              >-</button>
            </p>
          </div>
        </span>
      </p>
      <p class="text-secondary">
        Price
        <span class="font-weight-bold">£{{ (product.price.max * product.quantity).toFixed(2) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'CartProduct',
  // eslint-disable-next-line vue/require-prop-types
  props: ['length', 'product'],
  methods: {
    increment(product) {
      this.$store.commit('incrementQuantity', product)
    },
    decrease(product) {
      this.$store.commit('decrementQuantity', product)
    },
    removeFromCart(product) {
      this.$store.commit('removeFromCart', product)
    }
  }
})
</script>

<style scoped>
.is-hovered:hover {
  transition: transform 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  transform: scale(1.1);
}
</style>