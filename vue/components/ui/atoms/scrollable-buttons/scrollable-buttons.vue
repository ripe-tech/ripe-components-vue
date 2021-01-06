<template>
    <div class="scrollable-buttons">
        <div
            class="button"
            v-for="item in items"
            v-bind:key="item.value"
        >
            <slot v-bind:name="item.value" v-bind:item="item">
                {{ item.label || item.value }}
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const ScrollableButtons = {
    name: "scrollable-buttons",
    props: {
        items: {
            type: Array,
            default: () => []
        }
    }
};

export default ScrollableButtons;
</script>
