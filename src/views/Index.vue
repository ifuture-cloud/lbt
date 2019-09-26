<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <h1 style="font-size: 40px">未来由你编写</h1>
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
            style="height: 100%"
          >

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  bodyClass: 'login-page',
  data () {
    return {
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
        backgroundImage: `url(${this.header})`,
        height: '100vh !important'
      }
    }
  }
}
</script>
