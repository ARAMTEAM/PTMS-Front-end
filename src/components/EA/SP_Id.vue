<template>
    <div class="Container" >
      <h1>学生详情界面</h1>
      <div class="MForm">
          <!-- 增加教务跳转页面 -->
        <Button class="button" @click="backTo" icon="ios-arrow-back">返回</Button>
        <!-- <Button type="primary" class="button" @click="edit" icon="ios-add-circle-outline">修改学生基本信息</Button> -->
        <!-- <Button @click="handleClearCurrentRow" class="button" icon="ios-trash">清除选中行标记</Button> -->
        <br><br>
  
        <div class="TableManage">
          <!-- 表格内容 -->
          <Table :loading="tableloading1" stripe border ref="currentRowTable" :columns="header1" :data="student">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="warning" size="small" style="margin-right: 5px" @click="edit1(index)">修改</Button>
          </template>
          </Table>

          <Modal v-model="studentModal" width="600" :closable="false" :mask-closable="false" >
            <p slot="header" >
              <span>学生信息修改</span>
            </p>
            <Form v-if="studentModal" ref="studentForm" :model="formItem" :label-width="100" :rules="ruleInline" >
                <FormItem label="学生学号" prop="studentId">
                    <Input v-model="formItem.studentId" placeholder="请输入学生学号"></Input>
                </FormItem>
                <FormItem label="学生姓名" prop="studentName">
                    <Input v-model="formItem.studentName" placeholder="请输入学生名称"></Input>
                </FormItem>
  
                <FormItem label="学生密码" prop="studentPassword">
                  <Input type="studentPassword" password v-model="formItem.passwd" placeholder="若不需要更新密码请不要输入"></Input>
                </FormItem>
  
                <FormItem label="学生电话" prop="studentTelephone">
                  <Input v-model="formItem.studentTelephone" placeholder="请输入教师电话"></Input>
                </FormItem>
                <FormItem label="学生班级" prop="studentClass">
                    <Input v-model="formItem.studentClass" placeholder="请输入教师邮箱"></Input>
                </FormItem>

                <FormItem label="所在实训" prop="trainingId">
                  <Select v-model="formItem.trainingId" number placeholder="请选择指导教师"> 
                      <Option v-for="(item,i) in training" :value="training[i].trainingId" :key="i">{{training[i].trainingName}}</Option>
                  </Select>
                </FormItem>
            </Form>
            <div slot="footer">
              <Button class="button" icon="md-refresh" @click="handleReset('studentForm')" style="margin-left: 8px">重置</Button>
              <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel">取消</Button>
              <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading" @click="addOk">提交</Button>
            </div>
          </Modal>
        </div>
        
        <!-- style="width: 40%;height:50px;float:left;" -->
        <div class="TableManage" >
          <!-- 表格内容 -->
          <Table stripe :loading="tableloading2" border  ref="currentRowTable" :columns="header2" :data="exceptation">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="warning" size="small" style="margin-right: 5px" @click="editExcept(index)">编辑</Button>
            </template>
          </Table>
        </div>
        <!-- style="width: 55%;float:right;" -->
        <div class="TableManage" >
          <!-- 表格内容 -->
          <Table stripe :loading="tableloading3" border  highlight-row ref="currentRowTable" :columns="header3" :data="project">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="warning" size="small" style="margin-right: 5px" @click="edit3(index)">编辑</Button>
            </template>
          </Table>
          <Modal v-model="projectModal" width="600" :closable="false" :mask-closable="false" >
            <p slot="header" >
              <span>{{ mode }}</span>
            </p>
            <Form v-if="projectModal" ref="projectForm" :model="formItem3" :label-width="100" :rules="ruleInline3" >
  
                <FormItem label="五分制成绩" prop="grade5points">
                  <Input v-model="formItem3.grade5points" number placeholder="请输入五分制成绩"></Input>
                </FormItem>
                <FormItem label="百分之成绩" prop="grades100points">
                    <Input v-model="formItem3.grades100points" number placeholder="请输入百分制成绩"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
              <Button class="button" icon="md-refresh" @click="handleReset('projectForm')" style="margin-left: 8px">重置</Button>
              <Button class="ButtonCommit" icon="ios-arrow-back" @click="addCancel3">取消</Button>
              <Button type="primary" class="ButtonCommit" icon="md-cloud-upload" :loading="loading3" @click="addOk3">提交</Button>
            </div>
          </Modal>
        </div>
  
        <br/>

      </div>
    </div>
    
  </template>
  
  <script>
  import GLOBAL from '@/api/global_variable'
  const url = GLOBAL.apiURL+'student/';

  
  export default {
      inject:['reload'],
      data(){
        return {
          tableloading1:true,
          tableloading2:true,
          tableloading3:true,
          loading:false,//表单的loadiing状态
          loading3:false,//表单的loadiing状态
          studentModal:false,
          exceptModal:false,
          projectModal:false,
          correctMes:'',
          mode:'',
          total: null,
          training:[],//提供选择列表
          data: [],
          studentId:'',
          student:[],
          project:[],
          exceptation:[],
          
          header1: [
            {title: '学生学号',key: 'studentId',align: 'center'},
            {title: '学生姓名',key: 'studentName',align: 'center'},
            {title: '学生班级',key: 'studentClass',align: 'center'},
            {title: '学生电话',key: 'studentTelephone',align: 'center'},
            {title: '实训编号',key: 'trainingId',align: 'center'},
            {title: '实训名称',key: 'trainingName',align: 'center'},
            {title: '操作',slot: 'action',width: 100, align: 'center'},
          ],
          formItem: {studentId:'',studentName:'',studentClass: '',studentTelephone: '',studentPassword:'',trainingId:null,trainingName:'', },
          ruleInline: {
            studentId: [
                  { required: true, message: '学生学号禁止为空', trigger: 'blur' }
              ],
              studentName: [
                  { required: true, message: '学生姓名禁止为空', trigger: 'blur' }
              ],
              studentClass: [
                  { required: true, message: '学生班级禁止为空', trigger: 'blur' }
              ],
              studentTelephone: [
                  { required: true,message: '学生电话禁止为空', trigger: 'blur' }
              ],
              trainingId: [
                  { required: true,type:'number',message: '学生邮箱禁止为空', trigger: 'blur' }
              ],
          },
          header2: [
            {title: '志愿1',key: 'e1',align: 'center'},
            {title: '志愿2',key: 'e2',align: 'center'},
            {title: '志愿3',key: 'e3',align: 'center'},
            {title: '志愿4',key: 'e4',align: 'center'},
            {title: '志愿5',key: 'e5',align: 'center'},
          ],
          formItem2: {e1:'',e2:'',e3:'',e4: '',e5: '',},
          ruleInline2: {
              e1: [
                  { required: true, message: '志愿1禁止为空', trigger: 'blur' }
              ],
              e2: [
                  { required: true, message: '志愿2禁止为空', trigger: 'blur' }
              ],
              e3: [
                  { required: true, message: '志愿3禁止为空', trigger: 'blur' }
              ],
              e4: [
                  { required: true, message: '志愿4禁止为空', trigger: 'blur' }
              ],
              e5: [
                  { required: true, message: '志愿5禁止为空', trigger: 'blur' }
              ],
          },
          header3: [
            // {   title: '所处实训',key: 'trainingId',align: 'center'},
            {   title: '参与项目',key: 'projectName',align: 'center'},
            {
                  title: '队内职务',
                  key: 'isleader',
                  align: 'center',
                  render: (h, params) => {
                    return h("div",params.row.isleader ?'队长':'队员')
                  }
            },
            {
                  title: '通过邀请',
                  key: 'isjointed',
                  align: 'center',
                  render: (h, params) => {
                    return h("div",params.row.isjointed ?'通过':'未通过')
                  }
            },
            {
                  title: '5分制成绩',
                  key: 'grade5points',
                  align: 'center',
                  render: (h, params) => {
                    return h("div",(params.row.grade5points===-1) ?'未公布':params.row.grade5points)
                  }
            },
            {
                  title: '百分制成绩',
                  key: 'grades100points',
                  align: 'center',
                  render: (h, params) => {
                    return h("div",(params.row.grades100points===-1) ?'未公布':params.row.grades100points)
                  }
            },
            {   title: '操作', slot: 'action', width: 200,align: 'center'},
          ],
          formItem3: {studentId:'',projectId:null,grade5points:null,grades_100: null },
          ruleInline3: {

              projectId: [
                  { required: true, type:'number',message: '项目禁止为空', trigger: 'blur' }
              ],
              grade5points: [
                  { required: true, type:'number',message: '5分制成绩禁止为空', trigger: 'blur' }
              ],
              grade5points: [
                  { required: true, type:'number',message: '5分制成绩禁止为空', trigger: 'blur' }
              ],
              grades100points: [
                  { required: true, type:'number',message: '100分制禁止为空', trigger: 'blur' }
              ],
          },
          }
      },
      created(){
        this.studentId = this.$route.params.studentId
        console.log(this.studentId)
        const _this = this;
        axios.get(url+'One/'+_this.studentId).then(function (resp){
          _this.student.push(resp.data.data);
          _this.tableloading1 = false;
        })
        //获取所有实训
        axios.get(GLOBAL.apiURL+'training/All').then(res=>{
          this.training = res.data.data;
        })
        //
        axios.get(GLOBAL.apiURL+'expectation/OneJS/'+this.studentId).then(function (resp){
          _this.exceptation.push(resp.data.data)
          _this.tableloading2 = false;
        })
        axios.get(GLOBAL.apiURL+'stuAndpro/listByStudentId/'+this.studentId).then(function (resp){
          _this.project.push(resp.data.data)
          console.log(_this.project)
          _this.tableloading3 = false;
        })
      },
      methods: {
          handleClearCurrentRow () {
              this.$refs.currentRowTable.clearCurrentRow();
          },
          handleReset (name) {
                  this.$refs[name].resetFields();
          },
          backTo(){
              this.$router.go(-1);//返回上一层
          },
          edit1(index){
            this.studentModal = true;
            this.formItem.studentId = this.studentId
            this.formItem={...this.student[index]}
          },
          edit3(index){
            this.formItem3.studentId = this.studentId
            this.formItem3={...this.project[index]}
            this.projectModal = true;
          },
          edit(){
            this.mode = '学生更新';
            this.correctMes = '学生更新成功';
            this.studentModal = true
            this.formItem=this.data[index]
          },
          addOk(){
            this.$refs.studentForm.validate((valid) => {
                // this.formItem={...this.student[index]}
                      if (valid) {
                        setTimeout(() => {
                        axios.put(url,this.formItem)
                        .then(res=>{
                          console.log(res);
                          if(res.data.success)
                          {
                            this.$Message.success(this.correctMes);
                            this.loading = false;//停止加载
                            this.Modal = false;//关闭对话框组件
                            this.reload();//刷新页面
                          }
                          else{
                            this.loading = false;
                            this.$Message.error('提交失败');
                          }
                        })
                        // this.loading=false
                      },1000)
                        
                      } else {
                          this.loading=false;
                          this.$Message.error('请完善后再提交');
                      }
              })
          },
          addCancel(){
            this.loading=false;
            this.studentModal = false
          },
          addOk3(){
            this.$refs.projectForm.validate((valid) => {
                  // this.formItem3={...this.project[index]}
                      if (valid) {
                        this.loading3 = true;
                        setTimeout(() => {
                          axios.put(GLOBAL.apiURL+'stuAndpro',this.formItem3)
                          .then(res=>{
                            console.log(res);
                            if(res.data.success)
                            {
                              this.$Message.success(res.data.message);
                              this.loading3 = false;//停止加载
                              this.studentModal = false;//关闭对话框组件
                              this.reload();//刷新页面
                            }
                            else{
                              this.loading3 = false;
                              this.$Message.error('提交失败');
                            }
                          })
                          // this.loading=false
                        },1000)

                      } else {
                          this.loading=false;
                          this.$Message.error('请完善后再提交');
                      }
              })
          },
          addCancel3(){
            this.loading3=false;
            this.projectModal = false
          },

          editExcept(index){
            this.mode = '学生志愿';
            this.correctMes = '学生志愿更新成功';
            this.exceptModal = true
            this.formItem2.exception_1=this.data[index].exception_1
            this.formItem2.exception_2=this.data[index].exception_2
            this.formItem2.exception_3=this.data[index].exception_3
            this.formItem2.exception_4=this.data[index].exception_4
            this.formItem2.exception_5=this.data[index].exception_5
            this.formItem2.project=this.data[index].project
          },
          async exceptOk(){
            this.$refs.exceptForm.validate((valid) => {
              if (valid) {
                this.loading = true;
                // 需要些axios的POST
                setTimeout(() => {
                  this.$Message.success(this.correctMes);
                  this.loading=false;//停止加载
                  this.exceptModal = false//关闭对话框组件
                },1000);
                
              } else {
                  this.loading=false;
                  this.$Message.error('请完善后再提交');
              }
            })
          },
          exceptCancel(){
            this.loading=false;
            this.exceptModal = false
          },

          editProject(index){
            this.mode = '学生志愿';
            this.correctMes = '学生志愿更新成功';
            this.projectModal = true
            this.formItem3.training=this.data[index].training
            this.formItem3.project=this.data[index].project
            this.formItem3.role=this.data[index].role
            this.formItem3.grades_5=this.data[index].grades_5
            this.formItem3.grades_100=this.data[index].grades_100
          },
          async projectOk(){
            this.$refs.projectForm.validate((valid) => {
              if (valid) {
                this.loading = true;
                // 需要些axios的POST
                setTimeout(() => {
                  this.$Message.success(this.correctMes);
                  this.loading=false;//停止加载
                  this.projectModal = false//关闭对话框组件
                },1000);
                
              } else {
                  this.loading=false;
                  this.$Message.error('请完善后再提交');
              }
            })
          },
          projectCancel(){
            this.loading=false;
            this.projectModal = false
          },
          
          
          page(currentPage) {
              const _this = this
              axios.get('http://localhost:8181/api/ea/findAll/'+currentPage).then(function (resp){
                // console.log(resp);
                _this.data = resp.data.content;
                _this.total = resp.data.totalElements; 
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
    .TableManage{
      margin: 0px 0 20px 0;
      border-radius: 100px;

      /* border-color: rgba(151, 151, 151, 1); */
    }
    .page{
        display:table;
        margin:0 auto;
    }
  
  </style>