<template>
  <div class="Container" >
    <h1>公告管理界面</h1>
    <div class="MForm">
        <!-- 增加教务跳转页面 -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">增加公告</Button>
      <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
      <br><br>

      <div class="Manage">
        <!-- 表格内容 -->
        <Table v-show="table" stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
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
        <Modal v-model="Modal" title="公告更新" width="600" :closable="false" :mask-closable="false" @on-ok="addOk" @on-cancel="addCancel">
          <p slot="header" >
            <span>公告更新</span>
          </p>
          <Form v-if="Modal" ref="Form" :model="formItem" :label-width="100" :rules="ruleInline" style="width: 550px;">
            <FormItem label="公告标题" prop="projectnoticeTitle">
                <Input v-model="formItem.projectnoticeTitle" placeholder="请尽量简洁地输入标题"/>
            </FormItem>
            <FormItem label="公告内容" prop="projectnoticeContent">
                <Input v-model="formItem.projectnoticeContent" type="textarea" :rows="8" placeholder="请输入对教务广播的公告内容" />
            </FormItem>
          </Form>
          <div slot="footer">
            <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
            <Button class="button" icon="md-refresh" @click="handleReset('Form')" style="margin-left: 8px">重置</Button>
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
const url = GLOBAL.apiURL+'projectnotice/';
export default {
    inject:['reload'],
    data(){
      return {
        loading:false,//表单的loadiing状态
        Modal:false,
        correctMes:'',//成功的提示信息
        table:true,
        mode:'',
        total: null,
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
              key: 'projectnoticeId',
              align: 'center'
          },
          {
              title: '公告标题',
              key: 'projectnoticeTitle',
          },
          {
              title: '创建时间',
              key: 'projectnoticeCreateTime',
          },
          {
              title: '更新时间',
              key: 'projectnoticeUpdateTime',
          },
          {
              title: 'Action',
              slot: 'action',
              width: 250,
              align: 'center'
          }
        ],
        formItem: {projectnoticeTitle: '',projectnoticeContent:'',trainingId:'',},
        formItem1: {projectnoticeTitle: '',projectnoticeContent:'',trainingId:'',},
        ruleInline: {
          projectnoticeId: [
                { required: true, message: '标题禁止为空', trigger: 'blur' }
            ],
            projectnoticeContent: [
                { required: true, message: '公告内容禁止为空', trigger: 'blur' }
            ],
        },
      }
    },
    created(){
      const _this = this;
      //获取当前下的公告
      axios.get(url+this.$route.params.projectId+'/1').then(function (resp){
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
                content: `公告编号：${this.data[index].projectnoticeId}<br>公告标题：${this.data[index].projectnoticeTitle}<br>发布时间：${this.data[index].projectnoticeCreateTime}<br>发布时间：${this.data[index].projectnoticeUpdateTime}
                <br>公告内容：${this.data[index].projectnoticeContent}`
            //.slice(0,15) + '...'实现简介功能
            })
        },
        remove (index) {
          var result = confirm("您确认删除吗？")
          if(result){
            axios.delete(url+this.data[index].projectnoticeId)
            .then(res=>{
            if(res.data.success){
              this.$Message.success('删除数据成功');
              this.reload();//刷新页面
            }else{
              this.$Message.error('删除数据失败');
              this.$Notice.error({
                    title: '错误',
                    desc: res.data.message
              });
              this.reload();//刷新页面
            }
          })
          }
        },
        edit(index){
          this.mode = 'update'
          this.correctMes = '更新成功！'
          this.Modal = true
          this.formItem={...this.data[index]}
        },
        create(){
          this.mode = 'create'
          this.correctMes = '新增成功！'
          this.Modal = true
          this.formItem={...this.formItem1}
          this.formItem.projectId=this.$route.params.projectId
        },
        addOk(name){
          console.log(this.formItem.grade)
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.loading = true;
              if(this.mode=='create'){
                setTimeout(() => {
                  axios.post(url,this.formItem)
                  .then(res=>{
                    console.log(res);
                    if(res.data.success)
                    {
                      this.$Message.success(this.correctMes);
                      this.loading = false;//停止加载
                      this.Modal = false;//关闭对话框组件
                      this.reload();//刷新页面
                    }
                    else{
                      this.loading = false;
                      this.$Message.error('提交失败');
                    }
                  })
                  // this.loading=false
                },1000)
              }
              else{
                setTimeout(() => {
                  axios.put(url,this.formItem)
                  .then(res=>{
                    console.log(res);
                    this.table = false;
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
            axios.get(url+this.$route.params.training_id+'/'+currentPage,
            ).then(function (resp){
              console.log(resp);
              _this.data = resp.data.data.content;
              _this.total = resp.data.data.totalElements; 
            })
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

<style>
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