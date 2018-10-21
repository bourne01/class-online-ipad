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
            historyStack:[],//操作历史
            delStack:[],//被删除历史
            drawErea:null,//画图区元素对象
            redoSteps:0,//还原步数
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
            let svgObj = document.querySelector("#draw-erea");
            console.log(svgObj.children);
            if(type === 'redo'){//还原
                if(this.redoSteps > 0){
                    this.historyStack.unshift(this.delStack[0]);//恢复最新删除
                    //this.delStack = [];
                    this.delStack.splice(0,1);//从被删除数组删除第一个元素
                    svgObj.innerHTML = `<desc>Created with Snap</desc>
                                        ${svgObj.children[1].outerHTML}`+this.historyStack.join();//向DOM输出
                    this.redoSteps--;
                }else{
                    this.$msgbox('温馨提示','已经没有要还原的操作！',2000);
                }
                
            }else{//撤销                
                this.delStack.unshift(this.historyStack[0]);//保存最新删除的元素到被删除数组中
                this.redoSteps = this.delStack.length;
                console.log(this.historyStack[0]);
                this.historyStack.splice(0,1);//删除第一个元素                
                svgObj.innerHTML = `<desc>Created with Snap</desc>
                                    ${svgObj.children[1].outerHTML}`+this.historyStack.join();
                //console.log(this.historyStack)
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
        
        /**
         * @function 画等边三角形，要求上下滑动操作
         * @param {起点坐标} sPoint
         * @param {终点坐标} ePoint
         * @param {画图区域} canvas
         */
        drawTriangle(sPoint,ePoint,canvas){
            let height = Math.sqrt((ePoint.x - sPoint.x)*(ePoint.x - sPoint.x) + 
                                        (ePoint.y - sPoint.y)*(ePoint.y - sPoint.y));//三角形高度
            let sideLength = 2*Math.sqrt(3)*height/3;
            let leftPoint = {//左顶点坐标
                    x:(sPoint.x-sideLength/2),
                    y:ePoint.y
                    };
            let rightPoint = {//右顶点坐标
                    x:(sPoint.x+sideLength/2),
                    y:ePoint.y
                    };
            let path = "M" + sPoint.x + " " + sPoint.y + " L" + leftPoint.x + " " + leftPoint.y
                        +" L" + rightPoint.x + " " + rightPoint.y + ' z'
            let triangle = canvas.paper.path(path);
            triangle.attr({
                stroke: this.color,
                strokeWidth: this.lineSize,	
                fill:'none'
            })
            this.historyStack.unshift(triangle.outerSVG());// 记录动作
        },

        /**
         * @function 画30+60+90度的直角三角形，要求上下滑动操作
         * @param {起点坐标，30度角} sPoint
         * @param {终点坐标} ePoint
         * @param {画图区域} canvas
         */
        drawRightAngle(sPoint,ePoint,canvas){
            let rightAngledPoint = {//直角顶点坐标
                    x:sPoint.x,//以起点纵坐标为准
                    y:ePoint.y
                    };
            let height = Math.sqrt((rightAngledPoint.x - sPoint.x)*(rightAngledPoint.x - sPoint.x) + 
                        (rightAngledPoint.y - sPoint.y)*(rightAngledPoint.y - sPoint.y));//直角三角形长直角边
            let sideLength = Math.sqrt(3)*height/3;
            
            let degree60Point = {//60度角顶点坐标
                    x:(sPoint.x+sideLength),
                    y:rightAngledPoint.y
                    };
            let path = "M" + sPoint.x + " " + sPoint.y + " L" + rightAngledPoint.x + " " + rightAngledPoint.y
                        +" L" + degree60Point.x + " " + degree60Point.y + ' z'
            let triangle = canvas.paper.path(path);
            triangle.attr({
                stroke: this.color,
                strokeWidth: this.lineSize,	
                fill:'none'
            })
            this.historyStack.unshift(triangle.outerSVG());// 记录动作
        },

        /**
         * @function 画带有箭头的直线
         * @param {起点坐标} sPoint
         * @param {终点坐标} ePoint
         * @param {画图区域} canvas
         * @param {直线与水平线的角度} degree
         */
        drawArrow(sPoint,ePoint,canvas,degree){
            let arrowTriangle = canvas.paper.path("M2,2 L2,11 L10,6 L2,2");//画箭头三角形
            arrowTriangle.attr({
                fill: this.color,  
            });
            let makerEnd = arrowTriangle.marker(0, 0, 13, 13, 2, 6);//maker元素
            let _ePoint = {};//线段终点坐标
            if(degree !== 45){//画垂直于水平线的带箭头的直线
                _ePoint = {
                    x:sPoint.x,
                    y:ePoint.y
                }
            }else{//画任意角度的带箭头的直线
                _ePoint = ePoint;
            }
            let arrow = canvas.paper.line(sPoint.x,sPoint.y,_ePoint.x,_ePoint.y).attr({
                // 描边
                stroke: this.color,
                strokeWidth: this.lineSize,
                fill: "none",
                // 起始标记
                // 结束标记
                "marker-end": makerEnd
            });
            this.historyStack.unshift(arrow.outerSVG().replace(/\\"/g,'&quot'));// 记录动作
        },

        /**
         * @function 画上下顶角度数120度，左右60度的菱形，
         * 动作：上下滑动，起点为菱形中心点
         * @param {起点坐标} sPoint
         * @param {终点坐标} ePoint
         * @param {画图区域} canvas
         */
        drawDiamond(sPoint,ePoint,canvas){            
            let topPoint = {//上顶点坐标
                x:sPoint.x,
                y:(ePoint.y-sPoint.y)>0?(sPoint.y-(ePoint.y-sPoint.y)):ePoint.y
            };
            let height = Math.sqrt((sPoint.x - topPoint.x)*(sPoint.x - topPoint.x) + 
                        (sPoint.y - topPoint.y)*(sPoint.y - topPoint.y))//中心点到上顶点距离
            let rightPoint = {//右顶点坐标
                x:(sPoint.x + height*Math.sqrt(3)),
                y:sPoint.y
            };
            let bottomPoint = {//下顶点坐标
                x:sPoint.x,
                y:(sPoint.y + height)
            };
            let leftPoint = {//左顶点坐标
                x:(sPoint.x - height*Math.sqrt(3)),
                y:sPoint.y
            };

            let diamond = canvas.paper.path("M" + topPoint.x + ' ' + topPoint.y + 
                                            " L" + rightPoint.x + " " + rightPoint.y +
                                            " L" + bottomPoint.x + " " + bottomPoint.y +
                                            " L" + leftPoint.x + " " + leftPoint.y + " Z");
            diamond.attr({
                stroke: this.color,
                strokeWidth: this.lineSize,
                fill: "none", 
            });
            this.historyStack.unshift(diamond.outerSVG());// 记录动作
        }
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
            console.log(shape)
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
                        this.historyStack.unshift(line.outerSVG());
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
                    case 'isosceles':
                        this.drawTriangle(this.startPoint,endPoint,svg);
                        break;
                    case 'right-angled-triangle':
                        this.drawRightAngle(this.startPoint,endPoint,svg);
                        break;
                    case 'arrow-up':
                        this.drawArrow(this.startPoint,endPoint,svg);
                        break;
                    case 'arrow-down':
                        this.drawArrow(this.startPoint,endPoint,svg);
                        break;
                    case 'arrow-45-degree':
                        this.drawArrow(this.startPoint,endPoint,svg,45);
                        break;
                    case 'diamond':
                        this.drawDiamond(this.startPoint,endPoint,svg);
                        break;
                    default:
                        this.$msgbox('发生错误','未知图形',2000);
                }
            }
			console.log('touch end');
			//console.log(e)
			//ret.attr('width','500px')
			//ret.animate({r:50},500);
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
