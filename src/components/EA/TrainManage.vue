<template>
  <div class="Container" >
    <h1>实训管理界面</h1>
    <div class="MForm">
        <!-- 增加教务跳转页面 -->
      <Button type="primary" class="button" @click="create" icon="ios-add-circle-outline">增加实训</Button>
      <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button>
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
              title: '实训编号',
              width: 100,
              key: 'training_id',
              align: 'center'
          },
          {
              title: '实训课程号',
              key: 'training_kch',
              align: 'center'

          },
          {
              title: '实训课序号',
              key: 'training_kxh',
              align: 'center'
          },
          {
              title: '实训名称',
              key: 'training_name',
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
                title: '实训信息',
                content: `实训编号${this.eaData[index].training_id}<br>实训名称：${this.eaData[index].training_name}<br>实训课程号：${this.eaData[index].training_kch}<br>实训课序号：${this.eaData[index].training_kxh}
                <br>创新实训申请时间：${this.eaData[index].training_time_1}<br>创新实训申请结束：${this.eaData[index].training_time_2}<br>创新实训结束时间：${this.eaData[index].training_time_3}
                <br>项目实训志愿填报：${this.eaData[index].training_time_4}<br>项目实训志愿截止：${this.eaData[index].training_time_5}<br>项目实训结束时间：${this.eaData[index].training_time_6}
                <br>实训备注：${this.eaData[index].training_notice}`
            })
        },
        remove (index) {

        },
        edit(index){
          this.$router.push('training/index')
        },
        create(){
            this.$router.push('training/create')
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