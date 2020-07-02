<template>
    <div class="Container" >
      <h1>已提交报告</h1>
      <div class="MForm">
          <!-- 按钮以及检索 -->
        <!-- <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button> -->
        <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">上传报告</Button>
        <Input search enter-button style="width:30%;float:right;" placeholder="检索项目" />
        <br><br>
  
        <div class="Manage">
          <!-- 表格内容 -->
          <Table :loading='tableloading' stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="data">
                <Button type="warning" size="default">{{data[index].studentreportDate|dataFormat}}</Button>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="download(index)">下载报告</Button>
                <Button type="error" size="small" @click="remove(index)">删除报告</Button>
            </template>
          </Table>
          <!-- 用于更新和增加教师项目的表单 -->
          <Modal v-model="Modal" width="600" :closable="false" :mask-closable="false" >
            <p slot="header" >
              <span>上传报告</span>
            </p>
            <Form v-if="Modal" ref="Form" :model="formItem" :label-width="100" :rules="ruleInline" >
              <FormItem label="报告名称" prop="studentreportTitle">
                  <Input v-model="formItem.studentreportTitle" placeholder="建议填写第几次提交"></Input>
              </FormItem>
              <FormItem label="报告名称" prop="studentreportType">
                <Select v-model="formItem.studentreportType" number placeholder="请选择报告类型">
                    <Option :value="report">进度报告</Option>
                    <Option :value="report2">总结报告</Option>
                </Select>
              </FormItem>

            <FormItem>
                <Button type="primary" class="ButtonCommit" icon="md-barcode" @click="confirm('Form')">验证信息后显示上传界面</Button>
            </FormItem>
            
          </Form>
          <div v-if="messageRule" label="上传文件">
            <Upload
                ref="upload"
                type="drag"
                :before-upload="handleUpload"
                :with-credentials="true"
                :format="['docx','doc', 'pdf']"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :max-size="10000"
                action="http://192.168.1.102:8181/studentreport/123/1">
                <!-- :action="uploadUrl"> -->
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或拖拽报告文件上传并满足以下要求</p>
                    <p>1.文件命名:"第x次报告.doc" | 2.大小<=10M | 3.文件类型为doc/docx/pdf
                        <br>4.文件一次只能上传一个，再上传一次即可覆盖</p>
                </div>
                <div v-if="file">预备上传文件：{{ file.name }}</div>
            </Upload>
        </div>
        
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
  const url = GLOBAL.apiURL+'studentreport/';
  import Notice from "@/components/EA/EANoticeManage";
  export default {
      inject:['reload'],
      components:{Notice},
      data(){
        return {
          loading:false,//表单的loadiing状态
          tableloading:true,
          Modal:false,
          Modal1:false,
          noticeModal:false,
          report:1,
          report2:2,
          correctMes:'',
          total: null,
          data: [],
          teacher:{},//所有老师，供选择
          trainingId:'',//记录当前的trainingid，在填表时自动填写
          file: null,
          uploadUrl:'',//文件上传的地址
          messageRule:'',//验证信息后方可显示上传界面
          header: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '报告名称',
                key: 'studentreportTitle',
                align: 'center'
            },
            {
                title: '报告类型',
                key: 'studentreportType',
                align: 'center'
            },
            {
                title: '报告状态',
                key: 'studentreportStatus',
                align: 'center'
            },
            {
                title: '上传时间',
                slot: 'data',
                width: 200,
                className: 'uploadTime',
                align: 'center',
            },
            {
                title: '操作',
                slot: 'action',
                width: 200,
                align: 'center'
            }
          ],
          formItem: { studentreportTitle:'',studentreportType: null,},
          formItem1: { studentreportTitle:'',studentreportType: null,},
          ruleInline: {
            studentreportTitle: [
                { required: true, message: '项目名称禁止为空', trigger: 'blur' }
            ],
            studentreportType: [
                { required: true, type:'number', message: '当前状态禁止为空', trigger: 'blur' }
            ],
          },
        }
      },
      created(){
        const _this = this;
        axios.get(url+'studentsee/1').then(function (resp){
          console.log(resp);
          _this.data = resp.data.data.content;
          _this.total = resp.data.data.totalElements; 
          _this.tableloading=false
        })
      },
      methods: {
          handleClearCurrentRow () {
              this.$refs.currentRowTable.clearCurrentRow();
          },
          handleReset (name) {
                  this.$refs[name].resetFields();
          },
          //阻止文件直接上传
          handleUpload (file) {
            this.file = file;
            return false;
          },
          //文件上传格式错误
          handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: '以下文件：<br>' + file.name + ' 文件格式出现错误<br>请检查是否是doc、docx、pdf'
                });
          },
          //文件上传大小超过
          handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件大小错误',
                    desc: '上传文件：<br>' + file.name + ' 过大，不得超过10M'
                });
          },
          backTo(){
                  this.$router.go(-1);//返回上一层
          },
          //进行验证并
          confirm (name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.messageRule=true
                    this.uploadUrl = url+this.formItem.studentreportTitle+'/'+this.formItem.studentreportType
                    this.$Message.success('表单验证成功，显示上传界面');
                    console.log(this.uploadUrl)
                }
                else{
                    this.$Message.error('请完善相关信息');
                }
            })
          },
        //   上传成功
          uploadSuccess(){
            this.$Message.success('文件选择成功');
          },
          download (index) {
            window.open(url+'download'+'?fileId='+this.data[index].studentreportId,'_blank');
          },
          remove (index) {
            var result = confirm("您确认删除吗？")
            if(result){
              axios.delete(url+this.data[index].studentreportId)
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

            this.correctMes = '更新成功！';
            this.Modal = true
            this.formItem={...this.data[index]}
          },
          create(){
            this.Modal = true
            this.formItem={ ...this.formItem1}
            console.log(this.formItem)
          },
          addOk(name){
            this.$refs.upload.post(this.file);
          },
          addCancel(){
            this.messageRule=false
            this.loading=false;
            this.Modal = false
          },
          page(currentPage) {
              const _this = this
              axios.get(url+'All/'+this.$route.params.training_id+'/'+currentPage).then(function (resp){
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
    .Manage{
      margin: 10px 0;
      /* border: 1px ; */
      /* border-color: rgba(151, 151, 151, 1); */
    }
    .page{
        display:table;
        margin:0 auto;
    }

  </style>