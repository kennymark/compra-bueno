<template>
  <div>
    <Nav />

    <router-view />
    <transition name="slide-fade" :duration="1000">
      <CartModal :isCartOpen="$store.state.isCartOpen" />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'

export default Vue.extend({
  name: 'App',
  components: { Nav }
})
</script>

<style >
body {
  font-family: 'Poppins', sans-serif !important;
  background: #fbfdff !important;
  min-height: 100%;
}
.input {
  box-shadow: none !important;
  border: 1px solid rgb(241, 241, 241) !important;
  font-family: inherit;
  font-size: 14px !important;
  padding: 25px !important;
}
.input:focus {
  transition: border 0.3s ease-in;
  border: 1px solid #f2edff !important;
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
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all 2s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transition: all 2s ease;

  transform: translateX(10px);
  opacity: 0.3;
}
</style>
