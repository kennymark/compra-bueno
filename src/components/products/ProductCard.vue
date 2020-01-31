<template>
  <span>
    <div
      class="card card-hover border shadow-none"
      @click="viewProduct(product)"
      style="height:350px; cursor:pointer"
    >
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            :src="product.imageurls.split(',')[0] || 'https://picsum.photos/600/300/?image=25'"
            :alt="product.name.substring(0,5)"
          />
        </figure>
      </div>
      <div class="card-content">
        <p
          class="text-center text-dark text-muted"
        >{{product.title || product.name || 'Car' | truncate(40)}}</p>
      </div>
    </div>

    <div class="d-flex justify-content-between py-2">
      <b-button
        type="is-white"
        @click="addToCart(product)"
        class="border font-weight-bold"
        icon-left="clipboard-plus"
      >Add To Cart</b-button>
      <h2 class="align-self-center has-text-primary">£{{product.prices_amountmax}}</h2>
    </div>
  </span>
</template>
<script>
export default {
  props: ['product'],
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product)
      this.$buefy.toast.open({
        type: 'is-success',
        message: `${product.name} has been added to cart`,
        duratiom: 5000
      })
    },
    viewProduct(item) {
      console.log(item)
      this.$store.commit('setCurrentProduct', item)
      this.$router.push({
        path: 'product',
        query: { name: item.title },
        params: { id: item.id }
      })
    }
  }
}
</script>

<style lang="scss">
.card-hover:hover {
  box-shadow: 2px 3px 7px #ddd !important;
  transition: all 0.3s ease;
}
</style>