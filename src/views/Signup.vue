<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="red">
              <h4 slot="title" class="card-title">注册</h4>
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
                <md-input v-model="user.username"></md-input>
                <span class="md-helper-text">稍后会用来生成域名，注册后就不能修改了</span>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>邮箱</label>
                <md-input v-model="user.email" type="email"></md-input>
                <span class="md-helper-text">稍后会发一封邮件验证</span>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock</md-icon>
                <label>密码</label>
                <md-input v-model="user.password" type="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>确认密码</label>
                <md-input v-model="user.apassword" type="password"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="register">
                开始 . 未来的笔头
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from '@/components'
import userApi from '@/api/user'

export default {
  components: {
    LoginCard
  },
  bodyClass: 'login-page',
  data () {
    return {
      user: {
        nickname: null,
        email: null,
        password: null,
        apassword: null,
        username: null
      }
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
    verify () {
      if (this.user.username == null) {
        return false
      }
      if (this.user.email == null) {
        return false
      }
      if (this.user.password == null) {
        return false
      }
      if (this.user.apassword == null || this.user.password !== this.user.apassword) {
        return false
      }
      this.user.nickname = this.user.username
      return true
    },
    register () {
      if (!this.verify()) {
        return
      }
      userApi.register(this.user).then(response => {
        if (response.data.username === this.user.username) {
          this.$router.replace({name: 'login'})
        } else {
          console.log(response)
          alert(response.data)
        }
      })
    }
  }
}
</script>

<style lang="css"></style>
