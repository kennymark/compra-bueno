<template>
  <div>
    <Nav />
    <vue-page-transition name="fade">
      <router-view />
    </vue-page-transition>
    <Footer />
    <CartModal :isCartOpen="$store.state.isCartOpen" />
  </div>
</template>

<script>
import Nav from './components/Nav'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: { Nav },

  mounted() {
    this.$store.commit('openCart', false)
  },

  created() {
    if (location.href.includes('admin')) {
      this.isAdmin = true
    }
  },

  beforeDestroy() {
    this.$store.commit('openCart', false)
  }
}
</script>

<style >
body {
  font-family: 'Poppins', sans-serif !important;
}
.input {
  box-shadow: none !important;
  border: 1px solid #ddd !important;
  font-family: inherit;
  font-size: 14px !important;
  padding: 23px !important;
}
.input:focus {
  border: 1px solid #c0aff1 !important;
}
a:hover {
  text-decoration: none !important;
}
h1,
h2,
h3 {
  /* font-family: '', serif !important; */
  font-weight: bold !important;
}
a {
  color: white;
}
</style>
