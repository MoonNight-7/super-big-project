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
    reverseIsIndex(state){
      state.isIndex = !state.isIndex
    }
  },
  actions: {
  },
  modules: {
  }
})
