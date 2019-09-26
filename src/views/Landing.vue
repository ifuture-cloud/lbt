<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">{{user.nickname}}</h1>
            <h4>
              {{user.description?user.description:'好记性不如烂笔头，我的笔头在这里。记录，分享我觉得有用的，重要的。让我们一起终身学习。'}}
            </h4>
            <br />
<!--            <md-button
              href="https://ifuture.pro"
              class="md-success md-lg"
              target="_blank">
              <i class="fas fa-play"></i> {{user.username}}
            </md-button>-->
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">

      <div class="section" v-for="post in postList" :key="post.id">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
              <a href="javascript:void(0)" @click="goDetail(post)"><h2 class="title text-center">{{post.title}}</h2></a>
              <h5 class="description">
                {{post.summary}}
              </h5>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import userApi from '@/api/user'
import {mapActions} from 'vuex'

export default {
  bodyClass: 'landing-page',
  props: {
    header: {
      type: String,
      default: require('@/assets/img/bg2.jpg')
    }
  },
  data () {
    return {
      user: {},
      postList: []
    }
  },
  created () {

  },
  methods: {
    ...mapActions(['loadUser']),
    userProfiles (username) {
      this.loadUser({username: username}).then(response => {
        this.user = response.data
      })
    },
    queryPosts (username) {
      userApi.getPosts(username).then(response => {
        this.postList = response.data.content
      })
    },
    goDetail (post) {
      this.$router.push({name: 'post', params: {url: post.url}})
    }
  },
  beforeRouteEnter (to, from, next) {
    const username = to.params.username
    next(vm => {
      if (username) {
        vm.userProfiles(username)
        vm.queryPosts(username)
      }
    })
  },
  computed: {
    headerStyle () {
      if (this.user && this.user.parallax) {
        return {
          backgroundImage: `url(${this.user.parallax})`
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
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
