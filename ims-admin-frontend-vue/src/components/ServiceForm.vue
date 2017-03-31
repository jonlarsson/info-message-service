<template>
    <div>
        <form v-on:submit="save">
          <input type="text" v-model="serviceName" required />
          <button type="submit">Save</button>
        </form>
    </div>
</template>
<script>
  import {createService} from '../backendApi';
    export default{
        data(){
            return{
                serviceName:'test'
            }
        },
        methods: {
          save (event) {
            event.preventDefault();
            console.log(event, "serviceName", this.serviceName);
            createService({
              name: this.serviceName
            }).then((service) => this.$emit("serviceCreated", service))
          }
        },
        components:{
        }
    }
</script>
