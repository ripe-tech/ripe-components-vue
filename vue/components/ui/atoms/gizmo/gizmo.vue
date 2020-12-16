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
    left: 50%;
    position: absolute;
    top: 50%;
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
            const base = {};
            base.left = `${this.x}px`;
            base.top = `${this.y}px`;
            if (this.interactableMargin) {
                base.padding = `${this.interactableMargin}px ${this.interactableMargin}px ${this.interactableMargin}px ${this.interactableMargin}px `;
            }
            return base;
        },
        innerStyle() {
            const base = {};
            base.width = `${this.width}px`;
            base.height = `${this.height}px`;
            return base;
        },
        iconStyle() {
            const base = {};
            base.width = `${this.iconSize}px`;
            base.height = `${this.iconSize}px`;
            if (this.iconBackgroundColor) base["background-color"] = this.iconBackgroundColor;
            return base;
        }
    }
};

export default Gizmo;
</script>
