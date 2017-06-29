<template>
    <table class="table table-bordered table-hover table-grey" id="table-data">
        <thead>
            <tr>
                <th>任务ID</th>
                <th>档期名称</th>
                <th>清单ID</th>
                <th>品牌名</th>
                <th>清单数</th>
                <th>匹配数</th>
                <th>上传者</th>
                <th>任务创建<br>时间</th>
                <th>最后修改<br>时间</th>
                <th style="min-width:70px">查看</th>
                <th style="min-width:70px">操作-审核</th>
                <th>审核人</th>
                <th>审核时间</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for='(task, index) in taskList' :index='index'>
                <td class="tl">
                    <span>{{task.pricingJobDto.taskId}}</span>
                </td>
                <td class="tl">
                    <span v-html='$options.filters.pricesysChk(task.ownerName, index, task.pricingJobDto.status, task.verifyStatus)'></span>
                    <span>{{task.upBrandNameWithStartTime | null2Str | trim}}</span>
                    <span v-html='$options.filters.isP(task.pricingJobDto.ownerName)'></span>
                </td>
                <td class="tl">
                    <span>{{task.productList | ats}}</span>
                </td>
                <td class="tl">
                    <span>{{task.ptBrandName | isMultiBrand(task.isMultiBrand)}}</span>
                    <span v-html='$options.filters.siteShopUrl().generator(task.pricingJobDto.siteInfoList)'></span>
                </td>
                <td class="tr"><span>{{task.skuCount}}</span></td>
                <td class="tr">
                    <span v-html="$options.filters.zeroMatchTip().addZeroTips(task.matchCount,task.pricingJobDto.status)"></span>
                </td>
                <td class="tl"><span>{{task.ownerName | owner}}</span></td>
                <td><span>{{task.createTime | date('YYYY-MM-DD HH:mm')}}</span></td>
                <td><span>{{task.updateTime | date('YYYY-MM-DD HH:mm')}}</span></td>
                <td><span v-html="$options.filters.taskStatus(task.pricingJobDto.status, task.completeRate, cateType)"></span></td>
                <td><span v-html="$options.filters.taskVerifyStatus(task.ownerName ,task.pricingJobDto.status, task.verifyStatus,task.pricingJobDto.taskId)"></span></td>
                <td><span v-html="$options.filters.verifyPriceSystem(task.ownerName, task.verifyOwnerName)"></span></td>
                <td><span v-html="$options.filters.verifyPriceSystem(task.ownerName, task.verifyTime, 'date')"></span></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return{}
    },
    methods: {},
    computed: {
        taskList() {
            return this.$store.state.frontend.assistant.taskList.resultRows
        },
        cateType() {
            return this.$store.state.frontend.assistant.cateType
        }
    }
}
</script>