<template>
  <div class="Container" >
    <h1>教师项目申请</h1>
    <div class="MForm">
        <!-- 按钮以及检索 -->
      <!-- <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button> -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">项目申请</Button>
      <!-- <Button @click="noticeModal = true" class="button" icon="md-book">公告管理</Button> -->
<!-- <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button> -->
      <!-- <Input search enter-button style="width:30%;float:right;" placeholder="检索项目" /> -->
      <br><br>

      <div class="EAManage">
        <!-- 表格内容 -->
        <Table stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <Button type="error" size="small" style="margin-right: 5px" @click="remove(index)">删除</Button>
              <Button type="warning" size="small" :style="panduan(index)" style="margin-right: 5px" @click="edit(index)">重新编辑</Button>

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

        </Form>

          <div slot="footer">
            <Button class="button" icon="md-refresh" @click="handleReset('TPForm')" style="margin-left: 8px">重置</Button>
            <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
            <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading" @click="addOk('TPForm')">提交</Button>
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
        loading:false,//表单的loadiing状态
        Modal:false,
        Modal1:false,
        noticeModal:false,
        correctMes:'',
        mode:'',
        total: null,
        data: [],
        Info:{},//当前角色的信息，这也就是教师的基本信息
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
        formItem: { projectName:'',projectStatus: '',projectMaxNum:6,projectHelper: '',projectHelperTel: '', projectIntervalDay: 3,projectIntroduction:'', projectApplicantType:'教师',teacherId: ''},
        formItem1: { projectName:'',projectStatus: '',projectMaxNum:6,projectHelper: '',projectHelperTel: '', projectIntervalDay: 3,projectIntroduction:'', projectApplicantType:'教师',teacherId: ''},
        ruleInline: {
          projectName: [
              { required: true, message: '项目名称禁止为空', trigger: 'blur' }
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
      }
    },
    created(){
      const _this = this;
      axios.get(GLOBAL.apiURL+'teacher/One/'+this.$options.methods.getCookie('id'))
      .then(res=>{
        this.Info=res.data.data
          axios.get(url+'teacher/all/'+this.Info.teacherId+'/1').then(function (resp){
          console.log(resp);
          _this.data = resp.data.data.content;
          _this.total = resp.data.data.totalElements; 
        })
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
        panduan(index){
          var result = (this.data[index].projectStatus==('待审核'||'未通过')) ? 'visibility:visible' : 'visibility:hidden'
          return result
        },
        show (index) {
            this.$Modal.info({
              title: '项目信息',
                content: `项目编号：${this.data[index].projectId}<br>项目名称：${this.data[index].projectName}<br>项目最大人数：${this.data[index].projectMaxNum}<br>项目类型：${this.data[index].projectApplicantType}
                <br>项目状态：${this.data[index].projectStatus}<br>项目介绍：${this.data[index].projectIntroduction}<br>项目助教：${this.data[index].projectHelper}<br>助教电话：${this.data[index].projectHelperTel}<br>阶段性报告提交阶段时间间隔：${this.data[index].projectIntervalDay}天
                <br>指导教师：${this.data[index].teacherName}<br>所属实训：${this.data[index].trainingId}`
            })
        },
        remove (index) {
          var result = confirm("您确认删除吗？")
          if(result){
            axios.delete(url+this.data[index].projectId)
            .then(res=>{
            if(res.data.success){
              this.$Message.success('删除数据成功');
              this.reload();//刷新页面
            }else{
              this.$Message.error('删除数据失败');
              this.reload();//刷新页面
            }
          })
          }
        },
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
          this.formItem.teacherId=this.Info.teacherId
          this.formItem.trainingId=this.Info.trainingId
          console.log(this.formItem)
        },
        addOk(name){
          console.log(this.formItem.grade)
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.loading = true;
              if(this.mode=='create'){
                setTimeout(() => {
                  axios.post(url+'teacherAdd',this.formItem)
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
                      this.$Message.error(res.data.message);
                    }
                  })
                },1000)
              }
              else{
                setTimeout(() => {
                  axios.put(url+'teacher',this.formItem)
                  .then(res=>{
                    console.log(res);
                    if(res.data.success)
                    {
                      this.$Message.success(res.data.message);
                      this.loading = false;//停止加载
                      this.Modal = false;//关闭对话框组件
                      this.Modal = true;
                      this.reload();//刷新页面
                    }
                    else{
                      this.loading = false;
                      this.$message.error(res.data.message);
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
            axios.get(url+'teacher/all/'+this.Info.teacherId+'/'+currentPage).then(function (resp){
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