<template>
  <Layout>
    <h3 class="is-size-3 mb-3">Orders</h3>
    <b-input
      v-model="query"
      placeholder="Search..."
      size="is-medium"
      class="my-4 shadow-sm rounded"
    />

    <vue-good-table
      :columns="columns"
      :rows="orders"
      :pagination-options="{
        enabled: true,
        perPage: 20,
        perPageDropdown: [ 10, 20],
      }"
      :search-options="{externalQuery: query,enabled: true}"
      @on-row-click="onRowClick"
    >
      <template slot="table-row" slot-scope="props">
        <div v-if="props.column.field === 'created_at'">
          <span>{{ new Date(props.row.created_at * 1000).toDateString() }}</span>
        </div>
        <span v-else>{{ props.formattedRow[props.column.field] }}</span>
      </template>

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'total'">{{ props.row.total /100| currency('£') }}</span>
      </template>
    </vue-good-table>
  </Layout>
</template>

<script>
import { firestore } from '../../../firebase.config'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
export default {
  components: { VueGoodTable },
  data() {
    return {
      orders: [],
      query: '',
      columns: [
        { label: 'Stripe ID', field: 'id' },
        { label: 'Total', field: 'total' },
        { label: 'Count', field: 'metadata.item_count' },
        { label: 'Created', field: 'created_at' },
        { label: 'Address', field: 'shipping.address.line1' },
        { label: 'Fulfilled', field: 'fufilled' }

        // { label: 'Customer', field: 'shipping.address.line1' }
      ]
    }
  },
  async mounted() {
    const db = firestore.collection('orders')
    const snapshot = await db.get()

    this.orders = snapshot.docs.map(snap => {
      return { id: snap.id, ...snap.data() }
    })
    console.log(this.orders)
  },
  methods: {
    onRowClick(params) {
      console.log(params.row)
    }
  }
}
</script>

<style scoped>
</style>