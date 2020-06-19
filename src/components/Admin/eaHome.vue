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
        <Table stripe  border  highlight-row ref="currentRowTable" :columns="columns3" :data="eaData">
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
                title: '教务信息',
                content: `教务号：${this.eaData[index].jiaowu_id}<br>登陆账号：${this.eaData[index].jiaowu_username}<br>教务名称：${this.eaData[index].jiaowu_name}<br>教务机构：${this.eaData[index].jiaowu_dept}<br>教务年级：${this.eaData[index].jiaowu_nianji}`
            })
        },
        remove (index) {

        },
        edit(index){
            
        },
        create(){
            this.$router.push('eamanage/create')
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