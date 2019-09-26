<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter" style="height: 160px;background-color: #15bfb7"></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">

          </div>
          <div>
            <h2 class="title text-center">{{post.title}}</h2>
            <p></p>
            <div class="markdown-body" >
            <mavon-editor :navigation=false :toolbarsFlag=false :subfield=false defaultOpen="preview" :boxShadow=false v-model="post.originalContent"></mavon-editor>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postApi from '@/api/post'
import {mapActions} from 'vuex'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  components: {
    mavonEditor
  },
  data () {
    return {
      post: {},
      author: {}
    }
  },
  created () {
  },
  methods: {
    ...mapActions(['loadUserById']),
    getProfile (username) {
      this.loadUserById({id: username}).then(response => {
        this.author = response.data
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    const url = to.params.url
    next(vm => {
      if (url) {
        postApi.url(url).then(response => {
          vm.post = response.data
          window.document.title = vm.post.title
          vm.getProfile(vm.post.createUser)
        })
      }
    })
  }
}
</script>
