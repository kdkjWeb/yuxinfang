import Vue from 'vue'
import Router from 'vue-router'


/*
 首页
 */
import  index  from '@/page/index/index.vue'



/*
 登录页面
 */
import  tologin  from '@/page/login/tologin.vue'



/*
 个人和机构注册；
 */
import  perRegister  from '@/page/register/perRegister'
import  mecRegister  from '@/page/register/mecRegister'


/*
首页
 */

import  mainIndex  from '@/page/index/main'


/*
  个人中心
 */
import  personal  from '@/page/personal/main/personal.vue'



/*
  公告和社区的列表页面
 */
import  newsList from '@/page/newsList/newsList.vue'


/*
  公告和社区的详情页面
 */
import  cmnDetail  from '@/page/newsDetail/cmnDetail.vue'
import  noticeDetail  from '@/page/newsDetail/noticeDetail.vue'



/*
   个人中心子目录，购物车，订单详情等；
 */
import  setMony  from  '@/page/personal/setmony/setMony'
import  sendMony  from  '@/page/personal/sendmony/sendMony'
import  getMony  from  '@/page/personal/getmony/getMony'
import  userCms  from  '@/page/personal/suser/userCms'
import  mycart  from  '@/page/personal/cart/mycart'
import  goodslist  from  '@/page/personal/ordering/goodslist'
import  userMessage  from  '@/page/personal/user/userMessage'
import  business  from  '@/page/personal/BusinessOrder/business'
import  pay  from  '@/page/personal/pay/pay'



/*
跳转产品分类详情； 农产品，水果展示等以及全局搜索
 */
import  proClass  from '@/page/proClass/proClass.vue'
import  search  from '@/page/proClass/search.vue'




/*
  产品详情
 */
import  proDetail  from '@/page/proDetail/proDetail.vue'


/*
  签到页
 */
import  check  from '@/page/check/check.vue'


//树
import  tree  from '@/page/tree'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect:'main',
      children: [
        {
          path: '/main',
          name: 'mainIndex',
          component: mainIndex
        },
        {
          path: '/login',
          name: 'tologin',
          component: tologin
        },
        {
          path: '/perRegister',
          name: 'perRegister',
          component: perRegister
        },
        {
          path: '/mecRegister',
          name: 'mecRegister',
          component: mecRegister
        },
        {
          path: '/newsList',
          name: 'newsList',
          component: newsList,
        },
        {
          path: '/noticeDetail',
          name: 'noticeDetail',
          component: noticeDetail,
        },
        {
          path: '/cmnDetail',
          name: 'cmnDetail',
          component: cmnDetail,
        },
        {
          path: '/proDetail',
          name: 'proDetail',
          component: proDetail,
        },
        {
          path: '/personal',
          name: 'personal',
          component: personal,
          redirect:'/user/tocart',
          children: [
            {
              path: '/user/tocart',
              name: 'mycart',
              component:  mycart,
            },
            {
              path: '/user/goodeList',
              name: 'goodslist',
              component:  goodslist,
            },
            {
              path: '/user/message',
              name: 'userMessage',
              component:  userMessage,
            },
            {
              path: '/user/setmony',
              name: 'setMony',
              component:  setMony,
            },
            {
              path: '/user/sengmony',
              name: 'sendMony',
              component:  sendMony,
            },
            {
              path: '/user/getMony',
              name: 'getMony',
              component:  getMony,
            },
            {
              path: '/user/userCMS',
              name: 'userCms',
              component:  userCms,
            },
            {
              path: '/user/business',
              name: 'business',
              component:  business,
            },
            {
              path: '/pay',
              name: 'pay',
              component:  pay,
            },
          ]
        },
        {
          path: '/proClass',
          name: 'proClass',
          component: proClass,
        },
        {
          path: '/search',
          name: 'search',
          component: search,
        },
        {
          path: '/check',
          name: 'check',
          component: check,
        }]
    },
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: index,
    //   redirect:'main',
    //   children: [
    //     {
    //       path: '/main',
    //       name: 'main',
    //       component: mainIndex
    //     },
    //
    //     ]
    // },

  ]
})
