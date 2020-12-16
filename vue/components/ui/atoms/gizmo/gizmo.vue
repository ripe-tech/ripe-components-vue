<template>
    <div class="gizmo" v-bind:style="style" v-on:mousedown="onMouseDown">
        <div class="gizmo-inner" v-bind:style="innerStyle" />
        <icon v-bind:icon="icon" v-bind:style="iconStyle" v-bind="iconProps" v-if="icon" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.gizmo {
    box-sizing: border-box;
    position: absolute;
}

.gizmo > .gizmo-inner {
    box-sizing: border-box;
}

.gizmo:hover > .gizmo-inner,
.gizmo.hover > .gizmo-inner {
    box-shadow: 0px 0px 1px 1px #0ff;
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
        backgroundColor: {
            type: String,
            default: null
        },
        borderStyle: {
            type: String,
            default: null
        },
        borderWidth: {
            type: Number,
            default: null
        },
        borderColor: {
            type: String,
            default: null
        },
        borderColorHover: {
            type: String,
            default: null
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
        },
        iconProps: {
            type: Object,
            default: () => ({})
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

            const x = -this.width / 2 - this.interactableMargin;
            const y = -this.height / 2 - this.interactableMargin;
            base.transform = `translate(${x}px, ${y}px)`;
            return base;
        },
        innerStyle() {
            const base = {};
            base.width = `${this.width}px`;
            base.height = `${this.height}px`;
            if (this.round) base["border-radius"] = "50%";
            if(this.backgroundColor) base["background-color"] = this.backgroundColor;
            if(this.borderStyle) base["border-style"] = this.borderStyle;
            if(this.borderWidth) base["border-width"] = `${this.borderWidth}px`;
            if(this.borderColor) base["border-color"] = this.borderColor;
            return base;
        },
        iconStyle() {
            const base = {};
            base.width = `${this.iconSize}px`;
            base.height = `${this.iconSize}px`;
            if (this.round) base["border-radius"] = "50%";
            if (this.iconBackgroundColor) base["background-color"] = this.iconBackgroundColor;
            return base;
        }
    },
    methods: {
        onMouseDown(event) {
            this.$emit("mousedown", event);
        }
    }
};

export default Gizmo;
</script>
