# vue-todos

> A Vue.js project

## Build Setup

### Server

first, you will need to run the API as it exists on this branch:
https://github.com/jblossomweb/jumpcloud-ui-assignment/tree/develop

``` bash
# clone the forked repository
git clone https://github.com/jblossomweb/jumpcloud-ui-assignment.git

# switch to develop branch
git checkout develop

# install dependencies
npm install

# start the server
npm start
```

To test the API, point browser to http://localhost:3004/api/todos

### Client

Now you can run the client against the API at localhost:3004

Options to build/run the client:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run storybook at localhost:6006
npm run storybook

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
