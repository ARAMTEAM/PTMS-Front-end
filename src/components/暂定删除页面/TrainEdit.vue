<template>
    <div class="Container" >
        <h1>新增实训</h1>

        <!-- <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button> -->
        <div class="form">

        <Form ref="trainForm" :model="formItem" :label-width="200" :rules="ruleInline">
            <FormItem label="实训名称" prop="name">
                <Input v-model="formItem.name" placeholder="请输入教务名称"></Input>
            </FormItem>
            <FormItem label="课程号" prop="kch">
                <Input v-model="formItem.kch" placeholder="请输入课程号"></Input>
            </FormItem>
            <FormItem label="课序号" prop="kxh">
                <Input v-model="formItem.kxh" placeholder="请输入课序号"></Input>
            </FormItem>

            <Row>
                <Form-item label="创新实训开始申请时间" prop="date1">
                    <Date-picker type="date" placeholder="申请创新实训开始时间" :value.sync="formItem.date1"></Date-picker>
                </Form-item>
                <Form-item label="创新实训申请结束" prop="date2">
                    <Date-picker type="date" placeholder="结束申请创新实训时间" :value.sync="formItem.date2"></Date-picker>
                </Form-item>
                <Form-item label="创新实训结束" prop="date3">
                    <Date-picker type="date" placeholder="选择创新实训结束时间" :value.sync="formItem.date3"></Date-picker>
                </Form-item>
            </Row>
            
            <Form-item label="项目实训志愿填报时间" prop="date4">
                <Date-picker type="date" placeholder="学生填报志愿时间" :value.sync="formItem.date4"></Date-picker>
            </Form-item>
            <Form-item label="项目实训志愿填报截止" prop="date5">
                <Date-picker type="date" placeholder="学生志愿填报截止" :value.sync="formItem.date5"></Date-picker>
            </Form-item>
            <Form-item label="项目实训结束" prop="date6">
                <Date-picker type="date" placeholder="请选择备份时间段" :value.sync="formItem.date6"></Date-picker>
            </Form-item>

            </FormItem>

            <div style="margin:0 85px">
                <Button type="primary" class="button" icon="md-cloud-upload"  @click="handleSubmit('trainForm')">提交</Button>
                <Button class="button" icon="md-refresh" @click="handleReset('trainForm')" style="margin-left: 8px">重置</Button>
            </div>
            

        </Form>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                formItem: {
                    name:'',
                    kch: '',
                    kxh:'',
                    date1: '',
                    date2: '',
                    date3: '', 
                    date4: '', 
                    date5: '', 
                    date6: '', 
                },
                ruleInline: {
                    name: [
                        { required: true, message: '教务用户名禁止为空', trigger: 'blur' }
                    ],
                    kch: [
                        { required: true, message: '教务账号禁止为空', trigger: 'blur' }
                    ],
                    kxh: [
                        { required: true, message: '教务账号禁止为空', trigger: 'blur' }
                    ],
                    date1: [
                        { required: true, message: '禁止为空', trigger: 'blur' }
                    ],
                    date2: [
                        { required: true, message: '禁止为空', trigger: 'blur' }
                    ],
                    date3: [
                        { required: true, message: '禁止为空', trigger: 'blur' }
                    ],
                    date4: [
                        { required: true, message: '禁止为空', trigger: 'blur' }
                    ],
                    date5: [
                        { required: true, message: '禁止为空', trigger: 'blur' }
                    ],
                    date6: [
                        { required: true, message: '禁止为空', trigger: 'blur' }
                    ],
                },
            }
        },
        methods:{
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }

    }
</script>

<style>
  .Container{
    padding: 10px;
  }
  .form{
      width:600px;
      margin: 20px 0px;
  }
  .button{
      margin: 20px 20px 10px 0px;
  }
</style>