<template>
  <div id="app">
        <router-view></router-view>
  </div>
</template>


<script>
    export default {
        mounted() {
            this.$store.dispatch('getUserInfo');
            localStorage.setItem('activeIndex', '1')
        }
    }
</script>
