<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <div class="avatar">
                  <img :src="(profile.avatar) || defaultAvatar"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>
                <div class="name">
                  <h3 class="title">{{profile.nickname}}</h3>
                  <h6>{{profile.email}}</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="section section-contacts">
            <div class="container">
              <div class="md-layout">
                <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
                  <h2 class="text-center title">“未来编写者” {{profile.nickname}}</h2>
                  <h4 class="text-center description">
                    {{profile.description}}
                  </h4>
                  <form class="contact-form">
                    <div class="md-layout">
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>用户名</label>
                          <md-input v-model="profile.username" type="text" disabled></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>笔名</label>
                          <md-input v-model="profile.nickname" type="text"></md-input>
                        </md-field>
                      </div>
                      <div class="md-layout-item md-size-50">
                        <md-field>
                          <label>Email</label>
                          <md-input v-model="profile.email" type="email"></md-input>
                        </md-field>
                      </div>
                    </div>
                    <md-field>
                      <label>头像</label>
                      <md-input v-model="profile.avatar"></md-input>
                      <md-button class="md-icon-button md-raised md-success md-simple">
                        <md-icon></md-icon>
                        <md-tooltip>本地上传</md-tooltip>
                        <md-file accept="image/*" @md-change="uploadAvatar" style="position: absolute"></md-file>
                      </md-button>
                      <md-button class="md-icon-button md-raised md-success md-simple">
                        <md-icon>cloud_done</md-icon>
                        <md-tooltip>我的云资源</md-tooltip>
                      </md-button>
                    </md-field>
                    <md-field>
                      <label>封面</label>
                      <md-input v-model="profile.parallax"></md-input>
                      <md-button class="md-icon-button md-raised md-success md-simple">
                        <md-icon></md-icon>
                        <md-tooltip>本地上传</md-tooltip>
                        <md-file accept="image/*" @md-change="uploadParallax" style="position: absolute"></md-file>
                      </md-button>
                      <md-button class="md-icon-button md-raised md-success md-simple">
                        <md-icon>cloud_done</md-icon>
                        <md-tooltip>我的云资源</md-tooltip>
                      </md-button>
                    </md-field>
                    <md-field maxlength="5">
                      <label>关于我</label>
                      <md-textarea v-model="profile.description"></md-textarea>
                    </md-field>
                    <div class="md-layout">
                      <div class="md-layout-item md-size-33 mx-auto text-center">
                        <md-button class="md-success" @click="updateProfile">保存</md-button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <md-dialog-alert
      :md-active.sync="alertShow"
      :md-content="alertMsg"
       md-confirm-text="确定" />
  </div>
</template>
<script>
import { Tabs } from '@/components'
import userApi from '@/api/user'
import attachmentApi from '@/api/attachment'
import {mapActions} from 'vuex'

export default {
  components: {
    Tabs
  },
  bodyClass: 'profile-page',
  data () {
    return {
      defaultAvatar: require('@/assets/logo.jpg'),
      alertShow: false,
      alertMsg: '保存成功',
      profile: {}
    }
  },
  props: {
    header: {
      type: String,
      default: require('@/assets/img/city-profile.jpg')
    }
  },
  methods: {
    ...mapActions(['loadUser']),
    getProfile () {
      this.loadUser({username: this.$store.state.user.user.username}).then(response => {
        this.profile = response.data
      })
    },
    updateProfile () {
      userApi.updateProfile(this.profile).then(resp => {
        this.alertShow = true
        this.alertMsg = '保存成功'
      })
    },
    uploadAvatar (file) {
      let formdata = new FormData()
      formdata.append('file', file[0])
      attachmentApi.upload(formdata, null, null).then((res) => {
        this.profile.avatar = res.data.path
      })
    },
    uploadParallax (file) {
      let formdata = new FormData()
      formdata.append('file', file[0])
      attachmentApi.upload(formdata, null, null).then((res) => {
        this.profile.parallax = res.data.path
      })
    }
  },
  created () {
    this.getProfile()
  },
  computed: {
    headerStyle () {
      if (this.profile.parallax) {
        return {
          backgroundImage: `url(${this.profile.parallax})`
        }
      } else {
        return {
          backgroundImage: `url(${this.header})`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs /deep/ {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
