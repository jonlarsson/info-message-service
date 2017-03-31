<template>
  <div id="app">
    <service-list></service-list>
    <a href="/api/auth/google">Logga in</a>
  </div>
</template>

<script>
import Hello from './components/Hello'
import ServiceList from './components/ServiceList'

export default {
  name: 'app',
  components: {
    Hello,
    ServiceList
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
