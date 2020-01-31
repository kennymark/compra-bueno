<template>
  <Layout>
    <b-input placeholder="Search..." size="is-medium" @click="search" class="shadow-none" />
    <div class="row">
      <div v-for="(item, key) in products" :key="key" class="col-lg-3 col-md-6 my-3">
        <ProductCard :product="item" />
      </div>
    </div>
    <b-pagination v-if="products.length" v-model="currentPage" :total="rows" class="my-4" />
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </Layout>
</template>

<script>
import ProductCard from '../components/products/ProductCard'
import firebase from 'firebase'
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
      limit: 15,
      isLoading: false
    }
  },

  mounted() {
    this.isLoading = true
    const db = firebase.firestore().collection('products')
    db.get().then(data => (this.rows = +data.size))
    const snapshot = db
      .limit(this.limit)
      .orderBy('name')
      .get()
      .then(data => data.docs)
    if (!this.products) {
      this.products = JSON.parse(localStorage.getItem('products'))
    }

    snapshot.then(data => {
      data.map(product => {
        this.filterProducts.push(product.data())
        this.products.push(product.data())
      })
      this.isLoading = false
    })
  },

  methods: {
    search(e) {
      console.log(e)
      // this.products = this.filterProducts.filter(data =>
      //   data.name.includes(e.target.value)
      // )
    }
  }
}
</script>


