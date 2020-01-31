<template>
  <b-navbar class="border-bottom">
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/" class="has-text-primary">CompraBueno</b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/">Home</b-navbar-item>
      <b-navbar-item tag="router-link" to="/products">Products</b-navbar-item>
      <b-navbar-item tag="router-link" to="/admin">Admin</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-navbar-dropdown v-if="$store.state.isLoggedIn" label="Account">
            <b-navbar-item tag="router-link" to="/account">My Account</b-navbar-item>
            <b-navbar-item @click="signOut">Sign out</b-navbar-item>
          </b-navbar-dropdown>

          <b-button
            tag="router-link"
            to="/signup"
            type="is-primary"
            v-if="!$store.state.isLoggedIn"
          >
            <strong>Sign up</strong>
          </b-button>
          <b-button
            class="is-light"
            tag="router-link"
            to="/login"
            v-if="!$store.state.isLoggedIn"
          >Log in</b-button>

          <b-button type="is-dark" @click="openCart" icon-left="shopping">
            <strong class="mr-3">Cart</strong>
            {{$store.getters.getCartCount || 0}}
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import firebase from 'firebase'

export default {
  data() {
    return {}
  },
  methods: {
    signOut() {
      const signOut = firebase.auth().signOut()
      this.$store.commit('changeLoggedIn', false)
      signOut.then(_ => this.$router.push('/')).catch(console.log)
    },

    openCart() {
      this.$store.commit('openCart', true)
    }
  }
}
</script>

<style scoped>
</style>