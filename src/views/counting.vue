<template>
    <article class="home-content">
        <section>
        </section>
        <footer>
            <div class="preview" v-for="idx in 15" :key="idx">{{idx}}</div>
        </footer>
    </article>
</template>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .home-content{
        padding:px2rem(32px);
    }
    section{
        margin-bottom: px2rem(32px);
        width:px2rem(1840px);
        height:px2rem(1200px);
        background-color:#D5DBE5;
        border-radius: 4px;
    }
    footer{
        display:flex;
        overflow-x: scroll;
        width:px2rem(1840px);
        flex-wrap: nowrap;
        min-width:0
    }
    .preview{
        flex:0 0 px2rem(384px);
        /* width:px2rem(384px);         */
        height:px2rem(240px);
        background-color:#D5DBE5;
        border-radius: 4px;
        margin-right:px2rem(40px);
        box-sizing: border-box;
    }
</style>
