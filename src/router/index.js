import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import AdminHome from '../views/AdminHome.vue'
import EduAdminManage from '../views/EduAdminManage.vue'
import AdminNoticeEdit from '../views/AdminNoticeEdit.vue'
import AdminNoticeManage from '../views/AdminNoticeManage.vue'
import AdminLog from '../views/AdminLog.vue'
import AdminDBbackup from '../views/AdminDBbackup.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:"/admin",
    name:"Admin界面",
    redirect:"/admin/home",
    component: Admin,
    children:[
      {
        path: 'home',
        component: () => import('../views/AdminHome.vue'),
        meta: {
          title:"首页",
          order:"1",
        }
      },
      {
        path: 'eamanage',
        component: () => import('../views/EduAdminManage.vue'),
        meta: {
          title:"教务管理",
          order:"2",
        },
        children:[
          {
            path: '',
            component: () => import('../components/eaHome.vue'),
            meta: {
              title:"教务管理首页",
              order:"2",
            },
          },
          {
            path: 'create',
            component: () => import('../components/eaEdit.vue'),
            meta: {
              title:"新增教务",
              order:"2",
            },
          },
          {
            path: ':id',
            component: () => import('../components/eaEdit.vue'),
            meta: {
              title:"教务信息更新",
              order:"2",
            },
          },
        ]
        
      },
      {
        path: 'noticemanage/create',
        component: () => import('../views/AdminNoticeEdit.vue'),
        meta: {
          title:"发布公告",
          order:"3-1",
        }
      },
      {
        path: 'noticemanage',
        component: () => import( '../views/AdminNoticeManage.vue'),
        meta: {
          title:"公告管理",
          order:"3-2",
        }
      },
      {
        path: 'noticemanage/:id',
        component: () => import( '../views/AdminNoticeEdit.vue'),
        meta: {
          title:"公告更新",
          order:"3-2",
        }
      },
      {
        path: 'log',
        component: () => import( '../views/AdminLog.vue'),
        meta: {
          title:"查看日志",
          order:"4",
        }
      },
      {
        path: 'backup',
        component: () => import( '../views/AdminDBbackup.vue'),
        meta: {
          title:"数据库备份",
          order:"5",
        }
      },
    ]

  },

  
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// 加载进入条
import ViewUI from 'view-design';
Vue.use(ViewUI);

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  if(to.meta && to.meta.title) document.title = to.meta.title
  next()
})
router.afterEach((to, from) => {
  ViewUI.LoadingBar.finish();
})