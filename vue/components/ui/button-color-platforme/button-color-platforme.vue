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
    color: $medium-grey;
    cursor: not-allowed;
}

.button-color:focus {
    border-color: $aqcua-blue;
}

.button-color.button-color-small {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    min-width: 160px;
}

.button-color.button-color-default,
.button-color.button-color-default:active {
    background-color: $dark-blue;
    border-color: $dark-blue;
}

.button-color.button-color-default:hover {
    background-color: $grey;
    border-color: $grey;
}

.button-color.button-color-default.disabled,
.button-color.button-color-default.disabled:hover {
    background-color: $light-grey;
    border-color: $light-grey;
}

.button-color.button-color-secondary,
.button-color.button-color-white {
    background-color: $white;
    border-color: $light-white;
    color: $grey;
}

.button-color.button-color-secondary.disabled,
.button-color.button-color-white.disabled,
.button-color.button-color-white.disabled:hover {
    border-color: $light-white;
    color: $medium-grey;
}

.button-color.button-color-secondary:hover,
.button-color.button-color-white:hover {
    background-color: $white;
    border-color: $grey;
    color: $grey;
}

.button-color.button-color-secondary:active,
.button-color.button-color-white:active {
    background-color: $white;
    border-color: $light-black;
    color: $light-black;
}

.button-color.button-color-secondary:focus,
.button-color.button-color-white:focus {
    background-color: $white;
    color: $dark-blue;
}

.button-color.button-color-red {
    background-color: $red;
    border-color: $red;
}

.button-color.button-color-red:hover {
    background-color: $medium-red;
    border-color: $medium-red;
}

.button-color.button-color-red:active {
    background-color: $dark-red;
    border-color: $dark-red;
}

.button-color.button-color-red.disabled {
    background-color: $light-red;
    border-color: $light-red;
}

.button-color.button-color-blue {
    background-color: $blue;
    border-color: $blue;
}

.button-color.button-color-blue:hover {
    background-color: $lighter-blue;
    border-color: $lighter-blue;
}

.button-color.button-color-blue:active {
    background-color: $active-blue;
    border-color: $active-blue;
}

.button-color.button-color-blue.disabled {
    background-color: $light-blue;
    border-color: $light-blue;
    color: $medium-grey;
}

.button-color.button-color-green {
    background-color: $green;
    border-color: $green;
}

.button-color.button-color-green:hover {
    background-color: $lighter-green;
    border-color: $lighter-green;
}

.button-color.button-color-green:active {
    background-color: $dark-green;
    border-color: $dark-green;
}

.button-color.button-color-green.disabled {
    background-color: $light-green;
    border-color: $light-green;
    color: $medium-grey;
}

.button-color.button-color-yellow {
    background-color: $yellow;
    border-color: $yellow;
}

.button-color.button-color-yellow:hover {
    background-color: $light-yellow;
    border-color: $light-yellow;
}

.button-color.button-color-yellow:active {
    background-color: $dark-yellow;
    border-color: $dark-yellow;
}

.button-color.button-color-orange.disabled,
.button-color.button-color-orange.disabled:hover,
.button-color.button-color-yellow.disabled,
.button-color.button-color-yellow.disabled:hover {
    background-color: $light-orange;
    border-color: $light-orange;
    color: $medium-grey;
}

.button-color.button-color-orange {
    background-color: $orange;
    border-color: $orange;
}

.button-color.button-color-orange:hover {
    background-color: $dark-orange;
    border-color: $dark-orange;
}

.button-color.button-color-orange:active {
    background-color: $darker-orange;
    border-color: $darker-orange;
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
