import Vue from 'vue'
import store from '@/store/'

store.commit('SET_TOKEN', Vue.ls.get('ACCESS_TOKEN'))
store.commit('SET_USER', Vue.ls.get('LOGIN_USER'))
