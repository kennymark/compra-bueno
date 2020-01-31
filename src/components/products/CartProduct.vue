<template>
  <div class="row" v-if="length">
    <div class="col-3 d-flex justify-content-center align-content-center">
      <img :src="product.imageurls.split(',')[0] || product.imageurls" class="img-fluid" alt />
    </div>
    <div class="offset-2 col p-3">
      <h5 class="font-weight-bold text-capitalize">
        {{product.title }}
        <span class="float-right">
          <b-button
            @click="removeFromCart(product)"
            size="is-small"
            icon-left="delete"
            rounded
          >Delete</b-button>
        </span>
      </h5>

      <p class="text-secondary">
        Quantity
        <span class="font-weight-bold text-dark">
          <div class="field has-addons my-3">
            <p class="control">
              <button class="button" @click="increment(product)">+</button>
            </p>
            <p class="control">
              <button class="button">
                <span>{{product.quantities}}</span>
              </button>
            </p>
            <p class="control">
              <button class="button" @click="decrease(product)">-</button>
            </p>
          </div>
        </span>
      </p>
      <p class="text-secondary">
        Price
        <span
          class="font-weight-bold"
        >£{{(product.prices_amountmax * product.quantities).toFixed(2)}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartProduct',
  props: ['length', 'product'],
  methods: {
    increment(item) {
      this.$store.commit('incrementQuantity', item)
    },
    decrease(item) {
      this.$store.commit('decrementQuantity', item)
    },
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item)
    }
  }
}
</script>

<style scoped>
</style>