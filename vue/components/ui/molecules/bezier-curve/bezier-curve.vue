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
        v-on:mouseleave="onMouseLeave"
    >
        <line
            class="slope slope-1"
            v-bind:x1="x1Data"
            v-bind:y1="y1Data"
            v-bind:x2="cx1Data"
            v-bind:y2="cy1Data"
            v-show="showPoints"
        />
        <line
            class="slope slope-2"
            v-bind:x1="x2Data"
            v-bind:y1="y2Data"
            v-bind:x2="cx2Data"
            v-bind:y2="cy2Data"
            v-show="showPoints"
        />
        <path class="curve" v-bind:d="path" />
        <circle
            class="point end-point end-point-1"
            v-bind:cx="x1Data"
            v-bind:cy="y1Data"
            v-show="showPoints"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point end-point end-point-2"
            v-bind:cx="x2Data"
            v-bind:cy="y2Data"
            v-show="showPoints"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point control-point control-point-1"
            v-bind:cx="cx1Data"
            v-bind:cy="cy1Data"
            v-show="showPoints"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point control-point control-point-2"
            v-bind:cx="cx2Data"
            v-bind:cy="cy2Data"
            v-show="showPoints"
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
         * The number of pixels of the svg viewport in the x axis
         */
        width: {
            type: Number,
            default: 1024
        },
        /**
         * The number of pixels of the svg viewport in the x axis
         */
        height: {
            type: Number,
            default: 1024
        },
        /**
         * Visibilty of Bezier curve control points.
         */
        showPoints: {
            type: Boolean,
            default: true
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
            x1Data: this.x1,
            y1Data: this.y1,
            x2Data: this.x2,
            y2Data: this.y2,
            cx1Data: this.cx1,
            cx2Data: this.cx2,
            cy1Data: this.cy1,
            cy2Data: this.cy2,
            dragging: null
        };
    },
    watch: {
        x1(value) {
            this.x1Data = value;
        },
        y1(value) {
            this.y1Data = value;
        },
        x2(value) {
            this.x2Data = value;
        },
        y2(value) {
            this.y2Data = value;
        },
        cx1(value) {
            this.cx1Data = value;
        },
        cy1(value) {
            this.cy1Data = value;
        },
        cx2(value) {
            this.cx2Data = value;
        },
        cy2(value) {
            this.cy2Data = value;
        },
        x1Data(value) {
            this.emitPointValue("x1", value);
        },
        y1Data(value) {
            this.emitPointValue("y1", value);
        },
        x2Data(value) {
            this.emitPointValue("x2", value);
        },
        y2Data(value) {
            this.emitPointValue("y2", value);
        },
        cx1Data(value) {
            this.emitPointValue("cx1", value);
        },
        cy1Data(value) {
            this.emitPointValue("cy1", value);
        },
        cx2Data(value) {
            this.emitPointValue("cx2", value);
        },
        cy2Data(value) {
            this.emitPointValue("cy2", value);
        }
    },
    computed: {
        path() {
            return `M ${this.x1Data}, ${this.y1Data} C ${this.cx1Data}, ${this.cy1Data}, ${this.cx2Data}, ${this.cy2Data}, ${this.x2Data}, ${this.y2Data}`;
        },
        viewBox() {
            return `0, 0, ${this.width}, ${this.height}`;
        },
        classes() {
            const base = {};
            if (this.disabled) base.disabled = this.disabled;
            return base;
        }
    },
    methods: {
        validCoordinates({ x, y }) {
            if (x < 0 || y < 0 || x > this.width || y > this.height) return false;
            return true;
        },
        /**
         * @returns {Object} with coordinates label for a given point `target`.
         */
        getCoordinatesKey(target) {
            switch (target) {
                case "end-point-1":
                    return { x: "x1", y: "y1" };
                case "end-point-2":
                    return { x: "x2", y: "y2" };
                case "control-point-1":
                    return { x: "cx1", y: "cy1" };
                case "control-point-2":
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
            this[`${coordinatesKey.x}Data`] = position.x;
            this[`${coordinatesKey.y}Data`] = position.y;
        },
        /**
         * Emits the `value` of the `point` specified in the arguments
         */
        emitPointValue(point, value) {
            this.$emit(`update:${point}`, this._round(value));
        },
        onStartDrag(event) {
            const pointName = event.target.classList[event.target.classList.length - 1];
            this.dragging = pointName;
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
            this.dragging = null;
        },
        onMouseDown(event) {
            this.onStartDrag(event);
        },
        onMouseMove(event) {
            this.onDrag(event);
        },
        onMouseUp() {
            this.onStopDrag();
        },
        onMouseLeave() {
            this.onStopDrag();
        },
        onTouchStart(event) {
            this.onStartDrag(event);
        },
        onTouchMove(event) {
            this.onDrag(event);
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
