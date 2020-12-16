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
                v-bind:interactable-margin="5"
            />
            <gizmo
                class="line-right"
                v-bind:x="width"
                v-bind:y="height / 2"
                v-bind:width="0"
                v-bind:height="height"
                v-bind:interactable-margin="5"
            />
            <gizmo
                class="line-bottom"
                v-bind:x="width / 2"
                v-bind:y="height"
                v-bind:width="width"
                v-bind:height="0"
                v-bind:interactable-margin="5"
            />
            <gizmo
                class="line-left"
                v-bind:x="0"
                v-bind:y="height / 2"
                v-bind:width="0"
                v-bind:height="height"
                v-bind:interactable-margin="5"
            />
            <gizmo class="x0y0" v-bind:x="0" v-bind:y="0" v-bind:interactable-margin="5" />
            <gizmo class="x1y0" v-bind:x="width" v-bind:y="0" v-bind:interactable-margin="5" />
            <gizmo class="x0y1" v-bind:x="0" v-bind:y="height" v-bind:interactable-margin="5" />
            <gizmo class="x1y1" v-bind:x="width" v-bind:y="height" v-bind:interactable-margin="5" />
            <gizmo
                class="center"
                v-bind:x="width / 2"
                v-bind:y="height / 2"
                v-bind:interactable-margin="5"
                v-bind:round="true"
            />
            <gizmo
                class="rotation"
                v-bind:x="width / 2"
                v-bind:y="0"
                v-bind:interactable-margin="5"
                v-bind:round="true"
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

/*
.box-resizable {
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    position: absolute;
    transform-origin: center center;
}

.box-resizable > .content {
    height: 100%;
    width: 100%;
}

.box-resizable > .gizmos > .handler {
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    height: 10px;
    position: absolute;
    transform: translate(-5px, -5px);
    width: 10px;
}

.box-resizable > .gizmos > .gizmo.x0y0:hover,
.box-resizable > .gizmos > .gizmo.x1y1:hover {
    cursor: nwse-resize;
}

.box-resizable > .gizmos > .gizmo.x1y0:hover,
.box-resizable > .gizmos > .gizmo.x0y1:hover {
    cursor: nesw-resize;
}

.box-resizable > .gizmos > .handler.center {
    border-radius: 50%;
    left: 50%;
    top: 50%;
}

.box-resizable > .gizmos > .handler.center:hover {
    cursor: move;
}

.box-resizable > .gizmos > .handler.rotation {
    border-radius: 50%;
    left: 50%;
    top: 0px;
}

.box-resizable > .gizmos > .handler.rotation:hover {
    cursor: url("~./assets/rotate.svg") 12 12, auto;
}
*/
</style>

<script>
// TODO GIZMO_STATES enum
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
        }
        // rotation: {
        //     type: Number,
        //     default: 0
        // },
        // color: {
        //     type: String,
        //     default: "#ff0000"
        // },
        // colorControls: {
        //     type: String,
        //     default: "#ffffff"
        // }
    },
    data: function() {
        return {
            xData: this.x,
            yData: this.y,
            widthData: this.width,
            heightData: this.height
            // rotationData: this.rotation
        };
    },
    computed: {
        style() {
            return {
                left: `${this.xData}px`,
                top: `${this.yData}px`,
                width: `${this.widthData}px`,
                height: `${this.heightData}px`
                // transform: `rotate(${this.rotationData}deg)`,
                // "border-color": this.color
            };
        }
        // handlerStyle() {
        //     return {
        //         "border-color": this.color,
        //         "background-color": this.colorControls
        //     };
        // },
        // centerPos() {
        //     return {
        //         x: (this.x1Data - this.x0Data) / 2 + this.x0Data,
        //         y: (this.y1Data - this.y0Data) / 2 + this.y0Data
        //     };
        // }
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
        }
        // rotation(value) {
        //     this.rotationData = value;
        // }
    }
    // mounted: function() {
    //     window.addEventListener("mouseup", this.onMouseUp);
    //     window.addEventListener("mousemove", this.onMouseMove);
    // },
    // destroyed: function() {
    //     window.removeEventListener("mousemove", this.onMouseMove);
    //     window.removeEventListener("mouseup", this.onMouseUp);
    // },
    // methods: {
    //     onHandlerRotationMouseDown(event) {
    //         this.rotating = true;
    //     },
    //     onMouseUp(event) {
    //         this.rotating = false;
    //     },
    //     onMouseMove(event) {
    //         if (!this.rotating) return;
    //         this.rotate(event.pageX, event.pageY);
    //     },
    //     rotate(mouseX, mouseY) {
    //         const dX = mouseX - this.centerPos.x;
    //         const dY = mouseY - this.centerPos.y;
    //         const angle = (Math.atan2(dY, dX) * 180) / Math.PI + 90;
    //         this.rotationData = angle < 0 ? angle + 360 : angle;
    //     }
    // }
};

export default BoxResizable;
</script>
