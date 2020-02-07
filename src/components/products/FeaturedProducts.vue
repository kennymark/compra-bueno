<template>
  <Layout>
    <h3 class="is-size-3">
      Featured
    </h3>
    <div class="row">
      <div
        v-for="(product, key) in products"
        :key="key"
        class="col-lg-3 col-md-4 col-sm-6 my-2"
      >
        <Product
          :product="product"
          @click="viewProduct(product)"
        />
      </div>
    </div>
    <b-loading
      :active.sync="isLoading"
      :can-cancel="true"
    />
  </Layout>
</template>

<script>
import firebase from 'firebase'
import Product from './ProductCard'
export default {
  components: { Product },

  data() {
    return {
      isLoading: true,
      products: []
    }
  },
  mounted() {
    const db = firebase.firestore().collection('featured_products')
    const snapshot = db.get().then(data => data.docs)

    snapshot.then(data => {
      data.map(product => {
        this.products.push({ id: product.id, ...product.data() })
      })
      this.isLoading = false
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

