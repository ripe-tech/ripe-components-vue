<template>
    <div class="box-resizable" v-bind:style="style">
        <div class="gizmos">
            <div class="handler x0y0" v-bind:style="handlerStyle" />
            <div class="handler x1y0" v-bind:style="handlerStyle" />
            <div class="handler x0y1" v-bind:style="handlerStyle" />
            <div class="handler x1y1" v-bind:style="handlerStyle" />
            <div class="handler center" v-bind:style="handlerStyle" />
            <div class="handler rotation" v-bind:style="handlerStyle" />
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

.box-resizable > .gizmos > .handler {
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    height: 10px;
    position: absolute;
    width: 10px;
    transform: translate(-5px, -5px);
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

.box-resizable > .gizmos > .handler.center {
    left: 50%;
    top: 50%;
    border-radius: 50%;
}

.box-resizable > .gizmos > .handler.rotation {
    top: 0px;
    left: 50%;
    border-radius: 50%;
}
</style>

<script>
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
    }
};

export default BoxResizable;
</script>
