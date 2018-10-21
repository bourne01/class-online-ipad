<template>
    <section class="shapes">
        <!-- <img :src="require('../../assets/svg/line.svg')" alt="">
        <img :src="require('../../assets/svg/curve.svg')" alt="">
        <img :src="require('../../assets/svg/ellipse.svg')" alt="">
        <img :src="require('../../assets/svg/rect.svg')" alt=""> -->
        <img 
            :src="require('../../assets/svg/'+name+'.svg')" alt=""
            v-for="(name,idx) in shapes" :key="idx"
            @click="onClick(name,idx)">

        <div>
            <img :src="require('../../assets/svg/caret.svg')" alt="" 
                @click.stop="isMoreShapes=!isMoreShapes">
                <transition name="more-shapes">
                    <more-shapes v-if="isMoreShapes"></more-shapes>
                </transition>
            
        </div>
        
    </section>
</template>

<script>
import MoreShapes from './more-shapes'
export default {
    components:{
        MoreShapes
    },
    data(){
        return{
            isMoreShapes:false,
            shapes:['line','curve','ellipse','rect'],
            shapeName:'',//形状名称
            actIndex:-1,//激活的形状数组下标
        }
    },
    methods:{
        /**
         * @function 监听点击形状
         * @param {形状名称} name
         * @param {形状名称所在数组的下标} index
         */
        onClick(name,index){
            this.shapeName = name;
            this.actIndex = index;
            this.$root.bus.$emit('shape',this.shapeName);
        },
    },
    mounted(){
        this.$root.bus.$on('close-pop',() => {
            this.isMoreShapes = false;
        })
    }
}
</script>


<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .shapes{
        margin-left:px2rem(118px);
        display: flex;
        /* height:px2rem(140px);
        line-height:px2rem(140px); */
        align-items: center;
        border-radius: 4px;
        border:1px solid #D8D8D8;
    }
    .shapes img{
        width:px2rem(64px);
        height:px2rem(64px);
        margin-right:px2rem(16px);
    }
    .shapes>div{
        height:px2rem(64px);
        display: flex;
        position: relative;
    }
    .more-shapes-enter-active{
        transition: opacity .5s;
    }
    .more-shapes-enter{
        opacity:0;
    }
    .more-shapes-leave-to{
        opacity:0;
    }
    .more-shapes-leave-active{
        transition: opacity .5s;
    }
</style>
