// export default {
//     // taskStatus: taskStatus,
//     // taskVerifyStatus: taskVerifyStatus,
//     // isP: isP,
//     // isMultiBrand: isMultiBrand,
//     // siteShopUrl: siteShopUrl,
//     // zeroMatchTip: zeroMatchTip,
// }
import * as moment from 'moment'

export function pricesysChk (owner, i, crawlerStatus, verifyStatus) {
    if (owner !== 'pricesystem' || crawlerStatus !== 4 || verifyStatus !== 0) {
        return ''
    }
    return '<input type="checkbox" name="name1" data-id="p1" data-parent="p0" data-index="' + i + '"/>'
}

export function trim (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
}
export function date (time,format){
    if(typeof  format === 'undefined'){
        format = 'yyyy-MM-dd hh:mm:ss'
    }
    // return new Date(time).format(format)
    return moment(time).format(format)
}
export function null2Str (e){
    return e===null?'':e
}
export function owner (input) {
    return input === 'pricesystem' ? '价格系统' : input
}
export function verifyPriceSystem (owner, input, dateFlag) {
    if (owner !== 'pricesystem') {
        return '--'
    } 
    if (dateFlag === 'date') {
        // return input
        // return input === null ? input : new Date(input).format('yyyy-MM-dd hh:mm')
        return input === null ? input : moment(input, 'YYYY-MM-DD HH:mm')
    }
    return input
    
}

export function ats (arr) {
    return arr && arr.length ? arr.join(' ') : ''
}

export function isP (ownerName) {
    return ownerName === 'admin' ? '<span class="label label-info">P</span>' : '<span></span>'
}

export function isMultiBrand (ptBrandName, flag) {
     return (flag === 1 ? '混合' : ptBrandName)
}


export function siteShopUrl () {
    function bind(){
        $('#uploadTaskModule').on('click',function(e){
            var target  = e.target,
                img = $(target).hasClass('gl-tip-clk'),
                popC = $(target).hasClass('popover-content'),
                popA = $(target).hasClass('popover-a')
            if(img||popC||popA){

            }
            else{
                $('.gl-tip-clk').popover('hide')
            }
        })
        $('.gl-tip-clk').popover({
            animation : true,
            html : true,
            placement : 'left',
            trigger : 'click'
        })
        $('.gl-tip-clk').click(function(){
            var $tip = $('.gl-tip-clk')
            var self = this
            _.each($tip,function(e){
               if (!$(e).is(self)) $(e).popover('hide')
            })
        })
    }

    function formatHref(shop){
        var str = ''
        _.each(shop,function(e){
            str  += '<p><a href=\''+ e.url+'\' target=\'_blank\' class=\'popover-a\' style=\'color:#eee\'>'+
            (e.name===null?e.url.substr(0,20)+'...':e.name)+
            '</a>'
        })
        return str
    }

    function generator(siteIds){
        var content = ''
        if(siteIds!==null){
            _.each(siteIds,function(e,i){
                content += '<img src="/assets/img/siteLogo/'+ e.siteId+'.png" class="site-logo gl-tip-clk" '+
               ' data-content="'+formatHref(e.shops)+'" title="" data-original-title="" />'
            })
        }
        return content
    }

    return {
        generator: generator,
        bind : bind
    }
}

export function zeroMatchTip () {
    var text =
        '<p>返回结果匹配为0，可能存在以下几种原因:</p>'+
        '<p>1.该品牌未在其他网站开卖</p>'+
        '<p>2.提供的商品其他网站未开卖</p>'+
        '<p>3.品牌存在中英文，导致结果不理想，请尝试修改品牌为单独的中文或英文</p>'+
        '<p>4.爬虫或匹配发生了故障，请联系我们</p>'
    function bindTipPop(){
        $('.zeroTip').popover({
            animation : true,
            html : true,
            placement : 'left',
            content : text,
            trigger : 'hover'
        })
    }
    function addZeroTips(num,status){
        if(status!==4){
            return '--'
        }
        var str = '<i class="ni-question zeroTip"></i>'
        if(num===0||num===null){
            return  str + '0'
        }
        
            return num
        
    }

    return {
        addZeroTips: addZeroTips,
        bindTipPop : bindTipPop
    }
}

export function taskStatus (status,completeRate,cateType){
    var result = ''
    switch(status){
        case 0: result = '<span class="label">已提交</span>'; break
        case 1: result = '<span class="label label-info">抓价中 '+(completeRate*100).toFixed()+'%</span>'; break
        case 2: result = '<span class="label label-info">抓价完成</span>'; break
        case 3: result = '<span class="label label-info">匹配中</span>'; break
        case 4: result = '<a class="info" href="javascript:;">查看结果</a>'; break
        case 101: result = '<span class="label label-important">抓价异常</span>'; break
        case 102: result = '<span class="label label-warning">抓取不全</span>'; break
        case -1: result = '<span class="label label-info">待抓取</span>'; break
        default:result = status
    }
    return result
}

export function taskVerifyStatus (taskOwnerName,taskCrawlerStatus,taskVerifyStatus,taskId){
    var status,
        result = '--'
    if(taskOwnerName!=='pricesystem'){
        if(taskCrawlerStatus === 4) {
            result = '<span><a class="taskOperators" data-status="0" data-taskid="'+taskId+'" href="javascript:;">重抓</a></span>'
        } else {
            result = '<span><a class="taskOperators" data-status="0" data-taskid="'+taskId+'" href="javascript:;">重抓</a></span>' +
            '<span><a class="taskOperators" data-status="2" data-taskid="'+taskId+'" href="javascript:;">完成</a></span>' +
            '<span><a class="taskOperators" data-status="4" data-taskid="'+taskId+'" href="javascript:;">放弃</a></span>'
        }
        return result
    }
    if(taskCrawlerStatus === -1) {
        result = '<span><a class="taskOperators start" data-status="-1" data-taskid="'+taskId+'" href="javascript:;">启动任务</a></span>'
        return result
    }
    if(taskVerifyStatus===0){
        status = taskCrawlerStatus===4?0:10
    }
    else{
        status = taskVerifyStatus
    }
    switch(status){
        case 10: result = '<span><a class="taskOperators" data-status="0" data-taskid="'+taskId+'" href="javascript:;">重抓</a></span>' +
            '<span><a class="taskOperators" data-status="2" data-taskid="'+taskId+'" href="javascript:;">完成</a></span>' +
            '<span><a class="taskOperators" data-status="4" data-taskid="'+taskId+'" href="javascript:;">放弃</a></span>'; break
        case 0: result = '<span><a class="taskOperators verify" href="javascript:;">审核</a></span>'+
            '<span><a class="taskOperators" data-status="0" data-taskid="'+taskId+'" href="javascript:;">重抓</a></span>'; break
        case 1: result = '<span class="label label-success">审核通过</span>'+
            '<span><a class="taskOperators" data-status="0" data-taskid="'+taskId+'" href="javascript:;">重抓</a></span>'; break
        case 2: result = '<span class="label label-important">款号错误</span>'+
            '<span><a class="taskOperators" data-status="0" data-taskid="'+taskId+'" href="javascript:;">重抓</a></span>'; break
        default:result = status
    }
    return result
}