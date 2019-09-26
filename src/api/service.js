import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
import store from '@/store'
import router from '@/router'

const option = {
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}
if (process.env.VUE_APP_BASE_API) {
  option.baseURL = process.env.VUE_APP_BASE_API
}
const service = axios.create(option)

function setTokenToHeader (config) {
  // set token
  const token = store.getters.token
  Vue.$log.debug('Got token from store', token)
  if (token && token.access_token) {
    config.headers['Authorization'] = token.access_token
  }
}

async function reRequest (error) {
  const config = error.response.config
  setTokenToHeader(config)
  const res = await axios.request(config)
  return res
}

let refreshTask = null

async function refreshToken (error) {
  const refreshToken = store.getters.token.refresh_token
  try {
    if (refreshTask === null) {
      refreshTask = store.dispatch('refreshToken', refreshToken)
    }

    await refreshTask
  } catch (err) {
    if (err.response && err.response.data && err.response.data.data === refreshToken) {
      router.push({ name: 'Login' })
    }
    Vue.$log.error('Failed to refresh token', err)
  } finally {
    refreshTask = null
  }
  // Rerequest the request
  return reRequest(error)
}

service.interceptors.request.use(
  config => {
    if (!config.mute) {
      NProgress.start()
    }
    // TODO set token
    setTokenToHeader(config)
    return config
  },
  error => {
    NProgress.remove()
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    NProgress.done()

    if (axios.isCancel(error)) {
      Vue.$log.debug('Cancelled uploading by user.')
      return Promise.reject(error)
    }

    Vue.$log.error('Response failed', error)

    const response = error.response
    const status = response ? response.status : -1
    Vue.$log.error('Server response status', status)

    const data = response ? response.data : null
    if (data) {
      let handled = false
      // Business response
      Vue.$log.error('Business response status', data.status)
      if (data.status === 400) {
        alert(data.message)
      } else if (data.status === 401) {
        // TODO handle 401 status error
        if (store.getters.token && store.getters.token.access_token === data.data) {
          const res = refreshToken(error)
          if (res !== error) {
            return res
          }
        } else {
          // Login
          router.push({ name: 'login' })
        }
      } else if (data.status === 403) {
        router.push({ name: 'login' })
        // TODO handle 403 status error
      } else if (data.status === 404) {
        // TODO handle 404 status error
      } else if (data.status === 500) {
        // TODO handle 500 status error
      }

      if (!handled) {
      }
    } else {
    }

    return Promise.reject(error)
  }
)
service.apiVersion = '/v1'

export default service
