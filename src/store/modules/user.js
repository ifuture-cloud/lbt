import Vue from 'vue'
import userApi from '@/api/user'

const user = {
  state: {
    token: null,
    name: '',
    avatar: '',
    roles: [],
    info: {},
    user: {},
    current: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      Vue.ls.set('ACCESS_TOKEN', token)
      state.token = token
    },
    SET_NAME: (state, { name }) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    CLEAR_TOKEN: state => {
      Vue.ls.remove('ACCESS_TOKEN')
      state.token = null
      Vue.ls.remove('LOGIN_USER')
      state.user = null
    },
    SET_USER: (state, user) => {
      Vue.ls.set('LOGIN_USER', user)
      state.user = user
    },
    SET_CURRENT_USER: (state, user) => {
      Vue.ls.set('CURRENT_USER', user)
      state.current = user
    }
  },
  actions: {
    loadUser ({ commit, state }, { username }) {
      return new Promise((resolve, reject) => {
        console.log(state.current)
        console.log(username)
        if (state.current.username === username) {
          resolve({data: state.current})
          return
        }
        userApi
          .getProfile(username)
          .then(response => {
            commit('SET_CURRENT_USER', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    loadUserById ({ commit, state }, { id }) {
      return new Promise((resolve, reject) => {
        console.log(state.current)
        if (state.current.id === id) {
          resolve(state.current)
          return
        }
        userApi
          .getProfileById(id)
          .then(response => {
            commit('SET_CURRENT_USER', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    copyUser ({ commit, state }) {
      commit('SET_CURRENT_USER', state.user)
    },
    login ({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        userApi
          .login(username, password)
          .then(response => {
            const token = {'access_token': response.data.access_token, 'expired_in': response.data.expired_in}
            commit('SET_TOKEN', token)
            commit('SET_USER', response.data)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout ({ commit }) {
      return new Promise(resolve => {
        commit('CLEAR_TOKEN')
        resolve()
        /* userApi
          .logout()
          .then(response => {
            resolve()
          })
          .catch(() => {
            resolve()
          }) */
      })
    },
    refreshToken ({ commit }, refreshToken) {
      return new Promise((resolve, reject) => {
        userApi
          .refreshToken(refreshToken)
          .then(response => {
            const token = response.data.data
            Vue.$log.debug('Got token', token)
            commit('SET_TOKEN', token)

            resolve(response)
          })
          .catch(error => {
            const data = error.response.data
            Vue.$log.debug('Refresh error data', data)
            if (data && data.status === 400 && data.data === refreshToken) {
              // The refresh token expired
              commit('CLEAR_TOKEN')
            }
            reject(error)
          })
      })
    }
  }
}

export default user
