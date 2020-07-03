<template>
  <div style="padding:10px;">
      <h1>教师首页</h1>
      <div class="Container">
          <div style="margin: 20px 0;">
              <h2>管理人员</h2>
              <Row>

                  <Col span="8">
                      <mycard icon="ios-paper" title="管理项目数量" :count="projectNum" bgcolor="#d1d8e0"></mycard>
                  </Col>
                  <Col span="8">
                      <mycard icon="ios-keypad" title="所属实训编号" :count="Info.trainingId" bgcolor="#778ca3"></mycard>
                  </Col>
              </Row>
          </div>
          <div style="margin: 20px 0;">
              <h2>实训公告</h2>
              <Row>
                  <Col span="24">
                      <template>
                          <Table :loading="tablelaoding" :columns="columns" :data="notice" height="240"></Table>
                      </template>
                      <br>
                      <div class="page" >
                        <Page :total=total :page-size="10" show-total @on-change="page"/> 
                      </div>
                  </Col>
              </Row>
          </div>
          <div style="margin: 20px 0;">
            <h2>项目监督快速</h2>
            <Row>
              <Col span="6">
                <button class="btn" @click='xiangmu'>项目列表</button>
              </Col>
              <Col span="2">
                <div>-</div>
              </Col>
              <Col span="6">
                <button class="btn" @click='xuesheng'>学生列表</button>
  
              </Col>
          </Row>
        </div>
      
  </div>
  </div>

</template>

<script>

import mycard from '@/components/card/mycard'
import GLOBAL from '@/api/global_variable'
import moment from 'moment'

const url = GLOBAL.apiURL
  export default {
      props:{
        Info: {
            type:Object,
            required:true
          }
      },
      components:{
          mycard
      },
      data () {
          return {
              total:null,
              tablelaoding:true,
              num: 0,
              numTween: 0,
              percent: 0,
              backup:[],
              log:[],
              notice:[],
              projectNum:0,
              studentNum:0,
              columns: [
                  {
                      type: 'index',
                      width: 60,
                      align: 'center'
                  },
                  {
                      title: '教务老师',
                      key: 'jiaowuName',
                      align: 'center'
                  },
                  {
                      title: '公告标题',
                      key: 'trainingnoticeTitle',
                      align: 'center'
                  },
                  {
                      title: '公告内容',
                      key: 'trainingnoticeContent',
                      align: 'center'

                  },
                  {
                      title: '发布时间',
                      key: 'trainingnoticeCreateTime',
                      align: 'center',
                      render: (h, params) => {
                          let time = moment(params.row.trainingnoticeCreateTime).format('YYYY-MM-DD')
                          return h('div', time);
                      }
                  },
                  {
                      title: '公告更新时间',
                      key: 'trainingnoticeUpdateTime',
                      align: 'center',
                      render: (h, params) => {
                          let time = moment(params.row.adminnoticeUpdateTime).format('YYYY-MM-DD ')
                          return h('div', time);
                      }
                  },
              ],
          }
      },
      created() {
          const _this = this
          console.log(this.Info)
          axios.get(GLOBAL.apiURL+'teacher/One/'+this.$options.methods.getCookie('id'))
          .then(res=>{
            this.Info=res.data.data
            axios.get(url+'project/teacher/all/'+_this.Info.teacherId+'/1').then(function (resp){
              _this.projectNum = resp.data.data.totalElements
            })
            axios.get(url+'jiaowunotice/'+_this.Info.trainingId+'/1').then(function (resp){
                _this.notice = resp.data.data.content
                _this.total = resp.data.data.totalElements
                _this.tablelaoding = false
                console.log(_this.notice)
            })
          })
          
      },
      computed: {

      },
      
      methods: {
        xiangmu(){
          this.$router.push('/teacher/project')
        },
        xuesheng(){
          this.$router.push('/teacher/student')
        },
        page(currentPage) {
            const _this = this
            axios.get(url+'jiaowunotice/'+this.Info.trainingId+'/'+currentPage).then(function (resp){
              console.log(resp);
              _this.notice = resp.data.data.content;
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
      }
  }
</script>

<style scoped>

.flex{
  display: flex;
}

.flex-col{
  flex-direction: column;
}

.j-center{
  justify-content: center;
}

.a-center{
  align-items: center;
}

.j-bt{
  justify-content: space-between;
}

.flex-1{
  flex:1;
}
.btn{
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    margin: 2rem 0;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background-image: linear-gradient(to right,#95a5a6,#95a5b6,#95a5c6);
    cursor: pointer;
    color: #fff;
    text-transform: uppercase;
    /* font-family: 'Roboto', sans-serif; */
    background-size: 200%;
    transition: .5s;
}
.btn:hover{
    background-position: right;
}
</style>