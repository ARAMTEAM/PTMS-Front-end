<template>
  <div class="Container" >
    <h1>公告管理界面</h1>
    <div class="MForm">
        <!-- 增加教务跳转页面 -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">增加公告</Button>
      <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
      <br><br>

      <div class="EAManage">
        <!-- 表格内容 -->
        <Table stripe  border  highlight-row ref="currentRowTable" :columns="columns3" :data="data">
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
          <Page :total="100" :page-size="5" show-total @on-change="search"/>
        </div>

      
    </div>
  </div>
  
</template>

<script>

export default {
    data(){
      return {
        data:[
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'软件学院通知全体同学请注意最近的事情等等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'微电子学院通知全体同学请注意最近的事情等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'马克思学院通知全体同学请注意最近的事情等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'电气工程学院通知全体同学请注意最近的事情等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'数学学院通知全体同学请注意最近的事情等等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'物理学院通知全体同学请注意最近的事情等等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'化工学院通知全体同学请注意最近的事情等等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'软件学院通知全体同学请注意最近的事情等等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'文学院通知全体同学请注意最近的事情等等等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
          {jiaowunotice_id:'1',jiaowunotice_title:'软件学院通知',jiaowunotice_content:'外国语学院通知全体同学请注意最近的事情等等等',jiaowunotice_create_time:'2020-02-03',jiaowunotice_update_time:'2020-05-06'},
        ],
        columns3: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '公告编号',
              width: 100,
              key: 'jiaowunotice_id',
              align: 'center'
          },
          {
              title: '公告标题',
              key: 'jiaowunotice_title',
          },
          {
              title: '创建时间',
              key: 'jiaowunotice_create_time',
          },
          {
              title: '更新时间',
              key: 'jiaowunotice_update_time',
          },
          {
              title: 'Action',
              slot: 'action',
              width: 250,
              align: 'center'
          }
        ],
      
        }
    },
    methods: {
        handleClearCurrentRow () {
            this.$refs.currentRowTable.clearCurrentRow();
        },
        show (index) {
            this.$Modal.info({
                title: '公告信息',
                content: `公告编号：${this.data[index].jiaowunotice_id}<br>公告标题：${this.data[index].jiaowunotice_title}<br>发布时间：${this.data[index].jiaowunotice_create_time}<br>发布时间：${this.data[index].jiaowunotice_update_time}
                <br>公告内容：${this.data[index].jiaowunotice_content}`
            //.slice(0,15) + '...'实现简介功能
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        },
        edit(index){
            
        },
        create(){
            this.$router.push('noticemanage/create')
        },
        search(pageIndex) {
            console.log(pageIndex)
        }
    },

    components:{
 
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 10) {
          return value.slice(0,10) + '...'
        }
        return value
      }
    }

}
</script>

<style>
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