<template>
    <article class="draw-pad" @click="onClick">
        <header>
            <tool-bar></tool-bar>
        </header>
        <section>
            <svg id="draw-erea"></svg>
            <img class="history redo" src="../assets/svg/redo.svg" alt="" @click="onHistoryClick('redo')">
            <img class="history undo" src="../assets/svg/undo.svg" alt="" @click="onHistoryClick('undo')">
        </section>
        <!-- <footer>
            <div class="preview" v-for="idx in 15" :key="idx">{{idx}}</div>
        </footer> -->
        <!-- <div class="history redo"></div>
        
        <div class="history undo"></div> -->
        
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
            svgLeftTop:{},//svg区域左顶点的相对于浏览器窗口的坐标值
            historyStack:[],
            drawErea:null,//画图区元素对象
        }
    },
    methods:{
        /**@function 监听点击画板区域，传递点击事件以便通知关闭弹窗 */
        onClick(){
            this.$root.bus.$emit('close-pop');
        },

        /**
         * @function 监听点击撤销或重做图标按钮事件 、
         * @param {动作类型} type
         */
        onHistoryClick(type){
            if(type === 'redo'){//重做

            }else{//撤销
                //console.log(this.historyStack)
                /* for(let action of this.historyStack){
                    console.log(action.outerSVG);
                } */
                this.historyStack.splice(0,1);//删除第一个元素
                let svgObj = document.querySelector("#draw-erea");
                svgObj.innerHTML = this.historyStack.join();
                //
                console.log(this.historyStack)
            }
        },

        /**
         * @function 往数组插入有限个元素
         * @param {元素} element
         * @param {数组} targetArray
         */
        insertElement(element,targetArray){
            const MAX = 10;
            if(targetArray.length == MAX){//如果数组
                targetArray.splice(MAX-1,1);
            }
        },

        /**
         * @function 获取触点的坐标值
         * @param {触点对象} point
         * @returns {返回触点的坐标值对象}
         */
        getTouchPosition(point){
			return {
                x:point.clientX - this.svgLeftTop.x,
                y:point.clientY - this.svgLeftTop.y
            }
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
            console.log(size);
            this.lineSize = size;
        })
        //4、监听颜色选择
        this.$root.bus.$on('color',(color) => {
            console.log(color);
            this.color = color;
        })

        //获取svg#draw-erea区域的左上定点相对于浏览器窗口坐标值
        let svgObj = document.querySelector('#draw-erea').getBoundingClientRect();
        this.svgLeftTop = {x:svgObj.left,y:svgObj.top};

        let svg = Snap('#draw-erea');//初始化
        this.drawErea = svg;
        /**@function 监听触摸开始事件 */
        svg.touchstart((e)=>{	
            /**
             * 判断当前是画图类型(画图还是写字)
             */
            if(this.actionType === 'draw'){
                this.startPoint = this.getTouchPosition(e.touches[0]);//记录开始触点位置
            }
			console.log('touch start');				
        })
        /**@function 监听触摸结束事件 */
        svg.touchend((e)=>{
            let endPoint = this.getTouchPosition(e.changedTouches[0]);//触摸节点位置坐标
            if(this.actionType === 'draw'){
                switch(this.shape){
                    case 'line'://直线
                        let line = svg.paper.line(this.startPoint.x,this.startPoint.y,endPoint.x,endPoint.y);
                        line.attr({
                            stroke: this.color,
                            strokeWidth: this.lineSize,	
                        }); 
                        console.log(line.outerSVG());
                        this.historyStack.unshift(line.outerSVG());
                        //this.historyStack.unshift({name:this.shape,outerSVG:JSON.stringify(line)});
                        break;
                    case 'ellipse'://椭圆
                        let radiusX = Math.abs(endPoint.x - this.startPoint.x);
                        let radiusY = Math.abs(endPoint.y - this.startPoint.y);
                        let ellipse = svg.paper.ellipse(this.startPoint.x,this.startPoint.y,radiusX,radiusY);
                        ellipse.attr({
                            stroke:this.color,
                            fill:'#fff',
                            strokeWidth: this.lineSize,	
                        })
                        this.historyStack.unshift(ellipse.outerSVG());
                        break;
                    case 'rect'://矩形
                        let width = Math.abs(endPoint.x - this.startPoint.x);
                        let height = Math.abs(endPoint.y - this.startPoint.y);
                        let rect = svg.paper.rect(this.startPoint.x,this.startPoint.y,width,height);
                        rect.attr({
                            stroke: this.color,
                            strokeWidth: this.lineSize,	
                            fill:'#fff',	
                        }); 
                        this.historyStack.unshift(rect.outerSVG());
                        rect.paper.text(this.startPoint.x,this.startPoint.y,'Hello...')
                        break; 
                    case 'round-rect'://圆角矩形
                        let rWidth = Math.abs(endPoint.x - this.startPoint.x);
                        let rHeight = Math.abs(endPoint.y - this.startPoint.y);
                        let rRect = svg.paper.rect(this.startPoint.x,this.startPoint.y,rWidth,rHeight,5);
                        rRect.attr({
                            stroke: this.color,
                            strokeWidth: this.lineSize,	
                            fill:'#fff',	
                        });
                        this.historyStack.unshift(rRect.outerSVG()); 
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
            if(this.shape == 'curve'){
                console.log('touch move');
                let tmpPoint = this.getTouchPosition(e.changedTouches[0]);
                let curve = svg.paper.line(this.startPoint.x,this.startPoint.y,tmpPoint.x,tmpPoint.y);
                curve.attr({
                    stroke: this.color,
                    strokeWidth: this.lineSize,	
                }); 
                this.startPoint = tmpPoint; 
                console.log(tmpPoint);
                this.historyStack.unshift(curve.outerSVG()); 
            }
			
		})
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
        position: relative;
    }
    
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
    .history{
        position: absolute;
        left:px2rem(16px);
        width:px2rem(80px);
        height:px2rem(80px);
    }
    .redo{
        bottom:px2rem(144px);
    }
    .undo{
        bottom:px2rem(16px);
    }
</style>
