$(function(){
    var scope = {
        status : xiefuUpload.status ,
        msg : xiefuUpload.msg,
        fanbiCount : 0,
        dirShopLen : 0,
        ptBrandName: ''
    };
    init();
    function init(){
        if(scope.status==='false'){
            window.parent.trace(scope.msg,function(){},10000000);
        }
        else if(scope.status==='true'){
            window.parent.closePop(true);
        }

    }
    // 	控制拉杆箱选择按钮显示
    if(window.top.location.hash.indexOf('xiangbao') > -1) {
    	$('#rad-sel-luggage').show();
    } else {
    	$('#rad-sel-luggage').hide();
    }
    // 	控制拉饰品选择按钮显示
    if(window.top.location.hash.indexOf('shipin') > -1) {
    	$('#self-shipin').show();
    } else {
    	$('#self-shipin').hide();
    }
    // 是否为拉杆箱
    $('#luggage').change(function() {
    	$('#luggage').is(':checked') ? $('.step1-fileUpload .s-field #priceType').val(701) : $('.step1-fileUpload .s-field #priceType').val(7);
    });

    //取消按钮
    $('.cancel').click(function(){
        window.parent.closePop(true);
        return false;
    });
    //step1-fileUpload  step2-fanbi step2-noFanbi
    //下一步
    $('.step1-fileUpload .next-step').click(function(){
    	if(window.top.location.hash.indexOf('xiangbao') > -1) {
    		$('#luggage').is(':checked') ? $('.step1-fileUpload .s-field #priceType').val(701) : $('.step1-fileUpload .s-field #priceType').val(7);
    	}
        var filePath = $('.step1-fileUpload input[type="file"]').val();
        if(filePath==''){
            window.parent.trace('请选择上传文件',function(){},10000000);
            return false;
        }
        $(this).hide();
        $(this).siblings('.next-step-load').show();

        ajaxSubmit();
        return false;
    });
    function ajaxSubmit(){
        $('#upload').ajaxSubmit({
            url : contextPath + '/xiefu/check',
            data:{},
            dataType:'json',
            success:function(data){
                ajaxSubmitCallback(data)
            }
        });
    }
    function ajaxSubmitCallback(data){
        if(!data.ok){
            $('.step1-fileUpload .next-step').show();
            $('.step1-fileUpload .next-step-load').hide();
            window.parent.trace(data.data,function(){},10000000);
            return false;
        }
        else{

            var isFanbi = data.data.existPricing,//提前比价
                multiBrand = data.data.multiBrand;//混合专场
            if(multiBrand){
                $('.step1-fileUpload').fadeOut(function(){
                    $('.step2-fanbi').fadeIn(function(){
                        setMutiBrand(data);
                    });
                    $('.step2-noFanbi').remove();

                });
                return false;
            }
            if(isFanbi){
                $('.step1-fileUpload').fadeOut(function(){
                    $('.step2-fanbi').fadeIn(function(){
                        setFanbiIpt(data.data);
                    });
                    $('.step2-noFanbi').remove();
                });

            }
            else{
                $('.step1-fileUpload').fadeOut(function(){
                    $('.step2-noFanbi').fadeIn(function(){
                        setNoFanbiIpt(data);
                        scope.ptBrandName = data.data.ptBrandName;
                        queryShops(data.data.ptBrandName);
                    });
                    $('.step2-fanbi').remove();
                });
            }
        }
    }
    $('.step2-fanbi .sure').click(function () {
        var $parent = $('.step2-fanbi .btn-filed'),
            $submit = $parent.find('.submit'),
            $btnLoad = $parent.find('.btnLoad'),
            $sure = $parent.find('.sure');
        $submit.click();
        $sure.addClass('hide');
        $btnLoad.removeClass('hide');
        return false;
    });
    $('.step2-noFanbi').on('change','.hidden-url',function(){
        var map = {
            '1011' : 'tmall.com',
            '1001' : 'jd.com',
            '1003' : 'dangdang.com'
        };
        var $sel = $(this).siblings('select'),
            selVal = $sel.val(),
            iptVal = $(this).val().toLocaleLowerCase(),
            siteUrl = map[selVal];
        if(iptVal.indexOf(siteUrl)==-1){
            scope.iptValFlag = false;
            window.parent.trace('您输入的'+iptVal+'店铺链接<br>非'+siteUrl+'的链接，请重新填写',function(){},10000000);
            $(this).val('');
        }
    });
    $('.step2-noFanbi .sure').click(function () {
        if(!checkoutIpt()){ //校验url地址输入格式
            return false;
        }
        else if(!checkoutUrlNum()){//校验店铺个数小于等于5
            return false;
        }
        else if(!checkoutSameUrl()){//校验店铺url重复
            return false;
        }
        else{
            var $parent = $('.step2-noFanbi .btn-filed'),
                $submit = $parent.find('.submit'),
                $btnLoad = $parent.find('.btnLoad'),
                $sure = $parent.find('.sure');
            $submit.click();
            $sure.addClass('hide');
            $btnLoad.removeClass('hide');
        }
        return false;
    });
    $('.step2-noFanbi .sub').click(function(){
        delFanbiIpt(this);
        return false;
    });
    $('.step2-noFanbi select').change(function(e){
        var target = e.target;
        selectChange(target);
        return false;
    });
    // $('.step2-noFanbi .add').click(function(){
    //     addFanbiIpt();
    //     $('.step2-noFanbi .sub').off('click').on('click',function(e){
    //         delFanbiIpt(e.target);
    //         return false;
    //     });
    //     $('.step2-noFanbi select').change(function(e){
    //         var target = e.target;
    //         selectChange(target);
    //         return false;
    //     });
    //     return false;
    // });

    $('.step2-noFanbi .add').off('click').on('click', function(){
      queryShops(scope.ptBrandName);
      return false;
    });

    $('.step2-noFanbi').on('change','input[type="checkbox"]',function(e){
        var target = e.target;
        var val = target.checked?1:0;

        $(target).siblings('.hidden-isUsed').val(val)
    });
    function selectChange(target){
        var siteId = $(target).val(),
            direct = getSiteDirect(siteId);
        $(target).siblings('.hidden-crawlerType').val(direct+'-directlist');
        $(target).siblings('.hidden-strategy').val(direct+'-direct-strategy');
        $(target).siblings('.hidden-siteId').val(siteId);
    }
    function addFanbiIpt(){
        if(scope.fanbiCount-scope.dirShopLen>4){
            window.parent.trace('定向比价店铺最多可设置5个',function(){},10000000);
            return false;
        }

        var str =
        '<p>'+
            '<select>'+
                '<option value ="1011" selected="selected">天猫</option>'+
                '<option value ="1001">京东</option>'+
                '<option value ="1003">当当</option>'+
            '</select>'+
            '<input type="text" name="DirectUrlMatchPricingList['+scope.fanbiCount+'].url" class="hidden-url"   placeHolder="http://nike.tmall.com/" />'+
            '<button class="btn btn-danger sub"> - </button>'+
            '<input type="hidden" name="DirectUrlMatchPricingList['+scope.fanbiCount+'].crawlerType" class="hidden-crawlerType"  value="tmall-directlist" />'+
            '<input type="hidden" name="DirectUrlMatchPricingList['+scope.fanbiCount+'].stragety" class="hidden-strategy"  value="tmall-direct-strategy" />'+
            '<input type="hidden" name="DirectUrlMatchPricingList['+scope.fanbiCount+'].isUsed" class="hidden-isUsed" value="1" >'+
            '<input type="hidden" name="DirectUrlMatchPricingList['+scope.fanbiCount+'].siteId" class="hidden-siteId" value="1011" >'+
       '</p>';
        $('.step2-noFanbi .add-site').append(str);
        scope.fanbiCount++;
        return false;
    }
    function delFanbiIpt(target){
        var $p = $(target).parents('p');
        $p.remove();
        scope.fanbiCount--;
    }
    function setFanbiIpt(data){
        $('.step2-fanbi .add-site').find('input[name="PrePricing.processId"]').val(data.processId);
        $('.step2-fanbi .xpBrandName').html(data.xpBrandName);
        $('.step2-fanbi .ptBrandName').html(data.ptBrandName);
        if(data.shopInfoPoList==null||data.shopInfoPoList==[]||data.shopInfoPoList==0){
            $('.fanbiInfo').html('档期已做提前比价，但未找到相应的旗舰店');
        }
        var i,len,content = '',e;
        for(i=0,len=data.shopInfoPoList.length;i<len;i++){
            e = data.shopInfoPoList[i];
            content +=
                '<p>'+
                    '<a href="'+ e.shopUrl+'" target="_blank">'+util.factory.getSiteName(e.siteId)+ ' '+ e.shopName+':</a>'+
                    //'<span >'+ e.shopUrl+'</span>'+
                    '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].url"  value="'+ e.shopUrl+'" />'+
                    '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].crawlerType"  value="'+getSiteDirect(e.siteId+'')+'-directlist" />'+
                    '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].stragety"  value="'+getSiteDirect(e.siteId+'')+'-direct-strategy" />'+
                    '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].isUsed" value="1" >'+
                    '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].shopId" value="'+e.shopId+'"  >'+
                    '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].shopName" value="'+e.shopName+'"  >'+
                    '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].siteId" value="'+e.siteId+'" >'+
                '</p>';
        }
        $('.step2-fanbi .add-site').append(content);
    }
    function setNoFanbiIpt(data){
        $('.step2-noFanbi .add-site').find('input[name="PrePricing.processId"]').val(data.data.processId);
        $('.step2-noFanbi .xpBrandName').html(data.data.xpBrandName);
        $('.step2-noFanbi .ptBrandName').html(data.data.ptBrandName);

    }
    function setMutiBrand(data){
        $('.step2-fanbi .xpBrandName').html(data.data.xpBrandName);
        $('.step2-fanbi .add-site').find('input[name="isExistPricing"]').val('false');
        $('.step2-fanbi .add-site').find('input[name="isMultiBrand"]').val('true');
        $('.step2-fanbi .ptBrandName').html('混合');
        $('.step2-fanbi').find('.fanbiInfo').html('上传的清单为混合专场，请点击确认提交任务。');
        $('.step2-fanbi').find('.s-body').css('height',100);
        var tip = '<p><span class="label label-warning">上传须知</span>'+
            '<p>混合专场不支持定向店铺抓取，请知晓！';
        $('.step2-fanbi').find('.tip').html(tip);
    }
    function queryShops(ptBrandName){
        var url = contextPath + '/xiefu/directUrl',
        // '?siteIds=1001,1003,1011&ptBrandName='+ptBrandName,
            param = {
                ptBrandName:ptBrandName
            };
        $.ajax({
            'url' : url,
            'dataType' : 'json',
            'data': {
              'siteIds' : '1001,1003,1011',
              'ptBrandName' : ptBrandName
            },
            'type' : 'POST'
        }).done(function(data) {
            if(!data.ok){//查询失败
                window.parent.trace(data.data,function(){},10000000);
                return false;
            }
            else{
                scope.fanbiCount = data.data.length;
                scope.dirShopLen = data.data.length;
                if(data.data.length==0){//查询结果为空
                    $('.hasShops').hide();
                    $('.noShops').show();
                }
                else{//有提前比价店铺信息.
                    $('.hasShops').show();
                    $('.noShops').hide();
                    setPreShops(data.data)
                }
            }
        });
    }
    function setPreShops(data){
        var i,len,content = '',e;
        $('.step2-noFanbi .add-site').html('');
        for(i=0,len=data.length;i<len;i++){
            e = data[i];
            content +=
                '<p>'+
                '<input type="checkbox"  />'+
                '<a href="'+ e.shopUrl+'" target="_blank">'+util.factory.getSiteName(e.siteId)+ ' '+ e.shopName+'</a>'+
                //'<span >'+ e.shopUrl+'</span>'+
                '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].url"  value="'+ e.shopUrl+'" />'+
                '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].crawlerType"  value="'+getSiteDirect(e.siteId+'')+'-directlist" />'+
                '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].stragety"  value="'+getSiteDirect(e.siteId+'')+'-direct-strategy" />'+
                '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].isUsed"  class="hidden-isUsed" value="0" >'+
                '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].shopId" value="'+e.shopId+'"  >'+
                '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].shopName" value="'+e.shopName+'"  >'+
                '<input type="hidden" name="DirectUrlMatchPricingList['+i+'].siteId" value="'+e.siteId+'" >'+
                '</p>';
        }
        $('.step2-noFanbi .add-site').append(content);
    }
    function getSiteDirect(siteId){
        var siteEnName = '';
        switch (siteId){
            case '1001' : siteEnName = 'jd';break;
            case '1003' : siteEnName = 'dangdang';break;
            case '1011' : siteEnName = 'tmall';break;
            default  : siteEnName = '';
        }
        return siteEnName;
    }

    function checkoutIpt(){
        var ipt = $('.step2-noFanbi').find('.hidden-url'), i,len,e;
        for(i=0,len=ipt.length;i<len;i++){
            e = ipt[i];
            if(!isURL($(e).val())){
                window.parent.trace('请输入正确的URL地址',function(){},10000000);
                return false;
            }
        }
        return true;
    }
    function isURL(val) {
        var strRegex = "^(https|http)://" ;
        var re = new RegExp(strRegex);
        return re.test(val);
    }

    /**
     *  限制定向店铺数量：总共不超过5个店铺（选择和新增的总和）
     *  增加文案（注：为提高比价速度，最多只允许选择5个店铺（含新增）），如超出数量，进行弹窗提示。
     * @returns {boolean}
     */
    function checkoutUrlNum(){
        //hidden-url  checkbox
        var num=0;
        var $checkbox = $('input[type="checkbox"]');
        _.each($checkbox,function(e){
            if(e.checked){
                num++;
            }
        });
        num += $('.hidden-url').length;
        if(num>5){
            window.parent.trace('为提高比价速度，最多只允许选择5个店铺（含新增）',function(){},100000);
            return false;
        }
        return true;
    }

    /**
     * 对店铺地址进行判断，不允许相同的地址填两个，比如天猫和京东的判断规则为.com前的地址唯一，
     * 例：http://nike.tmall.com 和http://nike.tmall.com/123 ，当当则为 http://shop.dangdang.com/12345
     */
    function checkoutSameUrl(){
        var url,urlArr = [],newUrlArr=[],tmallUrl=[];
        var $checkbox = $('input[type="checkbox"]'),$hiddenUrl = $('.hidden-url');
        _.each($checkbox,function(e){
            if(e.checked){
            	var str = $(e).siblings('a').attr('href');
            	if(str != null){
            		url = str.trim();	// trim() == .replace(/^\s+|\s+$/g,'')
            		urlArr.push(url.toLocaleLowerCase());
            	}
            }
        });
        _.each($hiddenUrl,function(e){
            url = $(e).val().trim();
            urlArr.push(url.toLocaleLowerCase());
        });
        newUrlArr = _.uniq(urlArr);
        if(newUrlArr.length<urlArr.length){
            window.parent.trace('店铺地址重复，请删除重复的链接！',function(){},100000);
            return false;
        }
        _.each(urlArr,function(e){
            if(e.indexOf('tmall')>-1){
                url = e.substring(0, e.indexOf('tmall'));
                tmallUrl.push(url);
            }
        });
        if(_.uniq(tmallUrl).length<tmallUrl.length){
            window.parent.trace('店铺地址重复，请删除重复的链接！',function(){},100000);
            return false;
        }
        return true;
    }

    /**
     * 获取店铺url中的关键字
     * @param url
     * @returns {*}
     */
    function getShopUrlKey(url){
        var str;
        if(url.indexOf('dangdang')>-1){//dangdang 特殊;当当则为 http://shop.dangdang.com/12345
            str = url.substring(url.indexOf('com')+4)
        }
        else if(url.indexOf('tmall')>-1){//  http://nike.tmall.com 和http://nike.tmall.com/123
            str = url.substring('http://'.length-1,url.indexOf('.tmall'))
        }
        else if(url.indexOf('jd')>-1){
            str = url.substring('http://'.length-1,url.indexOf('.jd'))
        }
        return str;
    }

});
