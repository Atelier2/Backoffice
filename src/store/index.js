import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key:"backoffice"
})

export default new Vuex.Store({
  plugins:[vuexLocal.plugin],
  state: {
    user:null,
  },
  mutations: {
    saveUser(state,user){
      state.user = user;
    },
    deleteUser(state){
      state.user = null
    }
  },
  actions: {
  },
  modules: {
  }
})