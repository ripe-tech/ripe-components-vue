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
        v-on:touchcancel="onTouchEnd"
        v-on:touchleave="onTouchLeave"
    >
        <line
            class="slope"
            v-bind:x1="bezier.x1"
            v-bind:y1="bezier.y1"
            v-bind:x2="bezier.cx1"
            v-bind:y2="bezier.cy1"
            stroke="teal"
            stroke-width="1"
            v-show="showPoints"
        />
        <line
            class="slope"
            v-bind:x1="bezier.x2"
            v-bind:y1="bezier.y2"
            v-bind:x2="bezier.cx2"
            v-bind:y2="bezier.cy2"
            stroke="teal"
            stroke-width="1"
            v-show="showPoints"
        />
        <path
            class="curve"
            v-bind:d="path"
            stroke="black"
            stroke-width="5"
            fill="none"
            id="curve"
        />
        <circle
            class="point"
            v-bind:cx="bezier.x1"
            v-bind:cy="bezier.y1"
            v-show="showPoints"
            id="ept1"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point"
            v-bind:cx="bezier.x2"
            v-bind:cy="bezier.y2"
            v-show="showPoints"
            id="ept2"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point"
            v-bind:cx="bezier.cx1"
            v-bind:cy="bezier.cy1"
            v-show="showPoints"
            id="pt1"
            v-on:touchstart="onTouchStart"
            v-on:mousedown="onMouseDown"
        />
        <circle
            class="point"
            v-bind:cx="bezier.cx2"
            v-bind:cy="bezier.cy2"
            v-show="showPoints"
            id="pt2"
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

.point {
    cursor: pointer;
    r: 0.3rem;
    filter: drop-shadow(2px 2px 1px #00000066);
    stroke: black;
    fill: white;
    stroke-width: 0.5px;
}

.point:hover {
    cursor: pointer;
    filter: drop-shadow(0px 0px 3px #007bff);
}

.point:active {
    cursor: move;
}

body.tablet .point,
body.mobile .point {
    stroke-width: 1px;
    r: 2rem;
    filter: drop-shadow(5px 5px 4px #0000005e)
}
</style>

<script>
export const BezierCurve = {
    name: "bezier-curve",
    props: {
        x1: {
            type: Number,
            required: true
        },
        y1: {
            type: Number,
            required: true
        },
        x2: {
            type: Number,
            required: true
        },
        y2: {
            type: Number,
            required: true
        },
        cx1: {
            type: Number,
            required: true
        },
        cy1: {
            type: Number,
            required: true
        },
        cx2: {
            type: Number,
            required: true
        },
        cy2: {
            type: Number,
            required: true
        },
        resolution: {
            type: String,
            default: "1024x1024"
        },
        showPoints: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            dragging: null,
            bezier: {
                x1: this.x1,
                y1: this.y1,
                x2: this.x2,
                y2: this.y2,
                cx1: this.cx1,
                cx2: this.cx2,
                cy1: this.cy1,
                cy2: this.cy2
            }
        };
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
        getCoordinatesKey(target) {
            switch (target) {
                case "pt1":
                    return { x: "cx1", y: "cy1" };
                case "pt2":
                    return { x: "cx2", y: "cy2" };
                case "ept1":
                    return { x: "x1", y: "y1" };
                case "ept2":
                    return { x: "x2", y: "y2" };
                default:
                    return { x: "x", y: "y" };
            }
        },
        getCursorPosition(event) {
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
        onStartDrag(event) {
            const point = event.target.id;
            this.dragging = point;
        },
        onDrag(event) {
            if (this.dragging) {
                event.preventDefault();
                const coordinates = this.getCursorPosition(event);
                if (this.validCoordinates(coordinates)) {
                    this.setPosition(this.dragging, coordinates);
                }
            }
        },
        onStopDrag() {
            const { x, y } = this.getCoordinatesKey(this.dragging);
            this.$emit(x, this.bezier[x]);
            this.$emit(y, this.bezier[y]);
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
        }
    }
};

export default BezierCurve;
</script>
