<template>
    <div class="Container" >
        <h1>创新设计申请表单</h1>
  
        <Button class="button" style="display: block;" @click="backTo" icon="ios-arrow-back">返回</Button>
        <div class="form">
  
            <Form ref="Form" :model="formItem" :label-width="100" :rules="ruleInline" >
                <FormItem label="项目名称" prop="projectName">
                    <Input v-model="formItem.projectName" placeholder="请输入项目名称"></Input>
                </FormItem>
  
                <FormItem label="项目人数" prop="projectMaxNum">
                    <Input v-model="formItem.projectMaxNum" placeholder="请输入项目人数"></Input>
                </FormItem>

                <FormItem label="项目介绍" prop="projectIntroduction">
                    <Upload multiple type="drag" action="http://192.168.1.102:8181/studentreport/123/1" with-credentials='true' v-model="formItem.projectIntroduction">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或拖拽项目申请书上传</p>
                        </div>
                    </Upload>
                </FormItem>

                <FormItem label="指导教师" prop="teacherId">
                    <Select v-model="formItem.teacherId" placeholder="请选择指导教师"> 
                        <Option v-for="(item,i) in teacher" :value="teacher[i].teacherId" :key="i">{{teacher[i].teacherName}}</Option>
                    </Select>
                  </FormItem>

                <FormItem label="所属实训">
                  <Select v-model="formItem.trainingId" placeholder="请选择教师所处实训">
                    <Option v-for="(item,i) in training" :value="training[i].trainingId" :key="i">{{training[i].trainingName}}</Option>
                  </Select>
                </FormItem>
                <FormItem>
                    <Button icon="md-refresh" class="button" @click="handleReset('Form')" >重置内容</Button>
                    <Button type="primary" class="button" icon="md-cloud-upload"  @click="handleSubmit('Form')">提交</Button>
                </FormItem>
                
            </Form>
        </div>
        <div class="form">
            <Form ref="formDynamic" :model="formDynamic" :label-width="100" >
                <FormItem
                        v-for="(item, index) in formDynamic.items"
                        v-if="item.status"
                        :key="index"
                        :label="'小组成员' + item.index"
                        :prop="'items.' + index + '.value'"
                        :rules="{required: true, message: '小组成员 ' + item.index +' 学号禁止为空', trigger: 'blur'}">
                    <Row>
                        <Col span="18">
                            <Input type="text" v-model="item.value" placeholder="请输入成员学号"></Input>
                        </Col>
                        <Col span="4" offset="1">
                            <Button @click="handleRemove(index)">Delete</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
                        </Col>
                    </Row>
                </FormItem>
 
            </Form>
        </div>
        
    </div>
  </template>
  
  <script>
    import GLOBAL from '@/api/global_variable'
    const url = GLOBAL.apiURL+'project/'
    export default {
        created() {
            axios.get(GLOBAL.apiURL+'teacher/CanChoose').then(res=>{
                console.log(res);
                this.teacher = res.data.data;
                console.log(this.teacher)
            })
            console.log(Cookies.get('ptms_aram_token'))
        },
        data () {
            return {
                ptms_aram_token:'',
                training:{},
                teacher:{},
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ]
                },
                formItem: { projectName:'',projectStatus: '',projectMaxNum:6,projectHelper: '',projectHelperTel: '', projectIntervalDay: 3,projectIntroduction:'', teacherId: '',trainingId:''},
                formItem1: { projectName:'',projectStatus: '',projectMaxNum:6,projectHelper: '',projectHelperTel: '', projectIntervalDay: 3,projectIntroduction:'', teacherId: '',trainingId:''},
                ruleInline: {
                    projectName: [
                        { required: true, message: '项目名称禁止为空', trigger: 'blur' }
                    ],
                    projectStatus: [
                        { required: true, message: '当前状态禁止为空', trigger: 'blur' }
                    ],
                    projectMaxNum: [
                        { required: true, type:'number',message: '最大人数禁止为空', trigger: 'blur' }
                    ],
                    projectHelper: [
                        { required: false,message: '', trigger: 'blur' }
                    ],
                    projectHelperTel: [
                        { required: false, message: '', trigger: 'blur' }
                    ],
                    projectIntervalDay: [
                        { required: true, type:'number',message: '阶段性报告间隔禁止为空', trigger: 'blur' }
                    ],
                    projectIntroduction: [
                        { required: true, message: '项目介绍禁止为空', trigger: 'blur' }
                    ],
                    projectApplicantType: [
                        { required: true, message: '项目类型禁止为空', trigger: 'blur' }
                    ],                    
                    teacherId: [
                        { required: true,message: '指导教师禁止为空', trigger: 'blur'  }
                    ],
                },
            };
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
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            },
            backTo(){
                this.$router.go(-1);//返回上一层
            },
            test(){
                console.log(this.formItem);
            },
        },
        handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
  
    }
  </script>
  
  <style scpoed>
  .Container{
    padding: 10px;
  }
  .form{
      width:500px;
      margin: 20px 20px 0 0;
      float:left;
  }
  .button{
      margin: 20px 0 10px 20px;
  }
  </style>