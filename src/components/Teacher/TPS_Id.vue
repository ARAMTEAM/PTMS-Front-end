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
          <h2>学生与项目基本信息</h2>
          <Table :loading="tableloading1" stripe  border  ref="currentRowTable" :columns="header1" :data="student">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
          </Table>
        </div>
        
        <!-- style="width: 55%;float:right;" -->
        <div class="TableManage" >
          <!-- 表格内容 -->
          <Table :loading="tableloading2" stripe  border  ref="currentRowTable" :columns="header2" :data="project">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="warning" size="small" style="margin-right: 5px" @click="editInfo(index)">编辑</Button>
            </template>
          </Table>
        </div>
        <br/>
        <h2>展示阶段性报告</h2>
        <div>
          <Table :loading='tableloading' stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="data">
                <Button type="warning" size="default">{{data[index].studentreportDate|dataFormat}}</Button>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="download(index)">下载报告</Button>
                <Button type="success" size="small" @click="shenyue(index)">标记为已阅</Button>
            </template>
          </Table>
        </div>
      </div>
    </div>
  </template>
  <script>
import GLOBAL from '@/api/global_variable'
const url = GLOBAL.apiURL
import moment from 'moment'

export default {
      
data(){
  return {
    tableloading:true,
    tableloading1:true,
    tableloading2:true,
    loading:false,//表单的loadiing状态
    student:[],
    project:[],
    correctMes:'',
    mode:'',
    total: null,
    data: [],
    inject:['reload'],
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
                key: 'studentreportDate',
                align: 'center',
                render: (h, params) => {
                    let time = moment(params.row.studentreportDate).format('YYYY-MM-DD HH:mm:ss')
                    return h('div', time);
                }
            },
            {
                title: '操作',
                slot: 'action',
                width: 200,
                align: 'center'
            }
      ],
    
    }
},
created(){
  const _this = this;
  axios.get(url+'student/One/'+_this.$route.params.studentId).then(function (resp){
    _this.student.push(resp.data.data)
    _this.tableloading1=false
  })
  axios.get(url+'stuAndpro/listByStudentId/'+this.$route.params.studentId).then(function (resp){
    console.log(resp);
    _this.project.push(resp.data.data)
    _this.total = resp.data.data.totalElements; 
    _this.tableloading2=false
  })
  axios.get(url+'studentreport/teachersee/'+this.$route.params.studentId+'/1').then(function (resp){
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
    backTo(){
        this.$router.go(-1);//返回上一层
    },
    download (index) {
        window.open(url+'studentreport/download'+'?fileId='+this.data[index].studentreportId,'_blank');
    },
    
    
    page(currentPage) {
        const _this = this
        axios.get('http://localhost:8181/api/ea/findAll/'+currentPage).then(function (resp){
          // console.log(resp);
          _this.data = resp.data.content;
          _this.total = resp.data.totalElements; 
        })
    },
    shenyue (index) {
       var result = confirm("确定标记已阅吗")
       if(result){
         axios.post(url+'studentreport/read/'+this.data[index].studentreportId)
         .then(res=>{
         if(res.data.success){
           this.$Message.success(res.data.message);
           this.reload();//刷新页面
         }else{
           this.$Message.error(res.data.message);
           this.reload();//刷新页面
         }
       })
       }
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