<template>
  <div id="app">
    <todo-list v-bind:todos="todos"></todo-list>
    <create-todo v-on:add-todo="addTodo"></create-todo>
  </div>
</template>

<script>
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

export default {
  name: 'app',
  components: {
    TodoList,
    CreateTodo,
  },
  data() {
    return {
      todos: [
        { id: 1, done: false, description: 'Pick up eggs' },
        { id: 2, done: false, description: 'Pay electric bill' },
        { id: 3, done: true, description: 'Create todo API' },
      ],
    };
  },
  methods: {
    addTodo(description) {
      this.todos.push({
        description,
        done: false,
      });
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
i.edit, i.trash {
  cursor: pointer;
}
</style>
