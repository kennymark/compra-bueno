<template>
  <Layout>
    <div class="row">
      <div class="col-lg-8">
        <h3 class="is-size-3 mb-3">
          Overview
        </h3>
        <div class="row">
          <div class="col rounded border mr-3 p-3">
            <h5 class="is-size-5">
              Sales
            </h5>
            <h2 class="is-size-2">
              £23309
            </h2>
          </div>

          <div class="col rounded border p-3">
            <h5 class="is-size-5">
              Orders
            </h5>
            <h2 class="is-size-2">
              32
            </h2>
          </div>
        </div>

        <div class="row my-4">
          <h5 class="font-weight-bold text-secondary is-size-4 my-2">
            Top Products
          </h5>
          <div
            v-for="(product, key) in products"
            :key="key"
            class="border rounded-lg my-2 ro w-100 p-3"
          >
            <p>{{ product.name | capitalize | truncate(60) }}</p>
            <p>{{ product.price.max | currency }}</p>
          </div>
        </div>
      </div>

      <div class="col-lg mx-auto">
        <h3 class="text-center font-weight-bold is-size-4 mb-3">
          Activity
        </h3>
        <div style="max-height:80vh; overflow-y:scroll">
          <div
            v-for="(activity, key) in activities"
            :key="key"
            class="col my-2 rounded-lg border p-3"
          >
            <p>Order #{{ key }} was placed</p>
            <p class="text-small text-muted">
              A day ago
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import firedb from 'firebase/firestore/dist/index.esm'
export default {
  data() {
    return {
      activities: new Array(26),
      featured: '',
      products: JSON.parse(localStorage.getItem('products')).splice(0, 6)
    }
  }
}
</script>

<style scoped>
</style>