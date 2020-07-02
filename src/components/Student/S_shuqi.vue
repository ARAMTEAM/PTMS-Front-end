<template>
    <div class="Container" >
      <h1>暑期实训志愿填报</h1>
      <div class="MForm">
        <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button>
        <Button @click="except" type='warning' class="button" icon="md-book">志愿填报</Button>
        <br><br>
        <div class="EAManage">
          <!-- 表格内容 -->
          <Table :loading='tableloading' stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="success" size="small" style="margin-right: 5px" @click="enter(index)">进入项目</Button>
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
            </template>
          </Table>
          <Modal v-model="Modal" width="600" :closable="false"  >
            <p slot="header" >
              <span>请填报志愿：请注意志愿只能填报一次</span>
            </p>
            <Form  ref="Form" :model="formItem" :label-width="100" :rules="ruleInline">
              <FormItem label="志愿1" prop="expectation1">
                  <Input v-model="formItem.expectation1" number  placeholder="请输入第一志愿"></Input>
              </FormItem>
              <FormItem label="志愿2" prop="expectation2">
                  <Input v-model="formItem.expectation2" number placeholder="请输入第二志愿"></Input>
              </FormItem>
              <FormItem label="志愿3" prop="expectation3">
                  <Input v-model="formItem.expectation3" number placeholder="请输入第三志愿"></Input>
              </FormItem>
              <FormItem label="志愿4" prop="expectation4">
                  <Input v-model="formItem.expectation4" number placeholder="请输入第四志愿"></Input>
              </FormItem>
              <FormItem label="志愿5" prop="expectation5">
                  <Input v-model="formItem.expectation5" number placeholder="请输入第五志愿"></Input>
              </FormItem>
            </Form>
  
            <div slot="footer">
              <Button class="button" icon="md-refresh" @click="handleReset('Form')" style="margin-left: 8px">重置</Button>
              <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
              <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading" @click="addOk('Form')">提交</Button>
            </div>
          </Modal>
        </div>

  
        <br/>
        <!-- 分页 -->
        <div class="page">
          <Page :total=total :page-size="10" show-total @on-change="page"/> 
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  import GLOBAL from '@/api/global_variable'
  const url = GLOBAL.apiURL+'project/';
  export default {
      inject:['reload'],
      data(){
        return {
          total: null,
          data: [],
          loading:false,//表单的loadiing状态
          tableloading:true,
          Modal:false,
          Info:{},//当前角色的信息，这也就是教师的基本信息
          header: [

            {
                title: '项目编号',
                width: 100, 
                key: 'projectId',
                align: 'center'
            },
            {
                title: '项目名称',
                key: 'projectName',
                align: 'center'
            },
            {
                title: '项目最大人数',
                key: 'projectMaxNum',
                align: 'center'
  
            },
            {
                title: '项目类型',
                key: 'projectApplicantType',
                align: 'center'
            },
            {
                title: '项目当前状态',
                key: 'projectStatus',
                align: 'center'
            },
            {
                title: '操作',
                slot: 'action',
                width: 300,
                align: 'center'
            }
            ],
            formItem: {expectation1:null,expectation2:null,expectation3:null,expectation4:null,expectation5:null,studentId:null,},
            ruleInline: {
                expectation1: [
                    { required: true,type: 'number',  message: '志愿一禁止为空', trigger: 'blur' }
                ],
                expectation2: [
                    { required: true,type: 'number',  message: '志愿二禁止为空', trigger: 'blur' }
                ],
                expectation3: [
                    { required: true,type: 'number',  message: '志愿三禁止为空', trigger: 'blur' }
                ],
                expectation4: [
                    { required: true,type: 'number',  message: '志愿四禁止为空', trigger: 'blur' }
                ],
                expectation5: [
                    { required: true,type: 'number',  message: '志愿五禁止为空', trigger: 'blur' }
                ],
            },
        }
        },
        created(){
            axios.get(GLOBAL.apiURL+'student/One/'+this.$options.methods.getCookie('id'))
            .then(res=>{
                this.Info=res.data.data
                const _this = this;

                axios.get(GLOBAL.apiURL+'project/teacher/'+this.Info.trainingId+'/1')
                .then(function (resp){
                    _this.data = resp.data.data.content;
                    _this.total = resp.data.data.totalElements; 
                    _this.tableloading=false
                })
            })

        },
        methods: {
            enter(index){
                this.$router.push('project/'+this.data[index].projectId)
            },
            backTo(){
              this.$router.go(-1);//返回上一层
            },
            show (index) {
                this.$Modal.info({
                    title: '项目信息',
                    content: `项目编号：${this.data[index].projectId}<br>项目名称：${this.data[index].projectName}<br>项目最大人数：${this.data[index].projectMaxNum}<br>项目类型：${this.data[index].projectApplicantType}
                    <br>项目状态：${this.data[index].projectStatus}<br>项目介绍：${this.data[index].projectIntroduction}<br>项目助教：${this.data[index].projectHelper}<br>助教电话：${this.data[index].projectHelperTel}<br>阶段性报告提交阶段时间间隔：${this.data[index].projectIntervalDay}天
                    <br>指导教师：${this.data[index].teacherName}<br>所属实训：${this.data[index].trainingId}`
                })
            },
            except() {
                this.Modal = true
                this.formItem.studentId=this.Info.studentId
            },
            addOk(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                this.loading = true;
                    setTimeout(() => {
                    axios.post(GLOBAL.apiURL+'expectation',this.formItem)
                    .then(res=>{
                        console.log(res);
                        if(res.data.success)
                        {
                        this.$Message.success(res.data.message);
                        this.loading = false;//停止加载
                        this.Modal = false;//关闭对话框组件
                        this.reload();//刷新页面
                        }
                        else{
                        this.loading = false;
                        this.$Message.error(res.data.message);
                        }
                    })
                    },1000)
                } else {
                this.loading=false;
                this.$Message.error('请完善后再提交');
                }
            })
        },
        addCancel(){
          this.loading=false;
          this.Modal = false
        },
          page(currentPage) {
              const _this = this
              axios.get(GLOBAL.apiURL+'project/teacher/'+this.Info.trainingId+'/'+currentPage).then(function (resp){
                console.log(resp);
                _this.data = resp.data.data.content;
                _this.total = resp.data.data.totalElements; 
              })
            },
            getCookie(cname)        
            {        
            var name = cname + "=";        
            var ca = document.cookie.split(';');        
            for(var i=0; i<ca.length; i++)        
                {        
                var c = ca[i].trim();        
                if (c.indexOf(name)==0) return c.substring(name.length,c.length);        
                }        
            return "";        
            },
        },
  }
  </script>
  
  <style scoped>
    .button{
      margin:0 10px 0 0;
    }
    .Container{
      padding: 10px;
    }
    .MForm{
      padding: 20px 0;
      
    }
    .EAManage{
      margin: 10px 0;
      /* border: 1px ; */
      /* border-color: rgba(151, 151, 151, 1); */
    }
    .page{
        display:table;
        margin:0 auto;
    }
  
  </style>