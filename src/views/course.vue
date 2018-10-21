<template>
    <article class="course-content">
        <section>
        </section>
        <!-- <group>
            <x-switch :title="'控制进度'"></x-switch>
        </group> -->
        <div class="control-bar">
             <group>
                <x-switch title="学生同步进度" v-model="value"></x-switch>
            </group>
        </div>
        <footer>
            <div class="preview" v-for="idx in 15" :key="idx">
                <div class="slides"></div>
                <div class="slide-index">
                    <span>{{idx}}</span>
                    <img :src="require('../assets/svg/visible.svg')" alt="" v-if="visibilities[idx-1]" @click="onVisibility(idx)">
                    <img :src="require('../assets/svg/invisible.svg')" alt="" v-else @click="onVisibility(idx)">
                </div>
            </div>
        </footer>
    </article>
</template>

<script>
import { XSwitch, Group, } from 'vux'
export default {
    components:{
        XSwitch,
        Group,
    },
    data(){
        return{
            visibilities:[],
        }
    },
    methods:{
        /**
         * @function 控制幻灯片学生是否可看见
         */
        onVisibility(index){            
            this.visibilities.splice(index-1,1,!this.visibilities[index-1])
        }
    }
}
</script>

<style lang="scss">
    .control-bar .weui-cells{
        margin-top:0;
    }
    .control-bar .weui-cell{
        padding:0!important;
    }
    .control-bar .weui-cells::before{
        border:none;
    }
    .control-bar .weui-cells::after{
        border:none;
    }
    .control-bar .weui-label{
        display: inline-block!important;
        margin-right: 5px;
        height:32px;
        line-height:32px;
    }
</style>


<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .course-content{
        padding:px2rem(32px);
    }
    section{
        /* margin-bottom: px2rem(32px); */
        width:px2rem(1840px);
        height:px2rem(1040px);
        background-color:#D5DBE5;
        border-radius: 4px;
    }
    .control-bar{
        padding:px2rem(32px) 0 ;
        font-size:px2rem(24px);
        font-family:SF Pro Text;
        font-weight:400;
        color:rgba(143,143,143,1);
        text-align: right;
    }
    footer{
        display:flex;
        overflow-x: scroll;
        width:px2rem(1840px);
        flex-wrap: nowrap;
        min-width:0
    }
    .preview{
        flex:0 0 px2rem(480px);
        /* width:px2rem(384px);         */
        height:px2rem(300px);
        /* background-color:#D5DBE5; */
        border-radius: 4px;
        margin-right:px2rem(32px);
        box-sizing: border-box;
        position: relative;
    }
    .slides{
        height:px2rem(256px);
        background-color:#D5DBE5;
        border-radius: 4px;
    }
    .slide-index{
        position:absolute;
        width:100%;
        top:px2rem(266px);
        left: 0;;
        height:px2rem(32px);
        display: flex;
        justify-content: space-between;
    }
    .slide-index span{
        font-size:px2rem(24px);
    }
    .slide-index>img{
        width:px2rem(32px);
        height:px2rem(32px);
    }
</style>
