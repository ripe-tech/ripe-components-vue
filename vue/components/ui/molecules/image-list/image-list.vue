<template>
    <div class="image-list">
        <image-item
            v-bind:style="itemStyle(index)"
            v-bind:image-url="item.imageUrl"
            v-bind:name="item.name"
            v-bind:description="item.description"
            v-bind:highlight="highlightIndex === index"
            v-bind:highlight-color="highlightColor"
            v-bind:image-object-fit="item.objectFit"
            v-bind:animation-duration="animationDuration"
            v-bind="itemOptions(item)"
            v-for="(item, index) in items"
            v-bind:key="item.id || index"
            v-on:click="event => onClick(event, item, index)"
            v-on:click:button="event => onButtonClick(event, item, index)"
            v-on:update:highlight="value => onUpdateHighlight(item, index, value)"
            v-on="listeners"
        >
            <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
            <template
                v-for="slot in Object.keys($scopedSlots)"
                v-bind:slot="slot"
                slot-scope="scope"
            >
                <slot v-bind:name="slot" v-bind="scope" v-bind:item="item" />
            </template>
        </image-item>
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
         * Each item's text alignment.
         */
        textAlign: {
            type: String,
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
         * The background color of the highlight animation.
         */
        highlightColor: {
            type: String,
            default: "#aeffe2"
        },
        /**
         * The duration of the highlight animation.
         */
        animationDuration: {
            type: Number,
            default: 2000
        },
        /**
         * The values for the opacity CSS value to be used in
         * images that are currently not selected.
         */
        opacityUnselected: {
            type: Number,
            default: 1
        }
    },
    data: function() {
        return {
            selectedIndex: 0
        };
    },
    computed: {
        listeners() {
            const listeners = { ...this.$listeners };
            delete listeners.click;
            delete listeners["click:button"];
            delete listeners["update:highlight"];
            return listeners;
        }
    },
    methods: {
        itemOptions(item) {
            const base = {
                height: this.itemHeight,
                width: this.itemWidth,
                textAlign: this.textAlign,
                optionsItems: this.optionsItems,
                ...(item.options || {})
            };
            return base;
        },
        itemStyle(index) {
            const base = {
                opacity: index === this.selectedIndex ? "1" : this.opacityUnselected
            };
            return base;
        },
        onUpdateHighlight(item, index, value) {
            this.$emit("update:highlight", item, index, value);
        },
        onClick(event, item, index) {
            this.selectedIndex = index;
            this.$emit("click", event, item, index);
        },
        onButtonClick(event, item, index) {
            this.selectedIndex = index;
            this.$emit("click:button", event, item, index);
        }
    }
};

export default ImageList;
</script>
