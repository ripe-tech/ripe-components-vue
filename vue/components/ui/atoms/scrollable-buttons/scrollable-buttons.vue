<template>
    <div class="scrollable-buttons">
        <div class="previous">
            TODO left
        </div>
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
        <div class="next">
            TODO right
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.scrollable-buttons > .previous,
.scrollable-buttons > .button,
.scrollable-buttons > .next {
     display: inline-block;
}

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
