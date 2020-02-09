import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { auth } from '../../firebase.config'
import Account from '../views/account/Account.vue'
import AccountAddressPayment from '../views/account/AddressPayments.vue'
import AccountOrders from '../views/account/Orders.vue'
import AccountSecurity from '../views/account/Security.vue'
import AddProduct from '../views/admin/AddProduct.vue'
import Admin from '../views/admin/Admin.vue'
import CustomerDetails from '../views/admin/CustomerDetails.vue'
import Customers from '../views/admin/Customers.vue'
import EditProduct from '../views/admin/EditProduct.vue'
import OrderDetails from '../views/admin/OrderDetails.vue'
import Orders from '../views/admin/Orders.vue'
import AdminOverview from '../views/admin/Overview.vue'
import AdminProducts from '../views/admin/Products.vue'
import AllProducts from '../views/AllProducts.vue'
import Checkout from '../views/Checkout.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Signup from '../views/Signup.vue'

const routes: RouteConfig[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/product', name: 'product', component: ProductDetail },
  { path: '/products', name: 'products', component: AllProducts },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/checkout', name: 'checkout', component: Checkout },
  {
    path: '/account', name: 'account', component: Account, meta: { requiresAuth: true },
    children: [
      { name: 'my-orders', path: 'orders', component: AccountOrders, meta: { requiresAuth: true } },
      { name: 'my-security', path: 'security', component: AccountSecurity, meta: { requiresAuth: true } },
      { name: 'my-address', path: 'address', component: AccountAddressPayment, meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/admin', component: Admin, meta: { requiresAuth: true },
    children: [
      { name: 'overview', path: '', component: AdminOverview, meta: { requiresAuth: true } },
      {
        name: 'customers', path: 'customers', component: Customers, meta: { requiresAuth: true },
        children: [
          { name: 'customer-details', path: ':id/details', component: CustomerDetails }
        ]
      },
      {
        name: 'admin-products', path: 'products', component: AdminProducts, meta: { requiresAuth: true },
        children: [
          { path: '/add-product', name: 'add-product', component: AddProduct },
          { path: '/edit-product/:id', name: 'edit-product', component: EditProduct },
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

const router = new VueRouter({ mode: 'history', base: process.env.BASE_URL, routes })
Vue.use(VueRouter)

router.beforeEach((curr, _, next) => {
  const requiresAuth = curr.meta.requiresAuth
  const currentUser = auth.currentUser
  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else next()

})


export default router
