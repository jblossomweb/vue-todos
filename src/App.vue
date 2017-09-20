<template>
  <div id="app">
    <transition-group name="transition-fade" duration="100" tag="div" class="error-container">
      <div
        v-for="(error, index) in errors"
        v-bind:error="error"
        v-bind:key="index"
        class="ui floating negative message transition-fade"
      >
        <i class="close icon" v-on:click="dismissError(index)"></i>
        <div class="header">{{error.message}}</div>
      </div>
    </transition-group>
    <todo-list
      v-bind:todos="todos"
      v-on:update-todo="updateTodo"
      v-on:delete-todo="deleteTodo"
    ></todo-list>
    <create-todo
      v-on:add-todo="addTodo"
    ></create-todo>
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
  data: () => ({
    todos: [],
    errors: [],
  }),
  props: ['service'],
  mounted() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      try {
        const response = await this.service.getAll();
        this.todos = response.data;
      } catch (error) {
        this.errors.push(error);
      }
    },
    async addTodo(description) {
      try {
        const response = await this.service.create({
          description,
          done: false,
        });
        if (response.data) {
          this.todos.push(response.data);
        } else {
          throw new Error('server response did not confirm add');
        }
      } catch (error) {
        this.errors.push(error);
      }
    },
    async deleteTodo(todo) {
      try {
        const response = await this.service.delete(todo.id);
        if (response.data) {
          const todoIndex = this.todos.indexOf(todo);
          this.todos.splice(todoIndex, 1);
        } else {
          throw new Error('server response did not confirm delete');
        }
      } catch (error) {
        this.errors.push(error);
      }
    },
    async updateTodo(todo) {
      try {
        const response = await this.service.update(todo);
        if (!response.data) {
          throw new Error('server response did not confirm update');
        }
      } catch (error) {
        this.errors.push(error);
      }
    },
    dismissError(index) {
      this.errors.splice(index, 1);
    },
  },
};
</script>
