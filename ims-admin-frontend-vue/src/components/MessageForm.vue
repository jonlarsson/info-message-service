<template>
  <div>
    <form v-on:submit="save">
      <input type="text" v-model="message" required />
      <button type="submit">Save</button>
    </form>
  </div>
</template>
<script>
  import {createMessage} from '../backendApi';
    export default{
        data(){
            return{
                message:''
            }
        },
        methods: {
          save (event) {
            event.preventDefault();
            createMessage(this.serviceId, {
              content: this.message
            }).then((service) => this.$emit("messageAdded", service))
          }
        },
        props: ['serviceId'],
        components:{
        }
    }
</script>
