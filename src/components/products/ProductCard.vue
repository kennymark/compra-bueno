<template>
  <span>
    <div
      class="card card-hover border-0 shadow-sm rounded-lg"
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
        <p class="text-center text-dark text-muted">{{ product.name | truncate(30)}}</p>
      </div>
    </div>

    <div class="d-flex justify-content-between py-2">
      <b-button
        type="is-warning"
        @click="addToCart(product)"
        class="border shadow-sm font-weight-bold"
        icon-left="clipboard-plus"
      >Add To Cart</b-button>
      <h2 class="align-self-center has-text-dark">£{{product.price.max}}</h2>
    </div>
  </span>
</template>
<script>
export default {
  props: { product: { type: Object, default: () => {} } },
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product)
      this.$buefy.toast.open({
        type: 'is-success',
        message: `${product.name.substring(0, 20)}.. has been added to cart`,
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
  // box-shadow: 8px 2px 17px rgb(231, 230, 230) !important;
  transition: all 0.3s ease;
  transform: scale(1.03);
}
</style>