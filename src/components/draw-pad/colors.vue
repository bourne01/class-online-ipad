<template>
    <section class="colors">
        <div>
            <img :src="require('../../assets/svg/color-picker.svg')" alt=""
                @click.stop="isMoreColors=!isMoreColors">
            <more-colors v-if="isMoreColors"></more-colors>
        </div>        
        <img :src="require('../../assets/draw-pad/white.png')" alt="">
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
        }
    },
    mounted(){
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
</style>
