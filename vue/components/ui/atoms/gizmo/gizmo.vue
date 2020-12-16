<template>
    <div class="gizmo" v-bind:style="style">
        <div class="gizmo-inner" v-bind:style="innerStyle">
            <icon v-bind:icon="'close'" v-bind:width="20" v-bind:height="20" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.gizmo {
    box-sizing: border-box;
    position: absolute;
    transform: translate(-15px, -15px);
}

.gizmo > .gizmo-inner {
    border-color: #ff0000;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
}

.gizmo:hover > .gizmo-inner {
    border-color: #0000ff;
}

.gizmo > .gizmo-inner > .icon {
    left: 0.5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ff00ff;
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
        interactableMargin: {
            type: Number,
            default: null
        },
        round: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        style() {
            return {
                left: `${this.x}px`,
                top: `${this.y}px`,
                padding: this.interactableMargin ? `${this.interactableMargin}px` : undefined
            };
        },
        innerStyle() {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`
            };
        }
    }
};

export default Gizmo;
</script>
