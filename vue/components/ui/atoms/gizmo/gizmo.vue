<template>
    <div class="gizmo">
        <div class="gizmo-inner" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.gizmo {
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;
    position: absolute;
    transform: translate(-15px, -15px);
}

.gizmo > .gizmo-inner {
    border-color: #ff0000;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    height: 10px;
    width: 10px;
}

.gizmo:hover > .gizmo-inner {
    border-color: #0000ff;
}
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
