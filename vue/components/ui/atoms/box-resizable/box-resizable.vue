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
    background-color: #20b2aa;
    border: 2px solid #ff0000;
    box-sizing: border-box;
    position: absolute;
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
        color: {
            type: String,
            default: "#e96760"
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
            y1Data: this.y1
        };
    },
    computed: {
        size() {
            return {
                width: `${this.x1Data - this.x0Data}px`,
                height: `${this.y1Data - this.y0Data}px`
            };
        },
        position() {
            return {
                left: `${this.x0Data}px`,
                top: `${this.y0Data}px`
            };
        },
        style() {
            return {
                ...this.size,
                ...this.position
            };
        }
    }
};

export default BoxResizable;
</script>
