<template>
  <div class="Container" >
    <h1>学生列表</h1>

    
    <div class="MForm">
        <!-- 按钮以及检索 -->
        <!-- <Button type="primary" class="button" @click="create" icon="md-cloud-download">下载excel打分模板</Button> -->
        <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
        <Input search enter-button style="width:30%;float:right;" placeholder="检索项目" />
        <br><br>

      <div class="Manage">
        <!-- 表格内容 -->
        <Table stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="success" size="small" style="margin-right: 5px" @click="enter(index)">进入学生页</Button>
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <!-- <Button type="warning" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button> -->
              <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
          </template>
        </Table>
        <!-- 项目通知公告-->
        <Modal v-model="noticeModal"  title="当前实训公告管理" width="1200" :styles="{top: '50px'}">
          <Notice></Notice>
        </Modal>
      </div>
      <br/>
    </div>
  </div>
  
</template>

<script>
import GLOBAL from '@/api/global_variable'
const url = GLOBAL.apiURL+'student/';
import Notice from "@/components/Teacher/TP_notice";

export default {
inject:['reload'],
components:{Notice},
data(){
  return {
    noticeModal:false,
    total: null,
    data: [],
    header: [
      {
          type: 'index',
          width: 60,
          align: 'center'
      },
      {
          title: '学生学号',
          width: 200,
          key: 'studentId',
          align: 'center'
      },
      {
          title: '学生姓名',
          key: 'studentName',
          align: 'center'
      },
      {
          title: '学生班级',
          key: 'studentClass',
          align: 'center'
      },
      {
          title: '学生电话',
          key: 'studentTelephone',
          align: 'center'
      },
      {
          title: '队内职务',
          key: 'isleader',
          align: 'center',
          
          render: (h, params) => {
            return h("div",params.row.isleader ?'队长':'队员')
          }
            // return h('isleader',(params.row.isleader==1)?'队长':'队员')}
      },
      {
            title: '5分制成绩',
            key: 'grade5',
            align: 'center',
            render: (h, params) => {
              return h("div",(params.row.grade5===-1) ?'未公布':params.row.grade5)
            }
      },
      {
            title: '百分制成绩',
            key: 'grade100',
            align: 'center',
            render: (h, params) => {
              return h("div",(params.row.grade100===-1) ?'未公布':params.row.grades100)
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
    axios.get(url+'AllInOneTeacher/').then(function (resp){
      console.log(resp);
      _this.data = resp.data.data;
    })
    
},
methods: {
    handleClearCurrentRow () {
      this.$refs.currentRowTable.clearCurrentRow();
    },
    backTo(){
      this.$router.go(-1);//返回上一层
    },
    show (index) {
      this.$Modal.info({
        title: '学生信息',
        content: `学生学号：${this.data[index].studentId}<br>学生姓名：${this.data[index].studentName}<br>学生班级：${this.data[index].studentClass}
        <br>学生电话：${this.data[index].studentTelephone}<br>队内职务：${(this.data[index].isleader==1)?'队长':'队员'}`
      })
    },
    //进入教师项目页面
    enter (index) {
      this.$router.push('student/'+this.data[index].studentId)
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