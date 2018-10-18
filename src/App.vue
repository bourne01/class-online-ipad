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
		/* getMousePos(event) {
			var e = event || window.event;
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			var x = e.pageX || e.clientX + scrollX;
			var y = e.pageY || e.clientY + scrollY;
			return { 'x': x, 'y': y };
			}, */
		getTouchPosition(point){
			return {x:point.clientX,y:point.clientY}
		},
		onShapeClick(type,e){
			this.type = type;
			console.log(type);
			console.log(e);
		}
	},
	mounted(){
		let svg = Snap('#svg');
		/* let circle = svg.paper.circle(150, 150, 100);
		console.log(circle.getBBox()); */
		//let ret = svg.paper.rect(50,50,200,200);
		let ret = svg.paper.circle(150, 150, 100)
		//console.log(ret.getBBox());
		ret.attr('stroke','blue' );
		ret.attr('stroke-width','3px' );
		ret.attr('fill','transparent' );
		//ret.attr(/* fill:'red',fillOpacity:0.2, */'stroke-dasharray','15,10')
		svg.touchstart((e)=>{	
			console.log('touch start');	
			//console.log(e.touches[0]);	
			//console.log('hi touch start')
			//console.log(this.getMousePos(e));
			this.startPoint = this.getTouchPosition(e.touches[0])
			//console.log(this.startPoint.x);
			/* console.table(this.startPoint.x);
			console.table(this.startPoint.y); */
		})
		svg.touchend((e)=>{
			console.log('touch end');
			//console.log(e)
			//ret.attr('width','500px')
			//ret.animate({r:50},500);
			//console.log(e.changedTouches[0]);
			//let endPoint = this.getTouchPosition(e.changedTouches[0]);
			//let radius = Math.sqrt((endPoint.x-this.startPoint.x)*(endPoint.x-this.startPoint.x)+(endPoint.y-this.startPoint.y)*(endPoint.y-this.startPoint.y));
			//console.log(radius);
			//svg.paper.circle(this.startPoint.x,this.startPoint.y,radius)
			//console.log(this.startPoint);
			//console.log(endPoint);
			/* svg.paper.line(this.startPoint.x,this.startPoint.y,endPoint.x,endPoint.y).attr({
				stroke: "#000",
				strokeWidth: 5	
			}); 
			this.startPoint = endPoint; */
			/* svg.paper.line(50, 50, 100, 100).attr({
    stroke: "#000",
    strokeWidth: 5	
}); */
		})
		svg.touchmove((e)=>{
			/* console.log('touch move');
			let tmpPoint = this.getTouchPosition(e.changedTouches[0]);
			svg.paper.line(this.startPoint.x,this.startPoint.y,tmpPoint.x,tmpPoint.y).attr({
				stroke: "#000",
				strokeWidth: 5	
			}); 
			this.startPoint = tmpPoint; 
			console.log(tmpPoint); */
		})
		/* var c = svg.paper.path("M10 10L100 100").attr({
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
	header{
		position: fixed;
		width:100%;
	}
	#svg{
		position: fixed!important;
	}
</style>
