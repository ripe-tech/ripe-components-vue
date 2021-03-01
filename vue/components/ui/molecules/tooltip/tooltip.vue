<template>
    <abbr class="tooltip tooltip-native" v-bind:title="text" v-if="native && text">
        <slot />
    </abbr>
    <div class="tooltip tooltip-custom" v-bind:class="classes" v-else>
        <slot />
        <transition v-bind:name="animationData">
            <div class="tooltip-inner" v-bind:style="tooltipInnerStyle" v-show="visibleData">
                <slot name="tooltip-content">
                    <div class="tooltip-text" v-bind:style="tooltipTextStyle">
                        {{ text }}
                    </div>
                </slot>
                <div class="tip" />
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";

.tooltip {
    display: inline-block;
}

.tooltip-custom {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    position: relative;
}

.tooltip-custom > .tooltip-inner {
    background-color: $dark;
    box-shadow: 0px 0px 16px rgba(45, 58, 70, 0.25);
    box-sizing: border-box;
    color: $white;
    font-size: 14px;
    padding: 10px 10px 10px 10px;
    pointer-events: none;
    position: absolute;
    text-align: center;
    user-select: none;
    z-index: 1;
}

body.round .tooltip-custom > .tooltip-inner {
    border-radius: 4px 4px 4px 4px;
}

.tooltip-custom.tooltip-variant-dark > .tooltip-inner {
    background-color: $dark;
    color: $white;
}

.tooltip-custom.tooltip-variant-grey > .tooltip-inner {
    background-color: $grey;
    color: $white;
}

.tooltip-custom.tooltip-variant-white > .tooltip-inner {
    background-color: $white;
    color: $dark;
}

.tooltip-custom.tooltip-orientation-top > .tooltip-inner {
    bottom: calc(100% + 10px);
}

.tooltip-custom.tooltip-orientation-right > .tooltip-inner {
    left: calc(100% + 10px);
}

.tooltip-custom.tooltip-orientation-bottom > .tooltip-inner {
    top: calc(100% + 10px);
}

.tooltip.tooltip-orientation-left > .tooltip-inner {
    right: calc(100% + 10px);
}

.tooltip-custom > .tooltip-inner > .tip {
    height: 17px;
    position: absolute;
    transform: rotate(-135deg);
    width: 17px;
}

.tooltip-custom > .tooltip-inner > .tooltip-text {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tooltip-custom.tooltip-variant-dark > .tooltip-inner > .tip {
    background: linear-gradient(-45deg, $dark 50%, transparent 50%);
}

.tooltip-custom.tooltip-variant-grey > .tooltip-inner > .tip {
    background: linear-gradient(-45deg, $grey 50%, transparent 50%);
}

.tooltip-custom.tooltip-variant-white > .tooltip-inner > .tip {
    background: linear-gradient(-45deg, $white 50%, transparent 50%);
}

.tooltip-custom.tooltip-orientation-top > .tooltip-inner > .tip {
    left: calc(50% - 9px);
    top: calc(100% - 12px);
    transform: rotate(45deg);
}

.tooltip-custom.tooltip-orientation-right > .tooltip-inner > .tip {
    right: calc(100% - 12px);
    top: calc(50% - 9px);
    transform: rotate(135deg);
}

.tooltip-custom.tooltip-orientation-bottom > .tooltip-inner > .tip {
    bottom: calc(100% - 12px);
    left: calc(50% - 9px);
    transform: rotate(-135deg);
}

.tooltip-custom.tooltip-orientation-left > .tooltip-inner > .tip {
    left: calc(100% - 12px);
    top: calc(50% - 9px);
    transform: rotate(-45deg);
}
</style>

<script>
export const Tooltip = {
    name: "tooltip",
    props: {
        native: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: null
        },
        visible: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: "dark"
        },
        whiteSpace: {
            type: String,
            default: null
        },
        fontSize: {
            type: Number,
            default: null
        },
        orientation: {
            type: String,
            default: "bottom"
        },
        width: {
            type: Number,
            default: null
        },
        borderRadius: {
            type: String,
            default: null
        },
        animation: {
            type: String,
            default: "fade"
        },
        delay: {
            type: Number,
            default: 1000
        },
        duration: {
            type: Number,
            default: 250
        }
    },
    data: function() {
        return {
            animationData: null,
            delayData: null,
            durationData: null,
            visibleData: false
        };
    },
    watch: {
        visible(value) {
            this.visibleData = value;
        },
        visibleData(value) {
            this.$emit("update:visible", value);
        },
        disabled(value) {
            if (value) this.hide(false);
        },
        delay(value) {
            this.delayData = value;
        },
        duration(value) {
            this.durationData = value;
        }
    },
    computed: {
        tooltipInnerStyle() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;
            if (this.borderRadius) base.borderRadius = this.borderRadius;
            if (this.whiteSpace) base["white-space"] = this.whiteSpace;
            if (this.delayData) base["transition-delay"] = `${this.delayData}ms`;
            if (this.durationData) base["transition-duration"] = `${this.durationData}ms`;
            return base;
        },
        tooltipTextStyle() {
            const base = {};
            if (this.whiteSpace) base["white-space"] = this.whiteSpace;
            if (this.fontSize) base["font-size"] = `${this.fontSize}px`;
            return base;
        },
        classes() {
            const base = {};
            if (this.variant) base["tooltip-variant-" + this.variant] = this.variant;
            if (this.orientation) {
                base["tooltip-orientation-" + this.orientation] = this.orientation;
            }
            return base;
        }
    },
    methods: {
        show(animated = true) {
            if (this.disabled || this.visibleData) return;
            this._setVisibility(true, animated);
        },
        hide(animated = true) {
            if (!this.visibleData) return;
            this._setVisibility(false, animated);
        },
        scheduleShow() {
            this.show(true);
        },
        _setVisibility(visible, animated) {
            if (visible && animated) {
                this.delayData = this.delay;
            } else {
                this.delayData = null;
            }

            if (animated) {
                this.animationData = this.animation;
                this.durationData = this.duration;
                this.visibleData = visible;
            } else {
                this.visibleData = visible;
                this.$nextTick(() => {
                    this.durationData = null;
                    this.animationData = "none";
                });
            }
        }
    }
};

export default Tooltip;
</script>
