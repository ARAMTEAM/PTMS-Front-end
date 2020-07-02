<template>
  <div class="Container" >
    <h1>学生管理界面</h1>
    <div class="MForm">
        <!-- 增加教务跳转页面 -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">增加学生</Button>
      <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
      <Input search enter-button style="width:400px;float:right;" placeholder="检索教师" />
      <br><br>

      <div class="EAManage">
        <!-- 表格内容 -->
        <Table stripe  border  highlight-row ref="currentRowTable" :columns="columns3" :data="eaData">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="success" size="small" style="margin-right: 5px" @click="show(index)">进入</Button>
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <Button type="warning" size="small" style="margin-right: 5px" @click="edit(row.training_id)">编辑</Button>
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
        columns3: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '学生学号',
              width: 200,
              key: 'student_id',
              align: 'center'
          },
          {
              title: '学生姓名',
              key: 'student_name',
              align: 'center'

          },
          {
              title: '学生班级',
              key: 'studetnt_class',
              align: 'center'
          },
          {
              title: '学生电话',
              key: 'teacher_dept',
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
        console.log(resp);
        _this.eaData = resp.data.content;
        _this.total = resp.data.totalElements; 
      })
    },
    methods: {
        handleClearCurrentRow () {
            this.$refs.currentRowTable.clearCurrentRow();
        },
        show (index) {
            this.$Modal.info({
                title: '教师信息',
                content: `教师编号${this.eaData[index].teacher_id}<br>教师姓名：${this.eaData[index].teacher_name}<br>教师职称：${this.eaData[index].teacher_rank}<br>所属学院：${this.eaData[index].teacher_dept}
                <br>教师电话：${this.eaData[index].teacher_telephone}<br>教师邮箱${this.eaData[index].teacher_email}<br>负责实训编号：${this.eaData[index].training_id}`
            })
        },
        remove (index) {

        },
        edit(index){
          this.$router.push('student/index')
        },
        create(){
            this.$router.push('student/edit/create')
        },
        page(currentPage) {
            const _this = this
            axios.get('http://localhost:8181/api/ea/findAll/'+currentPage).then(function (resp){
              console.log(resp);
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