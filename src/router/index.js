import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import EA from '../views/EA.vue'
import Teacher from '../views/Teacher.vue'
import Student from '../views/Student.vue'
import Logout from '../components/logout.vue'
import Login1 from '../components/login1.vue'



Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/:login',
    name: 'login',
    component: Login1
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
          name:['管理员','首页'],
        }
      },
      {
        path: 'eamanage',
        component: () => import('../components/Admin/eaHome.vue'),
        meta: {
          title:"教务管理首页",
          order:"2",
          name:['管理员','教务管理'],
        },
      },
      {
        path: 'noticemanage',
        component: () => import( '../components/Admin/AdminNoticeManage.vue'),
        meta: {
          title:"公告管理",
          order:"3-1",
          name:['管理员','公告管理']
        }
      },
      {
        path: 'log',
        component: () => import( '../components/Admin/AdminLog.vue'),
        meta: {
          title:"查看日志",
          order:"4",
          name:['管理员','查看日志']
        }
      },
      {
        path: 'backup',
        component: () => import( '../components/Admin/AdminDBbackup.vue'),
        meta: {
          title:"数据库备份1.0",
          order:"5-1",
          name:['管理员','数据库备份1.0']
        }
      },
      {
        path: 'backup2',
        component: () => import( '../components/Admin/AdminDBbackup2.vue'),
        meta: {
          title:"数据库备份2.0",
          order:"5-2",
          name:['管理员','数据库备份2.0']
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
          name:['教务','首页']
        }
      },
      {
        path: 'training',
        component: () => import('../components/EA/TrainManage.vue'),
        meta: {
          title:"实训管理",
          order:"2-1",
          name:['教务','实训项目','实训管理']
        },
      },
      {
        path: 'training/:training_id',
        component: () => import('../components/EA/TP_Id.vue'),
        meta: {
          title:"实训详情",
          order:"2-1",
          name:['教务','实训项目','实训详情']
        },
      },
      {
        path: 'teacher',
        component: () => import('../components/EA/teacherManage.vue'),
        meta: {
          title:"教师列表",
          order:"3-1",
          name:['教务','教师管理','教师列表']
        },
      },
      {
        path: 'teacher/:teacherId',
        component: () => import('../components/EA/Teacher_Id.vue'),
        meta: {
          title:"教师列表",
          order:"3-1",
          name:['教务','教师管理','教师项目']
        },
      },
      {
        path: 'student',
        component: () => import('../components/EA/studentManage.vue'),
        meta: {
          title:"学生列表",
          order:"4-1",
          name:['教务','学生管理','学生列表']
        },
      },
      {
        path: 'student/:studentId',
        component: () => import('../components/EA/SP_Id.vue'),
        meta: {
          title:"学生项目详情",
          order:"4-1",
          name:['教务','学生管理','学生项目详情']
        },
      },
      {
        path: 'project',
        component: () => import('../components/EA/ProjectHome.vue'),
        meta: {
          title:"项目管理",
          order:"5",
          name:['教务','快速审批']
        }
      },
    ]
  },
  {
    path:"/teacher",
    name:"教师页面",
    redirect:"/teacher/home",
    component:Teacher,
    children:[
      {
        path: 'home',
        component: () => import('../components/Teacher/teacherHome.vue'),
        meta: {
          title:"首页",
          order:"1",
          name:['教师','首页']
        }
      },
      {
        path: 'practice',
        component: () => import('../components/Teacher/TP_application.vue'),
        meta: {
          title:"项目实训项目申请",
          order:"2-1",
          name:['教师','项目实训','教室项目申请']
        },
      },
      {
        path: 'notice',
        component: () => import('../components/Teacher/TP_notice.vue'),
        meta: {
          title:"公告管理",
          order:"3-1",
          name:['教师','公告管理','项目公告']
        }
      },
      {
        path: 'project',
        component: () => import('../components/Teacher/TP_home.vue'),
        meta: {
          title:"项目列表",
          order:"4-1",
          name:['教师','项目监督','项目列表']
        },
      },
      {
        path: 'project/:projectId',
        component: () => import('../components/Teacher/TP_Id.vue'),
        meta: {
          title:"项目详情",
          order:"4-1",
          name:['教师','项目监督','项目列表','项目详情']
        },
      },
      {
        path: 'project/:projectId/:studentId',
        component: () => import('../components/Teacher/TPS_Id.vue'),
        meta: {
          title:"具体学生",
          order:"4-1",
          name:['教师','项目监督','项目列表','项目详情','具体学生']
        },
      },
      {
        path: 'student',
        component: () => import('../components/Teacher/TP_student.vue'),
        meta: {
          title:"学生列表",
          order:"4-2",
          name:['教师','项目监督','学生列表']
        },
      },
      {
        path: 'student/:studentId',
        component: () => import('../components/Teacher/TPS_Id.vue'),
        meta: {
          title:"具体学生",
          order:"4-2",
          name:['教师','项目监督','学生列表','具体学生']
        },
      },
      {
        path: 'check',
        component: () => import('../components/Teacher/TP_check.vue'),
        meta: {
          title:"项目审核",
          order:"4-3",
          name:['教师','项目监督','项目审核']
        },
      },
      // {
      //   path: 'score',
      //   component: () => import('../components/Teacher/S_score.vue'),
      //   meta: {
      //     title:"学生分数",
      //     order:"5-1",
      //   },
      // },
    ]
  },
  {
    path:"/student",
    name:"学生页面",
    redirect:"/student/home",
    component:Student,
    children:[
      {
        path: 'home',
        component: () => import('../components/Student/S_home.vue'),
        meta: {
          title:"首页",
          order:"1",
          name:['学生','首页']
        }
      },
      {
        path: 'project',
        component: () => import('../components/Student/SP_application.vue'),
        meta: {
          title:"项目页面",
          order:"2-1",
          name:['学生','项目申请']
        },
      },
      {
        path: 'project/chuangxin',
        component: () => import('../components/Student/S_chuangxin.vue'),
        meta: {
          title:"创新实训申请",
          order:"2-1",
          name:['学生','项目申请','创新实训']
        },
      },
      {
        path: 'project/shuqi',
        component: () => import('../components/Student/S_shuqi.vue'),
        meta: {
          title:"暑期实训申请",
          order:"2-1",
          name:['学生','项目申请','暑期实训']
        },
      },
      {
        path: 'projectdetail',
        component: () => import('../components/Student/S_project.vue'),
        meta: {
          title:"项目详情",
          order:"3-1",
          name:['学生','项目详情','所处项目']
        },
      },
      
      {
        path: 'report',
        component: () => import('../components/Student/S_report.vue'),
        meta: {
          title:"阶段报告",
          order:"4-1",
          name:['学生','报告页面','提交报告']
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