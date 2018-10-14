<template>
    <section class="tools">
        <img :src="require('../../assets/svg/font.svg')" alt="">
        <img :src="require('../../assets/svg/pencil.svg')" alt="">
        <div>
            <img :src="require('../../assets/svg/size.svg')" alt="" 
                @click.stop="isLineSizes=!isLineSizes">
            <line-sizes v-if="isLineSizes"></line-sizes>
        </div>
    </section>
</template>

<script>
import LineSizes from './line-sizes'
export default {
    components:{
        LineSizes
    },
    data(){
        return{
            isLineSizes:false,//控制线条粗细下拉列表是否弹出，false为默认不弹出
        }
    },
    mounted(){
        this.$root.bus.$on('close-pop',() => {
            this.isLineSizes = false;
        })
    }
}
</script>


<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .tools{
        margin-left:px2rem(48px);
        display: flex;
        align-items: center;
    }
    .tools img{
        width:px2rem(64px);
        height:px2rem(64px);
        margin-right:px2rem(32px);
    }
    .tools>div{
        height:px2rem(64px);
        display: flex;
        position: relative;
    }
</style>
