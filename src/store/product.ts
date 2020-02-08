
// import { Product,Store } from '../shared/model/product/product.model'


// const productStore = {
//   state: {
//     cart: [],
//     currentProduct: null,
//     adminCurrentProduct: null,
//     buyNowProduct: null,
//   },
//   mutations: {
//     addToCart(state:Store, product:Product) {
//       const cart = state.cart.find((item: Product) => item.id == product.id)
//       const buyNowCart = state.buyNowProduct;
//       if (buyNowCart) { buyNowCart.quantity++ }
//       if (cart) { cart.quantity++ }
//       else {
//         state.cart.push(product)
//       }
//     },

//     removeFromCart(state:Product, product:Product) {
//       let cartIndex = state.cart.indexOf(product)
//       state.cart.splice(cartIndex, 1)
//     },

//     removeAllFromCart(state: { cart: never[]; }) {
//       state.cart = []
//     },

//     incrementQuantity(state:Store, product:Product) {
//       this.commit('addToCart', product)
//     },

//     decrementQuantity(state: { cart: any[]; buyNowProduct: any; }, product: { id: string; }) {
//       const cart = state.cart.find((item: Product) => item.id == product.id)
//       const buyNowCart = state.buyNowProduct;

//       if (buyNowCart != null) {
//         if (buyNowCart) { buyNowCart.quantity-- }
//         if (buyNowCart.quantity = 1) buyNowCart.quantity = 1
//       }

//       if (cart) { cart.quantity -= 1 }
//       if (cart.quantity <= 1) cart.quantity = 1
//     },
//     openCart(state: { isCartOpen: any; }, product: any) {
//       state.isCartOpen = product
//     },

//     setCurrentProduct(state: { currentProduct: any; }, product: any) {
//       state.currentProduct = product
//     },

//     setAdminCurrentProduct(state: { adminCurrentProduct: any; }, product: any) {
//       state.adminCurrentProduct = product
//     },

//     setBuyNow(state: { buyNowProduct: any; }, product: any) {
//       state.buyNowProduct = product
//     }
//   },


// }


// export default productStore;