<template>
    <article class="more-shapes">
        <span
            v-for="(img,idx) in imgs" :key="idx"            
            :class="{active:imgIndex==idx}"
            >
            <img :src="img" alt="" @click.stop="onClick(idx)">
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
            shapes:[
                'curve','ellipse','rect','round-rect','isosceles',
                'right-angled-triangle','arrow-up','arrow-down',
                'arrow-45-degree','diamond'],
            actIndex:0,//默认
        }
    },
    methods:{        
        /**
         * @function 监听点击形状
         * @param {形状名称} name
         * @param {形状名称所在数组的下标} index
         */
        onClick(index){
            this.imgIndex = index;
            this.shapeName = this.shapes[index];
            this.actIndex = index;
            console.log(this.shapeName);
            this.$root.bus.$emit('shape',this.shapeName);
            this.$root.bus.$emit('close-pop');
        },
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
        z-index: 100001;
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

