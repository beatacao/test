<template>
    <div>
        <div class="ipt_condition table_holder">
            <div class="task-left" data-bind="style: { 'display': hasPriceSystem()>0?'block':'none'}">
                <input type="checkbox" name="name1" data-id="p0" data-parent="-1"/>全选
                <input type="checkbox" name="name1" data-id="p0" data-parent="0"/>反选
                <button class="btn btn-success btn-mini" data-bind="click:verifyPass">审核通过</button>
                <button class="btn btn-danger btn-mini" data-bind="click:verifyFail">款号错误</button>
            </div>
            <div class="task-owner">
                <b><i class="ni-spinner6"></i></b><a href="javascript:;">刷新</a>
                <label><input type="checkbox" checked id="showPrice" data-id="s0" data-parent="1">仅显示价格系统的任务</label>
                <label><input type="checkbox" checked id="showSelf" data-id="s1" data-parent="1">仅显示自己上传/审核的任务</label>
            </div>
        </div>
        <div class="ipt_condition table_holder" style="overflow:visible">
            <TaskList></TaskList>
            <Pagination></Pagination>
        </div>
    </div>
</template>

<script>
import TaskList from './TaskList'
import Pagination from '../Pagination'

export default{
    data () {
        return {}
    },
    components: {
        TaskList, Pagination
    }
}
</script>