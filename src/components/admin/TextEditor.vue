<template>
  <div class="editor">
    <editor-menu-bar
      v-slot="{ commands, isActive }"
      :editor="editor"
    >
      <div class="menubar">
        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.bold() }"
          @click="commands.bold"
        >
          <b-icon icon="format-bold" />
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.italic() }"
          @click="commands.italic"
        >
          <b-icon icon="format-italic" />
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.strike() }"
          @click="commands.strike"
        >
          <b-icon icon="format-strikethrough" />
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.underline() }"
          @click="commands.underline"
        >
          <b-icon icon="format-underline" />
        </b-button>

        

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          P
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <b-icon icon="format-list-bulleted" />
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <b-icon icon="format-line-weight" />
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <b-icon icon="format-quote-close" />
        </b-button>

        <b-button
          type="is-text"
          :class="{ 'is-link': isActive.code_block() }"
          @click="commands.code_block"
        >
          <b-icon icon="xml" />
        </b-button>

        <b-button
          type="is-text"
        
          @click="commands.horizontal_rule"
        >
          <b-icon icon="format-align-middle" />
        </b-button>

        <b-button
          type="is-text"
        
          @click="commands.undo"
        >
          <b-icon icon="undo" />
        </b-button>

        <b-button
          type="is-text"
          @click="commands.redo"
        >
          <b-icon icon="redo" />
        </b-button>
      </div>
    </editor-menu-bar>

    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import Vue from 'vue'
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
export default Vue.extend({
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: {content:{type:String, default:''}},
  
  data() {
    return {

      editor: new Editor({
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
        content: ''
      })
    }
  },
 

  beforeDestroy() {
    this.editor.destroy()
  }
})
</script>