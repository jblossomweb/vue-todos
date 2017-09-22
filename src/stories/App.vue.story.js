import { storiesOf } from '@storybook/vue';
import find from 'lodash/find';
import map from 'lodash/map';
import assign from 'lodash/assign';
import debounce from 'lodash/debounce';

import 'semantic-ui-css/semantic.min.css';
import '../style.css';

import App from '../App.vue';
import MockData from '../../test/mock/todos';

const todos = MockData;

const mockService = {
  getAll: () => Promise.resolve({ data: todos }),
  getOne: id => Promise.resolve({ data: find(todos, { id }) }),
  create: (todo) => {
    const savedTodo = {
      id: todos.length ? Math.max.apply(null, map(todos, 'id')) + 1 : 1,
      done: todo.done || false,
      description: todo.description,
    };
    // a debounce workaround for known Storybook bug: https://github.com/storybooks/storybook/issues/1742
    // todos.push(savedTodo);
    debounce(() => todos.push(savedTodo), 500, { leading: false, trailing: false })();
    return Promise.resolve({ data: savedTodo });
  },
  update: (update) => {
    let todo = find(todos, { id: update.id });
    /* eslint-disable consistent-return */
    map(todos, (t) => {
      if (t === todo) {
        todo = assign(t, update);
        return todo;
      }
    });
    /* eslint-enable consistent-return */
    return Promise.resolve({ data: todo });
  },
  delete: (id) => {
    const todo = find(todos, { id });
    if (todo) {
      // a debounce workaround for known Storybook bug: https://github.com/storybooks/storybook/issues/1742
      // todos.splice(todos.indexOf(todo), 1);
      /* eslint-disable max-len */
      debounce(() => todos.splice(todos.indexOf(todo), 1), 500, { leading: false, trailing: false })();
      /* eslint-enable max-len */
      return Promise.resolve({ data: true });
    }
    return Promise.resolve({ data: false });
  },
};

const networkErrors = {
  getAll: () => Promise.reject({ message: 'Network Error' }),
  getOne: () => Promise.reject({ message: 'Network Error' }),
  create: () => Promise.reject({ message: 'Network Error' }),
  update: () => Promise.reject({ message: 'Network Error' }),
  delete: () => Promise.reject({ message: 'Network Error' }),
};

storiesOf('App', module)
  .add('mock service', () => ({
    components: { App },
    data: () => ({
      service: mockService,
    }),
    template: '<App v-bind:service="service"/>',
  }))
  .add('network error', () => ({
    components: { App },
    data: () => ({
      service: networkErrors,
    }),
    template: '<App v-bind:service="service"/>',
  }));
