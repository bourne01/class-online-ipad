<template>
    <article class="question">
        <testing-type>
            <div slot="icon" class="icon-erea in-lesson">
                <img src="" alt="">
                jflajfal
            </div>
            <div slot="name" class="btn-wrapper">
                <button  class="btn btn-in-lesson" @click="onClick('in-lesson')">课中测试</button>
            </div>            
        </testing-type>
        <testing-type>
            <div slot="icon" class="icon-erea instant">
                <img src="" alt="">
                jfaljflaj
            </div>
            <div slot="name" class="btn-wrapper">
                <button slot="name" class="btn btn-instant" @click="onClick('instant')">即时测试</button>
            </div>            
        </testing-type>
        <questions v-if="isShow" @close-pop="onClosePop"></questions>
    </article>
</template>

<script>
import TestingType from '../components/question/testing-type'
import Questions from '../components/question/question-tab'
export default {
    components:{
        TestingType,
        Questions
    },
    data(){
        return{
            isShow:false,//
        }
    },
    methods:{
        /**@function 监听关闭弹窗事件，然后关闭弹窗 */
        onClosePop(){
            this.isShow = false;
        },
        /**
         * @function 监听点击事件
         * @param {点击对象类型} type
         */
        onClick(type){
            switch(type){
                case 'in-lesson':
                    this.isShow = true;
                    break;
                case 'instant':
                    this.isShow = true;
                    break;
                default:
                    this.$msgbox('发生错误','未知类型点击',2000);
            }
        }
    }
}
</script>


<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
   .question{
       margin-top:px2rem(390px);
       padding:0 px2rem(232px);
       display:flex;
       justify-content: space-between;
       width:px2rem(1440px);
   }
   .icon-erea{
       width:px2rem(640px);
        height:px2rem(480px);
        border-radius: 4px;
   }
   .btn-wrapper{
       text-align: center;
   }
   .btn{
        outline: none;
        border:none;
        width:px2rem(252px);
        height:px2rem(80px);
        line-height:px2rem(80px);
        text-align: center;
        border-radius:29px;
        font-size:px2rem(34px); 
        color:#fff;       
   }
   .in-lesson{
        background:rgba(232,242,252,1);        
   }
   .instant{
        background:rgba(232, 247, 239, 1);        
   }
   .btn-in-lesson{
       background:rgba(75,120,255,1);
   }
   .btn-instant{
       background:rgba(34,203,100,1);
   }
</style>
