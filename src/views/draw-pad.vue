<template>
    <article class="draw-pad" @click="onClick">
        <header>
            <tool-bar></tool-bar>
        </header>
        <section>
            <svg id="draw-erea"></svg>
        </section>
        <!-- <footer>
            <div class="preview" v-for="idx in 15" :key="idx">{{idx}}</div>
        </footer> -->
    </article>
</template>

<script>
import ToolBar from '../components/draw-pad/toolbar'
export default {
    components:{
        ToolBar
    },
    data(){
        return{
            actionType:'draw',//默认是画，其它则是文本输入
            shape:'line',//默认画直线
            lineSize:'1px',//默认线条粗细为1px
            color:'#000',//默认线条的颜色为黑色
            startPoint:{},//触摸开始位置
        }
    },
    methods:{
        /**@function 监听点击画板区域，传递点击事件以便通知关闭弹窗 */
        onClick(){
            this.$root.bus.$emit('close-pop');
        },
        /**
         * @function 获取触点的坐标值
         * @param {触点对象} point
         * @returns {返回触点的坐标值对象}
         */
        getTouchPosition(point){
			return {x:point.clientX,y:point.clientY}
		},
    },
    mounted(){
        /**@function 监听来自画板工具条操作
         */
        //1、监听操作类型，是画图形还是写文字
        this.$root.bus.$on('action-type',(actType) => {
            this.actionType = actType;
        })
        //2、监听图形形状
        this.$root.bus.$on('shape',(shape) => {
            this.shape = shape;
        })
        //3、监听画图线条粗细
        this.$root.bus.$on('size',(size) => {
            this.lineSize = size;
        })
        //4、监听颜色选择
        this.$root.bus.$on('color',(color) => {
            this.color = color;
        })
        let svg = Snap('#draw-erea');//初始化
        /**@function 监听触摸开始事件 */
        svg.touchstart((e)=>{	
            /**
             * 判断当前是画图类型(画图还是写字)
             */
            if(this.actionType === 'draw'){
                this.startPoint = this.getTouchPosition(e.touches[0]);//记录开始触点位置
            }
			console.log('touch start');	
			//console.log(e.touches[0]);	
			//console.log('hi touch start')
			//console.log(this.getMousePos(e));
			
			//console.log(this.startPoint.x);
			/* console.table(this.startPoint.x);
			console.table(this.startPoint.y); */
        })
        /**@function 监听触摸结束事件 */
        svg.touchend((e)=>{
            let endPoint = this.getTouchPosition(e.changedTouches[0]);//触摸节点位置坐标
            if(this.actionType === 'draw'){
                switch(this.shape){
                    case 'line':
                        svg.paper.line(this.startPoint.x,this.startPoint.y,endPoint.x,endPoint.y).attr({
                            stroke: "#000",
                            strokeWidth: 5	
                        }); 
                        break;
                    case 'curve':
                        break;
                }
            }
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
        /**@function 监听触摸移动事件 */
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
        /* svg.paper.line(50,50,200,200).attr('stroke','blue'); */
    }
}
</script>


<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .draw-pad{
        padding:px2rem(32px);
        padding-top:0;        
    }
    .draw-pad header{
        margin-bottom:px2rem(30px);
        position:static;
    }
    .draw-pad section{
        /* margin-bottom: px2rem(32px); */
        width:px2rem(1840px);
        height:px2rem(1334px);
        background-color:#D5DBE5;
        border-radius: 4px;
    }
    /* .draw-pad footer{
        display:flex;
        overflow-x: scroll;
        width:px2rem(1840px);
        flex-wrap: nowrap;
        min-width:0
    } */
    .preview{
        flex:0 0 px2rem(384px);
        /* width:px2rem(384px);         */
        height:px2rem(240px);
        background-color:#D5DBE5;
        border-radius: 4px;
        margin-right:px2rem(40px);
        box-sizing: border-box;
    }
    #draw-erea{
        width:inherit;
        height:px2rem(1334px);
        position: fixed;
        top:px2rem(170px);;
    }
</style>
