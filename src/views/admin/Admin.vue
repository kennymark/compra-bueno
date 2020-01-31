<template>
  <div class="row">
    <div class="col-md-2 d-flex flex-sm-row">
      <b-menu>
        <b-menu-list>
          <b-menu-item
            v-for="(item, key) in items"
            :key="key"
            :icon="item.icon"
            :label="item.title"
            tag="router-link"
            :to="'/admin/'+item.route"
          />
        </b-menu-list>
      </b-menu>
    </div>
    <div class="col p-5">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Overview', icon: 'home-city', route: 'overview' },
        { title: 'Products', icon: 'mdi-account', route: 'products' },
        { title: 'Customers', icon: 'mdi-account', route: 'customers' },
        {
          title: 'Orders',
          icon: 'mdi-account-group-outline',
          route: 'orders'
        }
        // { title: 'Logout', icon: 'mdi-account-group-outline', route: 'logout' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
