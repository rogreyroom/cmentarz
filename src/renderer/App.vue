<template>
  <div id="app">
    <main-navigation></main-navigation>
    <div class="container">  
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  
  import MainNavigation from './components/Navigation/MainNavigation'
  require('./assets/js/fontawesome-all.min.js')

  export default {
    name: 'cmentarz',
    components: { MainNavigation },
    methods: {
    }
  }
</script>
<style>
  /* CSS */
  @import './assets/css/normalize.css';
  @import './assets/css/skeleton.css';
  @import './assets/css/pikaday.css';
  @import './assets/css/style.css';

  .container {
    margin-top: 2%;
  }
</style>
