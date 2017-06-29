<template>
    <div id="sidebar" class="nav-collapse">
		<div class="navbar-inverse nav-title-wrap">
			<div class="nav-logo"><img src="../assets/img/logo.png"></div>
			<div class="nav-user">
					欢迎您，{{user.username}}
			</div>
			<div class="nav-switch" v-on:click='toggleMenu'>
				<i class="nav-switch-op ni-indent-decrease" v-show='menuOpen' title="收起"></i>
				<i class="nav-switch-op ni-indent-increase" v-show='!menuOpen' title="展开"></i>
			</div>
		</div>
		<div style="clear:both" id="div-clear"></div>
		<ul id="left-intelligentData">
			<li v-for='menu in menus' class='has-sub' :class='{active: menu.active}'>
				<a v-on:click='collapseMenuItem($event)' href="javascript:;">
					<img class="left-icon" :src="menu.icon">
					<span class="title">{{menu.title}}</span>
					<span class="arrow "></span>
				</a>
				<ul class='sub'>
					<li v-on:click='switchTab(item.id,$event)' v-for='item in menu.list' :id='item.id' :class='{hover: item.hover}' :tag='item.tag'>
						<a href='javasript:;'>{{item.text}} <span v-if='item.new' class="new-nav">new</span></a>
					</li>
				</ul>
			</li>
		</ul>
		<!-- END SIDEBAR MENU -->
    </div>
</template>

<script>
export default {
	data() {
		return {
			"menus": [
				{
					"icon": require('../assets/img/left-icon1.png'),
					"title": "比价助手",
					"active": true,
					"list": [
						{ "id": "fuzhuang", "tag": "", "text": "服装比价", "hover": true },
						{ "id": "xielei", "tag": "forward?method=/price/xiefu/cate/xielei", "text": "鞋类比价", "hover": false },
						{ "id": "tiyong", "tag": "forward?method=/price/xiefu/cate/tiyong", "text": "体用比价", "hover": false },
						{ "id": "xiangbao", "tag": "forward?method=/price/xiefu/cate/xiangbao", "text": "箱包比价(支持拉杆箱)", "hover": false },
						{ "id": "shipin", "tag": "forward?method=/price/xiefu/cate/shipin", "text": "饰品比价(手表)", "hover": false },
						{ "id": "meizhuang", "tag": "forward?method=/price/meizhuang/uploadTask", "text": "美妆比价", "hover": false, 'new': true },
						{ "id": "jiafang", "tag": "forward?method=/price/jiaju/uploadTask", "text": "家纺比价", "hover": false },
						{ "id": "c3", "tag": "forward?method=/price/c3/uploadTask", "text": "3 C 比价", "hover": false },
						{ "id": "muying", "tag": "forward?method=/price/muying/uploadTask", "text": "母婴比价", "hover": false },
						{ "id": "other", "tag": "forward?method=/price/otherCate/uploadTask", "text": "其他品类比价", "hover": false }
					]
				},
				{
					"icon": require('../assets/img/left-icon2.png'),
					"title": "价格监控",
					"active": false,
					"list": [
						{ "id": "priceMonitor", "tag": "forward?method=/price/priceCompete/priceMonitor", "text": "在售档期价格监控", "hover": false }
					]
				},
				{
					"icon": require('../assets/img/left-icon4.png'),
					"title": "情报中心",
					"active": false,
					"list": [
						{ "id": "specialSelling", "tag": "forward?method=/price/intelligence/specialselling/index", "text": "电商特卖汇", "hover": false }
					]
				},
				{
					"icon": require('../assets/img/left-icon3.png'),
					"title": "通用",
					"active": false,
					"list": [
						{ "id": "matchMng", "tag": "forward?method=/price/general/matchDataJudge", "text": "商品匹配管理", "hover": false },
						{ "id": "sysTask", "tag": "forward?method=/price/general/sysTask", "text": "系统任务一览", "hover": false },
						{ "id": "directionalShopMgr", "tag": "forward?method=/price/general/directionalShopMgr", "text": "定向店铺管理", "hover": false },
						{ "id": "findDiff", "tag": "forward?method=/price/general/findDiff", "text": "大家来找茬", "hover": false }
					]
				}
			]
		}
	},
	'methods': {
		toggleMenu() {
			this.$store.commit('frontend/menuOpen')
		},
		switchTab(id, e) {
			var ev = e || window.event
			ev.preventDefault()
			if(id === 'fuzhuang'){
				location.href = '/views/cloth'
			}else{
				location.href = 'http://127.0.0.1:8080/center#' + $('#'+id).attr('tag')
			}
		},
		collapseMenuItem(e) {
			var ev = e || window.event
			var target = ev.srcElement || ev.target
			var $parent = $(target).closest('.has-sub')
			var $sub = $parent.children('.sub')
			ev.preventDefault()
			if($parent.hasClass('collapsed')){
				$parent.removeClass('collapsed')
				$sub.slideDown(200)
			}else{
				$parent.addClass('collapsed')
				$sub.slideUp(200)
			}
		}
	},
	'computed': {
		now() {
			return Date.now()
		},
		user() {
			return this.$store.state.global.user
		},
		menuOpen() {
			return this.$store.state.frontend.menuOpen
		}
	}
}
</script>

<style lang='less'>
#sidebar{
	position: fixed;top:0px;z-index: 100;height: 1000px;background: #6c7d8c;
	&>ul>li.has-sub.open>a span.arrow{
		background-position: 0 -73px; width: 7px; height: 9px; margin-top: 5px;
	}
}
.sidebar-closed{
	.navbar-inverse{
		width: 40px;
		.nav-logo, .nav-user{
			display:none;
		}
	}
}
</style>
