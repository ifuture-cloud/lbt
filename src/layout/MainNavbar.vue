<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <a href="javascript:;">
          <h3 class="md-title" @click="scrollToElement(null)">
            {{title}}
            .
            <span v-if="current && current.username" @click="toLoading(current.username)">
              {{current.nickname}}
            </span>
            <span v-else>
              未来史
            </span>
          </h3>
        </a>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section="true">
              adsfadfasdf
            </mobile-menu>
            <md-list>

              <md-list-item
                v-if="!user || !user.username"
                href="#/signup"
                target="_blank">
                <i class="material-icons">content_paste</i>
                <p>注册</p>
              </md-list-item>

              <md-list-item
                v-if="!user || !user.username"
                href="#/login"
                @click="scrollToElement()">
                <i class="material-icons">fingerprint</i>
                <p>登录</p>
              </md-list-item>

              <li class="md-list-item" v-if="user && user.username">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown"
                >
                  <div class="md-list-item-content">
                    <drop-down direction="down" class="profile-photo">
                      <div
                        class="profile-photo-small"
                        slot="title"
                        data-toggle="dropdown"
                      >
                        <img :src="(user && user.avatar) || defaultAvatar" />
                      </div>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <!--<li class="dropdown-header" v-text="user.nickname"></li>-->
                        <li>
                          <a href="#/profile" class="dropdown-item">{{user.nickname}}</a>
                        </li>
                        <li>
                          <a href="#/npost/new" class="dropdown-item">新笔头</a>
                        </li>
                        <li>
                          <a href="#/management" class="dropdown-item">管理</a>
                        </li>
                        <li>
                          <a href="#/image/management" class="dropdown-item">附件</a>
                        </li>
                        <li>
                          <a @click="handleLogout" class="dropdown-item">登出</a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import MobileMenu from '@/layout/MobileMenu'
import { mapGetters, mapActions } from 'vuex'

let resizeTimeout
function resizeThrottler (actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null
      actualResizeHandler()

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66)
  }
}
export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: 'white',
      validator (value) {
        return [
          'white',
          'default',
          'primary',
          'danger',
          'success',
          'warning',
          'info'
        ].includes(value)
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      title: '好记性不如烂笔头',
      defaultAvatar: require('@/assets/logo.jpg'),
      extraNavClasses: '',
      toggledClass: false
    }
  },
  computed: {
    ...mapGetters(['user', 'current'])
  },
  created () {
  },
  methods: {
    ...mapActions(['logout']),
    bodyClick () {
      let bodyClick = document.getElementById('bodyClick')

      if (bodyClick === null) {
        let body = document.querySelector('body')
        let elem = document.createElement('div')
        elem.setAttribute('id', 'bodyClick')
        body.appendChild(elem)

        let bodyClick = document.getElementById('bodyClick')
        bodyClick.addEventListener('click', this.toggleNavbarMobile)
      } else {
        bodyClick.remove()
      }
    },
    toggleNavbarMobile () {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar
      this.toggledClass = !this.toggledClass
      this.bodyClick()
    },
    handleScroll () {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop
      let navbarColor = document.getElementById('toolbar')
      this.currentScrollValue = scrollValue
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`
        navbarColor.classList.remove('md-transparent')
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = ''
          navbarColor.classList.add('md-transparent')
        }
      }
    },
    scrollListener () {
      resizeThrottler(this.handleScroll)
    },
    scrollToElement (selector) {
      if (selector) {
        let elementId = document.querySelector(selector)
        // let elementId = document.getElementById(selector || 'downloadSection')
        if (elementId) {
          elementId.scrollIntoView({ block: 'start', behavior: 'smooth' })
        }
      } else {
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    },
    handleLogout () {
      this.logout().then(() => {
        window.location.reload()
      })
    },
    toLoading (username) {
      this.$router.push({name: 'landing', params: {username: username}})
    }
  },
  mounted () {
    document.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.scrollListener)
  }
}
</script>
