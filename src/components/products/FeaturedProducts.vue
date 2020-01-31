<template>
  <div class="container mt-4">
    <h3 class="is-size-3">Featured</h3>

    <div class="row">
      <div class="col-lg-3 my-2" v-for="(product, key) in products" :key="key">
        <Product :product="product" @click="viewProduct(product)" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Product from './ProductCard'
export default {
  components: {
    Product
  },

  data() {
    return {
      products: []
    }
  },
  mounted() {
    const db = firebase.firestore().collection('featured_products')
    db.get().then(data => (this.rows = +data.size))
    const snapshot = db
      .orderBy('name')
      .get()
      .then(data => data.docs)

    snapshot.then(data => {
      data.map(product => {
        this.products.push(product.data())
      })
    })
  },
  methods: {
    viewProduct(item) {
      this.$store.commit('setCurrentProduct', item)
      this.$router.push('product')
    }
  }
}
</script>

<style scoped>
</style>