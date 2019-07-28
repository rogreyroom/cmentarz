<template>
  <div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  
  import RaportySubNav from '../Navigation/RaportySubNav'

  export default {
    name: 'raporty',
    components: { RaportySubNav },
  }
</script>
<style>

.container {
    width: 85%;
    display: inline-block;
}

</style>