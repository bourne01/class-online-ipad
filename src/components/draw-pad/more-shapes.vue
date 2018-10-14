<template>
    <article class="more-shapes">
        <span
            v-for="(img,idx) in imgs" :key="idx"            
            :class="{active:imgIndex==idx}"
            @click="onClick(idx)">
            <img :src="img" alt="" >
        </span>
    </article>
</template>

<script>
export default {
    data(){
        return{
            imgs:[
                require('../../assets/svg/curve.svg'),
                require('../../assets/svg/ellipse.svg'),
                require('../../assets/svg/rect.svg'),
                require('../../assets/svg/round-rect.svg'),
                require('../../assets/svg/isosceles.svg'),
                require('../../assets/svg/right-angled triangle.svg'),
                require('../../assets/svg/arrow up.svg'),
                require('../../assets/svg/arrow down.svg'),
                require('../../assets/svg/arrow 45 degree.svg'),
                require('../../assets/svg/diamond.svg'),
            ],
            imgIndex:0,//默认1px粗细
        }
    },
    methods:{
        /**@function 监听点击线条粗细图标，选择相应的粗细线条
         * @param {线条粗细对应的下标} index
         */
        onClick(index){
            this.imgIndex = index;
            console.log(index);
        }
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .more-shapes{
        padding:px2rem(16px);
        border-radius: 2px;
        border:1px solid #D8D8D8;
        position: absolute;
        top:px2rem(70px);
        background-color:#fff;
        display: flex;
        flex-wrap: wrap;
        width:px2rem(224px);
    }   
    .more-shapes>span{
        line-height:px2rem(64px);
    } 
    .active{
        background-color:#f1f1f1;
    }
    img{
        width:px2rem(64px);
        height:px2rem(64px);
    }

</style>

