import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Podcast from '../views/podcast.vue'
import Adminpodcast from '../views/adminPodcast.vue'
import Updatepodcast from '../views/updatePodcast.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'podcast',
    component: Podcast
  },
  {
    path: '/admin-podcast',
    name: 'admin-podcast',
    component: Adminpodcast
  },
  {
      path: '/update-podcast/:id',
    name: 'update-podcast',
    component: Updatepodcast
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
