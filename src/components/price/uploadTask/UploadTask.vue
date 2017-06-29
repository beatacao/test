<template>
    <div>
        <div class="ipt_condition">
            <button v-on:click='openModal' class="btn btn-success"><i class="ni-upload3"></i> 提交任务</button>
        </div>
        <div id='uploadTaskModal' class="modal fade hide" tabindex="-1" role="dialog" aria-labelledby="uploadTaskModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" v-on:click='closeModal($event)'>×</button>
                        <h3>导入比价清单</h3>
                    </div>
                    <div class="modal-body">
                        <div id="submitTask">
                            <form action="/xiefu/submitTask" method="post"  enctype="multipart/form-data" name='uploadTaskForm'> 
                                <div class="step1-fileUpload s-field">
                                    <div class="s-field">
                                        <span>商品清单</span>
                                        <input type="file" name="multipartFile" />
                                        <input type="hidden" name="type" id="priceType" :value="cateType" />
                                    </div>
                                    <div class="s-field" v-show='cateTag==="xiangbao"' id="rad-sel-luggage">
                                        <p class=""> 特殊品类请选择： </p>
                                        <label class="rad-lab"><input type="checkbox" class="rad-ipt" name="type" value="701" id="luggage"> 拉杆箱（清单必填“尺寸”列）</label>
                                    </div>
                                    <div class="s-field" >
                                        <button class="btn btn-info f-btn" v-on:click='nextStep($event)'>
                                            <span v-if='!step1_submit'>下一步</span>
                                            <img  v-if='step1_submit' :src="loadingIcon">
                                        </button>
                                        <button class="btn f-btn cancel" v-on:click='closeModal($event)'>取消</button>
                                    </div>
                                    <div class="s-field">
                                        <p><span class="label label-warning">上传须知</span></p>
                                        <p>1.使用上传功能，请保证上传表格包含：品牌名称、款号、货号、条形码、商品名称、VIP售价、市场价</p>
                                        <p>2.请保证上传的文件名为：日期+档期名称+专场，例：10-3 茵曼INMAN女装专场 定价清单.xlsx</p>
                                        <p>3.已支持混合专场的任务</p>
                                        <p id="self-shipin">4.已支持手表比价，其他饰品待开发</p>
                                    </div>
                                </div>
                                <div class="step2-fanbi s-field hide">
                                    <div class="s-field">
                                        <p>档期名称：<b class="xpBrandName">{{checkResult.xpBrandName}}</b></p>
                                        <p>品牌名称：<b class="ptBrandName">{{checkResult.ptBrandName}}</b></p>
                                        <p v-if='checkResult.multiBrand' class="fanbiInfo">上传的清单为混合专场，请点击确认提交任务。</p>
                                        <p v-else class="fanbiInfo">
                                            <span v-if='checkResult.shopNum>0'>该档期品牌已做如下店铺定向比价：</span>
                                            <span v-else>档期已做提前比价，但未找到相应的旗舰店</span>
                                        </p>
                                    </div>
                                    <div class="s-field add-site s-body">
                                        <input type="hidden" name="isMultiBrand" :value="checkResult.multiBrand" >
                                        <input type="hidden" name="isExistPricing" :value="checkResult.existPricing" >
                                        <input type="hidden" name="PrePricing.processId" :value="checkResult.processId" >
                                        <input type="hidden" name="type" :value="cateType" >

                                        <div v-if='checkResult.shopNum>0'>
                                            <p v-for='(shop, index) in checkResult.shopInfoPoList'>
                                                <a :href="shop.shopUrl" target="_blank">{{siteMap[shop.siteId]+' '+ shop.shopName }}</a>
                                                <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].url'" :value="shop.shopUrl">
                                                <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].crawlerType'" :value="(siteDirect[shop.siteId]||'')+'-directlist'">
                                                <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].stragety'" :value="(siteDirect[shop.siteId]||'')+'-direct-strategy'">
                                                <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].isUsed'" class="hidden-isUsed" value="1">
                                                <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].shopId'" :value="shop.shopId">
                                                <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].shopName'" :value="shop.shopName">
                                                <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].siteId'" :value="shop.siteId">
                                            </p> 
                                        </div>   
                                    </div>
                                    <div class="s-field btn-filed">
                                        <button class="btn btn-info f-btn" v-on:click='step2Submit($event)'>
                                            <span v-if='!step2_submit'>确认</span>
                                            <img  v-if='step2_submit' :src="loadingIcon">
                                        </button>
                                        <button class="btn f-btn cancel" v-on:click='closeModal($event)'>取消</button>
                                    </div>
                                    <div class="s-field tip">
                                        <p v-if='checkResult.multiBrand'><span class="label label-warning">上传须知</span>混合专场不支持定向店铺抓取，请知晓！</p>
                                        <p v-if='!checkResult.multiBrand'><span class="label label-warning">上传须知</span>已提前比价的档期，暂不支持新增店铺比价；如需要重新比价或增加店铺，请修改文件名，在“专场”前增加任意字符，重新上传进行比价</p>
                                    </div>
                                </div>
                                <div class="step2-noFanbi s-field hide">
                                    <div class="s-field">
                                        <p>档期名称：<b class="xpBrandName">{{checkResult.xpBrandName}}</b></p>
                                        <p>品牌名称：<b class="ptBrandName">{{checkResult.ptBrandName}}</b></p>
                                        <p class="hasShops" v-show='shoplist.length>0'>该品牌有如下店铺可做定向抓取，请勾选需要的店铺：</p>
                                        <p class="noShops" v-show='shoplist.length===0'>系统未找到相应的旗舰店，请手动增加链接</p>
                                        <button class="btn btn-success add" v-on:click='queryShops(checkResult.ptBrandName, $event)'>刷新</button>
                                    </div>
                                    <div class="s-field add-site s-body">
                                        <input type="hidden" name="isExistPricing" :value="checkResult.existPricing" >
                                        <input type="hidden" name="type" :value="cateType" >
                                        <p v-for='(shop, index) in shoplist'>
                                            <input type="checkbox"><a :href="shop.shopUrl" target="_blank">{{siteMap[shop.siteId]+' '+shop.shopName}}</a>
                                            <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].url'" :value="shop.shopUrl">
                                            <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].crawlerType'" :value="(siteDirect[shop.siteId]||'')+'-directlist'">
                                            <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].stragety'" :value="(siteDirect[shop.siteId]||'')+'-direct-strategy'">
                                            <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].isUsed'" class="hidden-isUsed" value="0">
                                            <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].shopId'" :value="shop.shopId">
                                            <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].shopName'" :value="shop.shopName">
                                            <input type="hidden" :name="'DirectUrlMatchPricingList['+ index +'].siteId'" :value="shop.siteId">
                                        </p>
                                    </div>
                                    <div class="s-field btn-filed">
                                        <button class="btn btn-info f-btn" v-on:click='step2Submit($event)'>
                                            <span v-if='!step2_submit'>确认</span>
                                            <img  v-if='step2_submit' :src="loadingIcon">
                                        </button>
                                        <button class="btn f-btn cancel" v-on:click='closeModal($event)'>取消</button>
                                    </div>
                                    <div class="s-field">
                                        <p><span class="label label-warning">上传须知</span></p>
                                        <p class="special-tip">如无对应的店铺，请至&nbsp;<a class="special-link" href="/center#forward?method=/price/general/directionalShopMgr" target="_blank">品牌店铺管理</a>&nbsp;新增后，刷新后再选择</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api_config from '~api/api_config'
    import site_config from '~api/site_config'

    export default {
        data() {
            return {
                "loadingIcon": require('~assets/img/little-loading.gif'),
                "step1_submit": false,
                "checkResult": {
                    "processId": null,
                    "shopInfoPoList": null,
                    "xpBrandName": "",
                    "ptBrandName": "",
                    "multiBrand": false,    //混合专场，界面上有不同展示
                    "existPricing": false 
                },
                "shoplist": [],
                "siteMap": site_config.siteMap2,
                "siteDirect": {
                    1001: "jd",
                    1003: 'dangdang',
                    1011: 'tmall'
                },
                "step2_submit": false
            }
        },
        computed: {
            cateType() {
                return this.$store.state.frontend.assistant.cateType
            },
            cateTag() {
                return this.$store.state.frontend.assistant.cateTag
            }
        },
        methods: {
            openModal() {
                var self = this
                $('#uploadTaskModal').modal('show')
                $('.modal-backdrop').click(function(e){
                    self.closeModal(e)
                })
            },
            closeModal(e) {
                var ev = e || window.event
                ev.preventDefault()
                $('#uploadTaskModal').modal('hide')
            },
            nextStep(e) {
                var ev = e || window.event
                if(this.cateTag === 'xiangbao') {
                    if($('#luggage').is(':checked')){
                        $('.step1-fileUpload .s-field #priceType').val(701)
                    }else{
                        $('.step1-fileUpload .s-field #priceType').val(7)
                    } 
                }
                ev.preventDefault()
                var filePath = $('[name="multipartFile"]').val()
                if(!filePath){
                    $.trace('请选择上传文件',function(){},10000000)
                    return false
                }
                this.step1_submit = true
                this.ajaxSubmit()
            },
            ajaxSubmit() {
                var self = this
                $('form[name=uploadTaskForm]').ajaxSubmit({
                    url : api_config.xiefu.uploadTaskCheck,
                    data:{},
                    dataType:'json',
                    success:function(data){
                        self.step1_submit = true
                        self.ajaxSubmitCallback(data)
                    }
                })
            },
            ajaxSubmitCallback(data) {
                var self = this
                if(!data.ok){
                    this.step1_submit = false
                    $.trace(data.data,function(){},10000000)
                }else{
                    var isFanbi = data.data.existPricing,
                        multiBrand = data.data.multiBrand
                        
                    self.isFanbi = data.data.existPricing
                    self.multiBrand = data.data.multiBrand

                    if(multiBrand){
                        $('.step1-fileUpload').fadeOut(function(){
                            self.checkResult = data.data
                            self.checkResult.ptBrandName = '混合'
                            self.checkResult.existPricing = false
                            $('.step2-fanbi').fadeIn()
                            $('.step2-noFanbi').remove()
                        })
                        return false
                    }
                    if(isFanbi){
                        $('.step1-fileUpload').fadeOut(function(){
                            self.checkResult = data.data
                            self.checkResult.shopNum = data.data.shopInfoPoList?data.data.shopInfoPoList.length:0
                            $('.step2-fanbi').fadeIn()
                            $('.step2-noFanbi').remove()
                        })
                    }else{
                        $('.step1-fileUpload').fadeOut(function(){
                            $('.step2-noFanbi').fadeIn(function(){
                                self.checkResult = data.data
                                self.queryShops(data.data.ptBrandName)
                            })
                            $('.step2-fanbi').remove()
                        })
                    }
                }
            },
            queryShops (ptBrandName, e){
                var self = this,
                    ev = e || window.event
                $.ajax({
                    'url' : api_config.xiefu.fetchShopList,
                    'dataType' : 'json',
                    'data': {
                        'siteIds' : '1001,1003,1011',
                        'ptBrandName' : ptBrandName
                    },
                    'type' : 'POST'
                }).done(function(data) {
                    if(!data.ok){
                        $.trace(data.data,function(){},10000000)
                        return false
                    }
                    self.shoplist = data.data
                })
                ev && ev.preventDefault()
            },
            step2Submit (e){
                var self = this,
                    ev = e || window.event
                
                //*******校验店铺个数及url只适用于 step2-noFanbi
                // if(!checkoutIpt()){ //校验url地址输入格式
                //     return false;
                // }
                // else if(!checkoutUrlNum()){//校验店铺个数小于等于5
                //     return false;
                // }
                // else if(!checkoutSameUrl()){//校验店铺url重复
                //     return false;
                // }

                self.step2_submit = true
                ev.preventDefault()
                $('form[name=uploadTaskForm]').ajaxSubmit({
                    url : api_config.xiefu.submitTask,
                    data:{},
                    dataType:'json',
                    success:function(data){
                        self.step2_submit = false
                        self.closeModal()
                        // loadingtasklist
                    }
                })
            }
        }
    }
</script>
