<template>
    <article class="home">
        <nav>
            <nav-bar></nav-bar>
        </nav>
        <main>
            <router-view></router-view>
        </main>
    </article>
</template>

<script>
import NavBar from '../components/base/nav-bar'
export default {
    components:{
        NavBar,
    }
    
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:102.4px;
        @return ($px / $rem) + rem; 
    }
    .home{
        display:flex;
    }
    main{
        
    }    
    
</style>

