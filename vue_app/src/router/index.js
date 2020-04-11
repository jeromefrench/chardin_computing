import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Podcast from '../views/podcast.vue'
import Adminpodcast from '../views/adminPodcast.vue'
import Updatepodcast from '../views/updatePodcast.vue'

import SignUp from '../views/sign-up.vue'
import SignIn from '../views/sign-in.vue'
import SignOUt from '../views/sign-out.vue'
import Profile from '../views/profile.vue'


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
		path: '/sign-up',
		name: 'sign-up',
		component: SignUp
	},
	{
		path: '/sign-in',
		name: 'sign-in',
		component: SignIn
	},
	{
		path: '/sign-out',
		name: 'sign-out',
		component: SignOUt
	},
	{
		path: '/profile',
		name: 'profile',
		component: Profile
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
