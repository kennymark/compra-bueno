<template>
  <Layout>
    <div class="d-flex justify-content-between">
      <h3 class="is-size-3 mb-3">
        Products
      </h3>
      <b-button
        type="is-dark"
        class="shadow"
        size="is-medium"
        @click="addProduct"
      >
        Create Product
      </b-button>
    </div>
    <b-input
      v-model="query"
      placeholder="Search..."
      size="is-medium"
      class="my-4 shadow-sm rounded"
    />
    <vue-good-table
      class="border-0 bg-white rounded-lg"
      :columns="columns"
      :rows="products"
      :pagination-options="{
        enabled: true,
        perPage: 10,
        perPageDropdown: [5, 10, 20],
        dropdownAllowAll: true,
      }"
      :select-options="{ enabled: true,}"
      :search-options="{externalQuery: query,enabled: true}"
      @on-row-click="onRowClick"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >
        <div v-if="props.column.field === 'name'">
          <span>{{ props.row.name | truncate('20') }}</span>
        </div>
      </template>
      <router-view />
    </vue-good-table>
  </Layout>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'
import { firestore } from '../../../firebase.config'
export default {
  components: { VueGoodTable },
  data() {
    return {
      query: '',
      columns: [
        { label: 'Name', field: 'name' },
        { label: 'Brand', field: 'brand' },
        { label: 'Price', field: 'price.max' },
        { label: 'On Sale', field: 'price.on_sale' },
        { label: 'Quantity', field: 'quantity' },
        {
          label: 'Added',
          field: 'dateadded',
          // type: 'date',
          // dateInputFormat: 'yyyy-mm-dd[T]Z',
          // dateOutputFormat: 'E Lo MMM Y'
        },
        {
          label: 'Updated',
          field: 'dateupdated',
          // type: 'date',
          // dateInputFormat: 'yyyy-mm-dd[T]HH:mm:ssZ',
          // dateOutputFormat: 'E Lo MMM Y'
        }
      ],
      products: []
    }
  },
  mounted() {
    this.getAllProducts()
  },

  methods: {
    async getAllProducts() {
      const db = firestore.collection('products')
      const snapshot = await db.orderBy('name').get()

      this.products = snapshot.docs.map(snap => {
        return { id: snap.id, ...snap.data() }
      })
    },
    onRowClick(params) {
      this.$store.commit('setAdminCurrentProduct', params.row)
      this.$router.push({
        path: `products/edit-product/${params.row.id}`
      })
      console.log(params.row)
    },
    addProduct() {
      this.$router.push('products/add-product')
    }
  }
}
</script>

<style scoped>
</style>