<template>
    <section class="colors">
        <div>
            <img :src="require('../../assets/svg/color-picker.svg')" alt=""
                @click.stop="isMoreColors=!isMoreColors">
            <transition name="more-color">
                <more-colors v-if="isMoreColors"></more-colors>
            </transition>            
        </div>        
        <div class="current-color-wrapper">
            <div class="current-color" :style="{background:activeColor}"></div>
        </div>
    </section>
</template>

<script>
import MoreColors from './more-colors'
export default {
    components:{
        MoreColors,
    },
    data(){
        return{
            isMoreColors:false,
            activeColor:'#fff'
        }
    },
    mounted(){
        this.$root.bus.$on('color',(color) => {
            this.activeColor = color;
        })
        this.$root.bus.$on('close-pop',() => {
            this.isMoreColors = false;
        })
    }
}
</script>


<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .colors{
        margin-left:px2rem(80px);
        display: flex;
        align-items:center;
    }
    .colors>div{
        display: flex;
        position: relative;
    }
    .colors img{
        width:px2rem(64px);
        height:px2rem(64px);
        margin-right:px2rem(32px);
    }
    .current-color-wrapper{
        padding:px2rem(14px);
        border:1px solid #E2E2E2;
        box-sizing:border-box;
        border-radius: 2px;
    }
    .current-color{
        width:px2rem(32px);
        height:px2rem(32px);  
        border-radius:2px; 
        border:1px solid #E2E2E2;
        box-sizing:border-box;
    }
    .more-color-enter-active,
    .more-color-leave-active
    {
        transition: opacity .5s;
    }
    .more-color-enter,
    .more-color-leave-to
    {
        opacity:0;
    }
</style>
