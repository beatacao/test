<template>
    <div class="ipt_condition queryBrand" style="margin-bottom: 10px">
        <input type="text" placeholder="请输入档期、清单ID、任务ID" class="iptQuery">
        <button id="query" class="btn" v-on:click='filterTask'><i class="ni-search"></i> 查询</button>
        <br>
        <label class="query-type"><input type="radio" name="queryType" value="0" v-model='queryType'> 档期名</label>
        <label class="query-type"><input type="radio" name="queryType" value="1" v-model='queryType'> 清单ID</label>
        <label class="query-type"><input type="radio" name="queryType" value="2" v-model='queryType'> 任务ID</label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryType: 0
        }
    },
    methods: {
        filterTask() {
            this.$store.dispatch('frontend/fetchTaskList')
        }
    }
}
</script>