<template>
    <div class="box-resizable">
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
    height: 100px;
    left: 50px;
    position: absolute;
    top: 50px;
    width: 200px;
}
</style>

<script>
export const BoxResizable = {
    name: "box-resizable",
    props: {
        x1: {
            type: Number,
            default: 0
        },
        y1: {
            type: Number,
            default: 1
        },
        x2: {
            type: Number,
            default: 2
        },
        y2: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: "#e96760"
        },
        colorControls: {
            type: String,
            default: "#ffffff"
        }
    }
};

export default BoxResizable;
</script>
