<template>
  <Layout>
    <div class="row">
      <div
        class="col-lg border rounded-lg d-flex m-3 justify-content-center"
        style="max-height:500px"
      >
        <img :src="product.imageurls.split(',')[0] || product.imageurls" class="img mx-auto" alt />
      </div>

      <div class="col-lg offset-1 mt-5">
        <h3 class="text-capitalize is-size-4">{{product.name}}</h3>

        <h5 class="my-3">
          Price:
          <span
            class="font-weight-bold is-size-5"
          >{{product.prices_amountmax | currency(getCurrency(product.prices_currency))}}</span>
        </h5>

        <p class="has-text-success is-size-5">In stock</p>
        <p class="text-capitalize">Seller: {{product.prices_merchant || 'not listed'}}</p>
        <p class="text-capitalize">Manufacturer: {{product.manufacturer || 'not listed'}}</p>
        <p class="text-capitalize">
          Condition:
          <b-tag type="is-success">{{product.prices_condition || 'new'}}</b-tag>
        </p>

        <div class="buttons my-3">
          <b-button
            class="border mr-3 font-weight-bold"
            type="is-white"
            @click="addToCart(product)"
          >Add To Cart</b-button>
          <b-button type="is-primary font-weight-bold" @click="buyNow(product)">Buy Now</b-button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg p-5">
        <h5 class="is-size-5 mb-3">Features</h5>
        <p v-for="(feature,value) in product.features" :key="value">
          <span class="font-weight-bold" v-if="feature">{{feature.key}}:</span>
          <span class="ml-1">{{feature.value[0]}}</span>
        </p>
        <p v-if="!product.features" class="mt-4">No features provided available</p>
      </div>
      <div class="col mt-5">
        <h5 class="is-size-5">Description</h5>
        <p
          class="text-muted mt-2"
          v-if="product.descriptions[0]"
        >{{product.descriptions[0].value | truncate(descriptionLength) }}</p>
        <p v-if="!product.descriptions[0]" class="mt-4">No description available</p>
        <span
          style="cursor:pointer"
          class="text-small text-primary"
          v-if="product.descriptions[0]"
          @click="readMore"
        >{{ !readMoreClicked ? 'Read more...' : 'Show less'}}</span>
      </div>
    </div>

    <div class="col mt-5">
      <h4 class="is-size-5">Reviews</h4>
      <p v-if="!product.reviews" class="mt-4">No reviews</p>

      <div v-for="(review,key) in product.reviews" class="my-2 rounded border p-3" :key="key">
        <h6 class="font-weight-bold text-dark">
          {{review.username}} - {{review.title}}
          <small
            class="float-right text-muted"
          >Reviewed on {{new Date(review.date).toDateString() }}</small>
        </h6>
        <p class="text-secondary my-3">{{review.text }}</p>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '../components/Layout'
export default {
  data() {
    return {
      product: this.$store.state.currentProduct,
      descriptionLength: 400,
      readMoreClicked: false
    }
  },
  methods: {
    buyNow(product) {
      this.$store.commit('setBuyNow', product)
      this.$router.push('/checkout')
    },

    readMore() {
      this.readMoreClicked = !this.readMoreClicked
      this.readMoreClicked
        ? (this.descriptionLength = Infinity)
        : (this.descriptionLength = 400)
    },

    getCurrency(curr) {
      if (curr == 'EUR') return '€'
      else if (curr == 'USD') return '$'
      else if (curr == 'GDP') return '£'
    },

    addToCart(cartItem) {
      this.$buefy.toast.open({
        type: 'is-success',
        message: `${cartItem.name} has been added to cart`,
        duratiom: 5000
      })
      this.$store.commit('addToCart', cartItem)
    }
  }
}
</script>

<style scoped>
</style>