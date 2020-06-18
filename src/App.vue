<template>
    <div id="app">
        <router-view></router-view>
        
    </div>
</template>

<script>
export default {
    methods:{
      hreftwo(){
        this.$router.push({path:'/admin'})
      }
    }
}
</script>

<style>


</style>