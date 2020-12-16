<template>
    <div class="gizmo" v-bind:style="style">
        <div class="gizmo-inner" v-bind:style="innerStyle" />
        <icon v-bind:icon="icon" v-bind:style="iconStyle" v-if="icon" />
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

.gizmo > .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
        },
        icon: {
            type: String,
            default: null
        },
        iconSize: {
            type: Number,
            default: 10
        },
        iconBackgroundColor: {
            type: String,
            default: null
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
        },
        iconStyle() {
            return {
                width: `${this.iconSize}px`,
                height: `${this.iconSize}px`,
                "background-color": this.iconBackgroundColor
            };
        }
    }
};

export default Gizmo;
</script>
