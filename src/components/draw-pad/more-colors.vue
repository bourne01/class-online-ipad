<template>
    <article class="more-color">
        <div class="color-wrapper"
            v-for="(color,idx) in colors" :key="idx"            
            :class="{active:imgIndex==idx}"
            @click.stop="onClick(idx)">
            <div class="color"
                :class="{
                    color1:idx==0,
                    color2:idx==1,
                    color3:idx==2,
                    color4:idx==3,
                    color5:idx==4,
                    color6:idx==5,
                    color7:idx==6,
                    color8:idx==7,
                    color9:idx==8,
                    color10:idx==9,
                    color11:idx==10,
                }"></div>
        </div>
    </article>
</template>

<script>
export default {
    data(){
        return{
            colors:[
                '#000','#7F7F7F','#880015','#ED1C24',
                '#FF7F27','#FFF200','#22B14C','#00A2E8',
                '#3F48CC','#A349A4','#ff',
            ],
            activeColor:'',//被选择的颜色
        }
    },
    methods:{
        /**@function 监听点击线条粗细图标，选择相应的粗细线条
         * @param {线条粗细对应的下标} index
         */
        onClick(index){
            console.log(this.colors[index])
            this.$root.bus.$emit('color',this.colors[index]);
            this.$root.bus.$emit('close-pop');
        }
    },    
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .more-color{
        padding:px2rem(16px);
        border-radius: 2px;
        border:1px solid #D8D8D8;
        position: absolute;
        top:px2rem(70px);
        background-color:#fff;
        display: flex;
        flex-wrap: wrap;
        width:px2rem(294px);
        box-sizing:border-box;
        z-index: 100002;
    }       
    .color-wrapper{
        padding:px2rem(16px);
    }
    .color{
        width:px2rem(32px);
        height:px2rem(32px);  
        border-radius:2px; 
    }
    .color1{
        background-color:#000;
    } 
    .color2{
        background-color:#7F7F7F;
    } 
    .color3{
        background-color:#880015;
    } 
    .color4{
        background-color:#ED1C24;
    } 
    .color5{
        background-color:#FF7F27;
    } 
    .color6{
        background-color:#FFF200;
    } 
    .color7{
        background-color:#22B14C;
    } 
    .color8{
        background-color:#00A2E8;
    } 
    .color9{
        background-color:#3F48CC;
    } 
    .color10{
        background-color:#A349A4;
    } 
    .color11{
        background-color:#fff;
        border:1px solid #E2E2E2;
    } 
    .active{
        background-color:#f1f1f1;
    }
    img{
        width:px2rem(64px);
        height:px2rem(64px);
    }

</style>

