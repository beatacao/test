<template>
    <div id="app" class='row-fluid' :class='{"sidebar-closed": !menuOpen }'>
        <SideBar></SideBar>
        <transition name="fade" mode="out-in">
        <div class='main' id='body'>
            <router-view></router-view>
        </div>
        </transition>
    </div>
</template>

<script>
import SideBar from '~components/SideBar'

export default {
	data () {
		return {}
	},
	components: {
		SideBar
	},
	'computed': {
		menuOpen() {
			return this.$store.state.frontend.menuOpen
		}
	}
}
</script>
