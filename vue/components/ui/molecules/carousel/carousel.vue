<template>
    <div
        class="carousel"
        v-bind:class="classes"
        v-bind:style="style"
        ref="carousel"
        v-on:mousedown="onMouseDown"
        v-on:mouseup="onMouseUp"
        v-on:mouseleave="onMouseLeave"
        v-on:touchstart="onTouchStart"
        v-on:touchend="onTouchEnd"
        v-on:touchcancel="onTouchCancel"
        v-on:touchleave="onTouchLeave"
    >
        <icon
            class="arrow arrow-previous"
            v-bind:color="arrowsColor"
            v-bind:icon="'chevron-left'"
            v-bind:width="arrowsSize"
            v-bind:height="arrowsSize"
            v-show="arrowsVisibility"
            v-on:click="previous"
        />
        <transition-group class="slide-container" tag="div" name="fade">
            <div
                class="slide"
                v-for="(item, index) in items"
                v-show="index === valueData"
                v-bind:key="`${item}-${index}`"
            >
                <div class="slide-content">
                    <slot v-bind:item="item" v-bind:index="index" v-bind:name="`slide-${index}`">
                        <image-ripe
                            class="slide-item"
                            v-bind:src="item.src"
                            v-bind:style="imageStyle(index)"
                        />
                    </slot>
                </div>
            </div>
        </transition-group>
        <icon
            class="arrow arrow-next"
            v-bind:color="arrowsColor"
            v-bind:icon="'chevron-right'"
            v-bind:width="arrowsSize"
            v-bind:height="arrowsSize"
            v-show="arrowsVisibility"
            v-on:click="next"
        />
    </div>
</template>

<style lang="scss" scoped>
.carousel {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: relative;
    user-select: none;
    width: 100%;
}

.carousel .arrow {
    cursor: pointer;
    position: absolute;
    transition: scale ease-in-out 0.1s, transform ease-in-out 0.1s;
    z-index: 1;
}

.carousel .arrow:hover {
    scale: 1.3;
}

.carousel .arrow:active {
    scale: 1.4;
}

.carousel .arrow-previous {
    left: 0px;
}

.carousel .arrow-next {
    right: 0px;
}

.carousel .arrow-previous:active {
    transform: translate(-5px);
}

.carousel .arrow-next:active {
    transform: translate(5px);
}

.carousel .slide-container {
    height: 100%;
    position: relative;
    text-align: left;
    white-space: nowrap;
    width: 100%;
}

.carousel .slide-container .slide {
    cursor: grab;
    display: inline-block;
    height: 100%;
    position: absolute;
    text-align: center;
    vertical-align: top;
    width: 100%;
}

.carousel.grabbing .slide-container .slide {
    cursor: grabbing;
}

.carousel .slide-container .slide .slide-content {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.carousel .slide-container .slide .slide-content .image {
    height: 100%;
    pointer-events: none;
    width: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>

<script>
export const Carousel = {
    name: "carousel",
    props: {
        /**
         * Set of items to be displayed in the carousel slider.
         */
        items: {
            type: Array,
            default: () => []
        },
        /**
         * The index of the image to be displayed first.
         */
        value: {
            type: Number,
            default: 0
        },
        /**
         * The width of the carousel in pixels.
         */
        width: {
            type: Number,
            default: 320
        },
        /**
         * The height of the carousel in pixels.
         */
        height: {
            type: Number,
            default: 400
        },
        /**
         * Weather or not the arrows to navigate between slides should show.
         */
        arrows: {
            type: Boolean,
            default: true
        },
        /**
         * The size of the arrows to move between the slide items in pixels.
         */
        arrowsSize: {
            type: Number,
            default: 36
        },
        /**
         * The color of the arrows to move between the slide items.
         */
        arrowsColor: {
            type: String,
            default: "#808080"
        },
        /**
         * The fit style of the images.
         */
        imageFit: {
            type: String,
            default: "contain"
        },
        /**
         * The amount of pixels that need to be dragged to trigger a swipe.
         */
        swipeThreshold: {
            type: Number,
            default: 50
        }
    },
    data: function() {
        return {
            dragStartPosition: null,
            valueData: this.value
        };
    },
    computed: {
        style() {
            const base = {};
            if (this.width) base.width = this.width + "px";
            if (this.height) base.height = this.height + "px";
            return base;
        },
        classes() {
            const base = {};
            if (this.dragStartPosition) base.grabbing = true;
            return base;
        },
        imageStyle() {
            return index => {
                const base = {};
                if (this.imageFit) base["object-fit"] = this.imageFit;
                if (this.items[index]["object-fit"]) {
                    base["object-fit"] = this.items[index]["object-fit"];
                }
                return base;
            };
        },
        arrowsVisibility() {
            return this.items.length > 1 && this.arrows;
        }
    },
    watch: {
        valueData(value) {
            this.$emit("update:value", value);
        },
        value(value) {
            this.valueData = value;
        }
    },
    methods: {
        next() {
            this.valueData = (this.valueData + 1) % this.items.length;
        },
        previous() {
            this.valueData = this.valueData - 1 < 0 ? this.items.length - 1 : this.valueData - 1;
        },
        getCursorPosition(event) {
            const deviceEvent = event.type === "touchmove" ? event.touches[0] : event;
            return {
                x: deviceEvent.pageX - this.$refs.carousel.offsetLeft,
                y: deviceEvent.pageY - this.$refs.carousel.offsetTop
            };
        },
        getDragDistance(initialPosition, event) {
            const currentPos = this.getCursorPosition(event);
            return {
                dx: currentPos.x - initialPosition.x,
                dy: currentPos.y - initialPosition.y
            };
        },
        onStartDrag(event) {
            const cursorPosition = this.getCursorPosition(event);
            this.dragStartPosition = cursorPosition;
        },
        onStopDrag(event) {
            if (!this.dragStartPosition) return;
            const dragDistance = this.getDragDistance(this.dragStartPosition, event);
            if (dragDistance.dx < -1 * this.swipeThreshold) this.next();
            if (dragDistance.dx > this.swipeThreshold) this.previous();
            this.dragStartPosition = null;
        },
        onMouseDown(event) {
            this.onStartDrag(event);
        },
        onMouseUp(event) {
            this.onStopDrag(event);
        },
        onMouseLeave(event) {
            this.onStopDrag(event);
        },
        onTouchStart(event) {
            this.onStartDrag(event);
        },
        onTouchEnd(event) {
            this.onStopDrag(event);
        },
        onTouchCancel(event) {
            this.onStopDrag(event);
        },
        onTouchLeave(event) {
            this.onStopDrag(event);
        }
    }
};

export default Carousel;
</script>
