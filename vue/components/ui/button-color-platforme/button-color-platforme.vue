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
    color: #ffffff;
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
    transition: background-color 0.1s ease-in-out;
    user-select: none;
}

.button-color.button-color-small {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    min-width: 160px;
}

.button-color.disabled {
    cursor: default;
    opacity: 0.4;
    pointer-events: none;
}

.button-color:hover {
    background-color: #4d4d4d;
}

.button-color:active {
    background-color: #2d2d2d;
}

.button-color.button-color-secondary,
.button-color.button-color-white {
    background-color: #ffffff;
    border: solid 1px #e4e8f0;
    color: #57626e;
    transition: none;
}

.button-color.button-color-secondary:hover,
.button-color.button-color-white:hover {
    background-color: #000000;
    border: 1px solid #000000;
    color: #ffffff;
}

.button-color.button-color-secondary:active,
.button-color.button-color-white:active {
    background-color: #2d2d2d;
    border: 1px solid #2d2d2d;
    color: #ffffff;
}

.button-color.button-color-red {
    background-color: #e96760;
    border: solid 1px #e96760;
    color: #ffffff;
}

.button-color ::v-deep .loader {
    display: inline-block;
    transform: translateY(-22px);
    width: 32px;
}

.button-color ::v-deep .loader > div {
    background-color: #ffffff;
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
            base["button-color-" + this.color] = this.color;
            return base;
        }
    }
};

export default ButtonColorPlatforme;
</script>
