<template>
    <eahome :columns="header" :data="eaData"></eahome>
</template>
  
  <script>
  import GLOBAL from '@/api/global_variable'
  const url = GLOBAL.apiURL;
  import eahome from './eaHome'
  export default {
    inject:['reload'],
    components: {
        eahome // 引用组件
    },
    data(){
      return {
        CurrentYear:0,
        loading:false,//表单的loadiing状态
        eaModal:false,
        mode:'',
        correctMes:'',
        total: null,
        eaData: [],
        header: [
          {
              type: 'index',
              width: 60,
              align: 'center'
          },
          {
              title: '教务号',
              width: 250,
              key: 'jiaowuId',
              align: 'center'
          },
          {
              title: '教务名称',
              key: 'jiaowuName',
              align: 'center'
          },
          {
              title: '教务机构',
              key: 'jiaowuDept'
          },
          {
              title: 'Action',
              slot: 'action',
              width: 250,
              align: 'center'
          }
        ],
        formItem: {jiaowuId:'',jiaowuName:'',jiaowuUsername: '',jiaowuPassword:'',jiaowuDept: '',jiaowuNianji:'',},
        formItem1: {jiaowuId:'',jiaowuName:'',jiaowuUsername: '',jiaowuPassword:'',jiaowuDept: '',jiaowuNianji:'',},
        ruleInline: {
            jiaowuId: [
                { required: true, message: '教务号禁止为空', trigger: 'blur' }
            ],
            jiaowuName: [
                { required: true, message: '教务用户名禁止为空', trigger: 'blur' }
            ],
            jiaowuUsername: [
                { required: true, message: '教务账号禁止为空', trigger: 'blur' }
            ],
            jiaowuPassword: [
                { required: false, message: '教务密码禁止为空', trigger: 'blur' }
            ],
            jiaowuDept: [
                { required: true,message: '学院禁止为空', trigger: 'blur' }
            ],

        },
        }
    },
    created(){
      let date = new Date();
      this.CurrentYear = date.getFullYear();

      const _this = this;
      axios.get(url+'jiaowu/1').then(function (resp){
        console.log(resp);
        _this.eaData = resp.data.data.content;
        _this.total = resp.data.data.totalElements; 
      })
    },
    methods: {
        handleClearCurrentRow () {
            this.$refs.currentRowTable.clearCurrentRow();
        },
        handleSubmit(name) {
                // this.$refs[name].validate((valid) => {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        console.log("success")
                    } else {
                        this.$Message.error('Fail!');
                        console.log("Fail")
                    }
                })
        },
        show (index) {
            this.$Modal.info({
                title: '教务信息',
                content: `教务号：${this.eaData[index].jiaowuName}<br>教务年级：${this.eaData[index].jiaowuNianji}<br>教务名：${this.eaData[index].jiaowuName}
                <br>教务账号：${this.eaData[index].jiaowuUsername}<br>教务学院：${this.eaData[index].jiaowuDept}`
            })
        },
        remove (index) {
          axios.delete(GLOBAL.apiURL+'jiaowu/123')
          .then(res=>{})
        },
        edit(index){
          this.mode = 'update';
          this.correctMes = '教师更新成功！';
          this.eaModal = true
          this.formItem=this.eaData[index]
        },
        create(){
          this.mode = 'create';
          this.correctMes = '新增教师成功！';
          this.eaModal = true
          this.formItem=this.formItem1
        },
        addOk(name){
          console.log(this.formItem.grade)
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.loading = true;
              if(this.mode=='create'){
                setTimeout(() => {
                  axios.post(GLOBAL.apiURL+'jiaowu',this.formItem)
                  .then(res=>{
                    console.log(res);
                    if(res.data.success)
                    {
                      this.$Message.success(this.correctMes);
                      this.loading = false;//停止加载
                      this.eaModal = false;//关闭对话框组件
                      this.reload();//刷新页面
                    }
                    else{
                      this.loading = false;
                      this.$Message.error('提交失败');
                    }
                  })
                  // this.loading=false
                },1000)
              }
              else{
                setTimeout(() => {
                  axios.put(GLOBAL.apiURL+'jiaowu',this.formItem)
                  .then(res=>{
                    console.log(res);
                    if(res.data.success)
                    {
                      this.$Message.success(this.correctMes);
                      this.loading = false;//停止加载
                      this.eaModal = false;//关闭对话框组件
                      this.reload();//刷新页面
                    }
                    else{
 
                      this.loading = false;
                      this.$Message.error('提交失败');
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
          this.eaModal = false
        },
        page(currentPage) {
            const _this = this
            axios.get(url+'/jiaowu/'+currentPage,
            
            ).then(function (resp){
              console.log(resp);
              _this.eaData = resp.data.data.content;
              _this.total = resp.data.data.totalElements; 
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