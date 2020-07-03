<template>
  <div class="Container" >
    <h1>志愿分配</h1>
    <div class="MForm">
      <Button type="success" :loading="loading" class="button" @click="allocate" icon="ios-calendar">志愿一键分配</Button>
      <Button type="warning" class="button" @click="chakan" icon="ios-warning">查看未分配成功学生</Button>
      <div class="EAManage">
        <!-- 表格内容 -->
        <Table :loading="tableloading" stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <Button type="success" size="small" style="margin-right: 5px" @click="pass(index)">通过</Button>
              <Button type="error" size="small" style="margin-right: 5px" @click="notpass(index)">不通过</Button>
          </template>
        </Table>
        <!-- 用于更新和增加教师项目的表单 -->
        <Modal v-model="Modal" width="800" :closable="false" :mask-closable="false" >
          <p slot="header" >
            <span>{{ mode }}</span>
          </p>
          <div class="TableManage" >
            <!-- 表格内容 -->
            <Table stripe :loading="tableloading2" border  ref="currentRowTable" :columns="header2" :data="weifenpei">
              <template slot-scope="{ row }" slot="name">
                  <strong>{{ row.name }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="warning" size="small" style="margin-right: 5px" @click="toStudent(index)">教务分配</Button>
              </template>
            </Table>
          </div>
          <br>
          <div class="page">
            <Page :total=weifenpeitotal :page-size="10" show-total @on-change="page1"/> 
          </div>

          <div slot="footer">
            <Button class="button" icon="md-refresh" @click="handleReset('TPForm')" style="margin-left: 8px">重置</Button>
            <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
            <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading" @click="addOk('TPForm')">提交</Button>
          </div>
        </Modal>
        <Modal v-model="noticeModal"  title="当前实训公告管理" width="1200" :styles="{top: '0px'}">
          <Notice></Notice>
        </Modal>
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
import Notice from "@/components/EA/EANoticeManage";
export default {
    inject:['reload'],
    components:{Notice},
    data(){
      return {
        tableloading:true,
        tableloading2:true,
        loading:false,//表单的loadiing状态
        Modal:false,
        Modal1:false,
        noticeModal:false,
        correctMes:'',
        mode:'',
        total: null,
        weifenpeitotal: null,
        data: [],
        teacher:{},//所有老师，供选择
        trainingId:'',//记录当前的trainingid，在填表时自动填写
        weifenpei:[],
        header: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '学生学号',
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
              title: '第一志愿',
              key: 'e1',
              align: 'center'
          },
          {
              title: '第二志愿',
              key: 'e2',
              align: 'center'
          },
          {
              title: '第三志愿',
              key: 'e3',
              align: 'center'
          },
          {
              title: '第四志愿',
              key: 'e4',
              align: 'center'
          },
          {
              title: '第五志愿',
              key: 'e5',
              align: 'center'
          },

        ],
        header2: [
            {title: '学生学号',key: 'studentId',align: 'center'},
            {title: '学生姓名',key: 'studentName',align: 'center'},
            {title: '学生班级',key: 'studentClass',align: 'center'},
            {title: '学生电话',key: 'studentTelephone',align: 'center'},
            {title: '操作',slot: 'action',width: 100, align: 'center'},
        ],
        debate1: { projectId:null,trainingId:null,projectStatus:'需答辩'},
        notpass1: { projectId:null,trainingId:null, projectStatus:'不通过'},
        pass1: {  projectId:null,trainingId:null,projectStatus:'通过'},
      }
    },
    created(){
      const _this = this;
      axios.get(GLOBAL.apiURL+'expectation/All/'+_this.$route.params.trainingId+'/1').then(function (resp){
        console.log(resp);
        _this.data = resp.data.data.content;
        _this.total = resp.data.data.totalElements; 
        _this.tableloading = false
      })
      axios.get(GLOBAL.apiURL+'stuAndpro/listNoProjectStudent/'+this.$route.params.trainingId+'/1')
      .then(function (resp){
        _this.weifenpei = resp.data.data.content
        _this.weifenpeitotal = resp.data.data.totalElements
        console.log(_this.weifenpei)
        _this.tableloading2 = false
      })
    },
    methods: {
        handleClearCurrentRow () {
            this.$refs.currentRowTable.clearCurrentRow();
        },
        handleReset (name) {
                this.$refs[name].resetFields();
        },
        allocate(){
          this.loading = true,
              axios.post(GLOBAL.apiURL+'expectation/allot/'+this.$route.params.trainingId)
              .then(res=>{
                  if(res.data.success){
                    this.loading = false,
                    this.$Notice.success({
                      title: '分配完成|返回信息如下：',
                      desc: res.data.message,
                      duration: 10
                    });
                    this.reload()
                  }
              })
        },
        chakan(){
          this.Modal = true
        },
        toStudent(index){
            this.$router.push('/ea/student/'+this.weifenpei[index].studentId)
        },
        create(){
          this.mode = 'create';
          this.correctMes = '新增成功！';
          this.Modal = true
          this.formItem={ ...this.formItem1}
          this.formItem.trainingId=this.$route.params.training_id
          this.formItem.projectStatus="通过"
          console.log(this.formItem)
        },
        addOk(name){
          console.log(this.formItem.grade)
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.loading = true;
              if(this.mode=='create'){
                setTimeout(() => {
                  axios.post(url+'jiaowuAdd',this.formItem)
                  .then(res=>{
                    console.log(res);
                    if(res.data.success)
                    {
                      this.$Message.success(this.correctMes);
                      this.loading = false;//停止加载
                      this.Modal = false;//关闭对话框组件
                      this.Modal = true;
                      this.reload();//刷新页面
                    }
                    else{
                      this.loading = false;
                      this.$Message.error('提交失败');
                    }
                  })
                },1000)
              }
              else{
                setTimeout(() => {
                  axios.put(url+'jiaowu',this.formItem)
                  .then(res=>{
                    console.log(res);
                    if(res.data.success)
                    {
                      this.$Message.success(this.correctMes);
                      this.loading = false;//停止加载
                      this.Modal = false;//关闭对话框组件
                      this.Modal = true;
                      this.reload();//刷新页面
                    }
                    else{
                      this.loading = false;
                      this.$Message.error('更新失败');
                    }
                  })
                  // this.loading=false
                },1000)
              }
            } else {
              this.loading=false;
              this.$Message.error('请完善后再提交');
            }
          })
        },
        addCancel(){
          this.loading=false;
          this.Modal = false
        },
        page(currentPage) {
            const _this = this
            axios.get(GLOBAL.apiURL+'expectation/All/'+_this.$route.params.trainingId+'/'+currentPage).then(function (resp){
              _this.data = resp.data.data.content;
              _this.total = resp.data.data.totalElements; 
            })
        },
        page1(currentPage) {
            const _this = this
            axios.get(GLOBAL.apiURL+'stuAndpro/listNoProjectStudent/'+this.$route.params.trainingId+'/'+currentPage).then(function (resp){
              _this.weifenpei = resp.data.data.content;
              _this.weifenpeitotal = resp.data.data.totalElements; 
            })
        }
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