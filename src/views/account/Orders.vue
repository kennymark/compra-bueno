<template>
  <Layout>
    <h3 class="is-size-3">
      My Orders
    </h3>
    
    <div class="row mt-3">
      <div class="col-lg-8  col-sm-12 offset-lg-2 border p-3 rounded bg-white shadow-sm">
        <h4 class="is-size-4">
          Orders
        </h4>
    
        <div
          v-for="(item,key) in orders"
          :key="key"
          class="border p-3 my-3 rounded"
        >
          <p>{{ key +1 }}</p>
          <b-button
            type="is-warning"
            class="font-weight-bold"
          >
            Return
          </b-button>
          <b-button
            type="is-dark"
            class="ml-2 font-weight-bold"
          >
            View
          </b-button>
        </div>
        
        <b-pagination
          v-if="orders.length"
          :current.sync="currentPage"
          :total="100"
          class="mt-4"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data(){
  return{
    orders: new Array(100).splice(0,10),
    currentPage:1
  }
  },
  mounted(){
  
  }
})
</script>

<style>
</style>