<template>
  <div id="app">
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
button, i.edit, i.trash {
  cursor: pointer;
}
i.save {
  padding-left: 0.3em;
}
.ui.pointing.secondary.menu {
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
}
.ui.card {
  transition: opacity .1s;
}
.ui.card.transition-fade-enter,
.ui.card.transition-fade-leave-to {
  opacity: 0;
}
.ui.card.transition-fade-leave,
.ui.card.transition-fade-enter-to {
  opacity: 1;
}
.hidden {
  position: absolute;
  top: -99999999px;
}
</style>
