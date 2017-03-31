<template>
  <div>
    <service-form v-on:serviceCreated="serviceCreated"></service-form>
    <ul>
      <li v-for="service in services">
        <router-link :to="{ name: 'service', params: { serviceId: service.id }}">
          {{service.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import {listServices} from '../backendApi'
  import ServiceForm from './ServiceForm';
    export default{
        data(){
          return {
            services: listServices().then(services => this.services = services)
          }
        },
        methods: {
          serviceCreated(service) {
            this.services.push(service)
          }
        },
        components:{
        ServiceForm
        }
    }



</script>
