import Vue from 'vue'
import Vuex from 'vuex'
// 封装了一个存储函数
import storage from '@/utils/storage'
import { setToken, getToken } from '@/utils/auth'
Vue.use(Vuex)
// vuex
// 本质就是仓库，存放数据
// vuex的数据是响应式的
// vue的数据是自产自销的 vuex的数据必须在vuex里修改
// mutaitions定义方法去修改，在外接调用这个方法
// mutaitions方法建议是大写 接受两个参数，其中一个是state 另一个数传递过来的参数payload
// $store.commit('方法名字')用于触发mutaitions里的方法
export default new Vuex.Store({
  // 存储数据的地方
  state: {
    // {}是为了防止一个报错 null.token就会报错，{}.token就是undefined,但是不会报错
    // tokenObj: JSON.parse(localStorage.getItem('Token')) || {}
    // tokenObj: storage.get('Token') || {}
    tokenObj: getToken() || {},
    // 搜索记录的保存
    searchList: storage.get('searchList') || []
  },
  // 根据state的数据派生出来的数据
  getters: {},
  // 唯一修改state数据的地方 通过 this.$store.commit("事件名称")
  mutations: {
    SET_TOKEN(state, payload) {
      // 将数据持久化
      // localStorage.setItem('Token', JSON.stringify(payload))
      // storage.set('Token', payload)
      setToken(payload)
      state.tokenObj = payload
    },
    SET_SEARCHLIST(state, newArr) {
      state.searchList = newArr
      storage.set('searchList', newArr)
    }
  },
  // 可以处理异步操作
  actions: {},
  modules: {}
})
