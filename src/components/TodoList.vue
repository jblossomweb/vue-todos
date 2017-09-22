<template>
  <div class="todo-list">
    <h1>To-Do List</h1>
    <div class="ui pointing secondary menu">
      <a
        class="item todo"
        v-bind:class="{ active: activeTab == 'todo' }"
        v-on:click="selectTab('todo')"
      >
        To-Do ({{getTodos('todo').length}})
      </a>
      <a
        class="item done"
        v-bind:class="{ active: activeTab == 'done' }"
        v-on:click="selectTab('done')"
      >
        Done ({{getTodos('done').length}})
      </a>
      <a
        class="item all"
        v-bind:class="{ active: activeTab == 'all' }"
        v-on:click="selectTab('all')"
      >
        All ({{todos.length}})
      </a>
    </div>
    <div class="todos">
      <todo
        v-for="(todo, index) in getTodos(activeTab)"
        v-bind:todo="todo"
        v-bind:key="index"
        v-on:delete-todo="deleteTodo"
        v-on:update-todo="updateTodo"
      ></todo>
    </div>
  </div>
</template>

<script type = "text/javascript">

import Todo from './Todo.vue';

export default {
  props: ['todos'],
  components: {
    Todo,
  },
  data: () => ({
    activeTab: 'todo',
  }),
  methods: {
    selectTab(tab) {
      this.activeTab = tab;
    },
    getTodos(filter) {
      switch (filter) {
        case 'todo': return this.todos.filter(todo => !todo.done);
        case 'done': return this.todos.filter(todo => todo.done);
        default: return this.todos;
      }
    },
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
    updateTodo(todo) {
      this.$emit('update-todo', todo);
    },
  },
};
</script>
