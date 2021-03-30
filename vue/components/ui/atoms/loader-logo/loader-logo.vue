<template>
    <div class="loader-logo">
        <object
            class="platforme-loader"
            type="image/svg+xml"
            v-bind:style="style"
            v-bind:data="require('./assets/loader.svga')"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const LoaderLogo = {
    name: "loader-logo",
    props: {
        size: {
            type: Number,
            default: 60
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.size) {
                base.width = `${this.size}px`;
                base.height = `${this.size}px`;
            }
            return base;
        }
    }
};

export default LoaderLogo;
</script>
