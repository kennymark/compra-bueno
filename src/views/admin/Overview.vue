<template>
  <Layout>
    <div class="row">
      <div class="col-lg-8">
        <h3 class="is-size-3 mb-3">Overview</h3>

        <div class="d-flex justify-content-between">
          <div class="col-lg p-3 mr-2 rounded shadow bg-white">
            <h5 class="is-size-5">Sales</h5>
            <small class="text-muted mt-3">Earnings this month</small>

            <h2 class="is-size-3 mt-2">{{ 23309|currency('£') }}</h2>
          </div>

          <div class="col-lg p-3 mr-2 rounded shadow bg-white">
            <h5 class="is-size-5">Product Sold</h5>
            <small class="text-muted mt-3">Order this month</small>
            <h2 class="is-size-3 mt-2">328</h2>
          </div>

          <div class="col-lg p-3 rounded shadow bg-white">
            <h5 class="is-size-5">Net Profit</h5>
            <small class="text-muted mt-3">Profit this month</small>
            <h2 class="is-size-3 mt-2">{{ 500 | currency('£') }}</h2>
          </div>
        </div>

        <div
          class="d-flex flex-column mt-3 rounded p-3 bg-white w-100 shadow"
          style="min-height:350px"
        >
          <h4 class="font-weight-bold mb-2">Chart</h4>

          <b-field class="mx-auto m-0 rounded-lg float-right">
            <b-radio-button v-model="time" native-value="1m" size="is-small">1 month</b-radio-button>
            <b-radio-button v-model="time" native-value="3m" size="is-small">3 month</b-radio-button>
            <b-radio-button v-model="time" native-value="6m" size="is-small">6 month</b-radio-button>
          </b-field>

          <vue-frappe
            id="my-chart-id"
            type="line"
            :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
            :height="350"
            :colors="['#008F68', '#FAE042']"
            :line-options="{regionFill: 1, heatline:1, hideDots: 1}"
            :data-sets="[{name: 'Sales', values: benedictsWeight2017}]"
          />
        </div>

        <div class="d-flex flex-column my-4">
          <h5 class="font-weight-bold text-secondary is-size-4 my-2 bg-white">Top Products</h5>
          <div
            v-for="(product, key) in products"
            :key="key"
            class="row border rounded-lg my-2 ro w-100 p-3 shadow-sm bg-white"
          >
            <div class="col-3 d-flex justify-content-center align-content-center">
              <img
                :src="product.imageurls.split(',')[0] || product.imageurls.split(',')[1] || product.imageurls"
                height="30px"
              />
            </div>
            <div class="col">
              <p class="font-weight-bold">{{ product.name | capitalize | truncate(60) }}</p>
              <p>{{ product.price.max | currency }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg mx-auto">
        <h3 class="text-center font-weight-bold is-size-4 mb-3">Activity</h3>
        <div style="max-height:80vh; overflow-y:scroll">
          <div
            v-for="(activity, key) in orders"
            :key="key"
            class="col my-2 rounded-lg border p-3 shadow-sm bg-white"
          >
            <p>
              Order with total
              <b>{{ activity.total/100 | currency('£') }}</b> was placed
            </p>
            <p class="text-small text-muted">
              <timeago
                :datetime="activity.created_at*1000"
                :auto-update="60"
                :converter-options="{ includeSeconds: true }"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import { firestore } from '../../../firebase.config'

export default {
  data() {
    return {
      activities: new Array(25),
      orders: [],
      featured: '',
      products: [],
      time: '1m',
      benedictsWeight2017: [
        480,
        485,
        491,
        489,
        485,
        490,
        497,
        510,
        512,
        521,
        530,
        545
      ]
    }
  },

  async mounted() {
    const db = firestore
      .collection('products')
      .limit(6)
      .orderBy('name')
    const snapshot = await db.get()
    this.products = snapshot.docs.map(snap => {
      return { id: snap.id, ...snap.data() }
    })
    this.getOrdersByPeriod()
  },

  methods: {
    async getOrdersByPeriod() {
      const db = firestore
        .collection('orders')
        .limit(25)
        .orderBy('created_at', 'desc')
      const snapshot = await db.get()

      this.orders = snapshot.docs.map(snap => {
        return { id: snap.id, ...snap.data() }
      })
    }
  }
}
</script>

<style scoped>
img {
  height: 80px;
}
</style>