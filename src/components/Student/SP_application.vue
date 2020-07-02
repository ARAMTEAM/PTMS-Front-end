<template>
    
    <main class="main">
        <div class="container">
            <h1 style="text-align: center;">选择你的项目申请</h1>
            <button class="btn" @click="gotoCX"><p class="text">创新设计申请</p> </button>
            <button class="btn" @click="gotoSQ"><p class="text">项目实训申请</p></button>
        </div>
    </main>
</template>

<script>
export default {
    methods: {
        gotoCX(){
            this.$router.push('project/chuangxin')
        },
        gotoSQ(){
            this.$router.push('project/shuqi')
        }
    },
}
</script>

<style>
.main {
    display:flex;
    justify-content: center;
    align-items: center;
    width:80vw;
    height:70vh;
}

.container {
    width:300px;
}
.text{
    font-size: 30px;
}

.btn{
    display: block;
    width: 100%;
    height: 100px;
    border-radius: 25px;
    margin: 3rem 0;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);
    /* background-image: linear-gradient(to right, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%); */
    /* background-image: linear-gradient(to right,#32be8f,#38d39f,#32be8f); */
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