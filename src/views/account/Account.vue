<template>
  <Layout>
    <h3 class="is-size-3">
      My Account
    </h3>

    <div class="row mt-5 mb-4">
      <div class="col-lg d-flex justify-content-center p-3">
        <h3 class="is-size-5 font-weight-light">
          You have spent
          <b-icon
            icon="cash-multiple"
            size="is-medium"
            type="is-success"
          />
          <div class="details mt-3">
            <strong class="is-size-3">£3987</strong> this month
          </div>
        </h3>
      </div>
      <div class="col-lg d-flex justify-content-center p-3">
        <h3 class="is-size-5 font-weight-light">
          You have bought
          <b-icon
            icon="counter"
            size="is-medium"
            type="is-success"
          />
          <div class="details mt-3">
            <strong class="is-size-3">21</strong> items this month
          </div>
        </h3>
      </div>
    </div>

    <div class="row mt-5">
      <div
        v-for="(option,key) in accountOptions"
        :key="key"
        class="col-lg p-3 rounded-lg border shadow-sm m-3"
        @click="visitPage(option.link)"
      >
        <h5 class="is-size-5 text-center font-weight-bold">
          {{ option.title | capitalize }}
        </h5>
        <div class="details mt-3 d-flex flex-row">
          <b-icon
            :icon="option.icon"
            size="is-large"
            :type="option.color"
          />
          <small class="align-self-center pl-5">{{ option.description }}</small>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      accountOptions: [
        {
          title: 'my orders',
          description: 'Track, return, or buy things again',
          icon: 'shopping',
          color: 'is-success',
          link: 'orders'
        },
        {
          title: 'Login & Security',
          description: 'Edit login, name, and mobile number',
          icon: 'account-edit',
          color: 'is-primary',
          link: 'security'
        },
        {
          title: 'my Address + Payments',
          description: 'Add or remove my addresses or payment information',
          icon: 'crosshairs-gps',
          color: 'is-warning',
          link: 'address'
        }
      ]
    }
  },
  methods: {
    visitPage(link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
</style>