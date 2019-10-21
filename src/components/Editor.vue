<template>
  <div class="card">
    <editor-menu-bar :editor="editor" v-slot:default="{ commands, isActive }">
      <div class="card-header btn-toolbar p-1" role="toolbar" aria-label="Editor Toolbar">
        <div class="btn-group btn-group-sm mr-2" role="group">
          <editor-menu-button command="undo"
                              :commands="commands" :is-active="isActive"/>
          <editor-menu-button command="redo"
                              :commands="commands" :is-active="isActive"/>
        </div>
        <div class="btn-group btn-group-sm mr-2" role="group">
          <editor-menu-button command="bold"
                              :commands="commands" :is-active="isActive"/>
          <editor-menu-button command="italic"
                              :commands="commands" :is-active="isActive"/>
          <editor-menu-button command="underline"
                              :commands="commands" :is-active="isActive"/>
          <editor-menu-button command="strike" icon="strikethrough"
                              :commands="commands" :is-active="isActive"/>
        </div>
        <div class="btn-group btn-group-sm mr-2" role="group">
          <editor-menu-button command="paragraph"
                              :commands="commands" :is-active="isActive"/>
          <editor-menu-button command="heading" :args="{ level: 2 }"
                              :commands="commands" :is-active="isActive"/>
        </div>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="card-body p-3"/>
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
    import EditorMenuButton from './EditorMenuButton.vue';

    export default {
        name: 'app',
        components: {
            EditorMenuButton,
            EditorMenuBar,
            EditorContent,
        },
        props: {
            content: {
                default: '<h1>Welcome to Your Vue.js App</h1>',
            },
            editor: {},
        },
        created() {
            if (!this.editor) {
                this.editor = new Editor({
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
                    content: `${this.content}`,
                    onUpdate: ({getHTML}) => {
                        this.$emit('input', {
                            content: getHTML(),
                        });
                    },
                })
            }

            this.editor.setContent(this.content)
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
