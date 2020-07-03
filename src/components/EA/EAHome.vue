<template>
  <div style="padding:10px;">
      <h1>教务首页</h1>
      <div class="Container">
          <div style="margin: 20px 0;">
              <h2>管理人员</h2>
              <Row>

                  <Col span="8">
                      <mycard icon="md-people" title="管理教师数量" :count="teacherNum" bgcolor="#d1d8e0"></mycard>
                  </Col>
                  <Col span="8">
                      <mycard icon="md-person" title="管理学生数量" :count="studentNum" bgcolor="#778ca3"></mycard>
                  </Col>
              </Row>
          </div>
          <div style="margin: 20px 0;">
              <h2>管理员公告</h2>
              <Row>
                  <Col span="24">
                      <template>
                          <Table :loading="tablelaoding" :columns="columns" :data="notice" height="240"></Table>
                      </template>
                  </Col>
              </Row>
          </div>
          <div style="margin: 20px 0;">
            <h2>快速审批通道</h2>
            <Row>
              <Col span="6">
                <button class="btn" @click='shenhe'>待审核项目审批</button>
              </Col>
              <Col span="2">
                <div>-</div>
              </Col>

              <Col span="6">
                <button class="btn" @click='dabian'>待答辩项目审批</button>
  
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
      components:{
          mycard
      },
      data () {
          return {
              tablelaoding:true,
              num: 0,
        numTween: 0,
              percent: 0,
              backup:[],
              log:[],
              notice:[],
              teacherNum:0,
              studentNum:0,
              columns: [
                  {
                      type: 'index',
                      width: 60,
                      align: 'center'
                  },
                  {
                      title: '公告编号',
                      key: 'adminnoticeId',
                      align: 'center'
                  },
                  {
                      title: '公告标题',
                      key: 'adminnoticeTitle',
                      align: 'center'
                  },
                  {
                      title: '公告内容',
                      key: 'adminnoticeContent',
                      align: 'center'

                  },
                  {
                      title: '发布时间',
                      key: 'adminnoticeUpdateTime',
                      align: 'center',
                      render: (h, params) => {
                          let time = moment(params.row.adminnoticeUpdateTime).format('YYYY-MM-DD HH:mm:ss')
                          return h('div', time);
                      }
                  },
              ],
          }
      },
      created() {
          const _this = this
          
          axios.get(url+'teacher/All/1').then(function (resp){
              _this.teacherNum = resp.data.data.totalElements
          })
          axios.get(url+'student/All/1').then(function (resp){
              _this.studentNum = resp.data.data.totalElements
          })
          axios.get(url+'adminnotice/1').then(function (resp){
              _this.notice = resp.data.data.content
              _this.tablelaoding = false
          })
      },
      computed: {

      },
      
      methods: {
        shenhe(){
          this.$router.push('/ea/project')
        },
        dabian(){
          this.$router.push('/ea/project1')
        }
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