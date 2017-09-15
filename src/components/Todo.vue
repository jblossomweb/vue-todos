<template>
  <div class='ui centered card'>
    <div class="content" v-show="!isEditing">
        <div class='header'>
          {{ todo.description }}
        </div>
        <div class='extra content'>
          <span class='right floated edit icon' v-on:click="showForm">
            <i class='edit icon'></i>
          </span>
          <span class='right floated trash icon' v-on:click="deleteTodo(todo)">
            <i class='trash icon'></i>
          </span>
        </div>
    </div>
    <div class="content" v-show="isEditing">
      <div class='ui form'>
        <div class='field'>
          <label>Description</label>
          <input 
            type='text'
            v-model="todo.description"
            ref="description"
            v-focus="isEditing"
            v-on:keyup="keyUp"
          >
        </div>
        <div class='ui two button attached buttons'>
          <button class='ui basic blue button' v-on:click="hideForm">
            Close X
          </button>
        </div>
      </div>
    </div>
    <div class='ui bottom attached green basic button' v-show="!isEditing && todo.done" disabled>
      Done
    </div>
    <div class='ui bottom attached red basic button' v-show="!isEditing && !todo.done">
      Do It!
    </div>
  </div>
</template>

<script type="text/javascript">

import { focus } from 'vue-focus';

export default {
  props: ['todo'],
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    showForm() {
      this.isEditing = true;
    },
    hideForm() {
      this.isEditing = false;
    },
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
    keyUp(e) {
      if (e.keyCode === 13) {
        this.hideForm();
      }
    },
  },
  directives: {
    focus,
  },
};
</script>
