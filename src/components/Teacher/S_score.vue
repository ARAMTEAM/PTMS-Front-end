<template>
    <div class="Container" >
      <h1>学生分数详情</h1>
      <div class="MForm">
          <!-- 按钮以及检索 -->
        <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">excel导入分数</Button>
        <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
        <Input search enter-button style="width:400px;float:right;" placeholder="检索项目" />
        <br><br>
  
        <div class="EAManage">
          <!-- 表格内容 -->
          <Table stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="eaData">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="score(index)">打分</Button>
                <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
            </template>
          </Table>

        </div>
  
        <br/>

      </div>
    </div>
    
  </template>
  
  <script>
  
  export default {
      
      data(){
        return {
          loading:false,//表单的loadiing状态
          TPModal:false,
          correctMes:'',
          mode:'',
          total: null,
          eaData: [],
          header: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '学生学号',
                width: 100,
                key: 'student_id',
                align: 'center'
            },
            {
                title: '学生姓名',
                key: 'student_name',
                align: 'center'
            },
            {
                title: '完成程度(50)',
                key: 'student_class',
                align: 'center'
  
            },
            {
                title: '解决问题能力(20)',
                key: 'isleader',
                align: 'center'
            },
            {
                title: '团队能力(20)',
                key: 'student_status',
                align: 'center'
            },
            {
                title: '工作态度(20)',
                key: 'student_status',
                align: 'center'
            },
            {
                title: '总分(100)',
                key: 'student_status',
                align: 'center'
            },
            {
                title: '操作',
                slot: 'action',
                width: 100,
                align: 'center'
            }
          ],
          
        }
      },
      created(){
        const _this = this;
        axios.get('http://localhost:8181/api/ea/findAll/1').then(function (resp){
          console.log(resp);
          _this.eaData = resp.data.content;
          _this.total = resp.data.totalElements; 
        })
      },
      methods: {
          handleClearCurrentRow () {
              this.$refs.currentRowTable.clearCurrentRow();
          },
          
          score(index) {
              this.$Modal.info({
                title: '项目信息',
                  content: `项目编号：${this.eaData[index].student_id}<br>项目名称：${this.eaData[index].student_name}<br>项目最大人数：${this.eaData[index].项目最大人数}<br>项目类型：${this.eaData[index].student_application_type}
                  <br>项目助教：${this.eaData[index].student_helper}<br>助教电话：${this.eaData[index].student_helper_tel}<br>阶段性报告提交阶段时间间隔${this.eaData[index].student_interval_day}
                  指导教师：${this.eaData[index].teacher}所属实训：${this.eaData[index].training}`
              })
          },
          enter (index) {
                this.$router.push(this.$route.params.project_id+'/12');
          },
          
          page(currentPage) {
              const _this = this
              axios.get('http://localhost:8181/api/ea/findAll/'+currentPage).then(function (resp){
                console.log(resp);
                _this.eaData = resp.data.content;
                _this.total = resp.data.totalElements; 
              })
          },
          backTo(){
              this.$router.go(-1);//返回上一层
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