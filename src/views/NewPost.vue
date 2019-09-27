<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter" style="height: 160px;background-color: #15bfb7"></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">

          </div>
          <div class="text-center" style="max-width: 100%;min-height: 800px;">
          <h2 class="title text-center">
            <md-field>
              <label>标题</label>
              <md-input v-model="post.title"></md-input>
              <span class="md-helper-text">略略字符可见原由</span>
            </md-field>
          </h2>
          <mavon-editor ref=md style="min-height: 780px;"
            v-model="post.originalContent" placeholder="编写未来"
            :boxShadow="false"
            :toolbars="toolbars"
            :ishljs="true"
            :autofocus="false" :value="post.formatContent" @imgAdd="imgAdd" @imgDel="imgDel"
          />
          </div>
          <md-button class="md-primary md-lg md-success" @click="savePost"><md-icon>favorite</md-icon> 发 &nbsp; 布</md-button>

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
import postApi from '@/api/post'
import attachmentApi from '@/api/attachment'
import { mavonEditor } from 'mavon-editor'
import { Modal } from '@/components'
import {mapActions} from 'vuex'
import categoryApi from '@/api/category'
import 'mavon-editor/dist/css/index.css'

export default {
  components: {
    mavonEditor,
    Modal
  },
  bodyClass: 'profile-page',
  data () {
    return {
      post: {},
      categoriesModal: false,
      categories: [],
      img_file: {},
      alertShow: false,
      alertMsg: '保存成功',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true,
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: true,
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  created () {
    this.copyUser()
  },
  beforeRouteEnter (to, from, next) {
    const url = to.params.url
    next(vm => {
      if (url && url !== 'new') {
        postApi.get(url).then(response => {
          vm.post = response.data
        })
      }
    })
  },
  methods: {
    ...mapActions(['copyUser']),
    categoriesModalHide () {
      this.categoriesModal = false
    },
    allCategories () {
      categoryApi.listAll().then(resp => {
        this.categories = []
        resp.data.forEach(item => {
          this.categories.push(item.name)
        })
      })
    },
    savePost () {
      let that = this
      new Promise(that.uploadimg).then(function () {
        if (that.post.id) {
          postApi.update(that.post.id, that.post, false).then(resp => {
            that.post = resp.data
            that.alertShow = true
          })
        } else {
          postApi.create(that.post, false).then(resp => {
            that.post = resp.data
            that.alertShow = true
          })
        }
      })
    },
    imgAdd (pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file
    },
    imgDel (pos) {
      delete this.img_file[pos]
    },
    uploadimg (resolve, reject) {
      let formdata = new FormData()
      for (let _img in this.img_file) {
        formdata.append('files', this.img_file[_img])
      }
      attachmentApi.uploads(formdata, function () {
        console.log(arguments)
      }, null).then((res) => {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          this.$refs.md.$img2Url(i + 1, data[i].path)
        }
        resolve(res)
      })
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
