import Vue from 'vue';
import delay from 'lodash/delay';
import TodoList from '@/components/TodoList';
import mockData from '../../mock/todos';

describe('TodoList.vue', () => {
  const vm = new (Vue.extend(TodoList))({
    propsData: {
      todos: mockData,
    },
  }).$mount();

  const getElement = {
    header: () => vm.$el.querySelector('.todo-list h1'),
    menu: () => vm.$el.querySelector('.todo-list div.menu'),
    todoTab: () => vm.$el.querySelector('.todo-list div.menu .item.todo'),
    doneTab: () => vm.$el.querySelector('.todo-list div.menu .item.done'),
    allTab: () => vm.$el.querySelector('.todo-list div.menu .item.all'),
    todos: () => vm.$el.querySelector('.todo-list div.todos'),
  };

  const helper = {
    expectTabStateToFilterCards: (tab, cardsExpected, done) => {
      vm.activeTab = tab;
      Vue.nextTick(() => {
        delay(() => { // wait 500ms for CSS transition to complete
          expect(vm.activeTab).to.equal(tab);
          expect(getElement.menu().querySelector(`.item.${tab}`).className).to.contain('active');
          expect(getElement.todos().children.length).to.equal(cardsExpected.length);
          done();
        }, 500);
      });
    },

  };

  it('should render `To-Do List` in header', () => {
    expect(getElement.header().textContent).to.equal('To-Do List');
  });

  it('should render a `menu` div', () => {
    expect(getElement.menu()).to.not.equal(null);
  });

  it('should render a `todos` div', () => {
    expect(getElement.todos()).to.not.equal(null);
  });

  it('should render 3 tabs in a `menu` div', () => {
    expect(getElement.menu().children.length).to.equal(3);
  });

  it('should render `To-Do` in the first tab', () => {
    expect(getElement.menu().children[0].textContent).to.contain('To-Do');
  });

  it('should render `Done` in the second tab', () => {
    expect(getElement.menu().children[1].textContent).to.contain('Done');
  });

  it('should render `All` in the third tab', () => {
    expect(getElement.menu().children[2].textContent).to.contain('All');
  });

  it('should initially render the first tab as active', () => {
    expect(getElement.menu().children[0].className).to.contain('active');
  });

  it('should correctly set state of activeTab when `todo` tab is clicked', (done) => {
    getElement.todoTab().click();
    Vue.nextTick(() => {
      expect(vm.activeTab).to.equal('todo');
      done();
    });
  });

  it('should correctly set state of activeTab when `done` tab is clicked', (done) => {
    getElement.doneTab().click();
    Vue.nextTick(() => {
      expect(vm.activeTab).to.equal('done');
      done();
    });
  });

  it('should correctly set state of activeTab when `all` tab is clicked', (done) => {
    getElement.allTab().click();
    Vue.nextTick(() => {
      expect(vm.activeTab).to.equal('all');
      done();
    });
  });

  it('should correctly filter cards when activeTab state is `todo`', (done) => {
    const cardsExpected = mockData.filter(todo => !todo.done);
    helper.expectTabStateToFilterCards('todo', cardsExpected, done);
  });

  it('should correctly filter cards when activeTab state is `done`', (done) => {
    const cardsExpected = mockData.filter(todo => todo.done);
    helper.expectTabStateToFilterCards('done', cardsExpected, done);
  });

  it('should correctly filter cards when activeTab state is `all`', (done) => {
    const cardsExpected = mockData;
    helper.expectTabStateToFilterCards('all', cardsExpected, done);
  });
});
