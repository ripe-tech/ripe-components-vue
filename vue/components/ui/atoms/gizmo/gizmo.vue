<template>
    <div class="gizmo" />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const Gizmo = {
    name: "gizmo",
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
            default: 10
        },
        height: {
            type: Number,
            default: 10
        },
        round: {
            type: Boolean,
            default: false
        }
    }
};

export default Gizmo;
</script>
