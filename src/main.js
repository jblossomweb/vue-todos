// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import App from './App.vue';
import TodoService from './services/Todo.service';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    service: TodoService,
  },
  template: '<App v-bind:service="service"/>',
  components: { App },
});
