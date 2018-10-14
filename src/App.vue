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
	</div>
</template>

<script>
export default {
	name: 'app',
	data(){
		return{
			color:null,
		}
	},
	methods:{
		/* getMousePos(event) {
			var e = event || window.event;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			var x = e.pageX || e.clientX + scrollX;
			var y = e.pageY || e.clientY + scrollY;
			return { 'x': x, 'y': y };
			} */

	},
	mounted(){
		/* let svg = Snap('#svg'); */
		/* let circle = svg.paper.circle(150, 150, 100);
		console.log(circle.getBBox()); */
		//let ret = svg.paper.rect(50,50,200,200);
		/* let ret = svg.paper.circle(150, 150, 100)
		console.log(ret.getBBox());
		ret.attr('stroke','blue' );
		ret.attr('stroke-width','3px' );
		ret.attr('fill','transparent' ); */
		//ret.attr(/* fill:'red',fillOpacity:0.2, */'stroke-dasharray','15,10')
		/* ret.touchstart((e)=>{		
			console.log(e.touches);	 */
			//console.log('hi touch start')
			//console.log(this.getMousePos(e));
			
		/* })
		ret.touchend((e)=>{
			console.log(e)
			//ret.attr('width','500px')
			ret.animate({r:50},500);
			console.log(e.changedTouches);
		})
		var c = svg.paper.path("M10 10L100 100").attr({
			stroke: "#000",
			strokeWidth: 5,
			id:'line'
		}); */
		//console.log(c.getBBox());
		//console.log(ret.getBBox());
		/* let line = c.getBBox();
		//console.log(svg.paper.path("M10 10 L80 0 L0 80 L-80 0"));
		
		let svgLine = document.querySelector('#line');
		

		let lineHtml = svgLine.outerHTML;
		svgLine.remove();
		svg.append(Snap.fragment(lineHtml));
		let pathList = [{path:svgLine,name:'line'}]
		console.log(pathList) */
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
	.weui-dialog__hd{
		padding:0;
	}
</style>
