<template>
    <article>
        <slot name="icon" class="icon-area"></slot>
        <slot name="name" class="btn-test"></slot>
    </article>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .icon-area{
        width:px2rem(640px);
        height:px2rem(480px);
        /* background:rgba(232,242,252,1); */
    }
    .btn-test{
        width:px2rem(252px);
        height:px2rem(80px);
        /* background:rgba(75,120,255,1);
        opacity:1; */
        border-radius:29px;
    }
</style>


