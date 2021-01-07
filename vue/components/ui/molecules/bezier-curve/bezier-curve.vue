<template>
    <svg
        class="bezier-curve"
        v-bind:class="classes"
        v-bind:viewBox="viewBox"
        ref="svg"
        v-on:mousemove="onMouseMove"
        v-on:touchmove="onTouchMove"
        v-on:mouseup="onMouseUp"
        v-on:touchend="onTouchEnd"
        v-on:touchcancel="onTouchCancel"
        v-on:touchleave="onTouchLeave"
    >
        <line
            class="slope"
            v-bind:x1="bezier.x1"
            v-bind:y1="bezier.y1"
            v-bind:x2="bezier.cx1"
            v-bind:y2="bezier.cy1"
            v-show="showPoints"
            id="slope-1"
        />
        <line
            class="slope"
            v-bind:x1="bezier.x2"
            v-bind:y1="bezier.y2"
            v-bind:x2="bezier.cx2"
            v-bind:y2="bezier.cy2"
            v-show="showPoints"
            id="slope-2"
        />
        <path class="curve" v-bind:d="path" id="curve" />
        <circle
            class="point"
            v-bind:cx="bezier.x1"
            v-bind:cy="bezier.y1"
            v-show="showPoints"
            id="endpoint-1"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point"
            v-bind:cx="bezier.x2"
            v-bind:cy="bezier.y2"
            v-show="showPoints"
            id="endpoint-2"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point"
            v-bind:cx="bezier.cx1"
            v-bind:cy="bezier.cy1"
            v-show="showPoints"
            id="controlpoint-1"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point"
            v-bind:cx="bezier.cx2"
            v-bind:cy="bezier.cy2"
            v-show="showPoints"
            id="controlpoint-2"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
    </svg>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.bezier-curve.disabled {
    pointer-events: none;
}

.bezier-curve .curve {
    fill: none;
    stroke: #000000;
    stroke-width: 5px;
}

.bezier-curve .slope {
    stroke: #008080;
    stroke-width: 1;
}

.bezier-curve .point {
    cursor: pointer;
    fill: #ffffff;
    filter: drop-shadow(2px 2px 1px #00000066);
    r: 0.3rem;
    stroke: #000000;
    stroke-width: 0.5px;
}

body.tablet .bezier-curve .point,
body.mobile .bezier-curve .point {
    filter: drop-shadow(5px 5px 4px #0000005e);
    r: 2rem;
    stroke-width: 1px;
}

.bezier-curve .point:hover {
    cursor: pointer;
    filter: drop-shadow(0px 0px 3px #007bff);
}

.bezier-curve .point:active {
    cursor: move;
}
</style>

<script>
export const BezierCurve = {
    name: "bezier-curve",
    props: {
        /**
         * Bezier curve endpoint 1 X coordinate.
         */
        x1: {
            type: Number,
            required: true
        },
        /**
         * Bezier curve endpoint 1 Y coordinate.
         */
        y1: {
            type: Number,
            required: true
        },
        /**
         * Bezier curve endpoint 2 X coordinate.
         */
        x2: {
            type: Number,
            required: true
        },
        /**
         * Bezier curve endpoint 2 Y coordinate.
         */
        y2: {
            type: Number,
            required: true
        },
        /**
         * Bezier curve control point 1 X coordinate.
         */
        cx1: {
            type: Number,
            required: true
        },
        /**
         * Bezier curve control point 1 Y coordinate.
         */
        cy1: {
            type: Number,
            required: true
        },
        /**
         * Bezier curve control point 2 X coordinate.
         */
        cx2: {
            type: Number,
            required: true
        },
        /**
         * Bezier curve control point 2 Y coordinate.
         */
        cy2: {
            type: Number,
            required: true
        },
        /**
         * The number of pixels of the svg viewport
         * in the format "`width`x`height`".
         */
        resolution: {
            type: String,
            default: "1024x1024"
        },
        /**
         * Visibilty of Bezier curve control points.
         */
        showPoints: {
            type: Boolean,
            default: true
        },
        /**
         * The interval at which the new coordinates
         * will be emited when dragging.
         */
        emitInterval: {
            type: Number,
            default: 250
        },
        /**
         * The decimal places to define the numerical precision
         * when emitting the position of control and end points.
         */
        roundPlaces: {
            type: Number,
            default: 2
        },
        /**
         * Weather or not the control points are disabled
         * and unable to control.
         */
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            bezier: {
                x1: this.x1,
                y1: this.y1,
                x2: this.x2,
                y2: this.y2,
                cx1: this.cx1,
                cx2: this.cx2,
                cy1: this.cy1,
                cy2: this.cy2
            },
            dragging: null,
            reactiveEmit: null
        };
    },
    watch: {
        x1(value) {
            this.$set(this.bezier, "x1", value);
        },
        y1(value) {
            this.$set(this.bezier, "y1", value);
        },
        x2(value) {
            this.$set(this.bezier, "x2", value);
        },
        y2(value) {
            this.$set(this.bezier, "y2", value);
        },
        cx1(value) {
            this.$set(this.bezier, "cx1", value);
        },
        cy1(value) {
            this.$set(this.bezier, "cy1", value);
        },
        cx2(value) {
            this.$set(this.bezier, "cx2", value);
        },
        cy2(value) {
            this.$set(this.bezier, "cy2", value);
        },
        dragging(value) {
            if (value && this.emitInterval !== null) this.startReactiveEmits();
        }
    },
    computed: {
        path() {
            return `M ${this.bezier.x1}, ${this.bezier.y1} C ${this.bezier.cx1}, ${this.bezier.cy1}, ${this.bezier.cx2}, ${this.bezier.cy2}, ${this.bezier.x2}, ${this.bezier.y2}`;
        },
        viewBox() {
            const [width, height] = this.resolution.split("x");
            return `0, 0, ${width}, ${height}`;
        },
        classes() {
            const base = {};
            if (this.disabled) base.disabled = this.disabled;
            return base;
        }
    },
    methods: {
        validCoordinates({ x, y }) {
            const [maxWidth, maxHeight] = this.resolution.split("x").map(n => parseFloat(n));
            if (x < 0 || y < 0 || x > maxWidth || y > maxHeight) return false;
            return true;
        },
        /**
         * @returns {Object} with coordinates label for a given point `target`.
         */
        getCoordinatesKey(target) {
            switch (target) {
                case "endpoint-1":
                    return { x: "x1", y: "y1" };
                case "endpoint-2":
                    return { x: "x2", y: "y2" };
                case "controlpoint-1":
                    return { x: "cx1", y: "cy1" };
                case "controlpoint-2":
                    return { x: "cx2", y: "cy2" };
                default:
                    return { x: "x", y: "y" };
            }
        },
        /**
         * Gets the user cursor position considering the SVG matrix axis.
         */
        getCursorInSvgPos(event) {
            const svgMatrix = this.$refs.svg.getScreenCTM();
            const deviceEvent = event.type === "touchmove" ? event.touches[0] : event;
            return {
                x: (deviceEvent.clientX - svgMatrix.e) / svgMatrix.a,
                y: (deviceEvent.clientY - svgMatrix.f) / svgMatrix.d
            };
        },
        setPosition(point, position) {
            const coordinatesKey = this.getCoordinatesKey(point);
            this.$set(this.bezier, coordinatesKey.x, position.x);
            this.$set(this.bezier, coordinatesKey.y, position.y);
        },
        /**
         * Starts emitting the current drag once every `emitInterval` milliseconds.
         */
        startReactiveEmits() {
            this.reactiveEmit = setInterval(this.emitCurrentDrag, this.emitInterval);
        },
        /**
         * Emits the coordinates of the point that's currently being dragged
         */
        emitCurrentDrag() {
            if (!this.dragging) return;
            const { x, y } = this.getCoordinatesKey(this.dragging);
            this.$emit(`update:${x}`, this._round(this.bezier[x]));
            this.$emit(`update:${y}`, this._round(this.bezier[y]));
        },
        onStartDrag(event) {
            this.dragging = event.target.id;
        },
        onDrag(event) {
            if (this.dragging) {
                event.preventDefault();
                const coordinates = this.getCursorInSvgPos(event);
                if (this.validCoordinates(coordinates)) {
                    this.setPosition(this.dragging, coordinates);
                }
            }
        },
        onStopDrag() {
            if (this.reactiveEmit) clearInterval(this.reactiveEmit);
            this.emitCurrentDrag();
            this.dragging = null;
        },
        onMouseDown(event) {
            this.onStartDrag(event);
        },
        onTouchStart(event) {
            this.onStartDrag(event);
        },
        onMouseMove(event) {
            this.onDrag(event);
        },
        onTouchMove(event) {
            this.onDrag(event);
        },
        onMouseUp() {
            this.onStopDrag();
        },
        onTouchEnd() {
            this.onStopDrag();
        },
        onTouchCancel() {
            this.onStopDrag();
        },
        onTouchLeave() {
            this.onStopDrag();
        },
        // rounds a `number` to given `places` decimal places
        // goes around some javascript rounding errors
        _round(number, places = this.roundPlaces) {
            return +(Math.round(number + "e+" + places) + "e-" + places);
        }
    }
};

export default BezierCurve;
</script>
