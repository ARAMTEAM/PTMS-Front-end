<template>
    <div class="Container" >
      <h1>待确认项目列表</h1>
      <div class="MForm">
          <!-- 增加教务跳转页面 -->
        <!-- <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">添加项目</Button> -->
        <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
        <br><br>
  
        <div class="EAManage">
          <!-- 表格内容 -->
          <Table stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button> -->
                <Button type="success" size="small" style="margin-right: 5px" @click="enter(index)">通过</Button>
                <Button type="error" size="small" style="margin-right: 5px" @click="enter(index)">否决</Button>
                <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
            </template>
          </Table>
        </div>
  
        <br/>
          <!-- 分页 -->
          <div class="page">
            <Page :total="total" :page-size="10" show-total @on-change="page"/>
          </div> 
      </div>
    </div>
  </template>
  <script>
  
  export default {
      data(){
        return {
          total: null,
          data:[],
          header: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '项目题目',
                key: 'projectName',
                align: 'center'
            },
            {
                title: '项目最大人数',
                key: 'projectMaxNum',
            },
            {
                title: '评价间隔',
                key: 'projectIntervalDay',
            },
            {
                title: '项目状态',
                key: 'projectStatus',
            },
            {
                title: '项目类型',
                key: 'projectApplicationType',
            },

            {
                title: '下载申请书',
                slot: 'action',
                width: 250,
                align: 'center'
            },
            {
                title: '操作',
                slot: 'action',
                width: 250,
                align: 'center'
            }
          ],
          formItem: { projectName:'',projectStatus: '',projectMaxNum:6,projectHelper: '',projectHelperTel: '', projectIntervalDay: 3,projectIntroduction:'', projectApplicantType:'教师',teacherId: '',trainingId:''},
          formItem1: { projectName:'',projectStatus: '',projectMaxNum:6,projectHelper: '',projectHelperTel: '', projectIntervalDay: 3,projectIntroduction:'', projectApplicantType:'教师',teacherId: '',trainingId:''},
          ruleInline: {
            projectName: [
                { required: true, message: '项目名称禁止为空', trigger: 'blur' }
            ],
            projectStatus: [
                { required: true, message: '当前状态禁止为空', trigger: 'blur' }
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
        axios.get('http://localhost:8181/api/ea/findAll/1').then(function (resp){
            console.log(resp);
            _this.data = resp.data.content;
            _this.total = resp.data.totalElements; 
        })
      },
      methods: {
          page(currentPage) {
              const _this = this
              axios.get('http://localhost:8181/api/ea/findAll/'+currentPage).then(function (resp){
              console.log(resp);
              _this.eaData = resp.data.content;
              _this.total = resp.data.totalElements; 
              })
          },
          handleClearCurrentRow () {
              this.$refs.currentRowTable.clearCurrentRow();
          },
          show (index) {
              this.$Modal.info({
                  title: '项目信息',
                  content: `公项目编号：${this.eaData[index].project_id}<br>项目名称：${this.eaData[index].project_name}<br>项目最大人数：${this.eaData[index].项目最大人数}<br>项目类型：${this.eaData[index].project_application_type}
                <br>项目助教：${this.eaData[index].project_helper}<br>助教电话：${this.eaData[index].project_helper_tel}<br>阶段性报告提交阶段时间间隔${this.eaData[index].project_interval_day}
                指导教师：${this.eaData[index].teacher}所属实训：${this.eaData[index].training}`
              //.slice(0,15) + '...'实现简介功能
              })
          },
          remove (index) {
              this.data6.splice(index, 1);
          },
          search(pageIndex) {
              console.log(pageIndex)
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