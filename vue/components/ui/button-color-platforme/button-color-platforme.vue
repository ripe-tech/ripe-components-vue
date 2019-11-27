<template>
    <div class="button button-color" v-bind:class="style" v-on:click="handleClick">
        <loader-platforme
            loader="ball-scale-multiple"
            class="loader"
            v-bind:loader-style="loaderStyle"
            v-show="loading"
        />
        <span v-show="!loading">{{ text }}</span>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-color {
    border: 2px solid;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    color: $white;
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    height: 40px;
    letter-spacing: 0.5px;
    line-height: 40px;
    min-width: 180px;
    padding: 0px 20px 0px 20px;
    text-align: center;
    transition: background-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
    user-select: none;
}

.button-color.disabled {
    color: $font-disabled;
    cursor: not-allowed;
}

.button-color:focus {
    border-color: $button-focus;
}

.button-color.button-color-small {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    min-width: 160px;
}

.button-color.button-color-default,
.button-color.button-color-default:active {
    background-color: $button-default;
    border-color: $button-default;
}

.button-color.button-color-default:hover {
    background-color: $button-default-hover;
    border-color: $button-default-hover;
}

.button-color.button-color-default.disabled,
.button-color.button-color-default.disabled:hover {
    background-color: $button-default-disabled;
    border-color: $button-default-disabled;
}

.button-color.button-color-secondary,
.button-color.button-color-white {
    background-color: $white;
    border-color: $button-white;
    color: $button-white;
}

.button-color.button-color-secondary.disabled,
.button-color.button-color-white.disabled {
    border-color: $button-white-disabled;
}

.button-color.button-color-secondary:hover,
.button-color.button-color-white:hover {
    background-color: $white;
    border-color: $button-white;
    color: $button-white;
}

.button-color.button-color-secondary:active,
.button-color.button-color-white:active {
    background-color: $white;
    border-color: $button-white-active;
    color: $button-white-active;
}

.button-color.button-color-secondary:focus,
.button-color.button-color-white:focus {
    background-color: $white;
    color: $button-default;
}

.button-color.button-color-red {
    background-color: $button-red;
    border-color: $button-red;
}

.button-color.button-color-red:hover {
    background-color: $button-red-hover;
    border-color: $button-red-hover;
}

.button-color.button-color-red:active {
    background-color: $button-red-active;
    border-color: $button-red-active;
}

.button-color.button-color-red.disabled {
    background-color: $button-red-disabled;
    border-color: $button-red-disabled;
}

.button-color.button-color-blue {
    background-color: $button-blue;
    border-color: $button-blue;
}

.button-color.button-color-blue:hover {
    background-color: $button-blue-hover;
    border-color: $button-blue-hover;
}

.button-color.button-color-blue:active {
    background-color: $button-blue-active;
    border-color: $button-blue-active;
}

.button-color.button-color-blue.disabled {
    background-color: $button-blue-disabled;
    border-color: $button-blue-disabled;
    color: $font-disabled;
}

.button-color.button-color-green {
    background-color: $button-green;
    border-color: $button-green;
}

.button-color.button-color-green:hover {
    background-color: $button-green-hover;
    border-color: $button-green-hover;
}

.button-color.button-color-green:active {
    background-color: $button-green-active;
    border-color: $button-green-active;
}

.button-color.button-color-green.disabled {
    background-color: $button-green-disabled;
    border-color: $button-green-disabled;
    color: $font-disabled;
}

.button-color.button-color-yellow {
    background-color: $button-yellow;
    border-color: $button-yellow;
}

.button-color.button-color-yellow:hover {
    background-color: $button-yellow-hover;
    border-color: $button-yellow-hover;
}

.button-color.button-color-yellow:active {
    background-color: $button-yellow-active;
    border-color: $button-yellow-active;
}

.button-color.button-color-orange.disabled,
.button-color.button-color-yellow.disabled {
    background-color: $button-yellow-disabled;
    border-color: $button-yellow-disabled;
    color: $font-disabled;
}

.button-color.button-color-orange {
    background-color: $button-orange;
    border-color: $button-orange;
}

.button-color.button-color-orange:hover {
    background-color: $button-orange-hover;
    border-color: $button-orange-hover;
}

.button-color.button-color-orange:active {
    background-color: $button-orange-active;
    border-color: $button-orange-active;
}

.button-color ::v-deep .loader {
    display: inline-block;
    transform: translateY(-22px);
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
</style>

<script>
export const ButtonColorPlatforme = {
    name: "button-color-platforme",
    props: {
        secondary: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ""
        },
        text: {
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
        }
    },
    methods: {
        handleClick() {
            this.$emit("click");
        }
    },
    computed: {
        style() {
            const base = {
                "button-color-secondary": this.secondary,
                "button-color-small": this.small,
                disabled: this.disabled,
                loading: this.loading
            };

            if (this.color) {
                base["button-color-" + this.color] = this.color;
            }

            return base;
        }
    }
};

export default ButtonColorPlatforme;
</script>
