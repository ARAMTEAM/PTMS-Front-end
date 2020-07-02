<template>
    <div class="Container" >
        <h1>发布公告</h1>

        <div class="form">

        <Form ref="eaNotice" :model="formItem" :label-width="100" :rules="ruleInline">
            <FormItem label="面向实训" prop="trainingId">
                <Select v-model="formItem.trainingId">
                <!-- 利用v-for进行全部循环将所有的实训信息给循环一遍并赋予value和表现信息 -->
                    <Option value="微电子学院">微电子学院</Option>
                    <Option value="软件学院">软件学院</Option>
                </Select>
            </FormItem>
            <FormItem label="公告标题" prop="title">
                <Input v-model="formItem.title" placeholder="请尽量简洁地输入标题"/>
            </FormItem>
            
            <FormItem label="公告内容" prop="content">
                <Input v-model="formItem.content" type="textarea" :rows="8" placeholder="请输入对教务广播的公告内容" />
            </FormItem>


            <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" @click="handleSubmit('eaNotice')">提交</Button>

        </Form>
        </div>

    </div>
</template>

<script>

    export default {
        data () {
            return {
                formItem: {
                    trainingId: '',
                    title: '',
                    content:'',
                },
                ruleInline: {
                    trainingId: [
                        { required: true, message: '请选择面向的实训', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '标题禁止为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '公告内容禁止为空', trigger: 'blur' }
                    ],
                },
                editor: null,
                editorContent: '',
                props: ['catchData'], // 接收父组件的方法
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

        },
        created(){
            let date = new Date();
        },

        
    }
</script>

<style>
  .Container{
    padding: 10px;
  }
  .form{
      width:900px;
      margin: 20px 0px;
  }
  .ButtonCommit{
      margin: 10px 0 10px 100px;
  }
</style>