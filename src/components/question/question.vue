<template>
    <div class="question">
        <label for="">
            <img src="../../assets/svg/diamond.svg" alt="">
        </label>        
        <ul>
            <li>
                1、(2015河南安阳模拟)已知函数f(x)=ax2+b2015，则(　　)
            </li>
            <li>A．∃x0∈(0，1)，使得f(x0)=0 A．∃x0∈(0，1) </li>
            <li>B．∃x0∈(0，1)，使得f(x0)>0 </li>
            <li>C．∀x∈(0，1)，都有f(x)>0</li>
            <li>D．∀x∈(0，1)，都有f(x)&lt;0</li>
        </ul>
    </div>
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
    .question{
        display:flex;
        align-items: center;        
        box-sizing: border-box;
        min-height:px2rem(276px);
        background-color:#F8F8F8;
        margin-top:px2rem(14px);
    }
    label{
        width:px2rem(140px);
        text-align: center;
    }
    .question img{
        width:px2rem(72px);
        height:px2rem(72px);
    }
    li{
        text-indent: 2em;
        height:auto;
        font-size:px2rem(24px);
        color:#444;
        list-style: none;
    }
    li:first-child{
        text-indent: 0;
        height:auto;
    }
</style>
