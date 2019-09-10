<template>
  <button type="button" class="btn btn-light"
          :class="activeClass" @click.prevent="commands[command](args)">
    <i class="fas" :class="iconClass"></i>
  </button>
</template>

<script>
    export default {
        name: 'editor-menu-button',
        props: {
            command: {
                required: true,
                type: String,
            },
            commands: {
                required: true,
                type: Object,
                default: () => {
                },
            },
            isActive: {
                required: true,
                type: Object,
                default: () => {
                },
            },
            args: {
                type: Object,
                default: () => {
                },
            },
            icon: {
                type: String,
            },
        },
        computed: {
            activeClass() {
                return this.isActive[this.command] && this.isActive[this.command](this.args)
                    ? 'active' : null;
            },
            iconClass() {
                return `fa-${this.icon ? this.icon : this.command}`;
            },
        },
    };
</script>

<style>
  @import "~@fortawesome/fontawesome-free/css/all.css";
</style>
