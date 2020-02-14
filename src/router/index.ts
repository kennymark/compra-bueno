import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { auth } from '@/../firebase.config'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Checkout from '@/views/Checkout.vue'
import AllProducts from '@/views/AllProducts.vue'

// Accounts
import AccountIndex from '@/views/account/Index.vue'
import Account from '@/views/account/Account.vue'
import AccountOrders from '@/views/account/Orders.vue'
import AccountSecurity from '@/views/account/Security.vue'
import AccountAddressPayment from '@/views/account/AddressPayments.vue'
// Admin 
import Admin from '@/views/admin/Admin.vue'
import AdminOverview from '@/views/admin/Overview.vue'

// Customers
import CustomersIndex from '@/views/admin/customers/Index.vue'
import Customers from '@/views/admin/customers/Customers.vue'
import CustomerDetails from '@/views/admin/customers/CustomerDetails.vue'

// Orders
import OrdersIndex from '@/views/admin/orders/Index.vue'
import Orders from '@/views/admin/orders/Orders.vue'
import OrderDetails from '@/views/admin/orders/OrderDetails.vue'

import ConfigIndex from '@/views/admin/config/Index.vue'
import Configuration from '@/views/admin/config/Configuration.vue'
import CategoriesIndex from '@/views/admin/categories/Index.vue'
import Categories from '@/views/admin/categories/Categories.vue'

//Products
import AdminProductsIndex from '@/views/admin/products/Index.vue'
import AdminProducts from '@/views/admin/products/Products.vue'
import AddProduct from '@/views/admin/products/AddProduct.vue'
import EditProduct from '@/views/admin/products/EditProduct.vue'

import ProductDetail from '@/views/ProductDetail.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const routes: RouteConfig[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/product', name: 'product', component: ProductDetail },
  { path: '/products', name: 'products', component: AllProducts },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/checkout', name: 'checkout', component: Checkout },
  {
    path: '/account', component: AccountIndex, meta: { requiresAuth: true },
    children: [
      { name: 'account-home', path: '', component: Account, meta: { requiresAuth: true } },
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
        path: 'customers', component: CustomersIndex, meta: { requiresAuth: true },
        children: [
          { name: 'customers', path: '', component: Customers, },
          { name: 'customer-details', path: 'details/:id', component: CustomerDetails }
        ]
      },
      {
        path: 'products', component: AdminProductsIndex, meta: { requiresAuth: true },
        children: [
          { path: '', component: AdminProducts, name: 'admin-products', meta: { requiresAuth: true } },
          { path: 'add-product', name: 'add-product', component: AddProduct, meta: { requiresAuth: true } },
          { path: 'edit-product/:id', name: 'edit-product', component: EditProduct, meta: { requiresAuth: true } },
        ]
      },
      {
        path: 'orders', component: OrdersIndex, meta: { requiresAuth: true },
        children: [
          { name: 'order-index', path: '', component: Orders, meta: { requiresAuth: true } },
          { name: 'order-details', path: 'details/:id', component: OrderDetails, meta: { requiresAuth: true } }
        ]
      },
      {
        path: 'config', component: ConfigIndex, meta: { requiresAuth: true },
        children: [{ path: '', component: Configuration, meta: { requiresAuth: true } }]
      },
      {
        path: 'categories', component: CategoriesIndex, meta: { requiresAuth: true },
        children: [
          { name: '', path: '', component: Categories, meta: { requiresAuth: true } }
        ]
      }
    ]
  },
  {
    path: '/about', name: 'about',
    component: () => import('@/views/About.vue')
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
