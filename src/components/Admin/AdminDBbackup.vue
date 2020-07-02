<template>
  <div class="Container">
    <h1>数据库备份界面</h1>
    <div class="MForm">
      <Button type="primary" class="button" @click="backup" icon="ios-add-circle-outline">一键备份</Button>

      <br><br>

      <div class="TableManage">
        <Table :loading="tableloading" border :columns="header" :data="data">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="put(index)">备份复原</Button>
              <Button type="error" size="small" @click="remove(index)">删除备份</Button>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import GLOBAL from '@/api/global_variable'
const url = GLOBAL.apiURL+'Database/backup/';

export default {
  inject:['reload'],
  data() {
    return {
      tableloading:true,
      data:[],
      header: [
            {title: '备份',key: 'title',align: 'center'},
            {title: '操作',slot: 'action',width: 300, align: 'center'},
          ],
    };
  },
  created() {
    axios.get(url).then(res => {
      this.data = res.data.data
      this.tableloading = false
    })
  },
  methods: {
    backup() {
      var  result = confirm("您确定要进行备份吗？")
      if(result){
        var date = new Date();
        this.$Message.warning('您正在备份请耐心等待');
        axios.post(url + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()+"-" + date.getHours()+"_" + date.getMinutes()+'_'+date.getSeconds()+' Backup')
        .then(res=>{
          console.log(res)
          this.$Notice.warning({
            title: "备份成功",
            desc:"您已经备份成功",
            duration: 6
          });
          this.reload();
        })
      }
    },
    remove (index) {
      var result = confirm("您确认删除吗？")
      if(result){
        axios.delete(url+this.data[index].title)
        .then(res=>{
        if(res.data.success){
          this.$Message.success('删除数据成功');
          this.reload();//刷新页面
        }else{
          this.$Message.error('删除数据失败');
          this.reload();//刷新页面
        }
      })
      }
    },
    put(index) {
      this.$Message.warning('您正在还原备份');
      axios.put(url,this.data[index].title)
      .then(res=>{
        this.$Message.success('还原备份成功');
        this.reload();//刷新页面
      })
    },
    change(status) {
      if (status) {
        this.visibility = "visibility:visible";
        this.switch_status = true;
        this.$Notice.info({
          title: "正在开启备份",
          desc:
            "检测到您正在开启备份，请完善相关设置，并点击[确认]按钮以后开启备份状态",
          duration: 7
        });
      } else {
        this.visibility = "visibility:hidden";
        this.switch_status = false;
        this.$Notice.warning({
          title: "正在关闭备份",
          desc:
            "检测到您正在关闭备份，若为误点击无需其他操作，如果意在关闭备份状态请点击[确认]按钮后生效",
          duration: 7
        });
      }
    },
    confirm() {
      this.$Modal.confirm({
        title: "请再次确认！",
        content: "您确定要"+((this.visibility=="visibility:visible")?'开启':'关闭')+"备份状态吗" ,
        onOk: () => {
          this.$Message.info("确认成功，当前备份状态："+((this.visibility=="visibility:visible")?'开启':'关闭'));
        },
        onCancel: () => {
          this.$Message.info("您取消了当前的操作");
        }
      });
    }
  },
  
};
</script>

<style scoped>
.commit {
  margin: 10px 20px;
}
.Container{
  padding: 10px;
}
.MForm{
      padding: 20px 0;
}
.TableManage{
  margin: 0px 0 20px 0;
  border-radius: 100px;
}
</style>