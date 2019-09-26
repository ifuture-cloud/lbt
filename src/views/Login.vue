<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">登录</h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-weixin"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-weibo"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-github"></i>
              </md-button>
              <p slot="description" class="description">未来史</p>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>用户名</label>
                <md-input v-model="username"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>密码</label>
                <md-input v-model="password" type="password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="handleLogin">
                未来的史记由我编写
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {LoginCard} from '@/components'
import {mapActions} from 'vuex'

export default {
  components: {
    LoginCard
  },
  bodyClass: 'login-page',
  data () {
    return {
      username: null,
      password: null
    }
  },
  props: {
    header: {
      type: String,
      default: require('@/assets/img/profile_city.jpg')
    }
  },
  computed: {
    headerStyle () {
      return {
        backgroundImage: `url(${this.header})`
      }
    }
  },
  methods: {
    ...mapActions(['login', 'loadUser']),
    handleLogin () {
      this.login({'username': this.username, 'password': this.password}).then(response => {
        if (this.$route.query.redirect) {
          this.$router.replace(this.$route.query.redirect)
        } else {
          this.$router.replace({name: 'landing', params: {username: response.data.username}})
        }
      })
    }
  }
}
</script>

<style lang="css"></style>
