<template>
  <div class='ui basic content center aligned segment'>
    <button class='ui basic button icon' v-on:click="openForm" v-show="!isCreating">
      <i class='plus icon'></i>
    </button>
    <div class='ui centered card' v-show="isCreating">
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <label>Description</label>
            <input
              v-model="descriptionText"
              type="text"
              ref="description"
              v-focus="isCreating"
              v-on:keyup="keyUp"
            >
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm()">
              Create
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { focus } from 'vue-focus';

export default {
  data() {
    return {
      descriptionText: '',
      isCreating: false,
    };
  },
  methods: {
    openForm() {
      this.isCreating = true;
    },
    closeForm() {
      this.isCreating = false;
    },
    sendForm() {
      if (this.descriptionText.length > 0) {
        const description = this.descriptionText;
        this.$emit('add-todo', description);
        this.descriptionText = '';
      }
      this.isCreating = false;
    },
    keyUp(e) {
      if (e.keyCode === 13) {
        this.sendForm();
      }
    },
  },
  directives: {
    focus,
  },
};
</script>
