// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.todo-list h1')
      .assert.containsText('.todo-list h1', 'To-Do List')
      .assert.elementPresent('.todo-list div.menu')
      .assert.elementPresent('.todo-list div.todos')
      .assert.elementCount('.todo-list div.menu a.item', 3)
      .assert.containsText('.todo-list div.menu a.item:nth-of-type(1)', 'To-Do')
      .assert.containsText('.todo-list div.menu a.item:nth-of-type(2)', 'Done')
      .assert.containsText('.todo-list div.menu a.item:nth-of-type(3)', 'All')
      .assert.attributeContains('.todo-list div.menu a.item:nth-of-type(1)', 'class', 'active')
      .click('.todo-list div.menu a.item:nth-of-type(1)')
      .pause(500)
      .assert.attributeContains('.todo-list div.menu a.item:nth-of-type(1)', 'class', 'active')
      .click('.todo-list div.menu a.item:nth-of-type(2)')
      .pause(500)
      .assert.attributeContains('.todo-list div.menu a.item:nth-of-type(2)', 'class', 'active')
      .click('.todo-list div.menu a.item:nth-of-type(3)')
      .pause(500)
      .assert.attributeContains('.todo-list div.menu a.item:nth-of-type(3)', 'class', 'active')
      .end();
  },
};
