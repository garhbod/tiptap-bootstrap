import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import MyButton from './Button.vue';

storiesOf('Button', module)
  .add('as a component', () => ({
    components: { MyButton },
    template: '<my-button :rounded="true">rounded</my-button>'
  }));
