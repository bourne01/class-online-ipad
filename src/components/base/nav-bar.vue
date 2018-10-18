<template>
    <div class="">
        <ul class="nav-bar">
            <li 
                v-for="(img,idx) in defaultImgs" :key=idx 
                @click="onClick(idx)"
                :class="{active:activeIndex==idx}">                   
                <!-- <img src="../../assets/home/home.png" alt=""> -->
                <img :src="activeImgs[idx]" alt="" v-if="activeIndex==idx">                   
                <img :src="img" alt="" v-else>
                <span>{{iconNames[idx]}}</span>
            </li>
            <li>
                <img :src="require('../../assets/svg/camera.svg')" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            defaultImgs:[
                require('../../assets/svg/home.svg'),
                require('../../assets/svg/course.svg'),
                require('../../assets/svg/pencil.svg'),
                require('../../assets/svg/question.svg'),
                require('../../assets/svg/counting.svg'),
                require('../../assets/svg/student.svg')],
            activeImgs:[
                require('../../assets/svg/home-active.svg'),
                require('../../assets/svg/course-active.svg'),
                require('../../assets/svg/pencil-active.svg'),
                require('../../assets/svg/question-active.svg'),
                require('../../assets/svg/counting-active.svg'),
                require('../../assets/svg/student-active.svg')
            ],
            iconNames:[,'课程','画笔','测试题','统计','学生管理'],
            activeIndex:0,//默认激活图标，首页
        }
    },
    
    methods:{
        /**
         * @function 监听点击导航图标事件
         * @param {被点击图标的下标} index
         * @param {图标类型} type
         */
        onClick(index,type){
            this.activeIndex = index;
            switch(index){
                case 0:
                    this.$router.push('/home');
                    break;
                case 1:
                    this.$router.push('/home/course');
                    break;
                case 2:
                    this.$router.push('/home/draw-pad');
                    break;
                case 3:
                    this.$router.push('/home/question');
                    break;
                case 4:
                    this.$router.push('/home/counting');
                    break;
                case 5:
                    this.$router.push('/home/student-manage');
                    break;
                default:
                    this.$msgbox('发生错误','未知类型的跳转',1000);
            }
        }
    },
}
</script>


<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .nav-bar {
        /* position: fixed; */
        bottom: 0;
        left: 0;        
        background-color:#444;
        z-index: 10;
        width:px2rem(144px);
        height:100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    img{
        width: px2rem(64px);
        height: px2rem(64px);
    }
    li{
        height:px2rem(180px);
        width:100%;
        text-align: center;
        /* line-height:px2rem(160px); */
        display:flex;
        align-items: center;
        flex-direction: column;
        padding-top:px2rem(20px);
        box-sizing: border-box;
    }
    li>span{
        font-size:px2rem(24px);
        color:#8F8F8F;
    }
    li:first-child{
        padding-top:px2rem(50px);
    }
    li:last-child{
        position: fixed;
        bottom:0;
        width:px2rem(144px);
    }
    .active{
        background-color:#333333;
    }
    .active span{
        color:#fff;
    }
</style>