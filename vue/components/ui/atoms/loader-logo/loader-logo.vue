<template>
    <div class="loader-logo">
        <object
            class="platforme-loader"
            style="height: 100px;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    position: fixed;
    top: 50%;
    width: 100px;"
            type="image/svg+xml"
            v-bind:data="require('./assets/loader.svga')"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const LoaderLogo = {
    name: "loader-logo"
};

export default LoaderLogo;
</script>
