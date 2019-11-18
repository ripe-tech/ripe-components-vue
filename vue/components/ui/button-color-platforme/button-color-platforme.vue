<template>
    <div
        class="button button-color"
        v-bind:class="{ 'button-color-secondary': secondary }"
        v-on:click="handleClick"
    >
        {{ text }}
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-color {
    background-color: #000000;
    border: 1px solid #0d0d0d;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    letter-spacing: 0.5px;
    height: 40px;
    line-height: 40px;
    min-width: 160px;
    padding: 0px 20px 0px 20px;
    border-radius: 6px 6px 6px 6px;
    user-select: none;
    text-align: center;
}

.button-color.disabled {
    border-color: #6d6d6d;
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
}

.button-color.button-color-secondary.disabled,
.button-color.button-color-white.disabled {
    border-color: #cccccc;
}

.button-color.button-color-secondary:hover,
.button-color.button-color-white:hover {
    background-color: #cccccc;
}

.button-color.button-color-secondary:active,
.button-color.button-color-white:active {
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
        text: {
            type: String,
            default: null
        }
    },
    methods: {
        handleClick() {
            this.$emit("click");
        }
    }
};

export default ButtonColorPlatforme;
</script>
