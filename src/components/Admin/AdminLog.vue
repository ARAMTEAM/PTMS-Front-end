<template>
  <div class="Container">
    <h1>查看日志界面</h1>
    <div class="LogForm">
        <Table :loading="tableloading" :columns="columns" :data="data"></Table>
    </div>
    <br/>
        <!-- 分页 -->
        <div class="page">
            <Page :total=total :page-size="10" show-total @on-change="page"/> 
        </div>    
  </div>
</template>

<script>
import GLOBAL from '@/api/global_variable'
const url = GLOBAL.apiURL
import moment from 'moment'
export default {
data () {
    return {
        total: null,
        tableloading:true,
        data:[],
        columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '登录账户',
                        key: 'userId',
                        align: 'center'
                    },
                    {
                        title: '用户类型',
                        key: 'userType',
                        align: 'center'
                    },
                    {
                        title: '登录IP',
                        key: 'ip',
                        align: 'center'

                    },
                    {
                        title: '进行操作',
                        key: 'operation',
                        align: 'center'
                    },
                    {
                        title: '登陆时间',
                        key: 'time',
                        align: 'center',
                        render: (h, params) => {
                            let time = moment(params.row.time).format('YYYY-MM-DD HH:mm:ss')
                            return h('div', time);
                        }
                    },
                ],
    
    }
  },
    created(){
        const _this = this;
        axios.get(url+'slogs/1').then(function (resp){
            console.log(resp);
            _this.data = resp.data.data.content;
            _this.total = resp.data.data.totalElements; 
            _this.tableloading = false//表格加载成功
        })
    },
    methods: {
        page(currentPage) {
            const _this = this
            axios.get(url+'slogs/'+currentPage,
            ).then(function (resp){
            console.log(resp);
            _this.data = resp.data.data.content;
            _this.total = resp.data.data.totalElements; 
            })
        }
    },
}
</script>

<style scoped>
.LogForm{
  margin: 20px 0;
  border: 1px solid #cfcfcf;
}
.page{
      display:table;
      margin:0 auto;
  }

</style>