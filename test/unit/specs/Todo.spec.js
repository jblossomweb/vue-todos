import Vue from 'vue';
import forEach from 'lodash/forEach';
import concat from 'lodash/concat';
import Todo from '@/components/Todo.vue';
import mockData from '../../mock/todos';

const mockDesc = { description: 'foo' };
const mockNotDone = { done: false };
const mockDone = { done: true };
const allMocks = concat(mockData, [mockDesc, mockNotDone, mockDone]);

describe('Todo.vue', () => {
  const getElement = {
    header: vm => vm.$el.querySelector('.card .content .header'),
    todoButton: vm => vm.$el.querySelector('.card div.button.todo'),
    doneButton: vm => vm.$el.querySelector('.card div.button.done'),
    editButton: vm => vm.$el.querySelector('.card .content .extra span.edit.icon'),
    trashButton: vm => vm.$el.querySelector('.card .content .extra span.trash.icon'),
    contentNormal: vm => vm.$el.querySelector('.card .content.normal'),
    contentEditing: vm => vm.$el.querySelector('.card .content.editing'),
  };

  const helper = {
    mountWithProps: propsData => new (Vue.extend(Todo))({ propsData }).$mount(),
  };

  it('should render descriptions in card headers', () => {
    const todos = concat(mockData, [mockDesc]);
    forEach(todos, (todo) => {
      const vm = helper.mountWithProps({ todo });
      expect(getElement.header(vm).textContent).to.contain(todo.description);
    });
  });

  it('should show `Do It!` button, and hide `Done` when not done', () => {
    const todos = concat(mockData, [mockNotDone]);
    forEach(todos, (todo) => {
      const vm = helper.mountWithProps({ todo });
      if (!todo.done) {
        expect(getElement.todoButton(vm).style.display).to.not.equal('none');
        expect(getElement.doneButton(vm).style.display).to.equal('none');
      }
    });
  });

  it('should show `Done` button, and hide `Do It!` when done', () => {
    const todos = concat(mockData, [mockDone]);
    forEach(todos, (todo) => {
      const vm = helper.mountWithProps({ todo });
      if (todo.done) {
        expect(getElement.todoButton(vm).style.display).to.equal('none');
        expect(getElement.doneButton(vm).style.display).to.not.equal('none');
      }
    });
  });

  it('should always initialize isEditing state to false', () => {
    const todos = allMocks;
    forEach(todos, (todo) => {
      const vm = helper.mountWithProps({ todo });
      expect(vm.isEditing).to.equal(false);
    });
  });

  it('should change isEditing state to true when edit button is clicked', (done) => {
    const todos = allMocks;
    forEach(todos, (todo) => {
      const vm = helper.mountWithProps({ todo });
      getElement.editButton(vm).click();
      Vue.nextTick(() => {
        expect(vm.isEditing).to.equal(true);
        done();
      });
    });
  });

  it('should show form when isEditing state is true', (done) => {
    const todos = allMocks;
    forEach(todos, (todo) => {
      const vm = helper.mountWithProps({ todo });
      vm.isEditing = true;
      Vue.nextTick(() => {
        expect(getElement.contentNormal(vm).style.display).to.equal('none');
        expect(getElement.contentEditing(vm).style.display).to.not.equal('none');
        done();
      });
    });
  });

  it('should hide form when isEditing state is false', (done) => {
    const todos = allMocks;
    forEach(todos, (todo) => {
      const vm = helper.mountWithProps({ todo });
      vm.isEditing = false;
      Vue.nextTick(() => {
        expect(getElement.contentNormal(vm).style.display).to.not.equal('none');
        expect(getElement.contentEditing(vm).style.display).to.equal('none');
        done();
      });
    });
  });
});
