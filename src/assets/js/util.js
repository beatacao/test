//Daniel的定制组件
$.Dan = {}
/*alert组件开始*/
//alert类
$.Dan.alert = function(text,fn){
	this.obj = 	$('<div class="alertMask"></div><div class="alert"><div class="alertHeader"><a href="javascript:;" data-act="hide"><i class="icon i-exit"></i></a></div><div class="alertContent">' + text + '</div><div class="alertBottom"><a href="javascript:;" class="btn btn-info btnSure" data-act="hide">确定</a></div></div>')
	this.fn = fn
}
$.Dan.alert.prototype = {
	myShow : function(){
		var _this = this
		var _obj = this.obj
		_obj.appendTo("body").fadeIn("fast").find("[data-act='hide']").click(function(){
			_this.myHide()
		})
	},
	myHide : function(){
		var _fn = this.fn
		var _obj = this.obj
		_obj.fadeOut("fast",function(){
			_obj.remove()
			if(_fn){
				_fn()
			}
		})
	}
}
//基于JQuery的alert类调用
$.trace = function(text,fn,myTime){
	myTime = myTime || 3000
	var trace = new $.Dan.alert( text,fn )
	trace.myShow()
	var timeout = setTimeout( function(){
		trace.myHide()
		clearTimeout(timeout)
	},myTime )
}

/*confirm组件开始*/
//confirm类

$.Dan.confirm = function(text,fn,fnCancel){
	this.obj = 	$('<div class="confirmMask"></div>' +
      '<div class="confirm">' +
      '<div class="confirmHeader">' +
      '<a href="javascript:;" data-does="exit" data-act="hide"><i class="icon i-exit"></i></a></div>' +
      '<div class="confirmContent">' + text + '</div>' +
      '<div class="confirmBottom">' +
      '<a href="javascript:;" class="btn btnSure" data-does="cancel" data-act="hide">取消</a>' +
      '<a href="javascript:;" class="btn btn-info btnSure" data-does="sure" data-act="hide">确定</a></div></div>')
	this.fn = fn
}
$.Dan.confirm.prototype = {
	myShow : function(){
		var _this = this
		var _fn = this.fn
		var _fnCancel = this.fnCancel
		var _obj = this.obj

		_obj.appendTo("body").fadeIn("fast").find("[data-act='hide']").click(function(e){
			_this.myHide()
			var action = $(e.target).data('does')
			if(action==='sure'){
				if(typeof _fn==='function'){
					_fn()
				}
			}
			else if(action==='cancel'){
				if(typeof _fnCancel==='function'){
					_fnCancel()
				}
			}
		})
	},
	myHide : function(){
		var _obj = this.obj
		_obj.fadeOut("fast")
	}
}
$.confirm = function(text,fn){
	var confirm = new $.Dan.confirm( text,fn )
  confirm.myShow()
}
$.Dan.modal = function(){
    this.open = function(){
        $('#glOpenModal').click()
    }
    this.close = function(){
        $('#glModal .modal-footer #glclose').click()
    }
}
$.modalOpen = function(callback){
    var modal = new $.Dan.modal()
    modal.open()
    if(typeof callback =='function'){
		callback()
    }
	/*$("#glModal").draggable({
		handle: ".modal-header",
		containment: "body"
	});*/

}
$.modalClose = function(callback){
    var modal = new $.Dan.modal()
    modal.close()
    if(typeof callback =='function'){
		callback()
    }
}
$.tableTip = function(tableObj,text,fn ){
	var $tip = $('.table-blank-tip')
	if($tip.length>0){
		$tip.remove()
	}
	var str = '<div class="table-blank-tip">'+text+'</div>'
	tableObj.after(str)
	if(typeof fn == 'function'){
		fn()
	}

}

// /**
//  * util api
//  * 
//  * @param date
//  * @returns
//  */
// window.util = {};

// util.site_config = {
// 	siteMap: {
// 		"全网": 1,
// 		"京东":1001,
// 		"亚马逊":1002,
// 		"当当":1003,
// 		"苏宁":1004,
// 		"易迅":1005,
// 		"聚美":1006,
// 		"乐蜂":1007,
// 		"天猫超市":1008,
// 		"我买网":1009,
// 		"天猫":1011,
// 		"天猫男鞋":1013,
// 		"天猫女鞋":1014,
// 		"1号店":1015,
// 		"银泰":1016,
// 		"西街运动":1017,
// 		"优购网":1018,
// 		"趣天麦网":1019,
// 		"上品折扣网":1020,
// 		"型尚网":1021,
// 		"vjia商城":1022,
// 		"走秀网":1023,
// 		"拍鞋网":1024,
// 		"国美在线":1025,
// 		"凡客诚品":1026,
// 		"可得眼镜":1027,
// 		"好乐买":1028,
// 		"名鞋库":1029
// 	},
// 	siteMap2: {
// 		1    : "全网",
// 		1001 : "京东",
// 		1002 : "亚马逊",
// 		1003 : "当当",
// 		1004 : "苏宁",
// 		1005 : "易迅",
// 		1006 : "聚美",
// 		1007 : "乐蜂",
// 		1008 : "天猫超市",
// 		1009 : "我买网",
// 		1011 : "天猫",
// 		1013 : "天猫男鞋",
// 		1014 : "天猫女鞋",
// 		1015 : "1号店",
// 		1016 : "银泰",
// 		1017 : "西街运动",
// 		1018 : "优购网",
// 		1019 : "趣天麦网",
// 		1020 : "上品折扣网",
// 		1021 : "型尚网",
// 		1022 : "vjia商城",
// 		1023 : "走秀网",
// 		1024 : "拍鞋网",
// 		1025 : "国美在线",
// 		1026 : "凡客诚品",
// 		1027 : "可得眼镜",
// 		1028 : "好乐买",
// 		1029 : "名鞋库"
// 	},
// 	shopTypeMap: {
// 		1:"自营",
// 		2:"旗舰店",
// 		3:"专营店",
// 		4:"其他",
// 		5:"未知"
// 	}
// }

// // 字符串转换为日期
// util.covertDate = function(date) {
// 	if (date == '' || date == null) {
// 		return "";
// 	}
// 	return new Date(date).format('yyyy-MM-dd');
// };

// // 字符串转换为时间格式
// util.covertTime = function covertTime(time) {
// 	if (time == '' || time == null) {
// 		return "";
// 	}
// 	time = parseInt(time);
// 	return new Date(time).format('yyyy-MM-dd hh:mm:ss');
// };

// util.covertMatch = function covertMatch(ismatched) {
// 	switch (ismatched) {
// 	case 0:
// 		return "等待分配";
// 	case 1:
// 		return "已分配";
// 	default:
// 		return "";
// 	}
// };

// Date.prototype.format = function(format) {
// 	var o = {
// 		"M+" : this.getMonth() + 1, // month
// 		"d+" : this.getDate(), // day
// 		"h+" : this.getHours(), // hour
// 		"m+" : this.getMinutes(), // minute
// 		"s+" : this.getSeconds(), // second
// 		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
// 		"S" : this.getMilliseconds()
// 	// millisecond
// 	};
// 	if (/(y+)/.test(format))
// 		format = format.replace(RegExp.$1, (this.getFullYear() + "")
// 				.substr(4 - RegExp.$1.length));
// 	for ( var k in o)
// 		if (new RegExp("(" + k + ")").test(format))
// 			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
// 					: ("00" + o[k]).substr(("" + o[k]).length));
// 	return format;
// };

// /**
//  * 获取表格以及表格分页 param: ths Array 表头二维数组，分别为表头名称、对应key值、数据类型； o Object 表数据以及分页信息
//  * tableID String html元素，页面上table的id paginationID String html元素，分页div的id
//  */
// util.chk = false;
// util.handleTableData = function handleTableData(ths, o, tableID, paginationID) {
// 	// 拼接表头
// 	var content = '';
// 	content += '<tr>';
// 	if (util.chk) {
// 		content += '<th><input type="checkbox" id="checkAll" data-type="1"/></th>';
// 	}
// 	content += '<th>序号</th>';// 前端控制序号
// 	for ( var i = 0; i < ths.length; i++) {
// 		if (ths[i][1] == '') {
// 			content += '<th>操作</th>';
// 		} else {
// 			content += '<th>' + ths[i][0] + '</th>';
// 		}
// 	}
// 	content += '</tr>';
// 	var index = (o.currentPage - 1) * o.pageSize;// 处理序号需要
// 	// 拼接表格数据
// 	var resultRows = o.resultRows;
// 	if(!resultRows){return false;}
// 	for ( var i = 0, sequence = index; i < resultRows.length; i++) {
// 		content += '<tr>';
// 		if (util.chk) {
// 			var fundata = '';
// 			for ( var k = 0; k < ths.length; k++) {// 绑定数据
// 				if (ths[k][1] != '') {
// 					fundata += ' data-' + ths[k][1] + '='+
// 					'"' + resultRows[i][ths[k][1]] + '"';
// 				}
// 			}
// 			content += '<td><input type="checkbox"  data-type="0" ' + fundata
// 					+ '/></td>';
// 		}
// 		content += '<td>' + (sequence + 1) + '</td>';
// 		sequence += 1;
// 		for ( var j = 0; j < ths.length; j++) {
// 			var colName = ths[j][1];
// 			var dataType = ths[j][2];
// 			switch (dataType) {
// 			case 'button':
// 				var fundata = '';
// 				for ( var k = 0; k < ths.length; k++) {// 绑定数据
// 					if (ths[k][1] != '') {
// 						fundata += ' data-' + ths[k][1] + '=' + '"'
// 								+ resultRows[i][ths[k][1]] + '"';
// 					}
// 				}
// 				content += '<td><button type="button" class="btn btn-info" '
// 						+ fundata + '>' + ths[j][0] + ' </button></td>';
// 				break;
// 			case 'Date':
// 				content += '<td>' + util.covertDate(resultRows[i][colName])
// 						+ '</td>';
// 				break;
// 			case 'Time':
// 				content += '<td>' + util.covertTime(resultRows[i][colName])
// 						+ '</td>';
// 				break;
// 			case 'Match':
// 				content += '<td>' + util.covertMatch(resultRows[i][colName])
// 						+ '</td>';
// 				break;
// 			default:
// 				content += '<td>' + resultRows[i][colName] + '</td>';
// 			}
// 		}
// 		content += '</tr>';
// 	}
// 	$('#' + tableID).html('');
// 	$('#' + tableID).html(content);
// 	// 分页处理
// 	var pageIndex = o.pageIndex;
// 	var pagination = '';
// 	pagination += '<span class="hover"><strong>' + o.currentPage
// 			+ '</strong></span>/';
// 	pagination += '<strong>' + o.totalPage + '</strong>页  ';
// 	pagination += '<ul>';
// 	if (o.hasPreviousPage) {
// 		pagination += '<li><a href="javascript:;" pageNo="' + o.previousPage
// 				+ '"><<</a></li>';
// 	}
// 	for ( var i = 0, len = pageIndex.length; i < len; i++) {
// 		if (pageIndex[i] != o.currentPage) {
// 			pagination += '<li><a href="javascript:;" pageNo="' + pageIndex[i]
// 					+ '">' + pageIndex[i] + '</a></li>';
// 		} else {
// 			pagination += '<li class="active"><a href="javascript:;" pageNo="'
// 					+ pageIndex[i] + '">' + pageIndex[i] + '</a></li>';
// 		}
// 	}
// 	if (o.hasNextPage) {
// 		pagination += '<li><a href="javascript:;" pageNo="' + o.nextPage
// 				+ '">>></a></li>';
// 	}
// 	pagination += '</ul>';
// 	$('#' + paginationID).html(pagination);
// 	// chk 绑定事件
// 	if (util.chk) {
// 		$('#' + tableID).delegate("input", 'click', function(e) {
// 			util.checkboxClick(this);
// 		});
// 	}
// };
// // 当checkbox被点击的时候触发
// util.checkboxClick = function(e) {
// 	_this = e;
// 	var ipt_type = $(_this).attr('type');// input 的类型
// 	var chkBox = util.getChkBox();
// 	if (ipt_type == 'checkbox') {
// 		var checked = _this.checked;
// 		var data_type = $(_this).data('type');
// 		if (data_type == 1) {// 点击的是全选
// 			if (checked == true) {
// 				for ( var i = 0; i < chkBox.length; i++) {
// 					if(!$(chkBox[i]).attr('disabled')){//排除掉那些不可用的chk
// 						chkBox[i].checked = true;
// 					}
// 				}
// 			} else {
// 				for ( var i = 0; i < chkBox.length; i++) {
// 					chkBox[i].checked = false;
// 				}
// 			}
// 		} else {// 多选
// 			var chkBoxExceptSelcall = util.getChkBoxExceptSelcall();
// 			if (checked == true) {
// 				if (isAllChkSelected(chkBoxExceptSelcall)) {
// 					document.getElementById('checkAll').checked = true;
// 				}
// 			} else {
// 				document.getElementById('checkAll').checked = false;
// 			}
// 		}
// 	}
// 	// 检查除了全选chk之外的所有的chk是否被选中
// 	function isAllChkSelected(chk) {
// 		for ( var i = 0; i < chk.length; i++) {
// 			if (chk[i].checked == false) {
// 				return false;
// 			}
// 		}
// 		return true;
// 	}

// };
// // 所有的checkbox对象
// util.getChkBox = function() {
// 	var ipt = $('input');
// 	var chkBox = [];
// 	for ( var i = 0; i < ipt.length; i++) {
// 		if ($(ipt[i]).attr('type') == 'checkbox') {
// 			chkBox.push(ipt[i]);
// 		}
// 	}
// 	return chkBox;
// };
// // 除去全选的chk的所有的checkbox对象
// util.getChkBoxExceptSelcall = function() {
// 	var ipt = $('input');
// 	var chkBox = [];
// 	for ( var i = 0; i < ipt.length; i++) {
// 		if ($(ipt[i]).attr('type') == 'checkbox') {
// 			if ($(ipt[i]).data('type') == 0) {
// 				chkBox.push(ipt[i]);
// 			}
// 		}
// 	}
// 	return chkBox;
// };
// // 获取所有被选中的chk的值
// util.getChkedData = function(ths) {
// 	var chkedData = [];
// 	var chk = util.getChkBoxExceptSelcall();
// 	for ( var i = 0; i < chk.length; i++) {
// 		if (chk[i].checked) {
// 			chkedDataItem = [];
// 			for ( var j = 0; j < ths.length; j++) {
// 				chkedDataItem[ths[j]] = $(chk[i]).data(ths[j]);
// 			}
// 			chkedData.push(chkedDataItem);
// 		}
// 	}
// 	return chkedData;
// };
// //daniel img
// util.danielDefaultImgSrc =  'resources/img/default_small.jpg';
// util.danielLoadImgSrc =  'resources/img/loading_image.gif';
// util.danielImgSrc = function(input){
// 	return input==null||input==''||input=='null'||input=='\\N'?util.danielDefaultImgSrc:input;
// };
// util.danielImgLoad = function(input){
// 	return input==null||input==''||input=='null'||input=='\\N'?util.danielLoadImgSrc:input;
// };

// util.danielScaleImage = function(container){
// 	$(container).on('mouseenter','img.daniel-image',function(e){
// 		var W = 280,
// 			H = 350;
// 		$(this).addClass('daniel-img-hover');
// 		imageSrc = $(this).attr('data-image-src'),
// 			vipImageSrc = $(this).attr('data-vip-image-src'),
// 			siteName =  $(this).attr('data-site-name'),
// 			vipSiteName = '唯品会';
// 		var scaleImage ='';
// 		if(vipImageSrc==undefined){
// 			scaleImage =  '<div id="danielScaleImage" class="daniel-scale-image">'+util.getStandartImg(imageSrc,vipSiteName)+'<div>';
// 		}
// 		else{
// 			W = 560;
// 			scaleImage = '<div id="danielScaleImage" class="daniel-scale-image-compare">'+
// 			'<div class="daniel-scale-image-compare-unit unit-left">'+util.getStandartImg(vipImageSrc,vipSiteName)+'</div>'+
// 			'<div class="daniel-scale-image-compare-unit">'+util.getStandartImg(imageSrc,siteName)+'</div></div>';
// 		}
// 		$('body').append(scaleImage);
// 		//style
// 		var screenWidth = window.screen.width,
// 			screenHeight = window.screen.height;
// 		var imgWidth = W *(screenWidth/1920) + 4,
// 			imgHeight = H * (screenHeight/1080),
// 			offH = 100*(screenHeight/1080),
// 			offW = 30*(screenWidth/1920);
// 		if(!e) e = window.event;
// 		var clientX = e.clientX,
// 			clientY = e.clientY,
// 			offsetX = e.offsetX,
// 			offsetY = e.offsetY;
// 		var y = clientY - imgHeight<offH?clientY :clientY - imgHeight;
// 		$('#danielScaleImage').css({
// 			'position':'fixed',
// 			'top':y,
// 			'left':clientX+offW,
// 			'width':imgWidth,
// 			'height':imgHeight,
// 			'z-index':1100
// 		});

// 	}).on('mouseout','img.daniel-image',function(){
// 		$('#danielScaleImage').remove();
// 		$(this).removeClass('daniel-img-hover');
// 	});
// };
// util.getStandartImg =  function(url,sitename){
// 	var imgHtml = '';
// 	if(url==null||url==''||url=='null'||url=='\\N'){
// 		imgHtml =  '<div class="daniel-scale-div-load"  >'+
// 			'<img src="'+util.danielLoadImgSrc+'" class="daniel-scale-image-load"/></div>' +
// 		    '<div class="daniel-scale-image-site-name">'+sitename+'</div>';
		
// 	}else{
// 		imgHtml =  '<img src="'+url+'" class="daniel-scale-div-load"/>'+
// 		'<div class="daniel-scale-image-site-name">'+sitename+'</div>';
// 	}
// 	return imgHtml;
// };


// util.getInfo = function(){ 
//     var s = "";   
//      s += " 网页可见区域宽："+ document.body.clientWidth+"\n";    
//      s += " 网页可见区域高："+ document.body.clientHeight+"\n";    
//      s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"+"\n";    
//      s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"+"\n";    
//      s += " 网页正文全文宽："+ document.body.scrollWidth+"\n";    
//      s += " 网页正文全文高："+ document.body.scrollHeight+"\n";    
//      s += " 网页被卷去的高(ff)："+ document.body.scrollTop+"\n";    
//      s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop+"\n";    
//      s += " 网页被卷去的左："+ document.body.scrollLeft+"\n";    
//      s += " 网页正文部分上："+ window.screenTop+"\n";    
//      s += " 网页正文部分左："+ window.screenLeft+"\n";    
//      s += " 屏幕分辨率的高："+ window.screen.height+"\n";    
//      s += " 屏幕分辨率的宽："+ window.screen.width+"\n";    
//      s += " 屏幕可用工作区高度："+ window.screen.availHeight+"\n";    
//      s += " 屏幕可用工作区宽度："+ window.screen.availWidth+"\n";    
//      s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"+"\n";    
//      s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"+"\n";    
//      console.log(s);
//    };
// util.loadBody = function(url,params){
// 	$("#body").html('');
// 	$("#body").load(url,params);
// };
// util.filter = {
//     toPercent : function(input, len, symbol){
//         if(isNaN(input)){ return input; }
//         len = len | 0;
//         symbol = symbol === false ? '' : '%';
//         return  (input * 100).toFixed(len) + symbol;
//     },
//     translateCode : function(input){
//         if(isNaN(input)){ return input; }
//         return input==0?'否':(input==1?'是':input);
//     },
//     bExceptionCode : function(input){//0-全部，1-异常，2-无异常
//         if(isNaN(input)){ return input; }
//         return input==1?'是':(input==2?'否':input);
//     },
//     toStr : function(input){
//         return input==null?'0':input+'';
//     }

		
// };
// //checkbox 级联
// util.casecade4chk = function(target){
//     var name = $(target).attr('name'),
// 	    chkval =  $(target).data('chkval'),
// 	    checked = target.checked,
// 	    $chks = $('input[name="'+name+'"][data-chkval="0"]'),
// 	    $theAllOne = $('input[name="'+name+'"][data-chkval="1"]'),
// 	    count = 0;
// 	if(chkval==1){
// 		_.each($chks,function(e){
// 		    e.checked = checked;
// 		});
// 	}
// 	else{
// 		_.each($chks,function(e){
// 		    e.checked?count ++:'';
// 		});
// 		$theAllOne[0].checked = count==$chks.length;
// 	}
// };
// //checkbox 级联(反)
// util.casecade4chkAhp = function(target){
// 	var name = $(target).attr('name'),
// 	chkval =  $(target).data('chkval'),
// 	checked = target.checked,
// 	$chks = $('input[name="'+name+'"][data-chkval="0"]'),
// 	$theAllOne = $('input[name="'+name+'"][data-chkval="1"]'),
// 	count = 0;
// 	if(chkval==1){
// 		_.each($chks,function(e){
// 			e.checked = checked;
// 		});
// 	}
// 	else{
// 		_.each($chks,function(e){
// 			e.checked?count ++:'';
// 		});
// 		$theAllOne[0].checked = count==0?false:true;
// 	}
// };
// util.factory = {
// 	getSiteId : function (siteName){
// 		var e = util.site_config.siteMap[siteName];
// 		return typeof e=='undefined'?null:e;
// 	},
// 	getSiteName : function(siteId){
// 		var e = util.site_config.siteMap2[siteId];
// 		return typeof e=='undefined'?null:e;
// 	},
// 	getSiteLogo : function(siteIds,tip){
// 		var imgHtml = '',i,len;
//         if(siteIds!=null){
//             for(i=0,len = siteIds.length;i<len;i++){
//                 imgHtml += '<img src="'+contextPath+'/resources/img/siteLogo/'+siteIds[i]+'.png" class="site-logo gl-tip" ' +
//                     'data-toggle="tooltip" data-placement="right" title="" data-original-title="'+tip+'" />';
//             }
//         }
//         return imgHtml;
// 	},
// 	getShopType : function(shopType){
// 		var e = util.site_config.shopTypeMap[shopType];
// 		return typeof e=='undefined'?null:e;
// 	},
//     getInputFileName : function (filePath){
//         var ps = filePath.lastIndexOf('\\')+1,
//             pe = filePath.lastIndexOf('.'),
//             fileName = filePath.substring(ps,pe);
//         return fileName;
//     }
// };
// util.downLoad = function(src){
// 	if(typeof $global.downloadSrc === 'undefined'){
//         $global.downloadSrc = [];
//     }
// 	if ($global.downloadFlag || _.indexOf($global.downloadSrc, src)==-1) {
// 		//$('#gl_downloadFrame').attr('src',src);
// 		window.location.href = src;

//         $global.downloadSrc.push(src);
//         if($global.downloadSrc.length>10){
//             $global.downloadSrc = _.last($global.downloadSrc,10);
//         }
// 		$global.downloadFlag = false;
// 		clearTimeout($global.downloadTimeout);
// 		$global.downloadTimeout = setTimeout(function () {
// 			$global.downloadFlag = true;
// 		}, 15000);
// 	} else {
// 		$.trace("15秒内，同一个文件不能重复下载");
// 	}
// }



