<template>
  <div id="app" class="text-center">
    <img alt="Vue logo" src="./assets/logo.png">

    <div class="container">
      <EditorComponent :content="content" :editor="editor"></EditorComponent>
    </div>
  </div>
</template>

<script>
    import {Editor, EditorContent, EditorMenuBar} from 'tiptap';
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

    export default {
        name: 'app',
        components: {
            EditorComponent,
            EditorMenuBar,
            EditorContent,
        },
        data() {
            return {
                content: '<h1>Welcome to Your Vue.js App</h1>',
                editor: new Editor({
                    extensions: [
                        new HardBreak(),
                        new Heading({levels: [1, 2, 3]}),
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
                    onUpdate: ({getHTML}) => {
                        this.$emit('input', {
                            content: getHTML(),
                        });
                    },
                }),
            };
        }
    };
</script>

<style lang="scss">
  .ProseMirror {
    text-align: initial;

    &:focus {
      outline: none;
    }
  }
</style>
