import { storiesOf } from '@storybook/vue';

import 'semantic-ui-css/semantic.min.css';
import '../../style.css';

import CreateTodo from '../../components/CreateTodo.vue';

const addTodo = async () => {
  // no action needed
};

storiesOf('Component.CreateTodo', module)
  .add('new todo', () => ({
    components: { CreateTodo },
    data: () => ({
    }),
    methods: {
      addTodo,
    },
    template: `
      <div id="app">
        <create-todo
          v-on:add-todo="addTodo"
        ></create-todo>
      </div>
    `,
  }));
