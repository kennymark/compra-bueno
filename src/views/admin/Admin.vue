<template>
  <div class="row">
    <div class="col-lg-2  bg-white col-md-1 d-flex flex-sm-row border-right">
      <b-menu class="w-100 mt-5">
        <b-menu-list class="w-100">
          <b-menu-item
            v-for="(item, key) in items"
            :key="key"
            :icon="item.icon"
            :label="item.title"
            tag="router-link"
            :to="'/admin/'+item.route"
            class="py-1"
          />
        </b-menu-list>
      </b-menu>
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      items: [
        { title: 'Overview', icon: 'home-city', route: '' },
        { title: 'Products', icon: 'mdi-account', route: 'products' },
        { title: 'Categories', icon: 'mdi-account', route: 'categories' },
      
        { title: 'Customers', icon: 'mdi-account', route: 'customers' },
        {title: 'Orders', icon: 'mdi-account',route: 'orders'},
        { title: 'Configuration', icon: 'mdi-account-group-outline', route: 'config' }
      ]
    }
  }
})
</script>

<style scoped>
</style>
