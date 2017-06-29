// import Vue from 'vue'
// import Vuex from 'vuex'
// import * as axios from 'axios'
// import api_config from '~api/api_config'

// Vue.use(Vuex)

// const store = new Vuex.Store({
// 	state: {
// 		menuOpen: true,
// 		user: {
// 			username: 'beata.cao'
// 		},
// 		pricePage: { // 比价助手页面数据
// 			cateType: 1,
// 			cateTag: 'fuzhuang',
// 			search: {
// 				isShowSelf:true,
//                 isShowPrice:true,
//                 searchString:'',
//                 searchType:0
// 			},
// 			pagination: {
// 				currentPage:1,
//                 pageSize:10,
// 			},
// 			taskList: {}
// 		}
// 	},
// 	actions: {
// 		fetchTaskList(ctx, params) {
// 			var query = '?'
// 			Object.keys(params).forEach(function(key, index, arr){
// 				query += ((index===0)?'':'&') + key + '=' + params[key]
// 			})
// 			axios.get(api_config.uploadTaskResult + query).then(function(res){
// 				ctx.commit('taskList', res.data)
// 			})
// 		}
// 	},
// 	mutations: {
// 		menuOpen (state) {
// 			state.menuOpen = !state.menuOpen
// 		},
// 		taskList (state, payload) {
// 			state.taskList = payload
// 		}
// 	}
// })

// export default store

import Vue from 'vue'
import Vuex from 'vuex'

import assistant from './price/assistant'
import shopmanage from './admin/shopmanage'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        backend: {
            namespaced: true,
            modules: {
                shopmanage: shopmanage
            }
        },
        frontend: {
            namespaced: true,
			state: {
				menuOpen: true
			},
			mutations: {
				menuOpen (state) {
					state.menuOpen = !state.menuOpen
				},
			},
            modules: {
                assistant: assistant
            }
        },
        global: {
            namespaced: true,
			state: {
				user: {
					username: 'beata.cao'
				}
			}
        }
    }
})

