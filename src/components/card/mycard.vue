<template>

   <Card style="width:320px;border-radius: 10px;background-color: rgb(248, 248, 248);" padding='0' class="noselect">
       <div class="flex" >  
           <div class="flex a-center j-center" style="height:110px;width:92px;border-radius: 10px;box-shadow: 0 1px 5px 0 rgba(0, 0,0, 0.3);" :style="{'background-color':bgcolor}">
               <Icon :type="icon" size='40' color='white' />
           </div>
           <div class="flex a-center flex-col j-center flex-1">
               <h1>{{count}}</h1>
               <div>{{title}}</div>
           </div>
       </div>
   </Card>

  
</template>

<script>
    export default {
        props:["icon","bgcolor","count","title"]
    }
</script>

<style scoped>


.flex{
    display: flex;
}

.flex-col{
    flex-direction: column;
}

.j-center{
    justify-content: center;
}

.a-center{
    align-items: center;
}

.j-bt{
    justify-content: space-between;
}

.flex-1{
    flex:1;
}

.noselect{
    user-select:none;
}

</style>