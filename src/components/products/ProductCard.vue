<template>
  <span>
    <div
      class="card card-hover border-0 shadow-sm rounded-lg"
      style="height:280px; cursor:pointer"
      @click="viewProduct(product)"
    >
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            :src="product.imageurls.split(',')[0] || 'https://picsum.photos/600/300/?image=25'"
            :alt="product.name.substring(0,5)"
          >
        </figure>
      </div>
      <!-- <div class="card-content" /> -->
    </div>

    <div class="d-flex justify-content-between align-items-center py-2">
    
      <p class=" text-dark text-muted">{{ product.name | truncate(20) }}</p>
      
      <h2 class="align-self-center has-text-dark">£{{ product.price.max }}</h2>
      <b-button
        type="is-warning"
        class="shadow-sm"
        icon-left="clipboard-plus"
        @click="addToCart(product)"
      />
    </div>
  </span>
</template>
<script>
import Vue from 'vue'
export default Vue.extend({
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
})
</script>

<style lang="scss">
.card-hover:hover {
  // box-shadow: 8px 2px 17px rgb(231, 230, 230) !important;
  transition: all 0.3s ease;
  transform: scale(1.03);
}
</style>