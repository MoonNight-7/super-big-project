import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isFree:'',
    isIndex:true,
  },
  getters: {
  },
  mutations: {
    falseIsIndex(state){
      state.isIndex = false
      console.log('store中的false函数执行了，当前isIndex值为'+state.isIndex)
    },
    trueIsIndex(state){
      state.isIndex = true
      console.log('store中的false函数执行了，当前isIndex值为'+state.isIndex)
    },
  },
  actions: {
  },
  modules: {
  }
})
