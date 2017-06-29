<template>
    <div id="assistant" class="container-fluid">
		<div class="widget">
			<TopBar></TopBar>
			<div class="subBox">
				<UploadTask></UploadTask>
				<FilterResult></FilterResult>
				<TaskManager></TaskManager>
			</div>
		</div>
	</div>
</template>

<script>
import * as api_config from '~api/api_config'
import TopBar from '~components/TopBar'
import UploadTask from '~components/price/uploadTask/UploadTask'
import FilterResult from '~components/price/FilterResult'
import TaskManager from '~components/price/TaskManager'

export default {
	data () {
		return {
			tasklist: ['task1', 'task2', 'task3']
		}
	},
	components: {
		TopBar, UploadTask, FilterResult, TaskManager
	},
	created () {
		var params = {
                currentPage:1,
                pageSize:10,
                type:1,
                isShowSelf:true,
                isShowPrice:true,
                searchString:'',
                searchType:0
            }
		
		this.$store.dispatch('frontend/fetchTaskList', params)
	}

}
</script>

<style lang='less'>
.cloth-view{
    color: green;
    font-size:18px;
}
</style>

