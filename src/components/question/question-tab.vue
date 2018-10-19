<template>
    <div class="questions">
        <header>
            <tab 
                :line-width="2" custom-bar-width="2em"
                default-color="#B4B4B4"
                active-color="#FC6936"
                >
                <tab-item  selected @on-item-click="onTabClick">题库里选题</tab-item>
                <tab-item @on-item-click="onTabClick">自定义题目</tab-item>
            </tab>
            <img src="../../assets/question/close.png" alt="" class="close" @click="onClick('close')">
        </header>
        <div class="questions-in-bank" v-if="actIndex==0">
            <div class="question-list">
                <question v-for="idx in 5" :key="idx"></question> 
            </div>
            <footer>
                <span>已选&nbsp;{{5}}</span>
                <button @click="onClick('release')">发布测试</button>
            </footer>
        </div>
        
    </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import Question from '../../components/question/question'
export default {
    components: {
        Tab,
        TabItem,
        Question,
    },
    data(){
        return{
            actIndex:0,//默认激活题库里选题选项卡
        }
    },
    methods:{
        /**
         * @function 监听点击事件,向父组件发送要求关闭弹窗事件
         * @param {点击对象类型} type
         */
        onClick(type){
            switch(type){
                case 'close':                    
                    break;
                case 'release':
                    /**发布试题 */
                    break;
                default:
                    this.$msgbox('发生错误','未知类型点击',2000);
            }
            this.$emit('close-pop');
        },
        /**
         * @function 监听点击选项卡事件
         * @param {活动选项卡下标值，第一选项卡值为0,依次1,2...,值由组件提供} index
         */
        onTabClick(index){
            this.actIndex = index;
        }
    }
}
</script>


<style lang="scss" >
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .vux-tab-ink-bar{
        height:px2rem(6px)!important;
    }
</style>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    
    .vux-tab{
        height:px2rem(110px);
        width:50%;
    }
    .vux-tab-item{
        font-size:px2rem(32px)!important;
        font-weight: bold;
        background:none!important;
        line-height:px2rem(110px)!important;
    }
    .questions{
        position:fixed;
        width:px2rem(1312px);
        top:px2rem(178px);
        left:px2rem(434px);
        height:px2rem(1186px);
        background-color:#fff;
        border:1px solid #D8D8D8;
        border-radius:4px;
        box-sizing:border-box;
    }
    .question-list{
        padding:px2rem(14px);
        max-height:px2rem(972px);
        overflow-y:auto;
        box-sizing:border-box;
    }
    .questions>header{
        width:inherit;
        display:flex;
        justify-content: space-between;
        position: static;
    }
    .question .close{
        width:px2rem(34px);
        height:px2rem(34px);
        align-self:center;
        margin-right:px2rem(52px);
    }
    .questions-in-bank>footer{
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
    .questions-in-bank>footer>span{
        font-size:px2rem(34px);
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(68,68,68,1);
        margin-left:px2rem(60px);
    }
    .questions-in-bank>footer>button{
        outline:none;
        border:none;
        width:px2rem(302px);
        height:px2rem(100px);
        background:rgba(252,105,54,1);
        color:#fff;
        text-align:center;
    }
</style>
