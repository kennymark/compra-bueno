<template>
  <b-carousel
    :arrow="arrow"
    :arrow-both="arrowBoth"
    :has-drag="true"
    :interval="interval"
<<<<<<< Updated upstream
  >
    <b-carousel-item
      v-for="(product, i) in products"
      :key="i"
      style="height:530px"
    >
      <div
        class="m-auto"
        @click="viewProduct(product)"
      >
        <img
          :src="product.imageurls"
          :alt="product.name"
          class="m-auto"
        >
        <h1 class="m-3 is-size-5">
          {{ product.name }}
        </h1>
=======
    class="bg-white"
  >
    <b-carousel-item v-for="(product, i) in products" :key="i" style="height:530px; cursor:pointer">
      <div @click="viewProduct(product)" class="mx-auto">
        <img :src="product.imageurls" :alt="product.name" class="ml-auto text-center" />
        <!-- <h1 class="m-3 is-size-5 ">{{product.name}}</h1> -->
>>>>>>> Stashed changes
      </div>
    </b-carousel-item>
  </b-carousel>
</template>

<script>
import { firestore } from '../../../firebase.config'
export default {
  components: {},
  data() {
    return {
      products: [],
      arrow: true,
      animated: 'fade',
      arrowBoth: true,
      interval: 3000
    }
  },

  mounted() {
    const db = firestore.collection('starred_products')
    const snapshot = db.get().then(data => data.docs)

    snapshot.then(data => {
      data.map(product => {
        this.products.push({ id: product.id, ...product.data() })
      })
    })
  },
  methods: {
    viewProduct(product) {
      this.$store.commit('setCurrentProduct', product)
      this.$router.push('product')
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  height: 400px;
}
.carousel-item {
  display: flex;
  align-self: center;
  margin: 0 auto;
}
</style>