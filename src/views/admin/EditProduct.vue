<template>
  <Layout>
    <h3 class="is-size-3">Edit Product</h3>

    <div class="row">
      <div class="col-lg d-flex flex-column justify-content-center" style="max-height:500px">
        <img
          :src="product.imageurls.split(',')[0] || product.imageurls"
          class="img-fluid"
          alt
          srcset
        />
        <div class="buttons my-3">
          <b-button class="border mr-3" type="is-info">Save</b-button>
          <b-button type="is-light">Delete</b-button>
        </div>
      </div>
      <div class="col-lg">
        <form @submit="onSubmit" @reset="onReset">
          <b-field label="Product Name">
            <b-input id="product-name" v-model="product.name" native-type="text" />
          </b-field>

          <div>
            <b-field label="Prices" />
            <div class="row">
              <div class="col">
                <b-input id="price_max" v-model="product.prices_amountmin" />
              </div>
              <div class="col">
                <b-input id="price_min" v-model="product.prices_amountmax" />
              </div>
            </div>
          </div>

          <div class="mt-3">
            <b-field label="Features" />
            <div class="row my-3" v-for="(feature,value) in product.features" :key="value">
              <div class="col-md">
                <b-input :id="value.toString()+ Math.random().toString()" v-model="feature.key" />
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
            <b-button native-type="submit" type="is-primary" class="mr-2">Submit</b-button>
            <b-button native-type="reset" type="is-light">Reset</b-button>
          </b-field>
        </form>
      </div>
    </div>
    <div>
      <h4 class="is-size-4">Description</h4>
      <editor-content :editor="editor" class="border p-4 mt-4 rounded-lg text-muted" />
    </div>
  </Layout>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent
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
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History()
      ],
      content: this.product.descriptions[0].value
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },

  methods: {
    onSubmit() {},
    onReset() {}
  }
}
</script>

<style >
.ProseMirror-focused {
  outline: none !important;
}
</style>