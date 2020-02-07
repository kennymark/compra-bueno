import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import VuePageTransition from 'vue-page-transition'
import CartProduct from './components/products/CartProduct.vue'
import CartModal from './components/products/CartModal.vue'
import Layout from './components/Layout.vue'
import Vue2Filters from 'vue2-filters'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueFrappe from 'vue2-frappe'
import VueTimeago from 'vue-timeago'

Vue.use(VueFrappe)
Vue.use(Vue2Filters)
Vue.use(VuePageTransition)
Vue.use(Buefy)
Vue.use(VueTimeago, { locale: 'en' })

Vue.component("CartProduct", CartProduct)
Vue.component("CartModal", CartModal)

Vue.component("Layout", Layout)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
