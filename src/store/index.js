import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {

  //购物车总数
  addProId:0,

  //登录状态,默认未登录

  userinfo:{},
}

export default new Vuex.Store({
  state,

  getters: {
    getTotal: state => state.addProId,

    getStadus:state=>state.userinfo
  },

  mutations: {

    //点击加入购物车，购物车总数加一
    addScore(state){
      state.addProId ++;
      console.log( state.addProId)
    },

    //登录改变登录状态
    changeLogin(state,data){
      state.userinfo=data;
        console.log(data,"store")
    },

    //注销 登录改变状态
    backLogin(state){
      state.userinfo={};
    }
  },

})
