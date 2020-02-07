import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import AllProducts from '../views/AllProducts'
import Admin from '../views/admin/Admin'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Checkout from '../views/Checkout'
import AdminOverview from '../views/admin/Overview'
import Orders from '../views/admin/Orders'
import OrderDetails from '../views/admin/OrderDetails'
import AdminProducts from '../views/admin/Products'
import Customers from '../views/admin/Customers'
import CustomerDetails from '../views/admin/CustomerDetails'
import ProductDetail from '../views/ProductDetail'
import EditProduct from '../views/admin/EditProduct'
import AddProduct from '../views/admin/AddProduct'
import Account from '../views/account/Account'
import AccountOrders from '../views/account/Orders'
import AccountSecurity from '../views/account/Security'
import AccountAddressPayment from '../views/account/AddressPayments'
import PageNotFound from '../views/PageNotFound'
import { auth } from '../../firebase.config'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/product', name: 'product', component: ProductDetail },
  { path: '/products', name: 'products', component: AllProducts },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/checkout', name: 'checkout', component: Checkout },
  {
    path: '/account', name: 'account', component: Account,
    children: [
      { name: 'my-orders', path: 'orders', component: AccountOrders },
      { name: 'my-security', path: 'security', component: AccountSecurity },
      { name: 'my-address', path: 'address', component: AccountAddressPayment },
    ]
  },
  {
    path: '/admin', component: Admin,
    children: [
      { name: 'overview', path: '', component: AdminOverview },
      {
        name: 'customers', path: 'customers', component: Customers,
        children: [
          { name: 'customer-details', path: ':id/details', component: CustomerDetails }
        ]
      },
      {
        name: 'admin-products', path: 'products', component: AdminProducts, pathMatch: 'full',
        children: [
          { path: '/edit-product/:id', name: 'edit-product', component: EditProduct, },
          { path: '/add-product/:id?', name: 'add-product', component: AddProduct },

        ]
      },
      {
        name: 'orders', path: 'orders', component: Orders,
        children: [
          { name: 'order-details', path: ':id/details', component: OrderDetails }
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
Vue.use(VueRouter)

// router.beforeEach((to, from, next) => {

//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//   const currentUser = auth.currentUser

//   if (requiresAuth && !currentUser) {
//       next('/login')
//   } else if (requiresAuth && currentUser) {
//       next()
//   } else {
//       next()
//   }
// })

export default router
