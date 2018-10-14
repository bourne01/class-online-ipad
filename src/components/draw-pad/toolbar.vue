<template>
    <article class="toolbar">
        <div>
            <tools></tools>
            <shapes></shapes>
            <colors></colors>
        </div>
        <img :src="require('../../assets/svg/save.svg')" alt="" class="save">
    </article>
</template>

<script>
import Tools from './tools'
import Shapes from './shapes'
import Colors from './colors'
export default {
    components:{
        Tools,
        Shapes,
        Colors,
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .toolbar{
        display:flex;
        height:px2rem(140px);
        /* line-height:px2rem(140px); */
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
    }
    .toolbar div{
        display: flex;
    }
    .toolbar img{
        width:px2rem(64px);
        height:px2rem(64px);
        margin-right:px2rem(32px);
    }
    img.save{
        float:right;
    }
</style>
