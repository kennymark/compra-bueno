<template>
  <Layout>
    <h3 class="is-size-3">
      Order
    </h3>
    <div class="row col-lg col-sm-12">
      <h4 class="is-size-4">
        Cart
      </h4>

      <div
        v-for="(product, key) in products"
        :key="key"
        class="border rounded-lg my-2 ro w-100 p-3"
      >
        <p>{{ product.name | capitalize | truncate(60) }}</p>
        <p>{{ product.price.max | currency }}</p>
      </div>
    </div>
    <div class="row col-lg col-sm-12" />
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      cart: new Array(5)
    }
  },
  mounted() {}
}
</script>

<style>
</style>