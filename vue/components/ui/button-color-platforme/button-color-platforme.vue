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
    background-color: #000000;
    border: 1px solid #000000;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    color: $white;
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    height: 40px;
    letter-spacing: 0.5px;
    line-height: 40px;
    min-width: 180px;
    padding: 0px 20px 0px 20px;
    text-align: center;
    transition: background-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
    user-select: none;
}

.button-color.button-color-small {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    min-width: 160px;
}

.button-color.button-color-default.disabled {
    background-color: #eceef1;
    border: 2px solid #eceef1;
    color: #a4adb5;
    cursor: not-allowed;
}

.button-color.button-color-secondary.disabled,
.button-color.button-color-white.disabled {
    border: solid 2px #e4e8f0;
    color: #a4adb5;
    cursor: not-allowed;
    pointer-events: none;
}

.button-color.button-color-default:hover {
    background-color: #57626e;
}

.button-color.button-color-default:active {
    background-color: #1d2631;
}

.button-color.button-color-default:focus {
    border: 2px solid #5ba4f6;
}

.button-color.button-color-secondary,
.button-color.button-color-white {
    background-color: #ffffff;
    border: solid 2px #e4e8f0;
    color: #57626e;
    transition: opacity 0.15s ease-in-out;
}

.button-color.button-color-secondary:hover,
.button-color.button-color-white:hover {
    background-color: #ffffff;
    border: 2px solid #57626e;
    color: #57626e;
}

.button-color.button-color-secondary:active,
.button-color.button-color-white:active {
    background-color: #ffffff;
    border: 2px solid #0d0d0d;
    color: #0d0d0d;
}

.button-color.button-color-secondary:focus,
.button-color.button-color-white:focus {
    background-color: #ffffff;
    border: 2px solid #4b8dd7;
    color: #1d2631;
}

.button-color.button-color-blue {
    background-color: #4b8dd7;
    border: solid 2px #4b8dd7;
}

.button-color.button-color-blue:hover {
    background-color: #73b0f5;
    border: 2px solid #73b0f5;
}

.button-color.button-color-blue:active {
    background-color: #3066a3;
    border: 2px solid #3066a3;
}

.button-color.button-color-blue.disabled {
    background-color: #e5f3ff;
    border: solid 2px #e5f3ff;
    color: #a4adb5;
}

.button-color.button-color-green {
    background-color: #45a777;
    border: solid 2px #45a777;
}

.button-color.button-color-green:hover {
    background-color: #74dca9;
    border: 2px solid #74dca9;
}

.button-color.button-color-green:active {
    background-color: #318c60;
    border: 2px solid #318c60;
}

.button-color.button-color-green.disabled {
    background-color: #dcfce7;
    border: solid 2px #dcfce7;
    color: #a4adb5;
}

.button-color.button-color-yellow {
    background-color: #ffd422;
    border: solid 2px #ffd422;
}

.button-color.button-color-yellow:hover {
    background-color: #ffe473;
    border: 2px solid #ffe473;
}

.button-color.button-color-yellow:active {
    background-color: #e0bb25;
    border: 2px solid #e0bb25;
}

.button-color.button-color-orange.disabled,
.button-color.button-color-yellow.disabled {
    background-color: #ffead0;
    border: solid 2px #ffead0;
    color: #a4adb5;
}

.button-color.button-color-orange {
    background-color: #ff8a00;
    border: solid 2px #ff8a00;
}

.button-color.button-color-orange:hover {
    background-color: #fbb766;
    border: 2px solid #fbb766;
}

.button-color.button-color-orange:active {
    background-color: #e07c06;
    border: 2px solid #e07c06;
}

.button-color.button-color-red {
    background-color: #e96760;
    border: solid 2px #e96760;
    color: #ffffff;
}

.button-color.button-color-red:hover {
    background-color: #f58a84;
    border: 2px solid #f58a84;
}

.button-color.button-color-red:active {
    background-color: #ce544d;
    border: 2px solid #ce544d;
}

.button-color.button-color-red.disabled {
    background-color: #ffe4e2;
    border: 2px solid #ffe4e2;
    color: #a4adb5;
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
