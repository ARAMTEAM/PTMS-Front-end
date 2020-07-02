<template>
    <div>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
            <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
            <link rel="stylesheet" href="css/style.css">
            <title>Login</title>
        </head>
        <body>
            <img src="../assets/img/bg.png" alt="" class="wave">
            <div class="container" @keyup.enter="handleSubmit('formInline')">
                <div class="img">
                    <img src="../assets/img/img.svg" alt="">
                </div>
                <div class="login-box">
                    <div >
                        <img src="../assets/img/avatar.png" alt="" class="avatar">
                        <h1>PTMS{{role}}登录页面</h1>
                        <br/>
                        <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline" inline>
                            <FormItem prop="adminId">
                                <div style="margin: 0px 0 25px 0;">
                                    <Input v-model="formInline.adminId" prefix="ios-contact" placeholder="输入账号" size="large" style="width: 280px;" />
                                </div>
                            </FormItem>
                            <br/>
                            <FormItem prop="adminPassword">
                                <div style="margin: 0px 0 25px 0;">
                                    <Input v-model="formInline.adminPassword" prefix="ios-lock" placeholder="输入密码" type="password" size="large" style="width: 280px;" />
                                </div>
                            </FormItem>
                            <br/>
                        </Form>
                        <!-- <Input prefix="ios-contact" placeholder="输入账号" size="large" style="width: 280px;margin: 0px 0 25px 0;" />
                        <br/>
                        <Input prefix="ios-lock" placeholder="输入密码" type="password" size="large" style="width: 280px;margin: 0px 0 25px 0;" /> -->

                        <a href="">忘记密码</a>
                        <button class="btn" @click="handleSubmit('formInline')">{{status}}</button>
                    </div>
                </div>
            </div>
            <a href="#" target="_blank" class="copyright">&copy; SDU ARAM</a>
        </body>
    </div>
    
</template>
<script>
    import GLOBAL from '@/api/global_variable'
    
    export default {
        data () {
            return {
                url:"",
                status:'登录',
                role:'',
                id:'',
                password:'',
                jumpURL:'',
                post:{},
                formInline: {
                    adminId: '',
                    adminPassword: ''
                },
                ruleInline: {
                    adminId: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    adminPassword: [
                        { required: true, message: '请填入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            console.log(this.$route.params.login)
            if(this.$route.params.login=='login_admin')
            {
                this.url = GLOBAL.apiURL+'admin'
                this.role = '管理员'
                this.jumpURL = '/admin/home'
            }   else if(this.$route.params.login=='login_jiaowu'){
                this.url = GLOBAL.apiURL+'jiaowu/login'
                this.role = '教务'
                this.jumpURL = '/ea/home'
            }   else if(this.$route.params.login=='login_teacher'){
                this.url = GLOBAL.apiURL+'teacher/login'
                this.role = '教师'
                this.jumpURL = '/teacher/home'
            }   else if(this.$route.params.login=='login_student'){
                this.url = GLOBAL.apiURL+'student/login'
                this.role = '学生'
                this.jumpURL = '/student/home'
            }
            else{this.$router.push('/')}
            console.log(this.$route.params.login)
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.status = "登录中..."
                        if(this.$route.params.login=='login_admin'){
                            this.post={adminId:this.formInline.adminId,adminPassword:this.formInline.adminPassword}
                        }else if(this.$route.params.login=='login_jiaowu'){
                            this.post={jiaowuId:this.formInline.adminId,jiaowuPassword:this.formInline.adminPassword}
                        }else if(this.$route.params.login=='login_teacher'){
                            this.post={teacherId:this.formInline.adminId,teacherPassword:this.formInline.adminPassword}
                        }else if(this.$route.params.login=='login_student'){
                            this.post={studentId:this.formInline.adminId,studentPassword:this.formInline.adminPassword}
                        }
                        console.log(this.post)
                        axios.post(this.url, this.post)
                        .then(res => {
                            if(res.data.success)
                            {
                                document.cookie="id="+this.formInline.adminId
                                this.status = "登录"
                                this.$router.push(this.jumpURL);
                                this.$Message.success('登陆成功');
                            }
                            else{
                                this.status = "登录"
                                this.$Message.error('登录失败，请检查账号与密码');
                            }
                        })
                    } else {
                        this.$Message.error('账号密码填写有误');
                    }
                })
            }
        }
    }
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    font-family: 'Roboto', sans-serif;
}
.wave{
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
}
.container{
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 18rem;
    padding: 0 2rem;
}
.img{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.img img{
    width: 500px;
}

.login-box{
    display: flex;
    align-items: center;
    text-align: center;
}
form{
    width:290px;
    /* border:2px solid  #555; */
}
.avatar{
    width: 100px;
}
form h2{
    font-size: 2.9rem;
    text-transform: uppercase;
    margin: 15px 0;
    color: #999;
}

.input-group{
    position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
}

.input-group:nth-child(1){
    margin-bottom: 4px;
}
.input-group:before,.input-group:after{
    content: '';
    position: absolute;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #38d39f;
    transition: .5s;
}
.input-group:after{
    right: 50%;
}
.input-group:before{
    left: 50%;
}
.icon{
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon i{
    color: #d9d9d9;
    transition: .5s;
}

.input-group > div{
    position: relative;
    height: 45px;
}

.input-group >div > h5{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #d9d9d9;
    font-size: 18px;
    transition: .3s;
}
.input-group.focus .icon i{
    color: #38d39f;
}
.input-group.focus div h5{
    top: -5px;
    font-size: 15px;
}
.input-group.focus:after,.input-group.focus:before{
    width: 50%;
}
.input{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
    font-family: 'Roboto', sans-serif;
}
a{
    display: block;
    text-align: right;
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    transition: .3s;
}
a:hover{
    color: #38d39f;
}
.btn{
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    margin: 1rem 0;
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
.copyright{
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 2px;
    color: #38d39f;
    text-align: center;
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
}

/*媒体查询*/
@media screen and (max-width: 1080px) {
    .container{
        grid-gap: 9rem;
    }
}
@media screen and (max-width: 1024px) {
    form{
        width: 290px;
    }
    form h2{
        font-size: 2.4rem;
        margin: 8px 0;
    }
    .img img{
        width: 360px;
    }
}
@media screen and (max-width: 768px) {
    .wave{
        display: none;
    }
    .img{
        display: none;
    }
    .container{
        grid-template-columns: 1fr;
    }
    .login-box{
        justify-content: center;
    }
}
</style>