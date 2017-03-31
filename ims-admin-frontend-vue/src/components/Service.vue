<template>
    <div>
      <h1>{{service.name}}</h1>
      <message-form v-on:messageAdded="messageAdded" :service-id="serviceId"></message-form>
      <ul>
        <li v-for="message in messages">{{message.content}}</li>
      </ul>
    </div>
</template>
<script>
  import {getService, listMessages} from '../backendApi';
  import MessageForm from './MessageForm';
    export default{
        data(){
            return{
                service: getService(this.serviceId)
                  .then(service => this.service = service),
                messages: listMessages(this.serviceId)
                .then(messages => this.messages = messages)
            }
        },
        methods: {
          messageAdded(message) {
            this.messages.push(message);
          }
        },
        props: ['serviceId'],
        components:{
          MessageForm
        }
    }
</script>
