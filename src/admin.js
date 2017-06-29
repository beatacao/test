import Vue from 'vue'
import App from './admin.vue'
import store from './store'
import router from './router/admin'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'

sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// router.beforeEach((route, redirect, next) => {
//     store.dispatch('global/gProgress', 0)
//     next()
// })

const admin = new Vue({
	router,
	store,
	el: "#admin",
	render: h => h(App)
})
