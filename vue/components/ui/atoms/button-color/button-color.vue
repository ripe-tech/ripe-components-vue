<template>
    <button
        class="button button-color"
        v-bind:class="classes"
        v-bind:style="style"
        v-bind:type="type"
        v-on:click="handleClick"
    >
        <span v-show="!loading" v-if="iconPosition === 'right'">
            <slot>{{ text }}</slot>
        </span>
        <loader
            loader="ball-scale-multiple"
            class="loader"
            v-bind:loader-style="_loaderStyle"
            v-show="loading"
        />
        <icon
            class="icon"
            v-bind:icon="icon"
            v-bind:color="iconColor"
            v-bind:width="iconSize"
            v-bind:height="iconSize"
            v-if="icon && !loading"
        />
        <icon
            class="icon-hover"
            v-bind:icon="icon"
            v-bind:color="iconHoverColor"
            v-bind:width="iconSize"
            v-bind:height="iconSize"
            v-if="icon && !loading"
        />
        <span v-show="!loading" v-if="iconPosition === 'left'">
            <slot>{{ text }}</slot>
        </span>
    </button>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-color {
    background-color: $blacker;
    border: 1px solid $blacker;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    color: $white;
    cursor: pointer;
    display: inline-block;
    font-family: $font-family;
    font-size: 0px;
    font-weight: 600;
    height: 40px;
    letter-spacing: 0.25px;
    line-height: 38px;
    min-width: 180px;
    outline: none;
    padding: 0px 20px 0px 20px;
    text-align: center;
    transition: background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        color 0.15s ease-in-out,
        opacity 0.15s ease-in-out;
    user-select: none;
    vertical-align: middle;
}

.button-color > * {
    display: inline-block;
    font-size: 13px;
    line-height: 38px;
    vertical-align: middle;
}

.button-color.button-color-small {
    height: 32px;
    line-height: 30px;
    min-width: 160px;
}

.button-color.button-color-small > * {
    font-size: 12px;
    line-height: 30px;
}

.button-color.button-color-tiny {
    height: 24px;
    line-height: 22px;
    min-width: 120px;
}

.button-color.button-color-tiny > * {
    font-size: 10px;
    line-height: 22px;
}

.button-color.button-color-left {
    text-align: left;
}

.button-color.button-color-right {
    text-align: right;
}

.button-color.button-color-icon {
    padding: 0px 12px 0px 12px;
}

.button-color.loading {
    cursor: default;
    pointer-events: none;
    text-align: center;
}

.button-color.disabled:not(.loading) {
    cursor: default;
    opacity: 0.4;
    pointer-events: none;
}

.button-color:hover {
    background-color: #5d5d5d;
    border-color: #5d5d5d;
}

.button-color:active {
    background-color: #2d2d2d;
    border-color: #2d2d2d;
}

.button-color.button-color-secondary,
.button-color.button-color-white {
    background-color: $white;
    border: 1px solid #e4e8f0;
    color: $grey;
    transition: opacity 0.15s ease-in-out;
}

.button-color.button-color-secondary:hover:not(.loading),
.button-color.button-color-white:hover:not(.loading) {
    background-color: $blacker;
    border: 1px solid $blacker;
    color: $white;
}

.button-color.button-color-secondary:active,
.button-color.button-color-white:active {
    background-color: #2d2d2d;
    border: 1px solid #2d2d2d;
    color: $white;
}

.button-color.button-color-red {
    background-color: $red;
    border: 1px solid $red;
    color: $white;
}

.button-color.button-color-red:hover:not(.loading) {
    background-color: $medium-red;
    border-color: $medium-red;
}

.button-color.button-color-red:active {
    background-color: $dark-red;
    border-color: $dark-red;
}

.button-color.button-color-blue {
    background-color: $blue;
    border-color: $blue;
}

.button-color.button-color-blue:hover:not(.loading) {
    background-color: $lighter-blue;
    border-color: $lighter-blue;
}

.button-color.button-color-blue:active {
    background-color: $active-blue;
    border-color: $active-blue;
}

.button-color.button-color-green {
    background-color: $green;
    border-color: $green;
}

.button-color.button-color-green:hover:not(.loading) {
    background-color: $lighter-green;
    border-color: $lighter-green;
}

.button-color.button-color-green:active {
    background-color: $dark-green;
    border-color: $dark-green;
}

.button-color.button-color-yellow {
    background-color: $yellow;
    border-color: $yellow;
}

.button-color.button-color-yellow:hover:not(.loading) {
    background-color: $light-yellow;
    border-color: $light-yellow;
}

.button-color.button-color-yellow:active {
    background-color: $dark-yellow;
    border-color: $dark-yellow;
}

.button-color.button-color-orange {
    background-color: $orange;
    border-color: $orange;
}

.button-color.button-color-orange:hover:not(.loading) {
    background-color: $dark-orange;
    border-color: $dark-orange;
}

.button-color.button-color-orange:active {
    background-color: $darker-orange;
    border-color: $darker-orange;
}

.button-color.button-color-transparent {
    background-color: $transparent;
    border-color: $transparent;
    color: $pale-grey;
}

.button-color.button-color-transparent:hover:not(.loading) > span {
    text-decoration: underline;
}

.button-color.button-color-transparent:active > span {
    color: $blacker;
}

.button-color ::v-deep .loader {
    display: inline-block;
    transform: translateY(-17px);
    width: 32px;
}

.button-color ::v-deep .loader > div {
    background-color: $white;
    height: 32px;
    left: 0px;
    width: 32px;
}

.button-color.button-color-secondary ::v-deep .loader > div {
    background-color: #2d2d2d;
}

.button-color .icon,
.button-color .icon-hover {
    height: 22px;
    margin-top: 8px;
    width: 22px;
}

.button-color.button-color-small .icon,
.button-color.button-color-small .icon-hover {
    height: 18px;
    margin-top: 6px;
    width: 18px;
}

.button-color.button-color-tiny .icon,
.button-color.button-color-tiny .icon-hover {
    height: 15px;
    margin-top: 4px;
    width: 15px;
}

.button-color .icon {
    display: inline-block;
}

.button-color:hover:not(.loading) .icon {
    display: none;
}

.button-color .icon-hover {
    display: none;
}

.button-color:hover:not(.loading) .icon-hover {
    display: inline-block;
}

.button-color.icon-position-left .icon,
.button-color.icon-position-left .icon-hover {
    float: left;
    padding-right: 12px;
}

.button-color.icon-position-right .icon,
.button-color.icon-position-right .icon-hover {
    margin-top: 0px;
    padding-left: 12px;
}

.button-color.button-color-no-text .icon,
.button-color.button-color-no-text .icon-hover {
    padding-left: 0px;
    padding-right: 0px;
}
</style>

<script>
export const ButtonColor = {
    name: "button-color",
    props: {
        secondary: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: null
        },
        minWidth: {
            type: Number,
            default: null
        },
        text: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: "button"
        },
        alignment: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        loaderStyle: {
            type: Object,
            default: () => ({})
        },
        icon: {
            type: String,
            default: null
        },
        iconPosition: {
            type: String,
            default: "left"
        },
        href: {
            type: String,
            default: null
        },
        target: {
            type: String,
            default: null
        }
    },
    methods: {
        handleClick(event) {
            if (this.disabled) return;
            if (this.href) {
                if (this.target) window.open(this.href, this.target);
                else document.location = this.href;
            }
            this.$emit("click", event);
        }
    },
    computed: {
        iconColor() {
            return this.color === "white" || this.secondary ? "black" : "white";
        },
        iconHoverColor() {
            return this.color === "white" || this.secondary ? "white" : "white";
        },
        iconSize() {
            switch (this.sizeMode) {
                case "tiny":
                    return 15;

                case "small":
                    return 18;

                case "medium":
                    return 22;

                default:
                    return 22;
            }
        },
        sizeMode() {
            if (this.small) return "small";
            if (this.size) return this.size;
            return "medium";
        },
        alignmentStyle() {
            if (this.alignment) return this.alignment;
            if (this.icon) return "right";
            return "center";
        },
        style() {
            const base = {
                "min-width": this.minWidth === null ? null : `${this.minWidth}px`
            };
            return base;
        },
        classes() {
            const base = {
                "button-color-secondary": this.secondary,
                "button-color-icon": this.icon,
                "button-color-no-text": !this.text && !this.$slots.default,
                disabled: this.disabled,
                loading: this.loading
            };

            base["button-color-" + this.sizeMode] = true;
            base["icon-position-" + this.iconPosition] = true;

            if (this.color) {
                base["button-color-" + this.color] = this.color;
            }

            if (this.alignmentStyle) {
                base["button-color-" + this.alignmentStyle] = this.alignmentStyle;
            }

            return base;
        },
        _loaderStyle() {
            const base = {};
            base["background-color"] = this.color === "white" ? "#2d2d2d" : "#e4e8f0";
            return { ...base, ...this.loaderstyle };
        }
    }
};

export default ButtonColor;
</script>
