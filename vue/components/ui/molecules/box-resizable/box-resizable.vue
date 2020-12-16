<template>
    <div class="box-resizable" v-bind:style="style">
        <div class="content">
            <slot />
        </div>
        <div class="gizmos">
            <gizmo
                class="line-top"
                v-bind:x="width / 2"
                v-bind:y="0"
                v-bind:width="width"
                v-bind:height="0"
                v-bind="lineGizmoProps"
            />
            <gizmo
                class="line-right"
                v-bind:x="width"
                v-bind:y="height / 2"
                v-bind:width="0"
                v-bind:height="height"
                v-bind="lineGizmoProps"
            />
            <gizmo
                class="line-bottom"
                v-bind:x="width / 2"
                v-bind:y="height"
                v-bind:width="width"
                v-bind:height="0"
                v-bind="lineGizmoProps"
            />
            <gizmo
                class="line-left"
                v-bind:x="0"
                v-bind:y="height / 2"
                v-bind:width="0"
                v-bind:height="height"
                v-bind="lineGizmoProps"
            />
            <gizmo class="corner-top-left" v-bind:x="0" v-bind:y="0" v-bind="cornerGizmoProps" />
            <gizmo
                class="corner-top-right"
                v-bind:x="width"
                v-bind:y="0"
                v-bind="cornerGizmoProps"
            />
            <gizmo
                class="corner-bottom-left"
                v-bind:x="0"
                v-bind:y="height"
                v-bind="cornerGizmoProps"
            />
            <gizmo
                class="corner-bottom-right"
                v-bind:x="width"
                v-bind:y="height"
                v-bind="cornerGizmoProps"
            />
            <gizmo
                class="center"
                v-bind:x="width / 2"
                v-bind:y="height / 2"
                v-bind:round="true"
                v-bind="cornerGizmoProps"
            />
            <gizmo
                class="rotation"
                v-bind:x="width / 2"
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
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 100
        },
        rotation: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: "#ff0000"
        },
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
                x: this.width / 2 + this.x,
                y: this.height / 2 + this.y
            };
        }
    },
    watch: {
        x(value) {
            this.xData = value;
        },
        y(value) {
            this.yData = value;
        },
        width(value) {
            this.widthData = value;
        },
        height(value) {
            this.heightData = value;
        },
        rotation(value) {
            this.rotationData = value;
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
        startGizmoInteraction(gizmo) {
            this.gizmoInteracting = gizmo;
        },
        stopGizmoInteraction() {
            this.gizmoInteracting = GIZMO_INTERACTING_ENUM.NONE;
        },
        rotate(mouseX, mouseY) {
            const dX = mouseX - this.centerPos.x;
            const dY = mouseY - this.centerPos.y;
            const angle = (Math.atan2(dY, dX) * 180) / Math.PI + 90;
            this.rotationData = angle < 0 ? angle + 360 : angle;
        },
        onMouseUp(event) {
            this.stopGizmoInteraction();
        },
        onMouseMove(event) {
            switch (this.gizmoInteracting) {
                case GIZMO_INTERACTING_ENUM.LINE_TOP:
                case GIZMO_INTERACTING_ENUM.LINE_RIGHT:
                case GIZMO_INTERACTING_ENUM.LINE_BOTTOM:
                case GIZMO_INTERACTING_ENUM.LINE_LEFT:
                case GIZMO_INTERACTING_ENUM.CORNER_TOP_LEFT:
                case GIZMO_INTERACTING_ENUM.CORNER_TOP_RIGHT:
                case GIZMO_INTERACTING_ENUM.CORNER_BOTTOM_LEFT:
                case GIZMO_INTERACTING_ENUM.CORNER_BOTTOM_RIGHT:
                case GIZMO_INTERACTING_ENUM.CENTER:
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
