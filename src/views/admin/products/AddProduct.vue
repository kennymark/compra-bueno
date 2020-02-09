<template>
  <Layout>
    <h3 class="is-size-3">
      Edit Product
    </h3>

    <div class="row">
      <div
        class="col-lg d-flex flex-column justify-content-center"
        style="max-height:500px"
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
      <div class="col-lg">
        <form
          @submit="onSubmit"
          @reset="onReset"
        >
          <b-field label="Product Name">
            <b-input
              id="product-name"
              v-model="product.name"
              native-type="text"
            />
          </b-field>

          <div>
            <b-field label="Prices" />
            <div class="row">
              <div class="col">
                <b-input
                  id="price_max"
                  v-model="product.price.min"
                />
              </div>
              <div class="col">
                <b-input
                  id="price_min"
                  v-model="product.price.max"
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
                  :id="value.toString()+ Math.random().toString()"
                  v-model="feature.value[0]"
                />
              </div>
            </div>
          </div>

          <b-field class="mt-3">
            <b-button
              native-type="submit"
              type="is-primary"
              class="mr-2"
            >
              Add
            </b-button>
            <b-button
              native-type="reset"
              type="is-light"
            >
              Reset
            </b-button>
          </b-field>
        </form>
      </div>
    </div>
    <div>
      <h4 class="is-size-4">
        Description
      </h4>
      <editor-content
        :editor="editor"
        class="border p-4 mt-4 rounded-lg text-muted"
      />
    </div>
  </Layout>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      editor: null,
      product: {},
      form: {
        name: '',
        name: '',
        checked: []
      }
    }
  },
  mounted() {
  }
}
</script>

<style >
.ProseMirror-focused {
  outline: none !important;
}
</style>