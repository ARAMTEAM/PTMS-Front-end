<template>
    <div class="Container" >
        <h1>新增教务</h1>

        <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button>
        <div class="form">

            <Form ref="eaForm" :model="formItem" :label-width="100" :rules="ruleInline" >
                <FormItem label="教务名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入教务名称"></Input>
                </FormItem>
                <FormItem label="教务账号" prop="username">
                    <Input v-model="formItem.username" placeholder="请输入教务号"></Input>
                </FormItem>
                
                <FormItem label="教务密码" prop="passwd">
                    <Input type="password" password v-model="formItem.passwd" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="再次确认" prop="passwdCheck" >
                    <Input type="password" password v-model="formItem.passwdCheck" placeholder="请再次输入密码"></Input>
                </FormItem>

                <FormItem label="所属学院">
                    <Select v-model="formItem.dept">
                        <Option value="微电子学院">微电子学院</Option>
                        <Option value="软件学院">软件学院</Option>
                    </Select>
                </FormItem>

                <FormItem label="教务年级">
                    <RadioGroup v-model="formItem.grade">
                        <Radio :label="CurrentYear"></Radio>
                        <Radio :label="CurrentYear-1"></Radio>
                        <Radio :label="CurrentYear-2"></Radio>
                        <Radio :label="CurrentYear-3"></Radio>
                        <Radio :label="CurrentYear-4"></Radio>
                    </RadioGroup>
                </FormItem>

                <Button type="primary" class="button" icon="md-cloud-upload"  @click="handleSubmit('eaForm')">提交</Button>
                <Button type="primary" class="button" icon="md-cloud-upload" @click="test">test</Button>

            </Form>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码禁止为空！'));
                } else {
                    if (this.formItem.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formItem.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入你的密码'));
                } else if (value !== this.formItem.passwd) {
                    callback(new Error('两次密码输入不匹配'));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Age cannot be empty'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('Please enter a numeric value'));
                    } else {
                        if (value < 18) {
                            callback(new Error('Must be over 18 years of age'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };


            return {
                
                formItem: {
                    name:'',
                    username: '',
                    passwd:'',
                    passwdCheck:'',
                    dept: '',
                    grade: '', 
                },
                ruleInline: {
                    name: [
                        { required: true, message: '教务用户名禁止为空', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '教务账号禁止为空', trigger: 'blur' }
                    ],
                    passwd: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true,validator: validatePassCheck, trigger: 'blur' }
                    ],
                    dept: [
                        { required: false,message: '教务账号禁止为空', trigger: 'blur' }
                    ],
                    grade: [
                        { required: false,message: '教务账号禁止为空', trigger: 'blur'  }
                    ],
                },
                CurrentYear:0,
            }
        },
        methods:{
            handleSubmit(name) {
                // this.$refs[name].validate((valid) => {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        console.log("success")
                    } else {
                        this.$Message.error('Fail!');
                        console.log("Fail")

                    }
                })
            },
            backTo(){
                this.$router.go(-1);//返回上一层
            },
            test(){
                console.log(this.formItem);
            },
        },
        created(){
            let date = new Date();
            this.CurrentYear = date.getFullYear();
            // console.log(this)
        },

    }
</script>

<style>
  .Container{
    padding: 10px;
  }
  .form{
      width:700px;
      margin: 20px 0px;
  }
  .button{
      margin: 20px 0 10px 20px;
  }
</style>