<template>
    <div class="pagination pagination-right grey" id="tablePage">
        <span class="pagenationTotal">
            <span><strong>共{{taskList.totalRow}}条 </strong></span>
            <span class="hover"><strong>{{taskList.currentPage}}</strong></span>/<strong>{{taskList.totalPage}}</strong>页  
        </span>
        <ul></ul>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        // this.pagination(this.taskList)
    },
    watch: {
        taskList(taskList){
            this.pagination(taskList)
        }
    },
    methods: {
        pagination(taskList) {
            var self= this
            var params = {
                currentPage:1,
                pageSize:10,
                type:1,
                isShowSelf:true,
                isShowPrice:true,
                searchString:'',
                searchType:0
            }
            $('#tablePage ul').pagination({
                totalData: _.parseInt(taskList.totalRow),			//数据总条数
                showData: _.parseInt(taskList.pageSize),			//每页显示的条数
                pageCount: _.parseInt(taskList.totalPage),			//总页数,默认为9
                current: _.parseInt(taskList.currentPage),				//当前第几页
                coping: true,			//首页和尾页
                homePage: '<<',			//首页节点内容
                endPage: '>>',			//尾页节点内容
                keepShowPN: true,		//是否一直显示上一页下一页
                count: _.parseInt(5),			//当前页前后分页个数
                callback: function(p){
                    params.currentPage = p.getCurrent()
                    self.$store.dispatch('frontend/fetchTaskList', params)
                }	
            })
        }
    },
    computed: {
        taskList() {
            return this.$store.state.frontend.assistant.taskList
        }
    }
}
</script>