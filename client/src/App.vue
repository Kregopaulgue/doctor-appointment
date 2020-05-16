<template>
  <div id="app">
    <b-container fluid class="h-100 d-flex flex-column px-0">
        <Header/>
        <router-view/>
    </b-container>
  </div>
</template>

<script>
import VueRouter from 'vue-router';
import routes from './routes.js';

import Header from './components/Header';

const router = new VueRouter({
    routes,
    mode: "history"
});

export default {
  name: 'App',
  components: {
      Header
  },
  router
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
}
</style>
