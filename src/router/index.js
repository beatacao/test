import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import IndexView from '../views/price/IndexView.vue'
// 动态路由
const ClothView = resolve => require(['../views/price/ClothView.vue'], resolve)

export default new Router({
	mode: 'history',
	base: '/views',
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{ name: 'index', path: '/', component: IndexView},
		{ name: 'cloth', path: '/cloth', component: ClothView}
	]
})

