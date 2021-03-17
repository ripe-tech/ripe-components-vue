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
            v-on:click="event => onClick(event, item, index)"
            v-on:click:button="event => onButtonClick(event, item, index)"
            v-on:update:highlight="value => onUpdateHighlight(item, value)"
            v-on="$listeners"
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
    flex: 0 1;
    margin: 0px 20px 30px 0px;
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
         * The props for the image item
         * button.
         */
        buttonProps: {
            type: Object,
            default: null
        },
        /**
         * The action options to include in each
         * image item dropdown.
         */
        optionsItems: {
            type: Array,
            default: () => []
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
                height: this.itemHeight,
                width: this.itemWidth,
                buttonProps: this.buttonProps,
                optionsItems: this.optionsItems,
                ...(item.options || {})
            };
            return base;
        },
        onUpdateHighlight(item, value) {
            this.$emit("update:highlight", item, value);
        },
        onClick(event, item, index) {
            this.$emit("click", event, item, index);
        },
        onButtonClick(event, item, index) {
            this.$emit("click:button", event, item, index);
        }
    }
};

export default ImageList;
</script>
