<template>
    <div class="test" v-bind:style="style">
        <div class="circle" v-bind:style="circleStyle" />
    </div>
</template>

<style lang="scss" scoped>
.test {
    background-color: #00ff00;
    position: absolute;
}

.test > .circle {
    border: solid 1px #ff0000;
    border-radius: 50%;
    position: absolute;
}
</style>

<script>
export const Test = {
    name: "test",
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
            rotationData: this.rotation
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
        circleStyle() {
            const r = Math.sqrt(Math.pow(this.widthData / 2, 2) + Math.pow(this.heightData / 2, 2));
            return {
                top: `-${r - this.heightData / 2}px`,
                left: `-${r - this.widthData / 2}px`,
                width: `${r * 2}px`,
                height: `${r * 2}px`
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
    }
};

export default Test;
</script>
