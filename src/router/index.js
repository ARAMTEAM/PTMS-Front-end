import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import EA from '../views/EA.vue'



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
        component: () => import('../components/Admin/AdminHome.vue'),
        meta: {
          title:"首页",
          order:"1",
        }
      },
      {
        path: 'eamanage',
        component: () => import('../components/Admin/EduAdminManage.vue'),
        meta: {
          title:"教务管理",
          order:"2",
        },
        children:[
          {
            path: '',
            component: () => import('../components/Admin/eaHome.vue'),
            meta: {
              title:"教务管理首页",
              order:"2",
            },
          },
          {
            path: 'create',
            component: () => import('../components/Admin/eaEdit.vue'),
            meta: {
              title:"新增教务",
              order:"2",
            },
          },
          {
            path: ':id',
            component: () => import('../components/Admin/eaEdit.vue'),
            meta: {
              title:"教务信息更新",
              order:"2",
            },
          },
        ]
        
      },
      {
        path: 'noticemanage/create',
        component: () => import('../components/Admin/AdminNoticeEdit.vue'),
        meta: {
          title:"发布公告",
          order:"3-1",
        }
      },
      {
        path: 'noticemanage',
        component: () => import( '../components/Admin/AdminNoticeManage.vue'),
        meta: {
          title:"公告管理",
          order:"3-2",
        }
      },
      {
        path: 'noticemanage/:id',
        component: () => import( '../components/Admin/AdminNoticeEdit.vue'),
        meta: {
          title:"公告更新",
          order:"3-2",
        }
      },
      {
        path: 'log',
        component: () => import( '../components/Admin/AdminLog.vue'),
        meta: {
          title:"查看日志",
          order:"4",
        }
      },
      {
        path: 'backup',
        component: () => import( '../components/Admin/AdminDBbackup.vue'),
        meta: {
          title:"数据库备份",
          order:"5",
        }
      },
    ]

  },
  {
    path:"/ea",
    name:"教务页面",
    redirect:"/ea/home",
    component:EA,
    children:[
      {
        path: 'home',
        component: () => import('../components/EA/EAHome.vue'),
        meta: {
          title:"首页",
          order:"1",
        }
      },
      {
        path: 'training',
        component: () => import('../components/EA/TrainHome.vue'),
        meta: {
          title:"实训管理",
          order:"2",
        },
        children:[
          {
            path: 'create',
            component: () => import('../components/EA/TrainEdit.vue'),
            meta: {
              title:"新建实训项目",
              order:"2-1",
            },
          },
          {
            path: '',
            component: () => import('../components/EA/TrainManage.vue'),
            meta: {
              title:"实训管理首页",
              order:"2-2",
            },
          },
          {
            path: ':id',
            component: () => import('../components/EA/TrainEdit.vue'),
            meta: {
              title:"实训项目更新",
              order:"2-2",
            },
          },
        ]
      },
      {
        path: 'noticemanage/create',
        component: () => import('../components/EA/EANoticeEdit.vue'),
        meta: {
          title:"发布公告",
          order:"3-1",
        }
      },
      {
        path: 'noticemanage/:id',
        component: () => import('../components/EA/EANoticeEdit.vue'),
        meta: {
          title:"更新公告",
          order:"3-1",
        }
      },
      {
        path: 'noticemanage',
        component: () => import('../components/EA/EANoticeManage.vue'),
        meta: {
          title:"公告管理",
          order:"3-2",
        }
      },
      {
        path: 'teacher',
        component: () => import('../components/EA/teacherHome.vue'),
        meta: {
          title:"教师管理",
          order:"4",
        },
        children:[
          {
            path: 'create',
            component: () => import('../components/EA/teacherEdit.vue'),
            meta: {
              title:"新增教师",
              order:"4-1",
            },
          },
          {
            path: '',
            component: () => import('../components/EA/teacherManage.vue'),
            meta: {
              title:"教师列表",
              order:"4-1",
            },
          },
          {
            path: ':id',
            component: () => import('../components/EA/teacherEdit.vue'),
            meta: {
              title:"教师基本信息更新",
              order:"4-1",
            },
          },
        ]
      },
      {
        path: 'teacher_search',
        component: () => import('../components/EA/teacherSearch.vue'),
        meta: {
          title:"教师检索",
          order:"4-2",
        },
      },
      {
        path: 'student',
        component: () => import('../components/EA/studentHome.vue'),
        meta: {
          title:"学生管理",
          order:"5",
        },
        children:[
          {
            path: 'create',
            component: () => import('../components/EA/studentEdit.vue'),
            meta: {
              title:"新增学生",
              order:"5-1",
            },
          },
          {
            path: '',
            component: () => import('../components/EA/studentManage.vue'),
            meta: {
              title:"学生列表",
              order:"5-1",
            },
          },
          {
            path: ':id',
            component: () => import('../components/EA/studentEdit.vue'),
            meta: {
              title:"学生基本信息更新",
              order:"5-1",
            },
          },
          
        ]
      },
      {
        path: 'student_search',
        component: () => import('../components/EA/studentSearch.vue'),
        meta: {
          title:"学生检索",
          order:"5-2",
        },
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