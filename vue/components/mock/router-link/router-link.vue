<template>
    <div>
        <slot v-bind:navigate="() => {}" v-bind:href="href">
            <a class="router-link" v-bind:href="href" />
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const RouterLink = {
    props: {
        to: {
            type: String | Object,
            default: "#"
        }
    },
    computed: {
        href() {
            if (!this.to) return "#";
            if (typeof this.to === "string") return this.to;
            return "#";
        }
    }
};

export default RouterLink;
</script>
