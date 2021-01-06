<template>
    <div class="scrollable-buttons">
        <div class="previous" v-if="arrows">
            TODO left
        </div>
        <div class="buttons-container">
            <div
                class="button"
                v-bind:class="buttonClasses(item, index)"
                v-for="(item, index) in items"
                v-bind:key="item.value"
                v-on:click="onButtonClick($event, item)"
            >
                <slot v-bind:item="item">
                    <slot v-bind:name="item.value" v-bind:item="item">
                        {{ item.label || item.value }}
                    </slot>
                </slot>
            </div>
        </div>
        <div class="next" v-if="arrows">
            TODO right
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.scrollable-buttons {
    display: flex;
    user-select: none;
}

.scrollable-buttons > .previous,
.scrollable-buttons > .buttons-container,
.scrollable-buttons > .buttons-container > .button,
.scrollable-buttons > .next {
    cursor: pointer;
    display: inline-block;
}

.scrollable-buttons > .buttons-container {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
}

.scrollable-buttons > .buttons-container > .button {
    font-size: 16px;
    font-weight: 700;
    margin: 0px 12px 0px 0px;
    opacity: 0.5;
    transition: opacity 0.2s ease-out;
}

.scrollable-buttons > .buttons-container > .button.last {
    margin: 0px 0px 0px 0px;
}

.scrollable-buttons > .buttons-container > .button:hover,
.scrollable-buttons > .buttons-container > .button.hover {
    opacity: 0.7;
}

.scrollable-buttons > .buttons-container > .button.selected {
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
        buttonClasses(item, index) {
            const base = {};
            base[`button-${item.value}`] = true;
            if (item.value === this.selectedData) base.selected = true;
            if (index === this.items?.length - 1) base.last = true;
            return base;
        }
    }
};

export default ScrollableButtons;
</script>
