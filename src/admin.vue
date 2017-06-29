<template>
    <div id="admin" class='row-fluid' :class='{"sidebar-closed": !menuOpen }'>
        <adminSideBar></adminSideBar>
        <transition name="fade" mode="out-in">
        <div class='main' id='body'>
            <router-view></router-view>
        </div>
        </transition>
    </div>
</template>

<script>
import adminSideBar from '~components/admin/SideBar'

export default {
	data () {
		return {}
	},
	components: {
		adminSideBar
	},
	'computed': {
		menuOpen() {
			return this.$store.state.frontend.menuOpen
		}
	}
}
</script>
