// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import $  from 'jquery'

import store from './store/index.js'    // vuex

//引入日历
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {
  locale: 'en',
    className: 'checkColor',
    weekStartOn: '1',                                  //从星期几开始
  }
  ) //可以设置语言，支持中文和英文


// 引入字体 iconfont.css
import  '@/assets/icon/iconfont.css'


//axios请求
import axios from 'axios'
var baseU = "http://phlwq.mynatapp.cc/yuxinfangDev";
var axiosConfig = axios.create({
  baseURL:baseU,        //请求接口公用部分
  timeout:30000,         //所有请求超过30s后过期
  withCredentials:true, //允许跨域携带cookie
});
Vue.prototype.$axios = axiosConfig;


//公共文件
import  comon from  './assets/js/common'

Vue.prototype.$c = comon;


// var VueQuillEditor = require('vue-quill-editor')
Vue.config.productionTip = false;
Vue.use(ElementUI);




Vue.prototype.$host = "http://192.168.20.50:8086/yuxinfang";


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  store,
  components: { App },
  template: '<App/>'
});
