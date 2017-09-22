import { storiesOf } from '@storybook/vue';

import 'semantic-ui-css/semantic.min.css';
import '../../style.css';

import Todo from '../../components/Todo.vue';
import MockData from '../../../test/mock/todos';

const notDone = MockData.filter(todo => !todo.done)[0] || { id: 1, description: 'To Do Task', done: false };
const done = MockData.filter(todo => todo.done)[0] || { id: 1, description: 'Done Task', done: true };

const updateTodo = async () => {
  // no action needed
};

const deleteTodo = async () => {
  // no action needed
};

storiesOf('Component.Todo', module)
  .add('not done', () => ({
    components: { Todo },
    data: () => ({
      todo: notDone,
      index: 0,
    }),
    methods: {
      updateTodo,
      deleteTodo,
    },
    template: `
      <div id="app">
        <div class="todo-list">
          <div class="todos">
            <todo
              v-bind:todo="todo"
              v-bind:key="index"
              v-on:delete-todo="deleteTodo"
              v-on:update-todo="updateTodo"
            ></todo>
          </div>
        </div>
      </div>
    `,
  }))
  .add('done', () => ({
    components: { Todo },
    data: () => ({
      todo: done,
      index: 0,
    }),
    methods: {
      updateTodo,
      deleteTodo,
    },
    template: `
      <div id="app">
        <div class="todo-list">
          <div class="todos">
            <todo
              v-bind:todo="todo"
              v-bind:key="index"
              v-on:delete-todo="deleteTodo"
              v-on:update-todo="updateTodo"
            ></todo>
          </div>
        </div>
      </div>
    `,
  }));
