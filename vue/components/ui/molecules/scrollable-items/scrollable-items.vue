<template>
    <div class="scrollable-items">
        <button-icon
            class="button-icon-previous"
            v-bind:icon="'chevron-left'"
            v-bind:disabled="isPreviousDisabled"
            v-bind="_buttonIconProps"
            v-if="showArrows"
            ref="button-icon-previous"
            v-on:click="onPreviousClick"
        />
        <div
            class="items-container"
            v-bind:style="itemsContainerStyle"
            ref="items-container"
            v-on:wheel="onItemsContainerWheel"
            v-on:mousedown="onItemsContainerMouseDown"
        >
            <div
                class="item"
                v-bind:class="itemClasses(item, index)"
                v-for="(item, index) in items"
                v-bind:key="item.value"
                v-on:click="onItemClick($event, item)"
            >
                <slot v-bind:item="item">
                    <slot v-bind:name="item.value" v-bind:item="item">
                        {{ item.label || item.value }}
                    </slot>
                </slot>
            </div>
        </div>
        <button-icon
            class="button-icon-next"
            v-bind:icon="'chevron-right'"
            v-bind:disabled="isNextDisabled"
            v-bind="_buttonIconProps"
            v-if="showArrows"
            ref="button-icon-next"
            v-on:click="onNextClick"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.scrollable-items {
    align-items: center;
    display: flex;
    user-select: none;
}

.scrollable-items > .items-container,
.scrollable-items > .items-container > .item {
    cursor: pointer;
    display: inline-block;
}

.scrollable-items > .items-container {
    flex: 1;
    -ms-overflow-style: none;
    overflow-x: scroll;
    scrollbar-width: none;
    white-space: nowrap;
}

.scrollable-items > .items-container::-webkit-scrollbar {
    display: none;
}

.scrollable-items > .items-container > .item {
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
    margin: 0px 12px 0px 0px;
    opacity: 0.5;
    transition: opacity 0.2s ease-out;
}

.scrollable-items > .items-container > .item.last {
    margin: 0px 0px 0px 0px;
}

.scrollable-items > .items-container > .item:hover,
.scrollable-items > .items-container > .item.hover {
    opacity: 0.7;
}

.scrollable-items > .items-container > .item.selected {
    opacity: 1;
}
</style>

<script>
export const ScrollableItems = {
    name: "scrollable-items",
    props: {
        /**
         * List of scrollable items. Example:
         * [{ label: "Item 1", value: "item1" },
         * { label: "Item 2", value: "item2" }].
         */
        items: {
            type: Array,
            default: () => []
        },
        /**
         * Item currently selected. Example: "item1".
         */
        selected: {
            type: String,
            default: null
        },
        /**
         * Enables/Disables the previous/next arrow buttons that are shown in
         * the left and right side of component.
         */
        arrows: {
            type: Boolean,
            default: true
        },
        /**
         * If set to true, the arrows will disappear when there is enough space
         * for all the items to be visible.
         */
        autoHideArrows: {
            type: Boolean,
            default: true
        },
        /**
         * Dictates how the items are horizontally aligned. Example: "center".
         */
        alignment: {
            type: String,
            default: "center"
        },
        /**
         * Dictates the horizontal scroll speed of the items when using the mouse
         * scroll wheel. Negative values inverts the default direction of the scroll.
         */
        scrollSpeed: {
            type: Number,
            default: 10
        },
        /**
         * Props for the arrow button icon components.
         */
        buttonIconProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            selectedData: this.selected,
            scrollableWidth: 0
        };
    },
    computed: {
        itemsContainerStyle() {
            return {
                "text-align": this.alignment
            };
        },
        _buttonIconProps() {
            return {
                borderRadius: 0,
                iconStrokeWidth: 3,
                ...this.buttonIconProps
            };
        },
        showArrows() {
            const hideArrows = this.autoHideArrows && this.scrollableWidth <= 0;
            return this.arrows && !hideArrows;
        },
        selectedIndex() {
            return this.items.findIndex(item => item.value === this.selectedData);
        },
        isPreviousDisabled() {
            return this.selectedIndex <= 0;
        },
        isNextDisabled() {
            return this.selectedIndex >= this.items.length - 1;
        }
    },
    watch: {
        items() {
            this.$nextTick(() => {
                this.calculateScrollableWidth();
            });
        },
        selected(value) {
            this.selectedData = value;
        },
        selectedData(value) {
            this.snapSelectedToCenter();
            this.$emit("update:selected", value);
        }
    },
    created: function() {
        window.addEventListener("resize", this.onResize);
    },
    destroyed: function() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        itemClasses(item, index) {
            const base = {};
            base[`item-${item.value}`] = true;
            if (item.value === this.selectedData) base.selected = true;
            if (this.items.length && index === this.items.length - 1) base.last = true;
            return base;
        },
        calculateScrollableWidth() {
            if (!this.$refs["items-container"]) return;
            this.scrollableWidth = this.$refs["items-container"].scrollLeftMax;
        },
        snapSelectedToCenter() {
            this.$refs["items-container"].childNodes[this.selectedIndex].scrollIntoView({
                behavior: "smooth",
                inline: "center"
            });
        },
        onResize(event) {
            this.calculateScrollableWidth();
        },
        onPreviousClick(event) {
            this.selectedData = this.items[this.selectedIndex - 1].value;
        },
        onItemsContainerWheel(event) {
            this.$refs["items-container"].scrollLeft += event.deltaY * -this.scrollSpeed;
        },
        onItemsContainerMouseDown(event) {
            this.isMouseDown = true;
        },
        onItemClick(event, item) {
            this.selectedData = item.value;
            this.$emit("item-click", event, item);
        },
        onNextClick(event) {
            this.selectedData = this.items[this.selectedIndex + 1].value;
        }
    }
};

export default ScrollableItems;
</script>
