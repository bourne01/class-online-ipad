<template>
    <article class="draw-pad" @click="onClick">
        <header>
            <tool-bar></tool-bar>
        </header>
        <section>
            <svg id="draw-erea"></svg>
        </section>
        <footer>
            <div class="preview" v-for="idx in 15" :key="idx">{{idx}}</div>
        </footer>
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
        }
    },
    methods:{
        /**@function 监听点击画板区域，传递点击事件以便通知关闭弹窗 */
        onClick(){
            this.$root.bus.$emit('close-pop');
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
        })
        //3、监听画图线条粗细
        this.$root.bus.$on('size',(size) => {
            this.lineSize = size;
        })
        //4、监听颜色选择
        this.$root.bus.$on('color',(color) => {
            this.color = color;
        })
        let svg = Snap('#draw-erea');
        svg.paper.line(50,50,200,200).attr('stroke','blue');
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
    header{
        margin-bottom:px2rem(32px);
    }
    section{
        margin-bottom: px2rem(32px);
        width:px2rem(1840px);
        height:px2rem(1056px);
        background-color:#D5DBE5;
        border-radius: 4px;
    }
    footer{
        display:flex;
        overflow-x: scroll;
        width:px2rem(1840px);
        flex-wrap: nowrap;
        min-width:0
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
        width:100%;
        height:100%;
    }
</style>
