<template>
  <Layout class="my-5  ">
    <!-- <h3 class="display-1 text-center mt-5">
      Error 404
    </h3> -->
    <h5 class="is-size-4 text-center  mb-5">
      Page Not Found
    </h5>
    <div class="mx-auto">
      <img
        :src="mySVG"
        class="img-fluid  "
      >
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(){
    return {
      mySVG: require('./../assets/error404.svg')
    }
  }
})
</script>
