<template>
    <div class="image-item" v-on:click="onClick">
        <div class="item-button" v-on:click.stop>
            <button-icon
                v-bind:size="32"
                v-bind="optionsItems[0]"
                v-if="optionsItems.length === 1"
                v-on:click.stop="onButtonClick"
            />
            <button-icon
                class="button-options"
                v-bind:icon="'options'"
                v-bind:size="32"
                v-else-if="optionsItems.length > 1"
                ref="button-options-loading"
                v-on:click.stop="onOptionsButtonClick"
            />
            <dropdown
                class="options-dropdown"
                v-bind:items="optionsItems"
                v-bind:visible.sync="optionsVisible"
                v-bind:owners="$refs['button-options-loading']"
                v-on:item-clicked="onOptionsItemClick"
            >
                <slot
                    v-bind:name="slot"
                    v-for="slot in optionsSlots"
                    v-bind:slot="slot.replace('options-', '')"
                />
                <template
                    v-for="slot in optionsScopedSlots"
                    v-bind:slot="slot.replace('options-', '')"
                    slot-scope="scope"
                >
                    <slot v-bind:name="slot" v-bind="scope" />
                </template>
            </dropdown>
        </div>
        <div
            class="item-image"
            v-bind:style="imageStyle"
            v-bind:class="{ 'dropdown-open': optionsVisible }"
            ref="image"
            v-on:animationend="onAnimationEnd"
        >
            <image-ripe v-bind:style="imageStyle" v-bind:src="imageUrl" v-bind:alt="name" />
        </div>
        <div class="item-text" v-bind:style="nameStyle" v-if="name">
            <slot name="name">
                <div class="name">
                    {{ name }}
                </div>
            </slot>
            <slot name="description">
                <div class="description">
                    {{ description }}
                </div>
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.image-item {
    cursor: pointer;
    display: inline-block;
    position: relative;
}

.image-item > .item-button {
    display: none;
}

.image-item:hover > .item-button {
    display: inline-block;
    left: 165px;
    padding: 10px 10px 10px 10px;
    position: absolute;
}

.image-item .item-button > .options-dropdown ::v-deep .dropdown {
    font-size: 13px;
    left: auto;
    margin-left: -142px;
    margin-top: 6px;
    min-width: 180px;
    position: absolute;
    text-align: left;
}

.image-item > .item-image {
    align-items: center;
    background-color: #f9fafd;
    border: 1.5px solid #e4e8f0;
    border-radius: 10px;
    display: flex;
    height: 260px;
    justify-content: center;
    user-select: none;
    width: 214px;
}

.image-item > .item-image:hover > .image {
    opacity: 0.6;
}

.image-item > .item-image.dropdown-open:hover > .image {
    opacity: 1;
}

.image-item > .item-image > .image {
    height: 200px;
    width: 200px;
}

.image-item > .item-text {
    margin-top: 10px;
    width: 214px;
}

.image-item > .item-text > .name {
    color: #1d2631;
    font-size: 18px;
    font-weight: 600;
    text-transform: capitalize;
}

.image-item > .item-text > .description {
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
}
</style>

<script>
export const ImageItem = {
    name: "image-item",
    props: {
        /**
         * The image URL.
         */
        imageUrl: {
            type: String,
            required: true
        },
        /**
         * The name of the item.
         */
        name: {
            type: String,
            default: null
        },
        /**
         * The description of the item.
         */
        description: {
            type: String,
            default: null
        },
        /**
         * The height of the item.
         */
        height: {
            type: Number,
            default: null
        },
        /**
         * The width of the item.
         */
        width: {
            type: Number,
            default: null
        },
        /**
         * The object fit of the image. Sets how the content
         * should be resized to fit its container.
         */
        imageObjectFit: {
            type: String,
            default: "contain"
        },
        /**
         * The name text alignment.
         */
        textAlign: {
            type: String,
            default: null
        },
        /**
         * The action options to include in the dropdown. If
         * only one option is provided, there is no need for
         * a event, the dropdown won't appear and will only
         * show a button, where its click event is propagated.
         */
        optionsItems: {
            type: Array,
            default: () => []
        },
        /**
         * If the item displays the highlight animation.
         */
        highlight: {
            type: Boolean,
            default: false
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
        }
    },
    data: function() {
        return {
            highlightData: this.highlight,
            optionsVisible: false
        };
    },
    computed: {
        optionsSlots() {
            return Object.keys(this.$slots).filter(slot => slot.startsWith("options-"));
        },
        optionsScopedSlots() {
            return Object.keys(this.$scopedSlots).filter(slot => slot.startsWith("options-"));
        },
        imageStyle() {
            const base = {};
            if (this.height) base.height = `${this.height}px`;
            if (this.width) base.width = `${this.width}px`;
            if (this.imageObjectFit) base.objectFit = this.imageObjectFit;
            return base;
        },
        nameStyle() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;
            if (this.textAlign) base["text-align"] = this.textAlign;
            return base;
        }
    },
    watch: {
        highlight(value) {
            this.highlightData = value;
        },
        highlightData(value) {
            this.$emit("update:highlight", value);
            if (!value) return;
            this.animate();
        }
    },
    mounted: function() {
        // triggers the highlight animation if needed
        // meaning that the highlight reaction is enabled
        if (this.highlightData) this.animate();
    },
    methods: {
        animate() {
            // animates the image background with the
            // highlight animation with the given
            // color and timing
            this.$refs.image.animate(
                {
                    backgroundColor: [this.highlightColor, "#f9fafd"]
                },
                this.animationDuration
            );
        },
        onAnimationEnd() {
            this.highlightData = false;
        },
        onClick(event) {
            this.$emit("click", event);
        },
        onButtonClick(event) {
            this.$emit("click:button", event);
        },
        onOptionsButtonClick() {
            this.optionsVisible = !this.optionsVisible;
        },
        onOptionsItemClick(item, index) {
            this.$emit(`click:option:${item.event}`, item, index);
        }
    }
};

export default ImageItem;
</script>
