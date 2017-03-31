<template>
    <div>
        Service: {{serviceId}}
    </div>
</template>
<script>
  
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        props: ['serviceId'],
        components:{
        }
    }
</script>
