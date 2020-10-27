<template>
    <div class="box-resizable">
        Hello from box-resizable
    </div>
</template>

<style lang="scss" scoped></style>

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
