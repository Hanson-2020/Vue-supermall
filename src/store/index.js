import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    //mutations唯一的目的就是修改state中状态
    //每个方法尽可能完成的事件比较单一
    addCounter(state, payload) {
      payload.count++;
    },
    //detail传过来的值
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    },
    desCounts(state, payload) {
      if (payload.cartList.count > 1) {
        payload.cartList.count--;
      }
    },
    addCounts(state, payload) {
      payload.cartList.count++;
    }
  },
  actions: {
    //detail传过来的值
    //action可以返回一个promise方法
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = null;
        //payload新添加的合集
        for (let item of context.state.cartList) {
          if (item.iid === payload.iid) {
            oldProduct = item;
          }
        }
        //判断oldProduct
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit('addCounter', oldProduct)
          resolve('当前的商品加1')
        } else {
          payload.count = 1;
          context.commit('addToCart', payload)
          // state.cartList.push(payload)
          resolve('加入购物车成功')
        }
      })
    },
    addCartListCount(context, payload) {
      context.commit('addCounts', payload);
    },
    desCartListCount(context, payload) {
      context.commit('desCounts', payload);
    },
  },
  modules: {},
  getters
})
export default store
