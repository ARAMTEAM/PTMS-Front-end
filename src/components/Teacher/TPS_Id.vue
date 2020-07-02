<template>
    <div class="Container" >
      <h1>学生详情界面</h1>
      <div class="MForm">
          <!-- 增加教务跳转页面 -->
        <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button>
        <!-- <Button type="primary" class="button" @click="edit" icon="ios-add-circle-outline">修改学生基本信息</Button> -->
        <!-- <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button> -->
        <br><br>
        <div class="TableManage">
          <!-- 表格内容 -->
          <Table stripe  border  ref="currentRowTable" :columns="header1" :data="student">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
          </Table>
        </div>
        
        <!-- style="width: 55%;float:right;" -->
        <div class="TableManage" >
          <!-- 表格内容 -->
          <Table stripe  border  ref="currentRowTable" :columns="header2" :data="project">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="warning" size="small" style="margin-right: 5px" @click="editInfo(index)">编辑</Button>
            </template>
          </Table>
        </div>
        <br/>
        <div>展示阶段性报告</div>
      </div>
    </div>
  </template>
  <script>
import GLOBAL from '@/api/global_variable'
const url = GLOBAL.apiURL
export default {
      
data(){
  return {
    loading:false,//表单的loadiing状态
    student:[],
    project:[],
    correctMes:'',
    mode:'',
    total: null,
    data: [],
    header1: [
      {title: '学生学号',key: 'studentId',align: 'center'},
      {title: '学生姓名',key: 'studentName',align: 'center'},
      {title: '学生班级',key: 'studentClass',align: 'center'},
      {title: '学生电话',key: 'studentTelephone',align: 'center'},
      {title: '所处实训',key: 'trainingId',align: 'center'},
      {title: '实训名称',key: 'trainingName',align: 'center'},
    ],
    
    header2: [
      {   title: '所处实训',key: 'trainingId',align: 'center'},
      {   title: '参与项目',key: 'projectName',align: 'center'},
      {
            title: '队内职务',
            key: 'isleader',
            align: 'center',
            render: (h, params) => {
              return h("div",params.row.isleader ?'队长':'队员')
            }
      },
      {
            title: '5分制成绩',
            key: 'grade5points',
            align: 'center',
            render: (h, params) => {
              return h("div",(params.row.grade5points===-1) ?'未公布':params.row.grade5points)
            }
      },
      {
            title: '百分制成绩',
            key: 'grades100points',
            align: 'center',
            render: (h, params) => {
              return h("div",(params.row.grades100points===-1) ?'未公布':params.row.grades100points)
            }
      },
    ],
    
    }
},
created(){
  const _this = this;
  axios.get(url+'student/One/'+_this.$route.params.studentId).then(function (resp){
    _this.student.push(resp.data.data)
  })
  axios.get(url+'stuAndpro/listByStudentId/'+this.$route.params.studentId).then(function (resp){
    console.log(resp);
    _this.project.push(resp.data.data)
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
    backTo(){
        this.$router.go(-1);//返回上一层
    },
    edit(){
      this.mode = '学生更新';
      this.correctMes = '学生更新成功';
      this.studentModal = true
      this.formItem.id=this.data[index].id
      this.formItem.name=this.data[index].name
      this.formItem.rank=this.data[index].rank
      this.formItem.dept=this.data[index].dept
      this.formItem.telephone=this.data[index].telephone
      this.formItem.email=this.data[index].email
      this.formItem.passwd=this.data[index].passwd
      this.formItem.training=this.data[index].training
    },
    async addOk(){
      this.$refs.studentForm.validate((valid) => {
                if (valid) {
                  this.loading = true;
                  // 需要些axios的POST
                  setTimeout(() => {
                    this.$Message.success(this.correctMes);
                    this.loading=false;//停止加载
                    this.studentModal = false//关闭对话框组件
                  },1000);
                  
                } else {
                    this.loading=false;
                    this.$Message.error('请完善后再提交');
                }
        })
    },
    addCancel(){
      this.loading=false;
      this.studentModal = false
    },
    editExcept(index){
      this.mode = '学生志愿';
      this.correctMes = '学生志愿更新成功';
      this.exceptModal = true
      this.formItem2.exception_1=this.data[index].exception_1
      this.formItem2.exception_2=this.data[index].exception_2
      this.formItem2.exception_3=this.data[index].exception_3
      this.formItem2.exception_4=this.data[index].exception_4
      this.formItem2.exception_5=this.data[index].exception_5
      this.formItem2.project=this.data[index].project
    },
    async exceptOk(){
      this.$refs.exceptForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 需要些axios的POST
          setTimeout(() => {
            this.$Message.success(this.correctMes);
            this.loading=false;//停止加载
            this.exceptModal = false//关闭对话框组件
          },1000);
          
        } else {
            this.loading=false;
            this.$Message.error('请完善后再提交');
        }
      })
    },
    exceptCancel(){
      this.loading=false;
      this.exceptModal = false
    },
    editProject(index){
      this.mode = '学生志愿';
      this.correctMes = '学生志愿更新成功';
      this.projectModal = true
      this.formItem3.training=this.data[index].training
      this.formItem3.project=this.data[index].project
      this.formItem3.role=this.data[index].role
      this.formItem3.grades_5=this.data[index].grades_5
      this.formItem3.grades_100=this.data[index].grades_100
    },
    async projectOk(){
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 需要些axios的POST
          setTimeout(() => {
            this.$Message.success(this.correctMes);
            this.loading=false;//停止加载
            this.projectModal = false//关闭对话框组件
          },1000);
          
        } else {
            this.loading=false;
            this.$Message.error('请完善后再提交');
        }
      })
    },
    projectCancel(){
      this.loading=false;
      this.projectModal = false
    },
    
    
    page(currentPage) {
        const _this = this
        axios.get('http://localhost:8181/api/ea/findAll/'+currentPage).then(function (resp){
          // console.log(resp);
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
    .TableManage{
      margin: 0px 0 20px 0;
      border-radius: 100px;

      /* border-color: rgba(151, 151, 151, 1); */
    }
    .page{
        display:table;
        margin:0 auto;
    }
  
  </style>