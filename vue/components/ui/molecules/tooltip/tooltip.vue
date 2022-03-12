<template>
    <abbr class="tooltip tooltip-native" v-bind:title="text" v-if="native && text">
        <slot />
    </abbr>
    <div
        class="tooltip tooltip-custom"
        v-bind:class="classes"
        v-else-if="text"
        v-on:mouseenter="onMouseenter"
        v-on:mouseleave="onMouseleave"
    >
        <slot />
        <transition v-bind:name="animationData">
            <div class="tooltip-inner" v-bind:style="tooltipInnerStyle" v-show="visibleData">
                <slot name="tooltip-content">
                    <div class="tooltip-text" v-bind:style="tooltipTextStyle">
                        <slot name="tooltip-text">
                            {{ text }}
                        </slot>
                    </div>
                </slot>
                <div class="tip-container">
                    <div class="tip" />
                </div>
            </div>
        </transition>
    </div>
    <div class="tooltip tooltip-empty" v-else>
        <slot />
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
    font-size: 11px;
    padding: 10px 10px 10px 10px;
    position: absolute;
    text-align: center;
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

.tooltip-custom > .tooltip-inner > .tooltip-text {
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tooltip-custom > .tooltip-inner > .tip-container {
    height: 21px;
    left: 0px;
    position: absolute;
    width: 100%;
}

.tooltip-custom.tooltip-orientation-right > .tooltip-inner > .tip-container {
    height: 100%;
    left: -21px;
    top: 0px;
    width: 21px;
}

.tooltip-custom > .tooltip-inner > .tip-container > .tip {
    height: 17px;
    transform: rotate(-135deg);
    width: 17px;
}

.tooltip-custom.tooltip-variant-dark > .tooltip-inner > .tip-container > .tip {
    background: linear-gradient(-45deg, $dark 50%, transparent 50%);
}

.tooltip-custom.tooltip-variant-grey > .tooltip-inner > .tip-container > .tip {
    background: linear-gradient(-45deg, $grey 50%, transparent 50%);
}

.tooltip-custom.tooltip-variant-white > .tooltip-inner > .tip-container > .tip {
    background: linear-gradient(-45deg, $white 50%, transparent 50%);
}

.tooltip-custom.tooltip-orientation-top > .tooltip-inner > .tip-container > .tip {
    margin-left: calc(50% - 9px);
    transform: rotate(45deg);
}

.tooltip-custom.tooltip-orientation-right > .tooltip-inner > .tip-container > .tip {
    margin-left: 13px;
    margin-top: calc(100vh - 11px);
    transform: rotate(135deg);
}

.tooltip-custom.tooltip-orientation-bottom > .tooltip-inner > .tip-container > .tip {
    margin-bottom: calc(100% - 12px);
    margin-left: calc(50% - 9px);
    transform: rotate(-135deg);
}

.tooltip-custom.tooltip-orientation-left > .tooltip-inner > .tip-container > .tip {
    margin-left: calc(100% - 12px);
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
        hideDelay: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 250
        },
        sequenceTimeout: {
            type: Number,
            default: 50
        }
    },
    data: function() {
        return {
            animationData: null,
            delayData: null,
            durationData: null,
            visibleData: false,
            lastEnter: null,
            lastLeave: null,
            timeout: null
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
            this.$bus.$emit("tooltip:leave", this._uid);
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
    created: function() {
        this.onTooltipEnter = this.$bus.$on("tooltip:enter", id => {
            this.lastEnter = Date.now();
        });
        this.onTooltipLeave = this.$bus.$on("tooltip:leave", id => {
            this.lastLeave = Date.now();
        });
    },
    destroyed: function() {
        if (this.onTooltipEnter) this.$bus.$off("tooltip:enter", this.onTooltipEnter);
        if (this.onTooltipLeave) this.$bus.$off("tooltip:leave", this.onTooltipLeave);
    },
    methods: {
        show(animated = true) {
            if (this.disabled || this.visibleData) return;
            this._setVisibility(true, animated);
            this.$bus.$emit("tooltip:shown", this._uid);
        },
        hide(animated = true) {
            if (!this.visibleData) return;
            this._setVisibility(false, animated);
            this.$bus.$emit("tooltip:hidden", this._uid);
        },
        scheduleShow() {
            this.show(true);
        },
        onMouseenter() {
            // in case the current tooltip is disabled then
            // nothing has to be done on mouse enter
            if (this.disabled) return;

            // in case there's a pending hide timeout then clears
            // it as the tooltip should remain visible
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            // verifies if the current tooltip should be immediately shown
            // because a tooltip in the group was currently shown
            const wasVisible =
                this.lastLeave && this.lastEnter
                    ? this.lastLeave - this.lastEnter > this.delay
                    : false;
            const shouldShow = wasVisible && Date.now() - this.lastLeave < this.sequenceTimeout;
            if (shouldShow) {
                this.show(false);
                return;
            }

            // schedules a show operation to be performed after the
            // delay amount of time has passed
            this.scheduleShow();

            // triggers the enter event indicating that we've entered
            // a certain tooltip target area
            this.$bus.$emit("tooltip:enter", this._uid);
        },
        onMouseleave() {
            // in case the current tooltip is disabled then
            // nothing has to be done on mouse leave
            if (this.disabled) return;

            // schedules a timeout for the hide operation of
            // the tooltip according to the hide delay
            this.timeout = setTimeout(() => {
                // makes sure that the tooltip is hidden
                this.hide(false);

                // triggers the leave event indicating that we've left
                // a certain tooltip target area
                this.$bus.$emit("tooltip:leave", this._uid);
            }, this.hideDelay);
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
