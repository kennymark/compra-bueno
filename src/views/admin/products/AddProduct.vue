<template>
  <Layout>
    <h3 class="is-size-3">
      Create Product
    </h3>

    <div class="row">
      <div
        class="col-lg mt-4 d-flex flex-column border justify-content-center bg-white rounded shadow-sm"
      >
        <img
          src=""
          alt=""
          style="min-height:400px"
        >
        <small>Max 5 images</small>
        <div class="buttons my-3">
          <b-button
            class="border mr-3"
            type="is-link"
          >
            Add Image
          </b-button>
          <b-button type="is-danger">
            Delete
          </b-button>
        </div>
      </div>
      <div class="col-lg">
        <form
          @reset="onReset"
        >
          <b-field label="Product Name">
            <b-input
              id="product-name"
              v-model="product.name"
              native-type="text"
              class="shadow-sm rounded border"
            />
          </b-field>

          <div>
            <b-field label="Prices" />
            <div class="row">
              <div class="col">
                <b-input
                  id="price_max"
                  v-model="product.price.min"
                  class="shadow-sm rounded border"
                />
              </div>
              <div class="col">
                <b-input
                  id="price_min"
                  v-model="product.price.max"
                  class="shadow-sm rounded border"
                />
              </div>
            </div>
          </div>

          <div class="mt-3">
            <b-field label="Features" />
            <b-button
              type="is-dark"
              class="has-text-weight-bold shadow-sm"
              @click="addNewFeature"
            >
              Add a feature
            </b-button>
            <div
              v-for="(feature,value) in features"
              :key="value"
              class="row my-3"
            >
              <div class="col-md">
                <b-input
                  :id="value.toString()+ Math.random()"
                  v-model="feature.key"
                  class="shadow-sm rounded border"
                />
              </div>
              <div class="col-md">
                <b-input
                  :id="value.toString()+ Math.random()"
                  v-model="feature.value"
                  class="shadow-sm rounded border"
                />
              </div>
              <div class="col-md-1 d-flex align-items-center">
                <b-button
                  :id="value.toString()+ Math.random()"
                  type="is-danger"
                  @click="deleteFeature(key)"
                >
                  X
                </b-button>
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
      <editor
        class="border p-4 rounded-lg bg-white shadow-sm text-muted"
      />
    </div>
    <b-field class="mt-3">
      <b-button
        native-type="submit"
        type="is-warning"
        class="mr-2 shadow has-text-weight-bold"
      >
        Submit
      </b-button>
      <b-button
        native-type="reset"
        type="is-dark"
        class="mr-2 shadow has-text-weight-bold"
      >
        Reset
      </b-button>
    </b-field>
  </Layout>
</template>

<script>
import Vue from 'vue'
import editor from '../../../components/admin/TextEditor'
export default Vue.extend({
  components: {editor},
  data() {
    return {
    features:[({key:'', value:''})],
      editor: null,
      product: {
        price:{
        min:null,
        max:null,
        }
      },
      form: {
        name: '',
        name: '',
        checked: []
      }
    }
  },
  mounted() {
  },
  methods:{
  onReset(){},
    addNewFeature(){
    this.features.push({key:'', value:''})
    if(this.features.length >= 6){
      Object.freeze(this.features)
    }
    }
  }
})
</script>

<style >
.ProseMirror-focused {
  outline: none !important;
}
</style>