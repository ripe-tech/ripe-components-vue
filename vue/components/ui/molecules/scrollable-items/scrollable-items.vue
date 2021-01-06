<template>
    <div class="scrollable-items">
        <button-icon
            class="button-icon-previous"
            v-bind:icon="'chevron-left'"
            v-bind:disabled="isButtonPreviousDisabled"
            v-bind="_buttonIconProps"
            v-if="arrows"
            v-on:click="onButtonIconPreviousClick"
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
                v-on:mouseup="onItemMouseUp($event, item)"
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
            v-bind:disabled="isButtonNextDisabled"
            v-bind="_buttonIconProps"
            v-if="arrows"
            v-on:click="onButtonIconNextClick"
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
    overflow: hidden;
    white-space: nowrap;
}

.scrollable-items > .items-container > .item {
    font-size: 16px;
    font-weight: 700;
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
        },
        alignment: {
            type: String,
            default: "center"
        },
        scrollSpeed: {
            type: Number,
            default: 10
        },
        buttonIconProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            selectedData: this.selected,
            isMouseDown: false,
            isDraggingItems: false
        };
    },
    computed: {
        _buttonIconProps() {
            return {
                borderRadius: 0,
                iconStrokeWidth: 3,
                ...this.buttonIconProps
            };
        },
        itemsContainerStyle() {
            return {
                "text-align": this.alignment
            };
        },
        selectedIndex() {
            return this.items.findIndex(item => item.value === this.selectedData);
        },
        isButtonPreviousDisabled() {
            return this.selectedIndex <= 0;
        },
        isButtonNextDisabled() {
            return this.selectedIndex >= this.items.length - 1;
        }
    },
    watch: {
        selected(value) {
            this.selectedData = value;
        },
        selectedData(value) {
            this.snapSelectedToCenter();
            this.$emit("update:selected", value);
        }
    },
    created: function() {
        window.addEventListener("mouseup", this.onItemsContainerMouseUp);
        window.addEventListener("mousemove", this.onItemsContainerMouseMove);
    },
    destroyed: function() {
        window.removeEventListener("mouseup", this.onItemsContainerMouseUp);
        window.removeEventListener("mousemove", this.onItemsContainerMouseMove);
    },
    methods: {
        itemClasses(item, index) {
            const base = {};
            base[`button-${item.value}`] = true;
            if (item.value === this.selectedData) base.selected = true;
            if (this.items.length && index === this.items.length - 1) base.last = true;
            return base;
        },
        snapSelectedToCenter() {
            this.$refs["items-container"].childNodes[this.selectedIndex].scrollIntoView({
                behavior: "smooth",
                inline: "center"
            });
        },
        onButtonIconPreviousClick(event) {
            this.selectedData = this.items[this.selectedIndex - 1].value;
        },
        onItemsContainerWheel(event) {
            this.$refs["items-container"].scrollLeft += event.deltaY * -this.scrollSpeed;
        },
        onItemsContainerMouseDown(event) {
            this.isMouseDown = true;
        },
        onItemsContainerMouseUp(event) {
            this.isDraggingItems = this.isMouseDown = false;
        },
        onItemsContainerMouseMove(event) {
            if (!this.isMouseDown) return;
            this.isDraggingItems = true;

            this.$refs["items-container"].scrollLeft -= event.movementX;
        },
        onItemMouseUp(event, item) {
            if (this.isDraggingItems) return;

            this.selectedData = item.value;
            this.$emit("button-click", event, item);
        },
        onButtonIconNextClick(event) {
            this.selectedData = this.items[this.selectedIndex + 1].value;
        }
    }
};

export default ScrollableItems;
</script>
