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
import { firestore } from '../../../firebase.config'
import Product from './ProductCard'
export default {
  components: { Product },

  data() {
    return {
      isLoading: true,
      products: []
    }
  },
  async mounted() {
    const db = firestore.collection('featured_products')
    const snapshot = await db.get()

    this.products = snapshot.docs.map(snap => {
      return { id: snap.id, ...snap.data() }
    })
    this.isLoading = false
  },

  methods: {
    viewProduct(item) {
      this.$store.commit('setCurrentProduct', item)
      this.$router.push('product')
    }
  }
}
</script>

