<template>
	<text :style="{ color: color, 'font-size': size + 'px' }" class="uni-icons" :class="[customIcons,customIcons?type:'']" @click="_onClick">{{icons[type]}}</text>
</template>

<script>
	import icons from './icons.js';
	export default {
		name: 'UniIcons',
		props: {
			type: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#333333'
			},
			size: {
				type: [Number, String],
				default: 16
			},
			customIcons:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				icons: icons
			}
		},
		methods: {
			_onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	@font-face {
		font-family: uniicons;
		src: url('./uni.ttf') format('truetype');
	}
	/* #endif */
	.uni-icons {
		font-family: uniicons;
		text-decoration: none;
		text-align: center;
	}
</style>
