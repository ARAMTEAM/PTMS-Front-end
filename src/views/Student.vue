<template>
    <div class="layout">
      <Layout>
        <Header :style="{background: '#515A6E'}">
          <div>
            <img src="../assets/logo_ptms.png" style="height:40px;margin: 10px 0;float:left;"/>
            <p
              class="UncatchText"
              style="height:40px;font-size:20px;margin: 10px 20px;color:#ffffff;float:left;line-height:45px;"
            >项目实训系统学生界面</p>
            <div class="portraitContain" >
              <Avatar class="Portraits" size="large" ><p class="UncatchText" >{{Info.studentName}}</p></Avatar>
              <!-- 头像菜单 -->
              <div class="PMenu">
                  <Card title="学生" icon="ios-options" :padding="0" shadow style="width: 200px;">
                      <CellGroup>
                          <Cell :title="Info.studentName" :label="Info.studentId" />
                          <Cell title="我的中心" to="/"/>
                          <Cell title="退出登录" to="/logout?role=student">
                          </Cell>
                      </CellGroup>
                  </Card>
              </div>
            </div>
               
          </div>
        </Header>
        <Layout>
          
  
          <Sider
            collapsible
            :collapsed-width="78"
            v-model="isCollapsed"
            :style="{background: '#fff'}"
          >
            <Menu
              :active-name="activeName"
              theme="light"
              width="auto"
              :open-names="opennames"
              :accordion="true"
              :class="menuitemClasses"
            >
              <MenuItem name="1" to="/student/home"> 
                <Icon type="ios-home"></Icon>
                <span>首页</span>
              </MenuItem>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-analytics"></Icon>
                  <span>项目申请</span>
                </template>
                <MenuItem name="2-1" to="/student/project">
                  <span>项目申请</span>
                </MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-paper"></Icon>
                  <span>项目详情</span>
                </template>
                <MenuItem name="3-1" to="/student/projectdetail">
                  <span>当前项目</span>
                </MenuItem>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <Icon type="ios-copy"></Icon>
                  <span>提交报告</span>
                </template>
                <MenuItem name="4-1" to="/student/report">
                  <span>阶段报告</span>
                </MenuItem>
              </Submenu>
            </Menu>
          </Sider>
  
          <Layout class="navContent" :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '12px 0'}">
              <BreadcrumbItem v-for="(item, index) in $route.meta.name" :key="index">
                {{item}}
              </BreadcrumbItem>
            </Breadcrumb>
            <Content
              class="content"
              :style="{padding: '24px', minHeight: '750px', background: '#fff'}"
            >
              <router-view v-if="isRouterAlive" :Info="Info"></router-view>
            </Content>
            <footer :style="{margin: '12px 0'}" id="footer">Copyright &copy; SDU ARAM</footer>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </template>
  
  <style scoped>
  .layout {
    border: 0px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 0px;
    overflow: hidden;
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  
  .layout-con {
    height: 100%;
    width: 100%;
  }
  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  .menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
  }
  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
  
  .navContent {
    background: #f5f7f9;
  }
  .content {
    border-radius: 15px;
    min-width: 700px;
    overflow: hidden;
    box-shadow: 0 1px 5px 0 rgba(0, 0,0, 0.1);
  }
  .UncatchText {
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }
  .PMenu{
    background: #f8f8f9;
    display:flex;
    position:absolute;
    z-index:998;
    top:25px;
    overflow: auto;
    opacity: 0;
    right: 25px;
    border-radius: 15px;
    box-shadow: 0 1px 5px 0 rgba(0, 0,0, 0.3);
    transform: translateX(200px) ;
    transition: transform 0.3s ease-out ,opacity 0.3s ease-out;
    transition-delay: 0.1s;
  }
  .Portraits{
    background:#f56a00;
    margin:10px 0px;
    /* dispaly:flex; */
    position:absolute;
    right: 20px;
    z-index:999;
    line-height:37px;
    box-shadow: 0 1px 5px 0 rgba(0, 0,0, 0.3);
    /* transition: 0.3s ease-out; */
  }
  .portraitContain:hover .PMenu{
    opacity: 1;
    transform: translateX(25px);
  
  }
  
  .portraitContain:hover .Portraits{
    transform: scale(1.2,1.2);
  }

  #footer {
    text-align: right;
  }
  </style>
  
  <script>
  import GLOBAL from '@/api/global_variable'
  const url = GLOBAL.apiURL+'teacher/logout'
  export default {
    provide (){
      return{
        reload: this.reload
      }
    },
    data() {
      return {
        Info:{},
        Menu_visible:false,
        activeName: "",
        opennames: [],
        isCollapsed: false,
        isRouterAlive: true,

      };
    },
    created() {
      axios.get(GLOBAL.apiURL+'student/One/'+this.$options.methods.getCookie('id'))
      .then(res=>{
        this.Info=res.data.data
      })
      if (this.$route.meta && this.$route.meta.order) {
        this.activeName = this.$route.meta.order;
        this.opennames.push(this.$route.meta.order.split("-")[0]);
      }
    },
    computed: {
        menuitemClasses: function() {
            return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
        }
    },
    methods:{
      showMenu() {
        console.log(1);
        this.Menu_visible = true;
      },
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      },
      getCookie(cname)        
      {        
        var name = cname + "=";        
        var ca = document.cookie.split(';');        
        for(var i=0; i<ca.length; i++)        
        {        
          var c = ca[i].trim();        
          if (c.indexOf(name)==0) return c.substring(name.length,c.length);        
        }        
        return "";        
      },
    }
  };
  </script>
  