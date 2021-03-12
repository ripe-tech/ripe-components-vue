<template>
    <div class="image-item" v-bind:class="classes" v-on:click="onClick">
        <div class="item-button" v-if="showButton">
            <button-icon v-bind="buttonProps" v-bind:size="32" v-on:click.stop="onButtonClick" />
        </div>
        <div class="item-image" v-bind:style="style" v-on:animationend="onAnimationEnd">
            <image-ripe v-bind:style="imageStyle" v-bind:src="imageUrl" v-bind:alt="name" />
        </div>
        <div class="item-name" v-if="showName">
            {{ name }}
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

.image-item > .item-image {
    align-items: center;
    background-color: #f9fafd;
    border: 1.5px solid #e4e8f0;
    border-radius: 10px;
    display: flex;
    height: 260px;
    justify-content: center;
    width: 214px;
}

.image-item > .item-image:hover > .image {
    opacity: 0.6;
}

.image-item > .item-image > .image {
    height: 200px;
    width: 200px;
}

@keyframes highlight-image {

    0% {
        background-color: rgba(205, 255, 210, 0.3);
    }

    100% {
        background-color: #f9fafd;
    }
}

.image-item.highlight > .item-image {
    animation-name: highlight-image;
    animation-timing-function: linear;
}

.image-item > .item-name {
    color: #1d2631;
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
    text-transform: capitalize;
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
            required: true
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
         * The props for the item button.
         */
        buttonProps: {
            type: Object,
            default: () => ({
                icon: "bin"
            })
        },
        /**
         * If the button is enabled.
         */
        showButton: {
            type: Boolean,
            default: true
        },
        /**
         * If the name is shown.
         */
        showName: {
            type: Boolean,
            default: true
        },
        /**
         * If the item displays the
         * highlight animation.
         */
        highlight: {
            type: Boolean,
            default: false
        },
        /**
         * The duration of the highlight animation.
         */
        animationDuration: {
            type: Number,
            default: 3000
        }
    },
    data: function() {
        return {
            highlightData: this.highlight
        };
    },
    computed: {
        classes() {
            const base = {};
            base.highlight = this.highlightData;
            return base;
        },
        style() {
            const base = {};
            if (this.highlightData) base["animation-duration"] = `${this.animationDuration}ms`;
            if (this.height) base.height = `${this.height}px`;
            if (this.width) base.width = `${this.width}px`;
            return base;
        },
        imageStyle() {
            const base = {};
            if (this.height) base.height = `${this.height}px`;
            if (this.width) base.width = `${this.width}px`;
            return base;
        }
    },
    watch: {
        highlight(value) {
            this.highlightData = value;
        },
        highlightData(value) {
            this.$emit("update:highlight", value);
        }
    },
    methods: {
        onAnimationEnd() {
            this.highlightData = false;
        },
        onClick() {
            this.$emit("click");
        },
        onButtonClick() {
            this.$emit("click:button");
        }
    }
};

export default ImageItem;
</script>
