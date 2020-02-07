<template>
  <Layout>
    <h3 class="is-size-3 mb-3">
      Customers
    </h3>
    <div class="row">
      <div class="col-lg">
        <vue-good-table
          :columns="columns"
          :rows="rows"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import { columns, rows } from './table-data'

export default {
  components: { VueGoodTable },
  data() {
    return {
      columns,
      rows
    }
  }
}
</script>

<style scoped>
</style>