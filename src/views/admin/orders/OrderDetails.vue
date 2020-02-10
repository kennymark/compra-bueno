<template>
  <Layout>
    <h3 class="is-size-3">
      Order Details
    </h3>
    <div class="row col-lg-4 col-sm-12">
      <h4 class="is-size-4">
        Cart
      </h4>

      <div
        v-for="(product, key) in order.cart"
        :key="key"
        class="border rounded-lg my-2 ro w-100 p-3"
      >
        {{ product.id }}
        <!-- <p>{{ product.name | capitalize | truncate(60) }}</p> -->
        <!-- <p>{{ product.price.max | currency }}</p>  -->
      </div>
    </div>
    <div class="row col-lg col-sm-12">
      <h4 class="is-size-4">
        {{ cart.customer }}
      </h4>
    </div>
  </Layout>
</template>

<script>
import {firestore} from '../../../../firebase.config'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      cart: new Array(5),
      order:{}
    }
  },
  mounted() {
    const {params:{id}} =this.$route
    const db = firestore.doc(`/orders/${id}`)
    db.get().then(data => this.order = data.data()).then(_ => console.log(this.order))
  },
  methods:{
    getCartItems(){
    
    }
  }
})
</script>

<style>
</style>