import { storiesOf } from '@storybook/vue';

import 'semantic-ui-css/semantic.min.css';
import '../../style.css';

import TodoList from '../../components/TodoList.vue';
import MockData from '../../../test/mock/todos';

const todos = MockData;

const updateTodo = async () => {
  // no action needed
};

const deleteTodo = async (todo) => {
  const todoIndex = todos.indexOf(todo);
  todos.splice(todoIndex, 1);
};

storiesOf('Component.TodoList', module)
  .add('todos', () => ({
    components: { TodoList },
    data: () => ({
      todos,
    }),
    methods: {
      updateTodo,
      deleteTodo,
    },
    template: `
      <div id="app">
        <todo-list
          v-bind:todos="todos"
          v-on:update-todo="updateTodo"
          v-on:delete-todo="deleteTodo"
        ></todo-list>
      </div>
    `,
  }))
  .add('no todos', () => ({
    components: { TodoList },
    data: () => ({
      todos: [],
    }),
    template: `
      <div id="app">
        <todo-list
          v-bind:todos="todos"
        ></todo-list>
      </div>
    `,
  }));
