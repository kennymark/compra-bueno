<template>
  <Layout>
    <h3 class="is-size-3 my-3">
      Edit Product
    </h3>
    <div class="row">
      <div
        class="col-lg-4 border d-flex bg-white flex-column justify-content-center"
        style="max-height:500px"
      >
        <img
          :src="product.imageurls.split(',')[0] || product.imageurls"
          class="img-fluid"
          alt
        >
        <div class="buttons my-3">
          <b-button
            class="border mr-3"
            type="is-info"
          >
            Save
          </b-button>
          <b-button type="is-light">
            Delete
          </b-button>
        </div>
      </div>
      <div class="col-lg offset-1">
        <form
          @submit="onSubmit"
          @reset="onReset"
        >
          <b-field label="Product Name">
            <b-input
              id="product-name"
              v-model="product.name"
              native-type="text"
              class="border shadow-sm rounded"
            />
          </b-field>

          <div>
            <b-field label="Prices" />
            <div class="row">
              <div class="col">
                <b-input
                  id="price_max"
                  v-model="product.price.min"
                  class="border shadow-sm rounded"
                />
              </div>
              <div class="col">
                <b-input
                  id="price_min"
                  v-model="product.price.max"
                  class="border shadow-sm rounded"
                />
              </div>
            </div>
          </div>

          <div class="mt-3">
            <b-field label="Features" />
            <div
              v-for="(feature,value) in product.features"
              :key="value"
              class="row my-3"
            >
              <div class="col-md">
                <b-input
                  :id="value.toString()+ Math.random()"
                  v-model="feature.key"
                />
              </div>
              <div class="col-md">
                <b-input
                  :id="value.toString()+ Math.random()"
                  v-model="feature.value[0]"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div>
      <h4 class="is-size-4 mt-4 mb-2">
        Description
      </h4>
      <!-- :content="product.descriptions[0].value || null"  -->
      <editor
        class="border bg-white p-4  rounded shadow-sm"
      />
    </div>
    <b-field class="mt-3">
      <b-button
        native-type="submit"
        type="is-warning"
        class="mr-2  has-text-weight-bold"
      >
        Submit
      </b-button>
      <b-button
        native-type="reset"
        type="is-dark"
        class=" has-text-weight-bold"
      >
        Reset
      </b-button>
    </b-field>
  </Layout>
</template>

<script>
import editor from '../../../components/admin/TextEditor'
import Vue from 'vue'
export default Vue.extend({
components:{
  editor
  },
  data() {
    return {
      editor: null,
      product: this.$store.state.adminCurrentProduct,
      form: {
        name: '',
        name: '',
        checked: []
      }
    }
  },
  

  methods: {
    onSubmit() {},
    onReset() {}
  }
})
</script>

<style >
.ProseMirror-focused {
  outline: none !important;
}
</style>