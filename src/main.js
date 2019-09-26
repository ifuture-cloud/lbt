// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueLogger from 'vuejs-logger'
import MaterialKit from './plugins/material-kit'

import './core/bootstrap'

Vue.config.productionTip = true

Vue.use(MaterialKit)

const NavbarStore = {
  showNavbar: false
}

Vue.mixin({
  data () {
    return {
      NavbarStore
    }
  }
})
const isProduction = process.env.NODE_ENV === 'production'
const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
}

Vue.use(VueLogger, options)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
