<template>
    <div class="lc-title">
        <div class="h-icon"></div>
        <div class="h-text">
            任务管理 <span class="sub-title" v-on:click="hideTaskId">支持网站：{{supported}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            'supported': "天猫、京东、1号店、亚马逊、苏宁、国美、银泰、好乐买、V+商城"
        }
    },
    "methods": {
        // uploadtaskxiefu.js
        hideTaskId () {}
    }
}
</script>