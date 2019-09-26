<template>
  <div class="wrapper">
    <parallax class="page-header header-filter" style="height: 160px;background-color: #15bfb7">
    </parallax>
    <div class="main main-raised">
      <div class="section section-basic">
        <div class="container">
          <div>
            <md-table v-model="searched" md-sort="createTime" md-sort-order="desc" @md-selected="onSelect" md-card md-fixed-header>
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title" style="color: #000000 !important;">史记</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="搜索" v-model="search" @input="searchOnTable" />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state
                md-label="还未编写未来史"
                md-description="开始你的创作吧">
                <md-button class="md-primary md-raised" @click="editPost()">新笔头</md-button>
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="标题" md-sort-by="title">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="状态" md-sort-by="status">{{ item.statusProperty.text }}</md-table-cell>
                <md-table-cell md-label="浏览量" md-sort-by="visits">{{ item.visits }}</md-table-cell>
                <md-table-cell md-label="点赞量" md-sort-by="title">{{ item.likes }}</md-table-cell>
                <md-table-cell md-label="创建时间" md-sort-by="createTime">{{ item.createTime }}</md-table-cell>
                <md-table-cell md-label="操作">
                  <md-button class="md-icon-button md-primary" @click="editPost(item.url)">
                    <md-icon>update</md-icon>
                    <md-tooltip md-direction="top">修改</md-tooltip>
                  </md-button>
                  <md-button class="md-icon-button md-primary" @click="deletePost(item.id)">
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">删除</md-tooltip>
                  </md-button>
                  <md-button class="md-icon-button md-primary" @click="updateStatus(item.id,item.status)">
                    <md-icon>menu</md-icon>
                    <md-tooltip md-direction="top">{{item.status === 'PUBLISHED'?'下架':'发布'}}</md-tooltip>
                  </md-button>
                </md-table-cell>
              </md-table-row>
              <md-table-pagination :md-page="pagination.current" :md-page-size="pagination.pageSize" :md-total="pagination.total" md-label="" md-on-paginate="loadPosts">
              </md-table-pagination>
            </md-table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import postApi from '@/api/post'
import {mapActions} from 'vuex'

export default {
  name: 'management',
  bodyClass: 'index-page',
  props: {
  },
  data () {
    return {
      pagination: {
        current: 1,
        pageSize: 10,
        sort: null
      },
      queryParam: {
        page: 0,
        size: 10,
        sort: null,
        keyword: null,
        categoryId: null,
        status: null
      },
      postStatus: postApi.postStatus,
      posts: [],
      searched: [],
      search: null,
      selected: null
    }
  },
  methods: {
    ...mapActions(['copyUser']),
    loadPosts () {
      this.queryParam.page = this.pagination.current - 1
      this.queryParam.size = this.pagination.pageSize
      this.queryParam.sort = this.pagination.sort
      postApi.my(this.queryParam).then(response => {
        this.posts = response.data.content
        this.pagination.total = response.data.totalElements
        this.searched = this.posts
        this.searched.map(post => {
          post.statusProperty = this.postStatus[post.status]
          return post
        })
      })
    },
    searchOnTable () {
      this.searched = this.posts.filter(item => item.title.includes(this.search))
    },
    deletePost (id) {
      postApi.delete(id).then(resp => {
        this.searched = this.searched.filter(p => p.id !== id)
      })
    },
    editPost (url) {
      if (!url) {
        url = 'new'
      }
      this.$router.push({name: 'npost', params: {url: url}})
    },
    updateStatus (id, status) {
      if (status === 'PUBLISHED') {
        status = 'DRAFT'
      } else {
        status = 'PUBLISHED'
      }
      postApi.updateStatus(id, status).then(resp => {
        this.loadPosts()
      })
    },
    onSelect (item) {
      this.selected = item
    }
  },
  created () {
    this.copyUser()
    this.loadPosts()
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>
<style lang="scss">
  .section-download {
    .md-button + .md-button {
      margin-left: 5px;
    }
  }

  @media all and (min-width: 991px) {
    .btn-container {
      display: flex;
    }
  }
</style>
