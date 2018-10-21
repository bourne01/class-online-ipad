<template>
	<div id="app">
		<transition>
			<keep-alive>
				<router-view  v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<header>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<circle 
					cx="100" cy="50" r="20" stroke="black" stroke-width="2" 
					fill="transparent" 
					@click="onShapeClick('circle',$event)"/>
				<!-- <rect width="40" height="20" style="fill:#fff;stroke-width:1;stroke:rgb(0,0,0)" /> -->
			</svg> 
		</header>

		<svg id="svg" style="width:100%;height:100vh;"></svg>
	</div>
</template>

<script>
export default {
	name: 'app',
	data(){
		return{
			type:null,
			startPoint:{},
		}
	},
	methods:{
		gotStream(stream){
			video.src =URL.createObjectURL(stream);
			video.onerror= function(){stream.stop();}
			stream.onended = noStream;
			video.onloadedmetadata =function(){alert("成功打开摄像头")};
		},
		noStream(error){alert(error)}

		},
	mounted(){		
		navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;

		navigator.getUserMedia({video:true,audio: true},this.gotStream,this.noStream);//打开摄像头
		/**@function 兼容本程序在PC浏览器上可用，最终将是375*667宽高显示 */
		setTimeout(() => {
			let isPC = sessionStorage.getItem('IsPC');
			console.log('......')
			if(isPC == 'Yes'){//修复底部导航条
				let navBar = document.querySelector('#nav-bar');
				navBar.style.position = 'relative';
			}
		}, 200);    
	}
}
</script>

<style lang="less">
	@import '~vux/src/styles/reset.less';

	body {
	//background-color: #fbf9fe;
		font-family: 'PingFang-SC-Medium';
	}
	header{
		position: fixed;
		width:100%;
	}
	#svg{
		position: fixed!important;
	}
	.weui-dialog__hd{//this.$msgbox提示框头部样式
		padding:0;
	}
</style>
