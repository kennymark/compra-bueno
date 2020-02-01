<template>
  <Layout>
    <h3 class="is-size-3 mb-3">Products</h3>
    <b-input v-model="query" placeholder="Search..." size="is-medium" class="my-4" />

    <vue-good-table
      class="border-0 bg-white rounded-lg"
      :columns="columns"
      :rows="rows"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 10,
        perPageDropdown: [5, 10, 20],
        dropdownAllowAll: true,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All',
      }"
      :select-options="{ enabled: true,}"
      :search-options="{externalQuery: query,enabled: true}"
      @on-row-click="onRowClick"
    />
  </Layout>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'

export default {
  components: { VueGoodTable },
  data() {
    return {
      query: '',
      columns: [
        { label: 'Name', field: 'name' },
        { label: 'Brand', field: 'brand' },
        { label: 'Price', field: 'price.max' },
        { label: 'On Sale', field: 'price.sale' },
        { label: 'Quantity', field: 'quantity' },
        { label: 'Added', field: 'dateadded' },
        { label: 'Updated', field: 'dateupdated' }
      ],
      rows: []
    }
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('products'))
    this.rows = data
  },

  methods: {
    onRowClick(params) {
      this.$store.commit('setAdminCurrentProduct', params.row)
      this.$router.push('/edit-product')
      console.log(params.row)
    }
  }
}
</script>

<style scoped>
</style>