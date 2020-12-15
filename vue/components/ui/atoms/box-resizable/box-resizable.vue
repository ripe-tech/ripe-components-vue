<template>
    <div class="box-resizable" v-bind:style="style">
        <div class="content">
            <slot />
        </div>
        <div class="gizmos">
            <div class="handler x0y0" v-bind:style="handlerStyle" />
            <div class="handler x1y0" v-bind:style="handlerStyle" />
            <div class="handler x0y1" v-bind:style="handlerStyle" />
            <div class="handler x1y1" v-bind:style="handlerStyle" />
            <div class="handler center" v-bind:style="handlerStyle" />
            <div
                class="handler rotation"
                v-bind:style="handlerStyle"
                v-on:mousedown="onHandlerRotationMouseDown"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
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

.box-resizable > .gizmos > .handler.x0y0 {
    left: 0px;
    top: 0px;
}

.box-resizable > .gizmos > .handler.x1y0 {
    left: 100%;
    top: 0px;
}

.box-resizable > .gizmos > .handler.x0y1 {
    left: 0px;
    top: 100%;
}

.box-resizable > .gizmos > .handler.x1y1 {
    left: 100%;
    top: 100%;
}

.box-resizable > .gizmos > .handler.x0y0:hover,
.box-resizable > .gizmos > .handler.x1y1:hover {
    cursor: nwse-resize;
}

.box-resizable > .gizmos > .handler.x1y0:hover,
.box-resizable > .gizmos > .handler.x0y1:hover {
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
</style>

<script>
// TODO GIZMO_STATES enum
export const BoxResizable = {
    name: "box-resizable",
    props: {
        x0: {
            type: Number,
            default: 0
        },
        y0: {
            type: Number,
            default: 0
        },
        x1: {
            type: Number,
            default: 200
        },
        y1: {
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
            x0Data: this.x0,
            y0Data: this.y0,
            x1Data: this.x1,
            y1Data: this.y1,
            rotationData: this.rotation
        };
    },
    computed: {
        style() {
            return {
                width: `${this.x1Data - this.x0Data}px`,
                height: `${this.y1Data - this.y0Data}px`,
                left: `${this.x0Data}px`,
                top: `${this.y0Data}px`,
                transform: `rotate(${this.rotationData}deg)`,
                "border-color": this.color
            };
        },
        handlerStyle() {
            return {
                "border-color": this.color,
                "background-color": this.colorControls
            };
        },
        centerPos() {
            return {
                x: (this.x1Data - this.x0Data) / 2 + this.x0Data,
                y: (this.y1Data - this.y0Data) / 2 + this.y0Data
            };
        }
    },
    watch: {
        x0(value) {
            this.x0Data = value;
        },
        y0(value) {
            this.y0Data = value;
        },
        x1(value) {
            this.x1Data = value;
        },
        y1(value) {
            this.y1Data = value;
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
        onHandlerRotationMouseDown(event) {
            this.rotating = true;
        },
        onMouseUp(event) {
            this.rotating = false;
        },
        onMouseMove(event) {
            if (!this.rotating) return;
            this.rotate(event.pageX, event.pageY);
        },
        rotate(mouseX, mouseY) {
            const dX = mouseX - this.centerPos.x;
            const dY = mouseY - this.centerPos.y;
            const angle = (Math.atan2(dY, dX) * 180) / Math.PI + 90;
            this.rotationData = angle < 0 ? angle + 360 : angle;
        }
    }
};

export default BoxResizable;
</script>
