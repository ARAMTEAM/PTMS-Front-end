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
        <Table :loading="tableloading" stripe  border  highlight-row ref="currentRowTable" :columns="header" :data="data">
          <template slot-scope="{ row }" slot="name">
              <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
              <Button type="success" size="small" style="margin-right: 5px" @click="enter(index)">进入</Button>
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看</Button>
              <Button type="warning" size="small" style="margin-right: 5px" @click="edit(index)">编辑</Button>
              <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
        <!-- 用于更新和增加教师基本信息的表单 -->
        <Modal v-model="Modal" width="600" :closable="false" :mask-closable="false" >
          <p slot="header" >
            <span>{{ mode }}</span>
          </p>
          <Form v-if="Modal" ref="Form" :model="formItem" :label-width="200" :rules="ruleInline">
            <FormItem label="实训名称" prop="trainingName">
                <Input v-model="formItem.trainingName" placeholder="请输入实训名称"></Input>
            </FormItem>
            <FormItem label="课程号" prop="kechengId">
                <Input v-model="formItem.kechengId" placeholder="请输入课程号"></Input>
            </FormItem>
            <FormItem label="课序号" prop="kexuID">
                <Input v-model="formItem.kexuID" placeholder="请输入课序号"></Input>
            </FormItem>

            <Row>
                <Form-item label="创新实训开始申请时间" prop="trainingTime1">
                    <Date-picker type="date" placeholder="申请创新实训开始时间" v-model="formItem.trainingTime1"></Date-picker>
                </Form-item>
                <Form-item label="创新实训申请结束" prop="trainingTime2">
                    <Date-picker type="date" placeholder="结束申请创新实训时间" v-model="formItem.trainingTime2"></Date-picker>
                </Form-item>
                <Form-item label="创新实训结束" prop="trainingTime3">
                    <Date-picker type="date" placeholder="选择创新实训结束时间" v-model="formItem.trainingTime3"></Date-picker>
                </Form-item>
            </Row>
            
            <Form-item label="项目实训志愿填报时间" prop="trainingTime4">
                <Date-picker type="date" placeholder="学生填报志愿时间" v-model="formItem.trainingTime4"></Date-picker>
            </Form-item>
            <Form-item label="项目实训志愿填报截止" prop="trainingTime5">
                <Date-picker type="date" placeholder="学生志愿填报截止" v-model="formItem.trainingTime5"></Date-picker>
            </Form-item>
            <Form-item label="项目实训结束" prop="trainingTime6">
                <Date-picker type="date" placeholder="项目实训结束时间" v-model="formItem.trainingTime6"></Date-picker>
            </Form-item>

            </FormItem>
            

          </Form>

          <div slot="footer">
            <Button class="button" icon="md-refresh" @click="handleReset('Form')" style="margin-left: 8px">重置</Button>
            <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
            <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading" @click="addOk('Form')">提交</Button>
          </div>
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
const url = GLOBAL.apiURL+'training/';
export default {
    inject:['reload'],
    data(){
      return {
        tableloading:true,
        loading:false,//表单的loadiing状态
        Modal:false,
        mode:'',
        correctMes:'',
        total: null,
        data: [],
        header: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '实训编号',
              width: 200,
              key: 'trainingId',
              align: 'center'
          },
          {
              title: '实训名称',
              key: 'trainingName',
              align: 'center'
          },
          {
              title: '实训课程号',
              key: 'kechengId',
              align: 'center'

          },
          {
              title: '实训课序号',
              key: 'kexuID',
              align: 'center'
          },
          {
              title: 'Action',
              slot: 'action',
              width: 300,
              align: 'center'
          }
        ],
        formItem: {trainingName:'',kechengId: '',kexuID:'',trainingNotice:'',trainingTime1: '',trainingTime2: '',trainingTime3: '', 
                    trainingTime4: '', trainingTime5: '', trainingTime6: '',},
        formItem1: {trainingName:'',kechengId: '',kexuID:'',trainingNotice:'',trainingTime1: '',trainingTime2: '',trainingTime3: '', 
                    trainingTime4: '', trainingTime5: '', trainingTime6: '',},
        ruleInline: {
          trainingName: [
                { required: true, message: '教务用户名禁止为空', trigger: 'blur' }
            ],
            kechengId: [
                { required: true, message: '教务账号禁止为空', trigger: 'blur' }
            ],
            kexuID: [
                { required: true, message: '教务账号禁止为空', trigger: 'blur' }
            ],
            trainingNotice: [
                { required: true, message: '请填写实训说明', trigger: 'blur' }
            ],
            trainingTime1: [
                { required: true,type: 'date', message: '禁止为空', trigger: 'blur' }
            ],
            trainingTime2: [
                { required: true,type: 'date', message: '禁止为空', trigger: 'blur' }
            ],
            trainingTime3: [
                { required: true,type: 'date', message: '禁止为空', trigger: 'blur' }
            ],
            trainingTime4: [
                { required: true,type: 'date', message: '禁止为空', trigger: 'blur' }
            ],
            trainingTime5: [
                { required: true,type: 'date', message: '禁止为空', trigger: 'blur' }
            ],
            trainingTime6: [
                { required: true,type: 'date', message: '禁止为空', trigger: 'blur' }
            ],
        },
      
      }
    },
    created(){
      const _this = this;
      axios.get(url+'All/1').then(function (resp){
        _this.data = resp.data.data.content;
        _this.total = resp.data.data.totalElements; 
        _this.tableloading = false;
      })
    },
    methods: {
        handleClearCurrentRow () {
            this.$refs.currentRowTable.clearCurrentRow();
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        show (index) {
            this.$Modal.info({
                title: '实训信息',
                content: `实训编号：${this.data[index].trainingId}<br>实训名称：${this.data[index].trainingName}<br>实训课程号：${this.data[index].kechengId}<br>实训课序号：${this.data[index].kexuID}
                <br>创新实训申请时间：${this.data[index].trainingTime1}<br>创新实训申请结束：${this.data[index].trainingTime2}<br>创新实训结束时间：${this.data[index].trainingTime3}
                <br>项目实训志愿填报：${this.data[index].trainingTime4}<br>项目实训志愿截止：${this.data[index].trainingTime5}<br>项目实训结束时间：${this.data[index].trainingTime6}
                <br>实训备注：${this.data[index].trainingNotice}`
            })
        },
        remove (index) {
          var result = confirm("您确认删除吗？")
          if(result){
            axios.delete(url+this.data[index].trainingId)
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
        enter(index){
          this.$router.push('/ea/training/'+this.data[index].trainingId)
        },
        edit(index){
          this.mode = 'update';
          this.correctMes = '更新成功！';
          this.Modal = true
          
          this.formItem={...this.data[index]}
        },
        create(){
          this.mode = 'create';
          this.correctMes = '新增成功！';
          this.Modal = true
          this.formItem={ ...this.formItem1}
        },
        addOk(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.loading = true;
              if(this.mode=='create'){
                setTimeout(() => {
                  axios.post(url,this.formItem)
                  .then(res=>{
                    if(res.data.success)
                    {
                      this.$Message.success(this.correctMes);
                      this.loading = false;//停止加载
                      this.Modal = false;//关闭对话框组件
                      this.reload();//刷新页面
                    }
                    else{
                      this.loading = false;
                      this.$Message.error(res.data.message);
                    }
                  })
                },1000)
              }
              else{
                setTimeout(() => {
                  axios.put(url,this.formItem)
                  .then(res=>{
                    if(res.data.success)
                    {
                      this.$Message.success(this.correctMes);
                      this.loading = false;//停止加载
                      this.Modal = false;//关闭对话框组件
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
            axios.get(url+'All/'+currentPage).then(function (resp){
              _this.data = resp.data.content;
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