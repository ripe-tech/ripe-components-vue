<template>
    <div class="scrollable-buttons">
        <div class="previous" v-if="arrows">
            TODO left
        </div>
        <div
            class="button"
            v-bind:class="buttonClasses(item)"
            v-for="item in items"
            v-bind:key="item.value"
            v-on:click="onButtonClick($event, item)"
        >
            <slot v-bind:item="item">
                <slot v-bind:name="item.value" v-bind:item="item">
                    {{ item.label || item.value }}
                </slot>
            </slot>
        </div>
        <div class="next" v-if="arrows">
            TODO right
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.scrollable-buttons > .previous,
.scrollable-buttons > .button,
.scrollable-buttons > .next {
    cursor: pointer;
    display: inline-block;
}

.scrollable-buttons > .button {
    font-size: 16px;
    font-weight: 700;
    opacity: 0.5;
    transition: opacity 0.2s ease-out;
}

.scrollable-buttons > .button:hover,
.scrollable-buttons > .button.hover {
    opacity: 0.7;
}

.scrollable-buttons > .button.selected {
    opacity: 1;
}
</style>

<script>
export const ScrollableButtons = {
    name: "scrollable-buttons",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        selected: {
            type: String,
            default: null
        },
        arrows: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            selectedData: this.selected
        };
    },
    watch: {
        selected(value) {
            this.selectedData = value;
        },
        selectedData(value) {
            this.$emit("update:selected", value);
        }
    },
    methods: {
        onButtonClick(event, item) {
            this.selectedData = item.value;
            this.$emit("button-click", event, item);
        },
        buttonClasses(item) {
            const base = {};
            base[`button-${item.value}`] = true;
            if (item.value === this.selectedData) base.selected = true;
            return base;
        }
    }
};

export default ScrollableButtons;
</script>
