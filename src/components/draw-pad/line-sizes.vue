<template>
    <article class="line-size">
        <ul>
            <li 
                v-for="(line,idx) in lineSizes" :key="idx"
                @click="onClick(idx)"
                :class="{active:lineIndex==idx}">
                <div class="line" 
                    :class="{
                    line:idx==0,
                    line2px:idx==1,
                    line3px:idx==2,
                    line4px:idx==3,
                    }"></div>
            </li>
        </ul>
    </article>
</template>

<script>
export default {
    data(){
        return{
            lineSizes:['1','2','3','4'],//线条粗细，单位像素px
            lineIndex:0,//默认1px粗细
        }
    },
    methods:{
        /**@function 监听点击线条粗细图标，选择相应的粗细线条
         * @param {线条粗细对应的下标} index
         */
        onClick(index){
            this.lineIndex = index;
        }
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .line-size{
        padding:px2rem(10px) 0;
        border-radius: 2px;
        border:1px solid #D8D8D8;
        position: absolute;
        top:px2rem(70px);
        background-color:#fff;
    }
    li{
        padding:0 px2rem(32px);
        height:px2rem(58px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .active{
        background-color:#f1f1f1;
    }
    .line{
        height:0;
        width:px2rem(160px);
        border-bottom:1px solid #8f8f8f;
    }
    .line2px{
        border-bottom:2px solid #8f8f8f;
    }
    .line3px{
        border-bottom:3px solid #8f8f8f;
    }
    .line4px{
        border-bottom:4px solid #8f8f8f;
    }
</style>

