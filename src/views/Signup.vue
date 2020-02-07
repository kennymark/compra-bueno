<template>
  <div class="container w-50 my-5">
    <h1 class="h3 mb-3 font-weight-normal">
      Please sign up
    </h1>

    <form @submit="signup">
      <div class="form-group">
        <div>
          <small>{{ error }}</small>
        </div>
        <label for="email">Email address</label>
        <b-input
<<<<<<< Updated upstream
          id="email"
          v-model="form.email"
          type="email"
          size="is-medium"
=======
          type="email"
          size="is-medium"
          id="email"
          v-model="form.email"
          class="shadow-sm rounded"
>>>>>>> Stashed changes
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <b-input
<<<<<<< Updated upstream
          id="password"
          v-model="form.password"
          type="password"
          size="is-medium"
=======
          type="password"
          size="is-medium"
          id="password"
          v-model="form.password"
          class="shadow-sm rounded"
>>>>>>> Stashed changes
        />
      </div>

      <b-button
        type="is-primary"
        size="is-medium"
        native-type="submit"
      >
        Submit
      </b-button>
    </form>
  </div>
</template>

<script>
import { auth, firestore } from '../../firebase.config'

export default {
  name: 'Signup',
  components: {},
  data() {
    return {
      form: { email: '', password: '' },
      error: ''
    }
  },
  mounted() {},

  methods: {
    signup(e) {
      e.preventDefault()
      let actionCodeSettings = {
        url: 'http://localhost:8080/products',
        handleCodeInApp: true
      }
      console.log(this.form)
      auth
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          saveUser(data)
          auth.sendSignInLinkToEmail(this.form.email, actionCodeSettings)
          this.$router.push('/')
        })
        .catch(err => (this.error = err.message))
    }
  },
  saveUser(data) {
    const user = firestore().collection('users')
    user
      .add({
        email: data.user.email,
        id: data.user.uid,
        created_at: firestore.FieldValue.serverTimestamp(),
        isEmailVerified: data.user.emailVerified
      })
      .then(console.log)
      .catch(console.log)
  }
}
</script>

<style scoped>
</style>