import Vue from 'vue'
import VueRouter, { RouterOptions, RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import AllProducts from '../views/AllProducts.vue'
import Admin from '../views/admin/Admin.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Checkout from '../views/Checkout.vue'
import AdminOverview from '../views/admin/Overview.vue'
import Orders from '../views/admin/Orders.vue'
import OrderDetails from '../views/admin/OrderDetails.vue'
import AdminProducts from '../views/admin/Products.vue'
import Customers from '../views/admin/Customers.vue'
import CustomerDetails from '../views/admin/CustomerDetails.vue'
import ProductDetail from '../views/ProductDetail.vue'
import EditProduct from '../views/admin/EditProduct.vue'
import AddProduct from '../views/admin/AddProduct.vue'
import Account from '../views/account/Account.vue'
import AccountOrders from '../views/account/Orders.vue'
import AccountSecurity from '../views/account/Security.vue'
import AccountAddressPayment from '../views/account/AddressPayments.vue'
import PageNotFound from '../views/PageNotFound.vue'
import { auth } from '../../firebase.config'

const routes:RouteConfig[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/product', name: 'product', component: ProductDetail },
  { path: '/products', name: 'products', component: AllProducts },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/checkout', name: 'checkout', component: Checkout },
  {
    path: '/account', name: 'account', component: Account, meta: {requiresAuth: true},
    children: [
      { name: 'my-orders', path: 'orders', component: AccountOrders,meta: {requiresAuth: true}},
      { name: 'my-security', path: 'security', component: AccountSecurity,meta: {requiresAuth: true} },
      { name: 'my-address', path: 'address', component: AccountAddressPayment,meta: {requiresAuth: true} },
    ]
  },
  {
    path: '/admin', component: Admin,meta: {requiresAuth: true},
    children: [
      { name: 'overview', path: '', component: AdminOverview },
      {
        name: 'customers', path: 'customers', component: Customers,
        children: [
          { name: 'customer-details', path: ':id/details', component: CustomerDetails }
        ]
      },
      {
        name: 'admin-products', path: 'products', component:AdminProducts,
        children: [
          { path: '/add-product', name: 'add-product', component: AddProduct },
          { path: '/edit-product/:id', name: 'edit-product', component: EditProduct, },

        ]
      },
      {
        name: 'orders', path: 'orders', component: Orders,
        children: [
          { name: 'order-details', path: '/details/:id', component: OrderDetails }
        ]
      },
    ]
  },
  {
    path: '/about', name: 'about',
    component: () => import('../views/About.vue')
  },
  { path: '*', component: PageNotFound }
]

const router = new VueRouter({mode: 'history',base: process.env.BASE_URL, routes})
Vue.use(VueRouter)

router.beforeEach((curr, prev, next) => {
  const requiresAuth = curr.meta.requiresAuth
  const currentUser = auth.currentUser
  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (requiresAuth && currentUser) {
      next()
  } else next()
  
})


export default router
