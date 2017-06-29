<template>
    <div id="sidebar" class="nav-collapse">
		<div class="navbar-inverse nav-title-wrap">
			<div class="nav-logo">唯品会比价后台管理</div>
			<div class="nav-user">
					欢迎您，{{user.username}}
			</div>
		</div>
		<div style="clear:both" id="div-clear"></div>
		<ul id="left-intelligentData">
			<li v-for='menu in menus' :class='{active: menu.active}'>
				<a :href="menu.link">{{menu.title}}</a>
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
					"title": "品类站点管理",
					"active": true,
                    "link": "javascript:;"
				},
                {
					"title": "计划任务查询",
					"active": false,
                    "link": "http://crawler-scheduler.vip.vip.com:8080/scheduler/scheduler/queryJobs.action"
				},
                {
					"title": "匹配关系查询",
					"active": false,
                    "link": "http://pricing.vip.vip.com/crawler-price/match/listMatchDataPage"
				},
                {
					"title": "爬虫任务查询",
					"active": false,
                    "link": "http://10.201.110.92:8000/creeper_cms/index.php?m=&c=Monitoring&a=index"
				},
                {
					"title": "实时计算平台",
					"active": false,
                    "link": "http://vrc.vip.vip.com/vrc/"
				}
			]
		}
	},
	'computed': {
		user() {
			return this.$store.state.global.user
		}
	}
}
</script>

<style lang='less'>
#admin{
	#sidebar > ul > li{
		a{
			padding:10px 15px;
		}
		&.active{
			&:hover{
				text-decoration: none;
			}
			a{
				color:#333; background:#fff;
			}
		}
		&:hover{
			text-decoration: underline;
		}
	}
	.navbar-inverse .nav-logo{
		font-weight: 500;
	}
	.nav-title-wrap{
		padding-bottom:10px;
	}
} 

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
