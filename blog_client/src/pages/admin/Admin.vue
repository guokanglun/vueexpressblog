<template>
    <div>
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from "./header/Header";
    export default {
        name: "Admin",
        components:{
            Header
        }
    }
</script>

<style scoped>

</style>
