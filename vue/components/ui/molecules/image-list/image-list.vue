<template>
    <div class="image-list">
        <image-item
            v-bind:image-url="item.imageUrl"
            v-bind:name="item.name"
            v-bind:highlight="highlightIndex === index"
            v-bind:animation-duration="animationDuration"
            v-bind="options(item)"
            v-for="(item, index) in items"
            v-bind:key="index"
            v-on:click="() => onClick(item, index)"
            v-on:click:button="() => onButtonClick(item, index)"
            v-on:update:highlight="value => onUpdateHighlight(item, value)"
        />
    </div>
</template>

<style lang="scss" scoped>
.image-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
}

.image-list > .image-item {
    display: inline-block;
    flex: 0 1 19%;
    margin: 0px 10px 30px 0px;
}
</style>

<script>
export const ImageList = {
    name: "image-list",
    props: {
        /**
         * List of items to show that contains the item image URL,
         * its name and a options object that can override the item
         * global properties.
         * Example: [{ imageUrl: "https://1.jpg", name: "Name",
         * options: { buttonProps: { icon: "rocket" }, width: 200 } }].
         */
        items: {
            type: Array,
            default: () => []
        },
        /**
         * The height of each item.
         */
        itemHeight: {
            type: Number,
            default: null
        },
        /**
         * The width of each item.
         */
        itemWidth: {
            type: Number,
            default: null
        },
        /**
         * If the items enable the buttons to
         * allow certain operations.
         */
        showButtons: {
            type: Boolean,
            default: true
        },
        /**
         * If the items show their names.
         */
        showNames: {
            type: Boolean,
            default: true
        },
        /**
         * The index of the image that will
         * be highlighted.
         */
        highlightIndex: {
            type: Number,
            default: null
        },
        /**
         * The duration of the highlight animation.
         */
        animationDuration: {
            type: Number,
            default: 3000
        }
    },
    methods: {
        options(item) {
            const base = {
                showButton: this.showButtons,
                showName: this.showNames,
                height: this.itemHeight,
                width: this.itemWidth,
                ...(item.options || {})
            };
            return base;
        },
        onUpdateHighlight(item, value) {
            this.$emit("update:highlight", item, value);
        },
        onClick(item, index) {
            this.$emit("click", item, index);
        },
        onButtonClick(item, index) {
            this.$emit("click:button", item, index);
        }
    }
};

export default ImageList;
</script>
