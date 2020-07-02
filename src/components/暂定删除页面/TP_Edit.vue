<template>
    <div class="Container" >
        <h1>{{title}}</h1>
  
        <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button>
        <div class="form">
  
            <Form ref="teacherForm" :model="formItem" :label-width="100" :rules="ruleInline" >
                <FormItem label="项目名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入教务名称"></Input>
                </FormItem>
  
                <FormItem label="项目状态" prop="status">
                  <Select v-model="formItem.status" placeholder="请选择项目状态">
                      <Option value="待审核">待审核</Option>
                      <Option value="通过">通过</Option>
                      <Option value="未通过">未通过</Option>
                  </Select>
                </FormItem>
                <FormItem label="最大人数" prop="max_num">
                    <Input v-model="formItem.max_num" placeholder="请输入项目允许的最大人数"></Input>
                </FormItem>
                <FormItem label="所属学院" prop="dept">
                  <Select v-model="formItem.dept" placeholder="请选择教师所属学院"> 
                      <Option value="微电子学院">微电子学院</Option>
                      <Option value="软件学院">软件学院</Option>
                  </Select>
                </FormItem>
  
                <FormItem label="教师电话" prop="telephone">
                  <Input v-model="formItem.telephone" placeholder="请输入教师电话"></Input>
                </FormItem>
                <FormItem label="教师邮箱" prop="email">
                  <Input v-model="formItem.email" placeholder="请输入教师邮箱"></Input>
                </FormItem>

                <FormItem label="指导教师" prop="teacher">
                    <Select v-model="formItem.teacher" placeholder="请选择指导教师"> 
                        <Option value="王老师">王老师</Option>
                        <Option value="秦老师">秦老师</Option>
                    </Select>
                  </FormItem>

                <FormItem label="所属实训">
                  <Select v-model="formItem.training_id" placeholder="请选择教师所处实训">
                    <!-- 利用v-for循环来显示当前的已经有的实训信息 -->
                      <Option value="微电子学院">微电子学院</Option>
                      <Option value="软件学院">软件学院</Option>
                  </Select>
                </FormItem>
  
                <Button type="primary" class="button" icon="md-cloud-upload"  @click="handleSubmit('teacherForm')">提交</Button>
                <Button class="button" icon="md-refresh" @click="handleReset('teacherForm')" style="margin-left: 8px">Reset</Button>
  
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
                title:'',
                formItem: {
                    name:'',
                    status: '',
                    max_num:'',
                    dept: '',
                    telephone: '', 
                    email: '', 
                    teacher: '', 
                    training: '', 
                },
                ruleInline: {
                    name: [
                        { required: true, message: '姓名禁止为空', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '当前状态禁止为空', trigger: 'blur' }
                    ],
                    max_num: [
                        { required: true, message: '最大人数禁止为空', trigger: 'blur' }
                    ],
                    dept: [
                        { required: false,message: '学院禁止为空', trigger: 'blur' }
                    ],
                    telephone: [
                        { required: true, message: '电话禁止为空', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮箱禁止为空', trigger: 'blur' }
                    ],
                    teacher: [
                        { required: true, message: '指导教师禁止为空', trigger: 'blur' }
                    ],                    
                    training: [
                        { required: false,message: '所处实训禁止为空', trigger: 'blur'  }
                    ],
                },
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
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            backTo(){
                this.$router.go(-1);//返回上一层
            },
            test(){
                console.log(this.formItem);
            },
        },
        created(){
            if(this.$route.params.project_id=='create')
            {
                this.formItem.status = '通过';
            }
            console.log(this.$route.params)
            this.title = (this.$route.params.project_id == 'create')? '新建项目':'更新项目'+this.$route.params.project_id
        },
  
    }
  </script>
  
  <style scpoed>
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