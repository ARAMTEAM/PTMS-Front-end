<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Header :style="{background: '#515A6E'}">
        <div>
          <img
            src="../assets/logo_ptms.png"
            style="
                height:40px;
                margin: 10px 0;float:left;"
          />
          <p
            class="UncatchText"
            style="height:40px;font-size:20px;margin: 10px 20px;color:#ffffff;float:left;line-height:45px;"
          >项目实训系统管理员</p>
          <div class="portraitContain" >
            <Avatar class="Portraits" size="large" ><p class="UncatchText" >管理员</p></Avatar>
            
            <!-- 头像菜单 -->
            <div class="PMenu">
                <Card title="欢迎回来" icon="ios-options" :padding="0" shadow style="width: 200px;">
                    <CellGroup>
                        <Cell title="管理员" label="PTMS管理员" />
                        <Cell title="我的中心" to="/"/>
                        <Cell title="退出登录" to="/logout?role=jiaowu">
                        </Cell>
                    </CellGroup>
                </Card>
            </div>
          </div>
        </div>
      </Header>
      <Layout >
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
            <MenuItem name="1" to="/admin/home">
              <Icon type="ios-home"></Icon>
              <span>首页</span>
            </MenuItem>
            <MenuItem name="2" to="/admin/eamanage">
              <Icon type="ios-keypad"></Icon>
              <span>教务管理</span>
            </MenuItem>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                <span>公告通知</span>
              </template>
              <MenuItem name="3-1" to="/admin/noticemanage">
                <span>公告管理</span>
              </MenuItem>
            </Submenu>
            <MenuItem name="4" to="/admin/log">
              <Icon type="ios-paper"></Icon>
              <span>查看日志</span>
            </MenuItem>
            <Submenu name="5">
              <template slot="title">
                <Icon type="ios-copy"></Icon>
                <span>备份</span>
              </template>
              <MenuItem name="5-1" to="/admin/backup">
                <span>备份1.0</span>
              </MenuItem>
              <MenuItem name="5" to="/admin/backup2">
                <span>备份2.0</span>
              </MenuItem>
            </Submenu>
            
          </Menu>
        </Sider>
        <Layout class="navContent" :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '12px 0'}">
            <!-- <BreadcrumbItem>管理员</BreadcrumbItem>
            <BreadcrumbItem>{{bread}}</BreadcrumbItem> -->
            <BreadcrumbItem v-for="(item, index) in $route.meta.name" :key="index">
              {{item}}
            </BreadcrumbItem>
          </Breadcrumb>
          <Content
            class="content"
            :style="{padding: '24px', minHeight: '740px', background: '#fff'}"
          >
            <router-view v-if="isRouterAlive"></router-view>
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
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
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
/*头像菜单*/
.PMenu{
  background: #f8f8f9;
  /* display:flex; */
  position:absolute;
  z-index:1;
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
  z-index:2;
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
  
export default {
  provide (){
    return{
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,//自动刷新页面
      Menu_visible:false,
      activeName: "",
      bread:"",
      opennames: [],
      isCollapsed: false
    };
  },
  created() {
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
      this.Menu_visible = true;
    },
    reload (){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
};
</script>
