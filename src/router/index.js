import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/views/Landing.vue'
import Index from '@/views/Index'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup'
import EditProfile from '@/views/EditProfile.vue'
import Post from '@/views/Post'
import NewPost from '@/views/NewPost'
import Management from '@/views/Management'
import ImageManagement from '@/views/ImageManagement'
import MainNavbar from '@/layout/MainNavbar.vue'
import MainFooter from '@/layout/MainFooter.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/login',
      name: 'login',
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      components: { default: Signup, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: '/image/management',
      name: 'imageManagement',
      components: { default: ImageManagement, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 100 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/management',
      name: 'management',
      components: { default: Management, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 100 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/profile',
      name: 'editProfile',
      components: {default: EditProfile, header: MainNavbar, footer: MainFooter},
      props: {
        header: {colorOnScroll: 400},
        footer: {backgroundColor: 'black'}
      }
    },
    {
      path: '/post/:url',
      name: 'post',
      components: {default: Post, header: MainNavbar, footer: MainFooter},
      props: {
        header: {colorOnScroll: 160},
        footer: {backgroundColor: 'black'}
      }
    },
    {
      path: '/npost/:url',
      name: 'npost',
      components: {default: NewPost, header: MainNavbar, footer: MainFooter},
      props: {
        header: {colorOnScroll: 160},
        footer: {backgroundColor: 'black'}
      }
    },
    {
      path: '/:username',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    }
  ]
})
