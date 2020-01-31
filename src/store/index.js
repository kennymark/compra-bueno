import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    cart: [],
    isCartOpen: false,
    isAdminUser: false,
    currentProduct: null,
    adminCurrentProduct:null,
    buyNowProduct:null
  },
  mutations: {
    changeLoggedIn(state, loginState) {
      state.isLoggedIn = loginState
    },

    addToCart(state, product) {
      const cart = state.cart.find(item => item.id == product.id)
      const buyNowCart = state.buyNowProduct;
      if (buyNowCart) { buyNowCart.quantities++ }
      if (cart) { cart.quantities++ }
      else {
        state.cart.push(product)
      }
    },
    
    removeFromCart(state, product) {
      let cartIndex = state.cart.indexOf(product)
      state.cart.splice(cartIndex, 1)
    },
    
    incrementQuantity(state, product) {
      this.commit('addToCart', product)
    },
    
    decrementQuantity(state, product) {
      const cart = state.cart.find(item => item.id == product.id)
      const buyNowCart = state.buyNowProduct;
      
      if(buyNowCart !=  null){
       if (buyNowCart ) { buyNowCart.quantities-- }
       if (buyNowCart.quantities = 1 ) buyNowCart.quantities = 1
      }
      
      if (cart) { cart.quantities-= 1}
      if (cart.quantities <= 1) cart.quantities = 1
    },

    openCart(state, product) {
      state.isCartOpen = product
    },
    
    setCurrentProduct(state, product){
    state.currentProduct = product
    },
    
    setAdminCurrentProduct(state, product){
      state.adminCurrentProduct = product
    },
  
    setBuyNow(state,product){
      state.buyNowProduct = product
    }
  },
  getters: {
    getCartCount(state, getters) {
      return state.cart.length
    },
  totalPrice(state) {
    let total = 0;
    state.cart.map((item) => {
        total += (item.prices_amountmax * item.quantities);
    });
    return total;
  }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]

})
