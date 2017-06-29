$(function(){
    //ajax 全局配置
    //jquery ajax setup
    var ajaxCount = 0;
    $.ajaxSetup ({
        global:true,
        cache:false,
        beforeSend : function(){
            if(_const_current_user_==null||_const_current_user_==''||_const_current_user_=='null'){
                loginFail();
            }
            NProgress.start();
            $('.loadingMask').removeClass('hide');
            ajaxCount++;
        },
        complete : function(){
            ajaxCount--;
            if(ajaxCount===0){
                NProgress.done();
                $('.loadingMask').addClass('hide');
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            if(XMLHttpRequest.status===404){
                var url404 = 'forward?method=/price/404';
                loadPage(url404,{});
            }
            else if(XMLHttpRequest.status===500){
                $.trace('服务器出错，请稍后重试');
            }
            else if(XMLHttpRequest.status===0){
                var userName = $.cookie.read('username');
                var jsessionid = $.cookie.read('JSESSIONID');
                if(userName===null||jsessionid===null){
                    loginFail();
                }
            }
            NProgress.done();
            $('.loadingMask').addClass('hide');
        }
    });
    function loginFail(){
        $.trace('登录已失效，请重新登录',function(){
            location.href = 'http://pricing.vip.vip.com/crawler-price';
        },10000000);
    }

    $("#sidebar .sub li").click(function(){
        if($(this).attr('id') === 'fuzhuang'){
            location.href = 'http://localhost:7777/views/cloth'
            return;
        }
        var oldHash = location.hash;
        var tag = $(this).data('tag');
        location.hash = '#' + tag;
        if(oldHash ===  '#'+tag){//相同的hash,手动刷新页面
            loadPage(tag,{});
        }
    });
    pageFirstLoad();
    function pageFirstLoad(){
        var hash = location.hash;
        explainHash(hash)
    }
    window.onhashchange = function(){
        var hash = location.hash;
        explainHash(hash);
    };

    function explainHash(hash) {
        var route = '',hashArr;
        if(hash===''||hash.indexOf('forward?method=/price')<0){
            if(hash.indexOf('route')>-1){
                var spaRoute = hash.replace(/#route/,'');
                loadPage(contextPath+spaRoute);
                oldURL = spaRoute;
                return false;
            }else{
                if(userLimited){
                    hash = '#forward?method=/price/priceCompete/priceMonitor';
                }
                else{
                    hash = '#forward?method=/price/xiefu/cate/fuzhuang';
                }
            }

        }
        hashArr = hash.split('&');
        route = hashArr[0].replace(/#/,'');
        if(oldURL!==route){//页面见跳转
            loadPage(route,{});
            oldURL = route;
        }
        else{//页面内操作，参数变化

        }
        routeStyle(route)
    }

    function routeStyle(route){
        var $li = $('#sidebar .sub li');
        _.each($li,function(e){
            var tar = $(e).data('tag')
            if(tar===route){
                styleChange($(e));
                return;
            }
            refreshHashMenu(route);
        })
    }
    /// 刷新之后 hash不在 menu中时候的 menu样式控制
    function refreshHashMenu(route) {
    	if(route.indexOf('/intelligence/specialselling/detail') > 1) { // 电商特卖汇
    		styleChange($('#specialSelling'));
    	} else {
    		return false;
    	}
    }
    
    function styleChange($obj){
        $obj.addClass('hover');
        $obj.siblings().removeClass('hover');
        $obj.parent().parent().siblings().find('li').removeClass('hover');
        $obj.parent().parent().addClass('active');
        $obj.parent().parent().siblings().removeClass('active');
    }
    function loadPage(url,params){
        $("#body").load(url,params,function(){
            $(window).scrollTop(0);
        });
    }
    //声明一个在catchInfoSpace命名空间下的全局变量books_classify作为记录点击的分类情况
    window.catchInfoSpace = {};
    window.catchInfoSpace.books_classify = 0;




$(window).scroll(function(){
    var $rocket = $('.rocket'), scrollTop = $(window).scrollTop();
    if(scrollTop > 200){
        $rocket.removeClass('hide');
    }else{
        $rocket.addClass('hide');
    }
});
$('.rocket').click(function(){
    $(window).scrollTop(180);
    setTimeout(function(){
        $(window).scrollTop(150);
        setTimeout(function(){
            $(window).scrollTop(120);
            setTimeout(function(){
                $(window).scrollTop(90);
                setTimeout(function(){
                    $(window).scrollTop(60);
                    setTimeout(function(){
                        $(window).scrollTop(30);
                        setTimeout(function(){
                            $(window).scrollTop(0);
                        },50);
                    },50);
                },50);
            },50);
        },50);
    },50);

});
$(document).keydown(function(e){
    if(!e) e = window.event;
    if((e.keyCode || e.which) == 13){
        var queryBtn = $('[data="btnQuery"]');
        var hasAjax = $('.loadingMask').hasClass('hide');
        var modal = $('.modal-backdrop');
        if(queryBtn.length>0&&hasAjax&&modal.length===0){
            queryBtn.click();
        }
    }
});
});