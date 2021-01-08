<template>
    <div
        class="carousel"
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
            v-bind:width="36"
            v-bind:height="36"
            v-show="arrowsVisibility"
            v-on:click="previous"
        />
        <transition-group class="slide-container" tag="div" name="fade">
            <div
                class="slide"
                v-for="(image, index) in images"
                v-show="index === imageIndexData"
                v-bind:key="`${image}-${index}`"
            >
                <div class="slide-content">
                    <image-ripe class="slide-image" v-bind:src="image" v-on:load="onLoadImage" />
                </div>
            </div>
        </transition-group>
        <icon
            class="arrow arrow-next"
            v-bind:color="arrowsColor"
            v-bind:icon="'chevron-right'"
            v-bind:width="36"
            v-bind:height="36"
            v-show="arrowsVisibility"
            v-on:click="next"
        />
    </div>
</template>

<style lang="scss" scoped>
.carousel {
    height: 100%;
    overflow: hidden;
    position: relative;
    user-select: none;
    width: 100%;
}

.carousel .arrow {
    cursor: pointer;
    position: absolute;
    top: calc(50% - 18px);
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
    cursor: pointer;
    display: inline-block;
    height: 100%;
    position: absolute;
    text-align: center;
    vertical-align: top;
    width: 100%;
}

.carousel .slide-container .slide .slide-content {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    padding: 0px 5px 0px 5px;
    width: 100%;
}

.carousel .slide-container .slide .slide-content .image {
    height: 100%;
    object-fit: contain;
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
         * Set of images to be displayed in the carousel slider.
         */
        images: {
            type: Array,
            default: () => []
        },
        /**
         * The index of the image to be displayed first.
         */
        imageIndex: {
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
         * The color of the arrow to move between the slide images.
         */
        arrowsColor: {
            type: String,
            default: "#808080"
        }
    },
    data: function() {
        return {
            dragStartPosition: null,
            loadedImages: 0,
            imageIndexData: this.imageIndex
        };
    },
    computed: {
        style() {
            const base = {};
            if (this.width) base.width = this.width + "px";
            if (this.height) base.height = this.height + "px";
            return base;
        },
        arrowsVisibility() {
            return this.images.length > 1 && this.arrows;
        }
    },
    watch: {
        imageIndexData(value) {
            this.$emit("update:image-index", value);
        },
        imageIndex(value) {
            this.imageIndexData = value;
        },
        loadedImages(value) {
            const loadingPercentage = value / this.images.length;
            this.$emit("update:load", loadingPercentage);
        }
    },
    methods: {
        next() {
            const nextIndex =
                this.imageIndexData + 1 > this.images.length - 1 ? 0 : this.imageIndexData + 1;
            this.imageIndexData = nextIndex;
        },
        previous() {
            const previousIndex =
                this.imageIndexData - 1 < 0 ? this.images.length - 1 : this.imageIndexData - 1;
            this.imageIndexData = previousIndex;
        },
        swipeHorizontal(distance) {
            if (distance < -50) this.next();
            if (distance > 50) this.previous();
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
        setInitialDragPosition(event) {
            const cursorPosition = this.getCursorPosition(event);
            this.dragStartPosition = cursorPosition;
        },
        stopDrag(position) {
            this.dragStartPosition = null;
        },
        onLoadImage() {
            this.loadedImages += 1;
        },
        onStartDrag(event) {
            this.setInitialDragPosition(event);
        },
        onStopDrag(event) {
            if (!this.dragStartPosition) return;
            const dragDistance = this.getDragDistance(this.dragStartPosition, event);
            this.swipeHorizontal(dragDistance.dx);
            this.stopDrag();
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
