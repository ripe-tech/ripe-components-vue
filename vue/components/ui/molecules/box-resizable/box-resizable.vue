<template>
    <div class="box-resizable" v-bind:style="style">
        <div class="content">
            <slot />
        </div>
        <div class="gizmos">
            <gizmo
                class="line-top"
                v-bind:x="widthData / 2"
                v-bind:y="0"
                v-bind:width="widthData"
                v-bind:height="0"
                v-bind="lineGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.LINE_TOP)"
            />
            <gizmo
                class="line-right"
                v-bind:x="widthData"
                v-bind:y="heightData / 2"
                v-bind:width="0"
                v-bind:height="heightData"
                v-bind="lineGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.LINE_RIGHT)"
            />
            <gizmo
                class="line-bottom"
                v-bind:x="widthData / 2"
                v-bind:y="heightData"
                v-bind:width="widthData"
                v-bind:height="0"
                v-bind="lineGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.LINE_BOTTOM)"
            />
            <gizmo
                class="line-left"
                v-bind:x="0"
                v-bind:y="heightData / 2"
                v-bind:width="0"
                v-bind:height="heightData"
                v-bind="lineGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.LINE_LEFT)"
            />
            <gizmo
                class="corner-top-left"
                v-bind:x="0"
                v-bind:y="0"
                v-bind="cornerGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.CORNER_TOP_LEFT)"
            />
            <gizmo
                class="corner-top-right"
                v-bind:x="widthData"
                v-bind:y="0"
                v-bind="cornerGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.CORNER_TOP_RIGHT)"
            />
            <gizmo
                class="corner-bottom-left"
                v-bind:x="0"
                v-bind:y="heightData"
                v-bind="cornerGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.CORNER_BOTTOM_LEFT)"
            />
            <gizmo
                class="corner-bottom-right"
                v-bind:x="widthData"
                v-bind:y="heightData"
                v-bind="cornerGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.CORNER_BOTTOM_RIGHT)"
            />
            <gizmo
                class="center"
                v-bind:x="widthData / 2"
                v-bind:y="heightData / 2"
                v-bind:round="true"
                v-bind="cornerGizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.CENTER)"
            />
            <gizmo
                class="rotation"
                v-bind:x="widthData / 2"
                v-bind:y="0"
                v-bind:width="20"
                v-bind:height="20"
                v-bind:icon="'rotate'"
                v-bind:icon-size="18"
                v-bind:round="true"
                v-bind:border-width="1"
                v-bind="gizmoProps"
                v-on:mousedown="startGizmoInteraction(GIZMO_INTERACTING_ENUM.ROTATION)"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box-resizable {
    background-color: #fdcdff;
    position: absolute;
}

.box-resizable > .gizmos {
    left: 0px;
    position: absolute;
    top: 0px;
}

.box-resizable > .gizmos > .gizmo.line-top:hover,
.box-resizable > .gizmos > .gizmo.line-bottom:hover {
    cursor: ns-resize;
}

.box-resizable > .gizmos > .gizmo.line-left:hover,
.box-resizable > .gizmos > .gizmo.line-right:hover {
    cursor: ew-resize;
}

.box-resizable > .gizmos > .gizmo.corner-top-left:hover,
.box-resizable > .gizmos > .gizmo.corner-bottom-right:hover {
    cursor: nwse-resize;
}

.box-resizable > .gizmos > .gizmo.corner-top-right:hover,
.box-resizable > .gizmos > .gizmo.corner-bottom-left:hover {
    cursor: nesw-resize;
}

.box-resizable > .gizmos > .gizmo.center:hover {
    cursor: move;
}

.box-resizable > .gizmos > .gizmo.rotation:hover {
    cursor: crosshair;
}
</style>

<script>
const GIZMO_INTERACTING_ENUM = {
    NONE: 1,
    LINE_TOP: 2,
    LINE_RIGHT: 3,
    LINE_BOTTOM: 4,
    LINE_LEFT: 5,
    CORNER_TOP_LEFT: 6,
    CORNER_TOP_RIGHT: 7,
    CORNER_BOTTOM_LEFT: 8,
    CORNER_BOTTOM_RIGHT: 9,
    CENTER: 10,
    ROTATION: 11
};

export const BoxResizable = {
    name: "box-resizable",
    props: {
        /**
         * Box's top left x coordinate.
         */
        x: {
            type: Number,
            default: 0
        },
        /**
         * Box's top left y coordinate.
         */
        y: {
            type: Number,
            default: 0
        },
        /**
         * Box's width in pixels.
         */
        width: {
            type: Number,
            default: 200
        },
        /**
         * Box's height in pixels.
         */
        height: {
            type: Number,
            default: 100
        },
        /**
         * Box's rotation angle in degrees.
         */
        rotation: {
            type: Number,
            default: 0
        },
        /**
         * Box's outline color.
         */
        color: {
            type: String,
            default: "#ff0000"
        },
        /**
         * Box's gizmos color.
         */
        colorControls: {
            type: String,
            default: "#ffffff"
        }
    },
    data: function() {
        return {
            xData: this.x,
            yData: this.y,
            widthData: this.width,
            heightData: this.height,
            rotationData: this.rotation,
            gizmoInteracting: GIZMO_INTERACTING_ENUM.NONE,
            GIZMO_INTERACTING_ENUM: GIZMO_INTERACTING_ENUM
        };
    },
    computed: {
        style() {
            return {
                left: `${this.xData}px`,
                top: `${this.yData}px`,
                width: `${this.widthData}px`,
                height: `${this.heightData}px`,
                transform: `rotate(${this.rotationData}deg)`
            };
        },
        gizmoProps() {
            return {
                interactableMargin: 5,
                backgroundColor: this.colorControls,
                borderStyle: "solid",
                borderColor: this.color
            };
        },
        cornerGizmoProps() {
            return {
                ...this.gizmoProps,
                borderWidth: 2
            };
        },
        lineGizmoProps() {
            return {
                ...this.gizmoProps,
                borderWidth: 1
            };
        },
        centerPos() {
            return {
                x: this.widthData / 2 + this.xData,
                y: this.heightData / 2 + this.yData
            };
        }
    },
    watch: {
        x(value) {
            this.xData = value;
        },
        xData(value) {
            this.$emit("update:x", value);
        },
        y(value) {
            this.yData = value;
        },
        yData(value) {
            this.$emit("update:y", value);
        },
        width(value) {
            this.widthData = value;
        },
        widthData(value) {
            this.$emit("update:width", value);
        },
        height(value) {
            this.heightData = value;
        },
        heightData(value) {
            this.$emit("update:height", value);
        },
        rotation(value) {
            this.rotationData = value;
        },
        rotationData(value) {
            this.$emit("update:rotation", value);
        }
    },
    mounted: function() {
        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("mousemove", this.onMouseMove);
    },
    destroyed: function() {
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("mouseup", this.onMouseUp);
    },
    methods: {
        degToRad(degrees) {
            return (degrees * Math.PI) / 180;
        },
        startGizmoInteraction(gizmo) {
            this.gizmoInteracting = gizmo;
        },
        stopGizmoInteraction() {
            this.gizmoInteracting = GIZMO_INTERACTING_ENUM.NONE;
        },
        move(x, y) {
            this.xData = x - this.widthData / 2;
            this.yData = y - this.heightData / 2;
        },
        rotate(mouseX, mouseY) {
            const dX = mouseX - this.centerPos.x;
            const dY = mouseY - this.centerPos.y;
            const angle = (Math.atan2(dY, dX) * 180) / Math.PI + 90;
            this.rotationData = angle < 0 ? angle + 360 : angle;
        },
        resizeTop(mouseY) {
            if (mouseY >= this.yData + this.heightData) return;

            const newHeight = this.yData - mouseY;
            this.yData = mouseY;
            this.heightData += newHeight;
        },
        resizeRight(mouseX) {
            const newWidth = mouseX - this.xData;
            const widthAdded = newWidth - this.widthData;

            this.widthData = newWidth <= 0 ? 0 : newWidth;
            if (this.widthData === 0) return;

            const angleRad = this.degToRad(this.rotationData);

            const dy = (widthAdded / 2) * Math.sin(angleRad);

            const adj = (widthAdded / 2) * Math.cos(angleRad);
            const dx = widthAdded / 2 - adj;

            this.xData -= dx;
            this.yData += dy;
        },
        resizeBottom(mouseY) {
            const newHeight = mouseY - this.yData;
            const heightAdded = newHeight - this.heightData;

            this.heightData = newHeight <= 0 ? 0 : newHeight;
            if (this.heightData === 0) return;

            const angleRad = this.degToRad(this.rotationData);

            const dx = (heightAdded / 2) * Math.sin(angleRad);

            const adj = (heightAdded / 2) * Math.cos(angleRad);
            const dy = heightAdded / 2 - adj;

            this.xData -= dx;
            this.yData -= dy;
        },
        resizeLeft(mouseX) {
            if (mouseX >= this.xData + this.widthData) return;

            const newWidth = this.xData - mouseX;
            this.xData = mouseX;
            this.widthData += newWidth;
        },
        onMouseUp(event) {
            this.stopGizmoInteraction();
        },
        onMouseMove(event) {
            switch (this.gizmoInteracting) {
                case GIZMO_INTERACTING_ENUM.LINE_TOP:
                    this.resizeTop(event.pageY);
                    break;
                case GIZMO_INTERACTING_ENUM.LINE_RIGHT:
                    this.resizeRight(event.pageX);
                    break;
                case GIZMO_INTERACTING_ENUM.LINE_BOTTOM:
                    this.resizeBottom(event.pageY);
                    break;
                case GIZMO_INTERACTING_ENUM.LINE_LEFT:
                    this.resizeLeft(event.pageX);
                    break;
                case GIZMO_INTERACTING_ENUM.CORNER_TOP_LEFT:
                    this.resizeTop(event.pageY);
                    this.resizeLeft(event.pageX);
                    break;
                case GIZMO_INTERACTING_ENUM.CORNER_TOP_RIGHT:
                    this.resizeTop(event.pageY);
                    this.resizeRight(event.pageX);
                    break;
                case GIZMO_INTERACTING_ENUM.CORNER_BOTTOM_LEFT:
                    this.resizeBottom(event.pageY);
                    this.resizeLeft(event.pageX);
                    break;
                case GIZMO_INTERACTING_ENUM.CORNER_BOTTOM_RIGHT:
                    this.resizeBottom(event.pageY);
                    this.resizeRight(event.pageX);
                    break;
                case GIZMO_INTERACTING_ENUM.CENTER:
                    this.move(event.pageX, event.pageY);
                    break;
                case GIZMO_INTERACTING_ENUM.ROTATION:
                    this.rotate(event.pageX, event.pageY);
                    break;
                default:
            }
        }
    }
};

export default BoxResizable;
</script>
