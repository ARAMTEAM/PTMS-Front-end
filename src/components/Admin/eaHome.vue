<template>
  <div class="Container" >
    <h1>教务管理界面</h1>
    <div class="MForm">
        <!-- 增加教务跳转页面 -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">增加教务</Button>
      <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
      <br><br>

      <div class="EAManage">
        <!-- 表格内容 -->
        <Table :loading="tableLoading" stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <Button type="warning" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
        <!-- 用于更新和增加教师基本信息的表单 -->
        <Modal v-model="Modal" width="600" :closable="false" :mask-closable="false" >
          <p slot="header" >
            <span>{{ mode }}</span>
          </p>
          <Form v-if="Modal" ref="teacherForm" :model="formItem" :label-width="100" :rules="ruleInline" >
            <FormItem label="教务号" prop="jiaowuId">
                <Input v-model="formItem.jiaowuId" placeholder="请输入教务名称"></Input>
            </FormItem>
            <FormItem label="教务名称" prop="jiaowuName">
                <Input v-model="formItem.jiaowuName" placeholder="请输入教务名称"></Input>
            </FormItem>
            <FormItem label="教务邮箱" prop="jiaowuUsername">
                <Input v-model="formItem.jiaowuUsername" placeholder="请输入教务邮箱"></Input>
            </FormItem>
            
            <FormItem label="教务密码" prop="jiaowuPassword">
                <Input type="password" password v-model="formItem.jiaowuPassword" placeholder="更新时若不修改密码请不要填写"></Input>
            </FormItem>

            <FormItem label="所属学院" prop="jiaowuDept">
                <Select v-model="formItem.jiaowuDept">
                    <Option value="微电子学院">微电子学院</Option>
                    <Option value="软件学院">软件学院</Option>
                </Select>
            </FormItem>

            <FormItem label="教务年级" prop="jiaowuNianji">
                <Select v-model="formItem.jiaowuNianji">
                    <Option :value="CurrentYear.toString()">{{CurrentYear}}</Option>
                    <Option :value="(CurrentYear-1).toString()">{{CurrentYear-1}}</Option>
                    <Option :value="(CurrentYear-2).toString()">{{CurrentYear-2}}</Option>
                    <Option :value="(CurrentYear-3).toString()">{{CurrentYear-3}}</Option>
                    <Option :value="(CurrentYear-4).toString()">{{CurrentYear-4}}</Option>
                </Select>
            </FormItem>
          </Form>

          <div slot="footer">
            <Button class="button" icon="md-refresh" @click="handleReset('teacherForm')" style="margin-left: 8px">重置</Button>
            <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
            <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading" @click="addOk('teacherForm')">提交</Button>
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
const url = GLOBAL.apiURL+'jiaowu/';
export default {
    inject:['reload'],
    data(){
      return {
        tableLoading:true,
        CurrentYear:0,
        loading:false,//表单的loadiing状态
        Modal:false,
        mode:'',
        correctMes:'',
        total: null,
        data: [],
        header: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '教务号',
              width: 250,
              key: 'jiaowuId',
              align: 'center'
          },
          {
              title: '教务名称',
              key: 'jiaowuName',
              align: 'center'
          },
          {
              title: '教务机构',
              key: 'jiaowuDept'
          },
          {
              title: 'Action',
              slot: 'action',
              width: 250,
              align: 'center'
          }
        ],
        formItem: {jiaowuId:'',jiaowuName:'',jiaowuUsername: '',jiaowuPassword:'',jiaowuDept: '',jiaowuNianji:'',},
        formItem1: {jiaowuId:'',jiaowuName:'',jiaowuUsername: '',jiaowuPassword:'',jiaowuDept: '',jiaowuNianji:'',},
        ruleInline: {
            jiaowuId: [
                { required: true, message: '教务号禁止为空', trigger: 'blur' }
            ],
            jiaowuName: [
                { required: true, message: '教务用户名禁止为空', trigger: 'blur' }
            ],
            jiaowuUsername: [
                { required: true, message: '教务账号禁止为空', trigger: 'blur' }
            ],
            jiaowuPassword: [
                { required: false, message: '教务密码禁止为空', trigger: 'blur' }
            ],
            jiaowuDept: [
                { required: true,message: '学院禁止为空', trigger: 'blur' }
            ],

        },
        }
    },
    created(){
      let date = new Date();
      this.CurrentYear = date.getFullYear();

      const _this = this;
      axios.get(url+'1').then(function (resp){
        _this.data = resp.data.data.content;
        _this.total = resp.data.data.totalElements; 
        _this.tableLoading = false//表格加载成功
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
                title: '教务信息',
                content: `教务号：${this.data[index].jiaowuName}<br>教务年级：${this.data[index].jiaowuNianji}<br>教务名：${this.data[index].jiaowuName}
                <br>教务账号：${this.data[index].jiaowuUsername}<br>教务学院：${this.data[index].jiaowuDept}`
            })
        },
        remove (index) {
          var result = confirm("您确认删除吗？")
          if(result){
            axios.delete(url+this.data[index].jiaowuId)
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
                    if(res.data.success)
                    {
                      this.$Message.success(this.correctMes);
                      this.loading = false;//停止加载
                      this.Modal = false;//关闭对话框组件
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
            axios.get(url+currentPage,
            ).then(function (resp){
              console.log(resp);
              _this.data = resp.data.data.content;
              _this.total = resp.data.data.totalElements; 
            })
        }
    },

    
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