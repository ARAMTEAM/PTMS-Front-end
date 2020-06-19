<template>
  <div class="Container" >
    <h1>教务管理界面</h1>
    <div class="MForm">
        <!-- 增加教务跳转页面 -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">增加教务</Button>
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
          {jiaowu_id:201100000001,jiaowu_dept:'软件学院',jiaowu_name:'崔老师',},
          {jiaowu_id:201100000002,jiaowu_dept:'微电子学院',jiaowu_name:'王老师',},
          {jiaowu_id:201100000003,jiaowu_dept:'马克思学院',jiaowu_name:'樊老师',},
          {jiaowu_id:201100000004,jiaowu_dept:'电气工程学院',jiaowu_name:'周老师',},
          {jiaowu_id:201100000005,jiaowu_dept:'数学学院',jiaowu_name:'田老师',},
          {jiaowu_id:201100000006,jiaowu_dept:'物理学院',jiaowu_name:'秦老师',},
          {jiaowu_id:201100000007,jiaowu_dept:'化工学院',jiaowu_name:'王老师',},
          {jiaowu_id:201100000008,jiaowu_dept:'软件学院',jiaowu_name:'吴老师',},
          {jiaowu_id:201100000009,jiaowu_dept:'文学院',jiaowu_name:'臧老师',},
          {jiaowu_id:201100000010,jiaowu_dept:'外国语学院',jiaowu_name:'崔老师',},
        ],
        columns3: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '教务号',
              width: 250,
              key: 'jiaowu_id',
              align: 'center'
          },
          {
              title: '教务名称',
              key: 'jiaowu_name',
              align: 'center'
          },
          {
              title: '教务机构',
              key: 'jiaowu_dept'
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
                title: '教务信息',
                content: `教务号：${this.data[index].jiaowu_id}<br>教务名称：${this.data[index].jiaowu_name}<br>教务机构：${this.data[index].jiaowu_dept}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        },
        edit(index){
            
        },
        create(){
            this.$router.push('eamanage/create')
        },
        search(pageIndex) {
            console.log(pageIndex)
        }
    },

    components:{
 
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