<template>
  <div class="Container" >
    <h1>教师管理界面</h1>
    <div class="MForm">
        <!-- 增加教务跳转页面 -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">增加教师</Button>
      <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
      <Input search enter-button style="width:30%;float:right;" placeholder="检索教师" />
      <br><br>

      <div class="EAManage">
        <!-- 表格内容 -->
        <Table :loading="tableloading" stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="success" size="small" style="margin-right: 5px" @click="enter(index)">进入项目页</Button>
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
          <Form v-if="Modal" ref="Form" :model="formItem" :label-width="100" :rules="ruleInline" >
            <FormItem label="教职工号" prop="teacherId">
                <Input v-model="formItem.teacherId" placeholder="请输入教工号"></Input>
            </FormItem>
            <FormItem label="教师姓名" prop="teacherName">
                <Input v-model="formItem.teacherName" placeholder="请输入教师姓名"></Input>
            </FormItem>

            <FormItem label="教师职称" prop="teacherRank">
              <Select v-model="formItem.teacherRank" placeholder="请选择教师职称">
                  <Option value="教授">教授</Option>
                  <Option value="副教授">副教授</Option>
                  <Option value="讲师">讲师</Option>
              </Select>
            </FormItem>
            
            <FormItem label="所属学院" prop="teacherDept">
              <Select v-model="formItem.teacherDept" placeholder="请选择教师所属学院"> 
                  <Option value="微电子学院">微电子学院</Option>
                  <Option value="软件学院">软件学院</Option>
              </Select>
            </FormItem>

            <FormItem label="教师电话" prop="teacherTelephone">
              <Input v-model="formItem.teacherTelephone" placeholder="请输入教师电话"></Input>
            </FormItem>
            <FormItem label="教师邮箱" prop="teacherEmail">
              <Input v-model="formItem.teacherEmail" placeholder="请输入教师邮箱"></Input>
            </FormItem>

            <FormItem label="教师密码" prop="teacherPassword">
                <Input type="password" password v-model="formItem.teacherPassword" placeholder="如果不需要修改请不要填写"></Input>
            </FormItem>            

            <FormItem label="所属实训" prop="trainingId">
              <Select v-model="formItem.trainingId" placeholder="请选择教师所处实训">
                <!-- 利用v-for循环来显示当前的已经有的实训信息 -->
                <Option v-for="(item,i) in training" :value="training[i].trainingId" :key="i">{{training[i].trainingName}}</Option>
              </Select>
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
const url = GLOBAL.apiURL+'teacher/';
export default {
    inject:['reload'],
    data(){
      return {
        tableloading:true,
        loading:false,//表单的loadiing状态
        Modal:false,
        correctMes:'',
        total: null,
        data: [],
        training:{},
        mode:'',
        header: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '教职工号',
              width: 100,
              key: 'teacherId',
              align: 'center'
          },
          {
              title: '教师姓名',
              key: 'teacherName',
              align: 'center'

          },
          {
              title: '教师职称',
              key: 'teacherRank',
              align: 'center'
          },
          {
              title: '所属学院',
              key: 'teacherDept',
              align: 'center'
          },
          
          {
              title: 'Action',
              slot: 'action',
              width: 300,
              align: 'center'
          }
        ],
        formItem: {teacherId:'',teacherName:'',teacherRank: '',teacherDept: '',teacherTelephone: '',teacherEmail:'',teacherPassword:'',trainingId:1, },
        formItem1: {teacherId:'',teacherName:'',teacherRank: '',teacherDept: '',teacherTelephone: '',teacherEmail:'',teacherPassword:'',trainingId:1, },
        ruleInline: {
          teacherId: [
                { required: true, message: '教职工号禁止为空', trigger: 'blur' }
            ],
            teacherName: [
                { required: true, message: '教师用户名禁止为空', trigger: 'blur' }
            ],
            teacherRank: [
                { required: true, message: '教师职称禁止为空', trigger: 'blur' }
            ],
            teacherDept: [
                { required: true, message: '教师学院禁止为空', trigger: 'blur' }
            ],
            teacherTelephone: [
                { required: true, message: '教师电话禁止为空', trigger: 'blur' }
            ],
            teacherEmail: [
                { required: true, message: '教师邮箱禁止为空', trigger: 'blur' }
            ],
            teacherPassword: [
                { required: false, message: '账号密码禁止为空', trigger: 'blur' }
            ],
            trainingId: [
                { required: true, type: 'number', message: '教务所属实训禁止为空', trigger: 'blur'  }
            ],
        },
      }
    },
    created(){
      const _this = this;
      axios.get(url+'All/1').then(function (resp){
        _this.data = resp.data.data.content;
        _this.total = resp.data.data.totalElements; 
        _this.tableloading = false;
      })
      axios.get(GLOBAL.apiURL+'training/All').then(res=>{
        this.training = res.data.data;
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
                title: '教师信息',
                content: `教师编号：${this.data[index].teacherId}<br>教师姓名：${this.data[index].teacherName}<br>教师职称：${this.data[index].teacherRank}<br>所属学院：${this.data[index].teacherDept}
                <br>教师电话：${this.data[index].teacherTelephone}<br>教师邮箱：${this.data[index].teacherEmail}<br>负责实训编号：${this.data[index].trainingId}`
            })
        },
        //进入教师项目页面
        enter (index) {
            this.$router.push('teacher/'+this.data[index].teacherId)
        },
        remove (index) {
          var result = confirm("您确认删除吗？")
          if(result){
            axios.delete(url+this.data[index].teacherId)
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
                  axios.put(url,this.formItem)
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
            axios.get(url+'All/'+currentPage).then(function (resp){
              console.log(resp);
              _this.data = resp.data.content;
              _this.total = resp.data.totalElements; 
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