<template>
  <Layout>
    <h3 class="is-size-3 mb-3">
      Customers
    </h3>
    <div class="row">
      <div class="col-lg">
        <div class="row">
          <div class="col-lg">
            <b-input
              v-model="query"
              placeholder="Search..."
              size="is-medium"
              class="my-4 shadow-sm rounded"
            />

            <vue-good-table
              :columns="columns"
              :rows="rows"
              :pagination-options="{
                enabled: true,
                perPage: 10,
                perPageDropdown: [5, 10, 20],
              }"
              :search-options="{externalQuery: query,enabled: true}"
              @on-row-click="onRowClick"
            >
              <template
                slot="table-row"
                slot-scope="props"
              >
                <div v-if="props.column.field == 'createdAt'">
                  <span>{{ new Date(props.row.createdAt).toDateString() }}</span>
                </div>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import { columns, rows } from '../table-data'
import Vue from 'vue'

export default Vue.extend({
  components: { VueGoodTable },
  data() {
    return {
      query: '',
      columns,
      rows
    }
  },
  methods: {
    onRowClick(data) {
    this.$router.push(`customers/details/${data.row.id}`)
      console.log(data.row)
    }
  }
})
</script>

<style scoped>
</style>