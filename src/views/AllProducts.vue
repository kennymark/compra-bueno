<template>
  <Layout>
    <b-input
      placeholder="Search..."
      size="is-medium"
      class="shadow-sm rounded"
      @keypress="search"
    />
    <div class="row">
      <div
        v-for="(item, key) in products"
        :key="key"
        class="col-lg-3 col-md-6 my-3"
      >
        <ProductCard :product="item" />
      </div>
    </div>
    <b-pagination
      v-if="products.length"
      :current.sync="currentPage"
      :total="rows"
      class="my-4"
    />
    <b-loading
      :active.sync="isLoading"
      :can-cancel="true"
    />
  </Layout>
</template>

<script>
import ProductCard from '../components/products/ProductCard'
import { firestore } from '../../firebase.config'
export default {
  name: 'Products',
  components: {
    ProductCard
  },
  data() {
    return {
      query: '',
      products: [],
      filterProducts: [],
      rows: 0,
      currentPage: 1,
      limit: 12,
      isLoading: true,
      queryFrom: 15
    }
  },

  watch: {
    currentPage(val) {
      const query = val * this.limit
      console.log(query)
      this.getAllProducts(query)
      console.log({ val })
    }
  },

  mounted() {
    this.getAllProducts()
  },

  methods: {
    async getAllProducts(queryFrom = 0) {
      const db = firestore.collection('products')
      db.get().then(data => (this.rows = +data.size))
      const snapshot = await db
        .limit(this.limit)
        .orderBy('name')
        .startAt(10)
        .get()

      this.products = snapshot.docs.map(snap => {
        return { id: snap.id, ...snap.data() }
      })
      // if (!this.products) {
      //   this.products = JSON.parse(localStorage.getItem('products'))
      // }
      this.isLoading = false
    },
    search(e) {
      console.log(e)
      // this.products = this.filterProducts.filter(data =>
      //   data.name.includes(e.target.value)
      // )
    }
  }
}
</script>


