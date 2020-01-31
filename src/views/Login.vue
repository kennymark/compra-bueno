
<template>
  <div class="container w-50 my-5">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

    <form @submit="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <b-input
          type="email"
          size="is-medium"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="form.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <b-input
          type="password"
          size="is-medium"
          id="exampleInputPassword1"
          v-model="form.password"
        />
      </div>

      <b-button type="is-primary" size="is-medium" native-type="submit">Login</b-button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: '',
      auth: firebase.auth()
    }
  },
  mounted() {},

  methods: {
    login(e) {
      e.preventDefault()
      this.auth
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$store.commit('changeLoggedIn', true)
          this.$router.push('/products')
        })
        .catch(err => {
          this.$store.commit('changeLoggedIn', false)
          this.error = err
        })
    }
  }
}
</script>

<style scoped>
</style>