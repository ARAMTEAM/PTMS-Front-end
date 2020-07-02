<template>
    <div class="Container" >
      <h1>所在项目详情</h1>
      <div class="MForm">
        <br>
        <div class="TableManage" >
          <!-- 表格内容 -->
          <h2>项目详情</h2>
          <Table stripe :loading="loading" border  ref="currentRowTable" :columns="header1" :data="project">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="warning" size="small" style="margin-right: 5px" @click="editInfo(index)">编辑</Button>
            </template>
          </Table>
        </div>

        <div class="TableManage">
          <h2>指导教师</h2>
            <Table stripe :loading="loading2" border  ref="currentRowTable" :columns="header2" :data="teacher">
              <template slot-scope="{ row }" slot="name">
                  <strong>{{ row.name }}</strong>
              </template>
            </Table>
          </div>
        </div>

        <div class="TableManage">
            <!-- 表格内容 -->
          <h2>组内成员</h2>
            <Table stripe :loading="loading3" border  ref="currentRowTable" :columns="header3" :data="student">
              <template slot-scope="{ row }" slot="name">
                  <strong>{{ row.name }}</strong>
              </template>
            </Table>
          </div>
          <div class="page">
            <Page :total=total :page-size="10" show-total @on-change="page"/> 
          </div>
      </div>
    </div>
  </template>
  <script>
import GLOBAL from '@/api/global_variable'
const url = GLOBAL.apiURL
export default {
props:{
    Info: {
        type:Object,
        required:true
    }
},
data(){
  return {
    loading:true,//表单的loadiing状态
    loading2:true,
    loading3:true,
    student:[],
    project:[],
    teacher:[],
    correctMes:'',
    mode:'',
    total: null,
    data: [],
    
    header1: [
      {   title: '项目编号',key: 'projectId',align: 'center'},
      {   title: '实训编号',key: 'trainingId',align: 'center'},
      {   title: '项目名称',key: 'projectName',align: 'center'},
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
    header2: [
      {title: '教师姓名',key: 'teacherName',align: 'center'},
      {title: '导师职称',key: 'teacherRank',align: 'center'},
      {title: '老师邮箱',key: 'teacherEmail',align: 'center'},
      {title: '老师电话',key: 'teacherTelephone',align: 'center'},
      {title: '所属学院',key: 'teacherDept',align: 'center'},
    ],
    header3: [
      {title: '学生学号',key: 'studentId',align: 'center'},
      {title: '学生姓名',key: 'studentName',align: 'center'},
      {title: '学生班级',key: 'studentClass',align: 'center'},
      {title: '学生电话',key: 'studentTelephone',align: 'center'},
    ],
    
    }
},
created(){
  const _this = this;
  //获取项目详情信息
  axios.get(url+'stuAndpro/listByStudentId/'+_this.Info.studentId).then(function (resp){
    _this.project.push(resp.data.data)
    _this.loading=false
    //获取根据项目获取学生
    axios.get(url+'teacher/One/'+_this.project[0].teacherId).then(res=>{
        _this.teacher.push(res.data.data)
        _this.loading2=false
    })
    axios.get(url+'student/AllInOneProject/'+_this.project[0].projectId+'/1').then(res=>{
        _this.student=res.data.data.content
        _this.total = res.data.data.totalElements; 
        _this.loading3=false
    })
  })
  
},
methods: {
    handleReset (name) {
        this.$refs[name].resetFields();
    },
    backTo(){
        this.$router.go(-1);//返回上一层
    },
    page(currentPage) {
        const _this = this
        axios.get(url+'student/AllInOneProject/'+_this.project[0].projectId+'/'+currentPage).then(function (resp){
          // console.log(resp);
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