<template>
  <div id="app" class="text-center">
    <img alt="Vue logo" src="./assets/logo.png">

    <div class="container editor">
      <editor-floating-menu :editor="editor" v-slot="editorParams">
        <div class="editor__floating-menu"
             :class="{ 'is-active': editorParams.menu.isActive }"
             :style="`top: ${editorParams.menu.top}px`">
          <div class="btn-toolbar p-1" role="toolbar" aria-label="Editor Toolbar">
            <div class="btn-group btn-group-sm mr-2" role="group">
              <editor-menu-button command="heading" :args="{ level: 1 }" :editor-params="editorParams">H1</editor-menu-button>
              <editor-menu-button command="heading" :args="{ level: 2 }" :editor-params="editorParams">H2</editor-menu-button>
              <editor-menu-button command="heading" :args="{ level: 3 }" :editor-params="editorParams">H3</editor-menu-button>
            </div>
            <div class="btn-group btn-group-sm mr-2" role="group">
              <editor-menu-button command="bullet_list" icon="list-ul" :editor-params="editorParams" />
              <editor-menu-button command="ordered_list" icon="list-ol" :editor-params="editorParams" />
            </div>
          </div>
        </div>
      </editor-floating-menu>
      <editor-component :content="content" :editor="editor"></editor-component>
      <editor-content :editor="editor" class="editor__content border border-top-0 rounded-bottom p-3"/>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorFloatingMenu } from 'tiptap';
import {
  HardBreak,
  Heading,
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
  History,
} from 'tiptap-extensions';
import EditorComponent from './components/Editor.vue';
import EditorMenuButton from './components/EditorMenuButton.vue';

export default {
  name: 'app',
  components: {
    EditorComponent,
    EditorMenuButton,
    EditorContent,
    EditorFloatingMenu,
  },
  props: {
    content: {
      default: '<h1>tiptap Bootstrap - rendering the renderless</h1>',
    },
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `${this.content}`,
        onUpdate: ({ getHTML }) => {
          this.$emit('input', {
            content: getHTML(),
          });
        },
      }),
    };
  },
};
</script>

<style lang="scss">
  @import "~@fortawesome/fontawesome-free/css/all.css";
  .ProseMirror {
    text-align: initial;

    &:focus {
      /*outline: none;*/
    }
  }

  .editor {
    position: relative;
    &__floating-menu {
      position: absolute;
      z-index: 1;
      margin-top: -0.75rem;
      margin-left: 1rem;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s, visibility 0.2s;
      &.is-active {
        opacity: 1;
        visibility: visible;
      }
    }
  }
</style>
