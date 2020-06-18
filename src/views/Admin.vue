<template>
  <div class="layout">
    <!-- <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    <router-view/>-->
    <Layout>
      <Header :style="{background: '#fff'}">
          <p>项目实训系统管理员</p>
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
              <MenuItem name="3-1" to="/admin/noticemanage/create">
                <span>发布公告</span>
              </MenuItem>
              <MenuItem name="3-2" to="/admin/noticemanage">
                <span>公告管理</span>
              </MenuItem>
            </Submenu>
            <MenuItem name="4" to="/admin/log">
              <Icon type="ios-paper"></Icon>
              <span>查看日志</span>
            </MenuItem>
            <MenuItem name="5" to="/admin/backup">
              <Icon type="ios-copy"></Icon>
              <span>数据库备份</span>
            </MenuItem>
          </Menu>
        </Sider>

        <!-- <Sider  hide-trigger :style="{background: '#fff'}">
                    <Menu :active-name="activeName" theme="light" width="auto" :open-names="opennames" :accordion="true">
                        <MenuItem name="1" to="/admin/home">
                                <Icon type="ios-home"></Icon>
                                首页
                        </MenuItem>
                        <MenuItem name="2" to="/admin/eamanagement" >
                                <Icon type="ios-keypad"></Icon>
                                教务管理
                        </MenuItem>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                公告通知
                            </template>
                            <MenuItem name="3-1" to="/admin/newnotice">发布公告</MenuItem>
                            <MenuItem name="3-2" to="/admin/noticemanage">公告管理</MenuItem>
                        </Submenu>
                        <MenuItem name="4" to="/admin/log">
                                <Icon type="ios-paper"></Icon>
                                查看日志
                        </MenuItem>
                        <MenuItem name="5" to="/admin/backup">
                                <Icon type="ios-copy"></Icon>
                                数据库备份
                        </MenuItem>
                    </Menu>
                    
        </Sider>-->
        <Layout class="navContent" :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '12px 0'}"></Breadcrumb>

          <Content
            class="content"
            :style="{padding: '24px', minHeight: '770px', background: '#fff'}"
          >
            <router-view></router-view>
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
}
#footer {
  text-align: right;
}
</style>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
// import AdminHome from '@/views/AdminHome.vue'
// import EduAdminManage from '@/views/EduAdminManage.vue'
// import AdminNotice from '@/views/AdminNotice.vue'
// import AdminNoticeManage from '@/views/AdminNoticeManage.vue'
// import AdminLog from '@/views/AdminLog.vue'
// import AdminDBbackup from '@/views/AdminDBbackup.vue'

export default {
  data() {
    return {
      activeName: "",
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
  }
};
</script>
