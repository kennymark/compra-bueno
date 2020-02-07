<template>
  <span>
    <Nav />
    <router-view @click="closeCart" />
    <transition name="slide-fade">
      <cart-side-bar :isCartOpen="$store.state.isCartOpen" />
    </transition>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

export default Vue.extend({
  name: 'App',
  components: { Nav },
  methods: {
    closeCart() {
      console.log('close cart')
      this.$store.commit('openCart', false)
    }
  }
})
</script>

<style lang='scss'>
$bg: #fbfdff;
body {
  font-family: 'Poppins', sans-serif !important;
  background: $bg !important;
  min-height: 100%;
}
.input {
  box-shadow: none !important;
  border: 1px solid white !important;
  font-family: inherit;
  font-size: 14px !important;
  padding: 25px !important;
}
.input:focus {
  transition: border 0.5s ease-in;
  border: 1px solid darken($bg, 6) !important;
  background: white !important;
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

.vgt-wrap {
  border: none;
  box-shadow: 3px 8px 7px darken(white, 10);
  border-radius: 10px;
}
.vgt-table thead th {
  background: white !important;
}
.vgt-table th.line-numbers,
.vgt-table th.vgt-checkbox-col {
  background: white !important;
}
.vgt-wrap__footer {
  background: white !important;
}
.autocomplete .dropdown-menu {
  border: none !important;
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
  width: 0px !important;
}
.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transition: all 0.4s ease;

  transform: translateX(10px);
  opacity: 0.3;
}
</style>
