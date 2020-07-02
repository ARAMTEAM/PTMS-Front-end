<template>
  <div class="Container" >
    <h1>项目指导列表</h1>
    <div class="MForm">
        <!-- 按钮以及检索 -->
      <!-- <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button> -->
      <!-- <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">项目申请</Button> -->
      <!-- <Button @click="noticeModal = true" class="button" icon="md-book">公告管理</Button> -->
<!-- <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button> -->
      <!-- <Input search enter-button style="width:30%;float:right;" placeholder="检索项目" /> -->
      <!-- <br><br> -->

      <div class="EAManage">
        <!-- 表格内容 -->
        <Table stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="success" size="small" style="margin-right: 5px" @click="enter(index)">进入项目</Button>
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
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
import GLOBAL from '@/api/global_variable'
const url = GLOBAL.apiURL+'project/';
export default {
    data(){
      return {
        total: null,
        data: [],
        Info:{},//当前角色的信息，这也就是教师的基本信息
        header: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '项目编号',
              width: 100,
              key: 'projectId',
              align: 'center'
          },
          {
              title: '项目名称',
              key: 'projectName',
              align: 'center'
          },
          {
              title: '项目最大人数',
              key: 'projectMaxNum',
              align: 'center'

          },
          {
              title: '项目类型',
              key: 'projectApplicantType',
              align: 'center'
          },
          {
              title: '项目当前状态',
              key: 'projectStatus',
              align: 'center'
          },
          {
              title: '操作',
              slot: 'action',
              width: 300,
              align: 'center'
          }
        ],
      }
    },
    created(){
      const _this = this;
      axios.get(GLOBAL.apiURL+'teacher/One/'+this.$options.methods.getCookie('id'))
      .then(res=>{
        this.Info=res.data.data
          axios.get(url+'teacher/all/'+this.Info.teacherId+'/1').then(function (resp){
          console.log(resp);
          _this.data = resp.data.data.content;
          _this.total = resp.data.data.totalElements; 
        })
      })


      
    },
    methods: {
        enter(index){
          this.$router.push('project/'+this.data[index].projectId)
        },
        show (index) {
            this.$Modal.info({
              title: '项目信息',
                content: `项目编号：${this.data[index].projectId}<br>项目名称：${this.data[index].projectName}<br>项目最大人数：${this.data[index].projectMaxNum}<br>项目类型：${this.data[index].projectApplicantType}
                <br>项目状态：${this.data[index].projectStatus}<br>项目介绍：${this.data[index].projectIntroduction}<br>项目助教：${this.data[index].projectHelper}<br>助教电话：${this.data[index].projectHelperTel}<br>阶段性报告提交阶段时间间隔：${this.data[index].projectIntervalDay}天
                <br>指导教师：${this.data[index].teacherName}<br>所属实训：${this.data[index].trainingId}`
            })
        },
        page(currentPage) {
            const _this = this
            axios.get(url+'teacher/all/'+this.Info.teacherId+'/'+currentPage).then(function (resp){
              console.log(resp);
              _this.data = resp.data.data.content;
              _this.total = resp.data.data.totalElements; 
            })
        },
        getCookie(cname)        
        {        
        var name = cname + "=";        
        var ca = document.cookie.split(';');        
        for(var i=0; i<ca.length; i++)        
          {        
          var c = ca[i].trim();        
          if (c.indexOf(name)==0) return c.substring(name.length,c.length);        
          }        
        return "";        
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