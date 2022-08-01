import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Manage from '../views/Manage'
import UserList from "../views/UserList";
import InsertUser from "../views/InsertUser";
import VideoList from "../views/VideoList";
import InsertVideo from "../views/InsertVideo"
import Introduction from "../views/Introduction";
import PersonalManage from "../views/PersonalManage";
import PersonalVideoList from "../views/PersonVideoList";
import InsertAudio from "../views/InsertAudio";
import AudioList from "../views/AudioList";
import PersonalAudioList from "../views/PersonalAudioList";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    redirect: "/manage/introduction",
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/manage/userList',
        name: 'UserList',
        component: UserList,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/manage/insertUser',
        name: 'InsertUser',
        component: InsertUser,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/manage/videoList',
        name: 'VideoList',
        component: VideoList,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/manage/insertVideo',
        name: 'InsertVideo',
        component: InsertVideo,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/manage/audioList',
        name: 'AudioList',
        component: AudioList,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/manage/insertAudio',
        name: 'InsertAudio',
        component: InsertAudio,
        meta: {
          requireAuth: true
        }
      },

      {
        path: '/manage/introduction',
        name: 'Introduction',
        component: Introduction,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/personalManage',
    name: 'PersonalManage',
    component: PersonalManage,
    redirect: "/personalManage/personalVideoList",
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/personalManage/personalVideoList',
        name: 'PersonalVideoList',
        component: PersonalVideoList,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/personalManage/insertVideo',
        name: 'InsertVideo',
        component: InsertVideo,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/personalManage/personalAudioList',
        name: 'PersonalAudioList',
        component: PersonalAudioList,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/personalManage/insertAudio',
        name: 'InsertAudio',
        component: InsertAudio,
        meta: {
          requireAuth: true
        }
      },
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
  let username = JSON.parse(sessionStorage.getItem("username"));
  if (username == null) {
    next({
      path: '/',
    });
  }else {
    next();
  }
}else {
  next();
}
})