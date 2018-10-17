<template>
    <section class="shapes">
        <img :src="require('../../assets/svg/isosceles.svg')" alt="">
        <img :src="require('../../assets/svg/curve.svg')" alt="">
        <img :src="require('../../assets/svg/ellipse.svg')" alt="">
        <img :src="require('../../assets/svg/rect.svg')" alt="">
        <div>
            <img :src="require('../../assets/svg/isosceles.svg')" alt="" 
                @click.stop="isMoreShapes=!isMoreShapes">
            <more-shapes v-if="isMoreShapes"></more-shapes>
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
        }
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
</style>
