<template>
  <div class='ui centered card'>
    <div class="content" v-show="!isEditing">
        <div class='header'>
          {{ todo.description }}
        </div>
        <div class='extra content'>
          <span class='right floated edit icon' v-on:click="showForm(todo)">
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
          <button class='ui basic blue button' v-on:click="hideForm" v-show="saved">
            Close X
          </button>
          <button class='ui basic green button' v-on:click="hideForm" v-show="!saved">
            Save <i class="save icon"></i>
          </button>
        </div>
      </div>
    </div>
    <div class='ui bottom attached green basic button' v-show="!isEditing && todo.done" disabled>
      Done
    </div>
    <div class='ui bottom attached red basic button' v-show="!isEditing && !todo.done" v-on:click="completeTodo(todo)">
      Do It!
    </div>
  </div>
</template>

<script type="text/javascript">

import { focus } from 'vue-focus';
import clone from 'lodash/clone';
import isEqual from 'lodash/isEqual';

export default {
  props: ['todo'],
  data() {
    return {
      isEditing: false,
      saved: true,
      savedState: {},
      formState: {},
    };
  },
  methods: {
    showForm(todo) {
      this.isEditing = true;
      this.saved = true;
      this.savedState = clone(todo);
      this.formState = todo;
    },
    hideForm() {
      this.isEditing = false;
      if (!this.saved) {
        this.$emit('update-todo', this.formState);
        this.saved = true;
      }
    },
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
    completeTodo(todo) {
      this.formState = todo;
      this.formState.done = true;
      this.$emit('update-todo', this.formState);
    },
    keyUp(e) {
      if (e.keyCode === 13) {
        this.hideForm();
      } else {
        this.saved = isEqual(this.formState, this.savedState);
      }
    },
  },
  directives: {
    focus,
  },
};
</script>
