import * as axios from 'axios'
import api_config from '~api/api_config'


const state = {
    currentCategoryId: 1,
    category: [],
    shoplist: []
}

const actions = {
    ['fetchCategory'](ctx, params) {
        axios.get(api_config.admin.fetchCategory).then(function(res){
            ctx.commit('category', res.data)
        })
    },
    ['fetchShoplist'](ctx, params) {
        var query = ''
        for(var key in params){
            query += '&' + key + '=' + params[key]
        }
        query = '?' + query.substr(1)
        axios.get(api_config.admin.fetchShoplist).then(function(res){
            ctx.commit('shoplist', res.data)
        })
    }
}

const mutations = {
    ['category'] (state, payload) {
        state.category = payload
    },
    ['shoplist'] (state, payload) {
        state.shoplist = payload.map(function(shop, index){
            shop.fetchType.all = shop.fetchType.search && shop.fetchType.shop
            return shop
        })
    }
}

export default {
    actions,
    state,
    mutations
}
