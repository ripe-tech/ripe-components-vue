<template>
    <h1 class="title" v-bind:class="classes">
        <slot />
    </h1>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.title {
    font-family: $font-family;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 0.5px;
    line-height: 34px;
    margin: 0px 0px 0px 0px;
    text-align: left;
}
</style>

<script>
export const Title = {
    name: "title-ripe",
    props: {
        size: {
            type: String,
            default: "medium"
        }
    },
    computed: {
        classes() {
            const base = {};
            if (this.size) base[`title-${this.size}`] = this.size;
            return base;
        }
    }
};

export default Title;
</script>
