import Vue from 'vue'
import Vuex from 'vuex'
import Storage from 'vue-ls'
import user from './modules/user'
import getters from './getters'

let options = {
  namespace: 'lbt__',
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local'
}

Vue.use(Storage, options)
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
