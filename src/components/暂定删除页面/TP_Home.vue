<template>
  <div class="Container" >
    <h1>教师项目管理界面</h1>
    <div class="MForm">
        <!-- 增加教务跳转页面 -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">项目添加</Button>
      <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
      <br><br>

      <div class="EAManage">
        <!-- 表格内容 -->
        <Table stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="eaData">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <Button type="warning" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
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

export default {
    
    data(){
      return {
        total: null,
        eaData: [],
        header: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '项目编号',
              width: 100,
              key: 'project_id',
              align: 'center'
          },
          {
              title: '项目名称',
              key: 'project_name',
              align: 'center'
          },
          {
              title: '项目最大人数',
              key: 'project_max_num',
              align: 'center'

          },
          {
              title: '项目类型',
              key: 'project_application_type',
              align: 'center'
          },
          {
              title: '项目当前状态',
              key: 'project_status',
              align: 'center'
          },
          {
              title: 'Action',
              slot: 'action',
              width: 300,
              align: 'center'
          }
        ],
      
        }
    },
    created(){
      const _this = this;
      axios.get('http://localhost:8181/api/ea/findAll/1').then(function (resp){
      //   console.log(resp);
        _this.eaData = resp.data.content;
        _this.total = resp.data.totalElements; 
      })
      console.log(this.$route.params.teacher_id)
    },
    methods: {
        handleClearCurrentRow () {
            this.$refs.currentRowTable.clearCurrentRow();
        },
        show (index) {
            this.$Modal.info({
                title: '教师信息',
                content: `项目编号：${this.eaData[index].project_id}<br>项目名称：${this.eaData[index].project_name}<br>项目最大人数：${this.eaData[index].项目最大人数}<br>项目类型：${this.eaData[index].project_application_type}
                <br>项目助教：${this.eaData[index].project_helper}<br>助教电话：${this.eaData[index].project_helper_tel}<br>阶段性报告提交阶段时间间隔${this.eaData[index].project_interval_day}`
            })
        },
        remove (index) {

        },
        edit(index){
          this.$router.push('training/index')
        },
        create(){
            this.$router.push('/ea/teacher/project/'+this.$route.params.teacher_id+'/create')
        },
        page(currentPage) {
            const _this = this
            axios.get('http://localhost:8181/api/ea/findAll/'+currentPage).then(function (resp){
              // console.log(resp);
              _this.eaData = resp.data.content;
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