<template>
    <div class="Container" >
      <h1>快速审批项目</h1>
      <div class="MForm">
  
        <div class="EAManage">
          <!-- 表格内容 -->
          <Table stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
                <Button type="warning" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
          </Table>
          <!-- 用于更新和增加教师项目的表单 -->
          <Modal v-model="Modal" width="600" :closable="false" :mask-closable="false" >
            <p slot="header" >
              <span>{{ mode }}</span>
            </p>
            <Form v-if="Modal" ref="TPForm" :model="formItem" :label-width="100" :rules="ruleInline" >
              <FormItem label="项目名称" prop="projectName">
                  <Input v-model="formItem.projectName" placeholder="请输入教务名称"></Input>
              </FormItem>
  
              <FormItem label="项目状态" prop="projectStatus">
                <Select v-model="formItem.projectStatus" placeholder="请选择项目状态">
                    <Option value="待审核">待审核</Option>
                    <Option value="通过">通过</Option>
                    <Option value="需答辩">需答辩</Option>
                    <Option value="不通过">不通过</Option>
                </Select>
              </FormItem>
              <FormItem label="最大人数" prop="projectMaxNum">
                  <Input v-model="formItem.projectMaxNum" placeholder="请输入项目允许的最大人数"></Input>
              </FormItem>
              <FormItem label="项目介绍" prop="projectIntroduction">
                <Input v-model="formItem.projectIntroduction" type="textarea" :rows="6" placeholder="请简洁地输入项目简介" />
              </FormItem>
              <FormItem label="助教姓名" prop="projectHelper">
                  <Input v-model="formItem.projectHelper" placeholder="请输入助教姓名"></Input>
              </FormItem>
              <FormItem label="助教电话" prop="projectHelperTel">
                  <Input v-model="formItem.projectHelperTel" placeholder="请输入助教电话"></Input>
              </FormItem>
              <FormItem label="阶段区间" prop="projectIntervalDay">
                <Input v-model="formItem.projectIntervalDay" placeholder="请输入项目允许的最大人数"></Input>
              </FormItem>
              <FormItem label="项目类型" prop="projectApplicantType">
                <Input v-model="formItem.projectApplicantType" placeholder="请输入项目类型"></Input>
              </FormItem>
  
              <FormItem label="指导教师" prop="teacherId">
                  <Select v-model="formItem.teacherId" placeholder="请选择指导教师"> 
                      <Option v-for="(item,i) in teacher" :value="teacher[i].teacherId" :key="i">{{teacher[i].teacherName}}</Option>
                  </Select>
              </FormItem>
  
          </Form>
  
            <div slot="footer">
              <Button class="button" icon="md-refresh" @click="handleReset('TPForm')" style="margin-left: 8px">重置</Button>
              <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
              <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading" @click="addOk('TPForm')">提交</Button>
            </div>
          </Modal>
          <Modal v-model="noticeModal"  title="当前实训公告管理" width="1200" :styles="{top: '0px'}">
            <Notice></Notice>
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
  import Notice from "@/components/EA/EANoticeManage";
  export default {
      inject:['reload'],
      components:{Notice},
      data(){
        return {
          loading:false,//表单的loadiing状态
          Modal:false,
          Modal1:false,
          noticeModal:false,
          correctMes:'',
          mode:'',
          total: null,
          data: [],
          teacher:{},//所有老师，供选择
          trainingId:'',//记录当前的trainingid，在填表时自动填写
          header: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
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
          formItem: { projectStatus:'需答辩'},
          formItem1: { projectStatus:'不通过'},
          formItem2: { projectStatus:'通过'},
        }
      },
      created(){
        const _this = this;
        axios.get(url+'NoAudit/1').then(function (resp){
          // console.log(resp);
          _this.data = resp.data.data.content;
          _this.total = resp.data.data.totalElements; 
        })
        axios.get(GLOBAL.apiURL+'teacher/All/').then(res=>{
          console.log(res);
          this.teacher = res.data.data;
          console.log(this.teacher)
        })
      },
      methods: {
          handleClearCurrentRow () {
              this.$refs.currentRowTable.clearCurrentRow();
          },
          handleReset (name) {
                  this.$refs[name].resetFields();
          },
          backTo(){
                  this.$router.go(-1);//返回上一层
          },
          show (index) {
              this.$Modal.info({
                title: '项目信息',
                  content: `项目编号：${this.data[index].projectId}<br>项目名称：${this.data[index].projectName}<br>项目最大人数：${this.data[index].projectMaxNum}<br>项目类型：${this.data[index].projectApplicantType}
                  <br>项目状态：${this.data[index].projectStatus}<br>项目介绍：${this.data[index].projectIntroduction}<br>项目助教：${this.data[index].projectHelper}<br>助教电话：${this.data[index].projectHelperTel}<br>阶段性报告提交阶段时间间隔：${this.data[index].projectIntervalDay}天
                  <br>教师号：${this.data[index].teacherId}<br>所属实训：${this.data[index].trainingId}`
              })
          },
          pass(index){
            axios.put(url+'jiaowu')
          }
          edit(index){
            this.mode = 'update';
            this.correctMes = '更新成功！';
            this.Modal = true
            this.formItem={...this.data[index]}
          },
          create(){
            this.mode = 'create';
            this.correctMes = '新增成功！';
            this.Modal = true
            this.formItem={ ...this.formItem1}
            this.formItem.trainingId=this.$route.params.training_id
            this.formItem.projectStatus="通过"
            console.log(this.formItem)
          },
          addOk(name){
            console.log(this.formItem.grade)
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.loading = true;
                if(this.mode=='create'){
                  setTimeout(() => {
                    axios.post(url+'jiaowuAdd',this.formItem)
                    .then(res=>{
                      console.log(res);
                      if(res.data.success)
                      {
                        this.$Message.success(this.correctMes);
                        this.loading = false;//停止加载
                        this.Modal = false;//关闭对话框组件
                        this.Modal = true;
                        this.reload();//刷新页面
                      }
                      else{
                        this.loading = false;
                        this.$Message.error('提交失败');
                      }
                    })
                  },1000)
                }
                else{
                  setTimeout(() => {
                    axios.put(url+'jiaowu',this.formItem)
                    .then(res=>{
                      console.log(res);
                      if(res.data.success)
                      {
                        this.$Message.success(this.correctMes);
                        this.loading = false;//停止加载
                        this.Modal = false;//关闭对话框组件
                        this.Modal = true;
                        this.reload();//刷新页面
                      }
                      else{
                        this.loading = false;
                        this.$Message.error('更新失败');
                      }
                    })
                    // this.loading=false
                  },1000)
                }
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
              axios.get(url+'NoAduit/'+currentPage).then(function (resp){
                console.log(resp);
                _this.data = resp.data.data.content;
                _this.total = resp.data.data.totalElements; 
              })
          }
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