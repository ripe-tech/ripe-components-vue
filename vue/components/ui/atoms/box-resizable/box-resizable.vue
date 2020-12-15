<template>
    <div class="box-resizable" v-bind:style="style">
        <div class="gizmos">
            <div class="handler x0" />
            <div class="handler x1" />
            <div class="handler y0" />
            <div class="handler y1" />
            <div class="handler center" />
            <div class="handler rotation" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box-resizable {
    border-width: 2px;
    border-style: solid;
    box-sizing: border-box;
    position: absolute;
    transform-origin: center center;
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
