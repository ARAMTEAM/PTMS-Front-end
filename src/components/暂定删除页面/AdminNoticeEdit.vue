<template>
    <div class="Container" >
      <h1>公告管理界面</h1>
      <div class="MForm">
          <!-- 增加教务跳转页面 -->
        <Button type="primary" class="button" @click="add" icon="ios-add-circle-outline">增加公告</Button>
        <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
        <br><br>
  
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
  
          <!-- 用于更新和增加公告的表单 -->
          <Modal v-model="addModal" title="公告更新" width="600" :closable="false" :mask-closable="false" @on-ok="addOk" @on-cancel="addCancel">
            <p slot="header" >
              <span>公告更新</span>
            </p>
            <Form v-if="addModal" ref="Form" :model="formItem" :label-width="100" :rules="ruleInline" style="width: 550px;">
              <FormItem label="公告标题" prop="adminnoticeTitle">
                  <Input v-model="formItem.adminnoticeTitle" placeholder="请尽量简洁地输入标题"/>
              </FormItem>
              <FormItem label="公告内容" prop="adminnoticeContent">
                  <Input v-model="formItem.adminnoticeContent" type="textarea" :rows="8" placeholder="请输入对教务广播的公告内容" />
              </FormItem>
            </Form>
            <div slot="footer">
              <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
              <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading" @click="addOk">提交</Button>
            </div>
          </Modal>
  
        </div>
  
        <br/>
          <!-- 分页 -->
          <div class="page">
            <Page :total="100" :page-size="5" show-total @on-change="search"/>
          </div>
  
        
      </div>
    </div>
    
  </template>
  
  <script>
  import GLOBAL from '@/api/global_variable'
  const url = GLOBAL.apiURL;
  
  export default {
      data(){
        return {
          loading:false,//表单的loadiing状态
          addModal:false,
          correctMes:'',//成功的提示信息
          data:[],
          header: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '公告编号',
                width: 100,
                key: 'adminnoticeId',
                align: 'center'
            },
            {
                title: '公告标题',
                key: 'adminnoticeTitle',
            },
            {
                title: '创建时间',
                key: 'adminnoticeCreateTime',
            },
            {
                title: '更新时间',
                key: 'adminnoticeUpdateTime',
            },
            {
                title: 'Action',
                slot: 'action',
                width: 250,
                align: 'center'
            }
          ],
          formItem: {
            adminnoticeTitle: '',
            adminnoticeContent:'',
                  },
          ruleInline: {
              adminnoticeTitle: [
                  { required: true, message: '标题禁止为空', trigger: 'blur' }
              ],
              adminnoticeContent: [
                  { required: true, message: '公告内容禁止为空', trigger: 'blur' }
              ],
          },
        }
      },
      created(){
        const _this = this;
        axios.get(url+'adminnotice/1').then(function (resp){
          console.log(resp);
          _this.data = resp.data.data.content;
          _this.total = resp.data.data.totalElements; 
        })
      },
      methods: {
          handleClearCurrentRow () {
              this.$refs.currentRowTable.clearCurrentRow();
          },
          handleReset (name) {
                this.$refs[name].resetFields();
          },
          show (index) {
              this.$Modal.info({
                  title: '公告信息',
                  content: `公告编号：${this.data[index].adminnoticeId}<br>公告标题：${this.data[index].adminnoticeTitle}<br>发布时间：${this.data[index].adminnoticeUpdateTime}<br>发布时间：${this.data[index].adminnoticeCreateTime}
                  <br>公告内容：${this.data[index].adminnoticeContent}`
              //.slice(0,15) + '...'实现简介功能
              })
          },
          remove (index) {
              this.data6.splice(index, 1);
          },
          edit(index){
            this.correctMes = '公告更新成功';
            this.addModal = true
            this.formItem.trainingId=this.data[index].training_id
            this.formItem.title=this.data[index].jiaowunotice_title
            this.formItem.content=this.data[index].jiaowunotice_content
          },
          add(){
            this.correctMes = '新增公告成功';
            this.addModal = true
            this.formItem.trainingId=''
            this.formItem.title=''
            this.formItem.content=''
          },
          async addOk(){
            this.$refs.addNotice.validate((valid) => {
                      if (valid) {
                        this.loading = true;
                        // 需要些axios的POST
                        setTimeout(() => {
                          this.$Message.success('新建公告成功');
                          this.loading=false;//停止加载
                          this.addModal = false//关闭对话框组件
                        },1000);
                        
                      } else {
                          this.loading=false;
                          this.$Message.error('请完善后再提交');
                      }
              })
            
          },
          addCancel(){
            this.loading=false;
            this.addModal = false
          },
          create(){
              this.$router.push('noticemanage/create')
          },
          search(pageIndex) {
              console.log(pageIndex)
          }
      },
  
      components:{
   
      },
      filters: {
        ellipsis (value) {
          if (!value) return ''
          if (value.length > 10) {
            return value.slice(0,10) + '...'
          }
          return value
        }
      }
  
  }
  </script>
  
  <style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
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