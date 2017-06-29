import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import ShopManageView from '../views/admin/ShopManage.vue'

export default new Router({
	mode: 'history',
	base: '/views/admin',
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{ name: 'index', path: '/', component: ShopManageView}
	]
})

