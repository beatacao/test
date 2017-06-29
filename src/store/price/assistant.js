import * as axios from 'axios'
import api_config from '~api/api_config'


const state = {
    cateType: 1,
    cateTag: 'fuzhuang',
    search: {
        isShowSelf:true,
        isShowPrice:true,
        searchString:'',
        searchType:0
    },
    pagination: {
        currentPage:1,
        pageSize:10,
    },
    taskList: {}
}

const actions = {
    ['fetchTaskList'](ctx, params) {
        var query = '?'
        Object.keys(params).forEach(function(key, index, arr){
            query += ((index===0)?'':'&') + key + '=' + params[key]
        })
        axios.get(api_config.uploadTaskResult + query).then(function(res){
            ctx.commit('taskList', res.data)
        })
    }
}

const mutations = {
    ['taskList'] (state, payload) {
        state.taskList = payload
    }
}

export default {
    actions,
    state,
    mutations
}
