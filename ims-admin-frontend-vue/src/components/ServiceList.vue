<template>
  <ul>
    <li v-for="service in services">
      <router-link :to="{ name: 'service', params: { serviceId: service.id }}">
        {{service.name}}
      </router-link>
    </li>
  </ul>
</template>
<script>
  import {listServices} from '../backendApi'
    export default{
        data(){
          return {
            services: listServices().then(services => this.services = services)
          }
        },
        methods: {
        },
        components:{
        }
    }


</script>
