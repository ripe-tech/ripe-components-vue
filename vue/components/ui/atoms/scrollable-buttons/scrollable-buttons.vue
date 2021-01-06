<template>
    <div class="scrollable-buttons">
        <div
            class="button"
            v-bind:class="buttonClasses(item)"
            v-for="item in items"
            v-bind:key="item.value"
        >
            <slot v-bind:item="item">
                <slot v-bind:name="item.value" v-bind:item="item">
                    {{ item.label || item.value }}
                </slot>
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
    },
    methods: {
        buttonClasses(item) {
            const base = {};
            base[`button-${item.value}`] = true;
            return base;
        }
    }
};

export default ScrollableButtons;
</script>
