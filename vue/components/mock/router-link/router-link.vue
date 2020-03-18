<template>
    <div>
        <slot v-bind:navigate="() => {}" v-bind:href="'https://platforme.com?mock_router_link=true'">
            <a class="router-link" v-bind:href="to" />
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
    }
};

export default RouterLink;
</script>
