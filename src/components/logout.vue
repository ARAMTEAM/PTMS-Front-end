<template>
    <div class="container">
        <img src="../assets/img/logout.svg" alt="" class="img">
        <button class="btn" @click="backToHome">已成功登出|点击回到首页</button>

    </div>
</template>

<script>
import GLOBAL from '@/api/global_variable'
const url = GLOBAL.apiURL
export default{
    created() {
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        if(this.$route.query.role=='admin'){
            axios.get(url+'admin/logout').then(res =>{
            })
        }else if(this.$route.query.role=='jiaowu'){
            axios.get(url+'jiaowu/logout').then(res =>{
            })
        }else if(this.$route.query.role=='teacher'){
            axios.get(url+'teacher/logout').then(res =>{
            })
        }else if(this.$route.query.role=='student'){
            axios.get(url+'student/logout').then(res =>{
            })
        }
    },
    methods: {
        backToHome(){
            this.$router.push('/')
        }
    },
}
</script>

<style scoped>
.container{
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.img{
    width: 350px;
}
.btn{
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    margin: 2rem 0;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background-image: linear-gradient(to right,#32be8f,#38d39f,#32be8f);
    cursor: pointer;
    color: #fff;
    text-transform: uppercase;
    /* font-family: 'Roboto', sans-serif; */
    background-size: 200%;
    transition: .5s;
}
.btn:hover{
    background-position: right;
}
</style>

