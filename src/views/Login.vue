
<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-6 col-sm-12 mx-auto mt-5">
        <h1 class="h3 mb-3 font-weight-normal">
          Please sign in
        </h1>
        <form @submit="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <b-input
              id="exampleInputEmail1"
              v-model="form.email"
              type="email"
              size="is-medium"
              aria-describedby="emailHelp"
              updated
              class="shadow-sm rounded"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <b-input
              id="exampleInputPassword1"
              v-model="form.password"
              class="shadow-sm rounded"
              type="password"
              size="is-medium"
            />
          </div>

          <b-button
            type="is-dark"
            size="is-medium"
            native-type="submit"
            class="has-text-weight-bold"
          >
            Login
          </b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../../firebase.config'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  mounted() {},

  methods: {
    login(e) {
      e.preventDefault()
      auth
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