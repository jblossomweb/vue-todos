<template>
  <div class='ui basic content center aligned segment'>
    <button class='ui basic button icon' v-on:click="openForm" v-show="!isCreating">
      <i class='plus icon'></i>
      <input
        class="hidden"
        type="text"
        v-focus="!isCreating"
        ref="addButton"
        v-on:keyup="keyUpAdd"
        autofocus
      >
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
              v-on:keyup="keyUpInput"
            >
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm()">
              Create <i class="save icon"></i>
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel X
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { focus } from 'vue-focus';
import { keyCodes } from '../constants';

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
    keyUpInput(e) {
      if (e.keyCode === keyCodes.enter) {
        this.sendForm();
      }
      if (e.keyCode === keyCodes.escape) {
        this.closeForm();
      }
    },
    keyUpAdd(e) {
      if (e.keyCode === keyCodes.enter) {
        this.openForm();
      }
    },
  },
  directives: {
    focus,
  },
};
</script>
