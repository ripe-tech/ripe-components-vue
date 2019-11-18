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

.button {
    cursor: pointer;
    display: inline-block;
    user-select: none;
}

.button-color {
    border: 1px solid #0d0d0d;
    box-sizing: border-box;
    color: #0d0d0d;
    font-size: 14px;
    font-weight: bold;
    height: 44px;
    line-height: 44px;
    padding: 0px 20px 0px 20px;
    transition: color 0.25s ease-in, background-color 0.25s ease-in, border-color 0.25s ease-in;
}

.button-color.disabled {
    border-color: #d0cece;
    color: #d0cece;
}

.button-color:hover {
    background-color: #151515;
    border-color: #151515;
    color: #ffffff;
}

.button-color.button-color-secondary {
    background-color: #151515;
    border: 1px solid #0d0d0d;
    color: #ffffff;
}

.button-color.button-color-secondary.disabled {
    border-color: #737373;
    color: #737373;
}

.button-color.button-color-secondary:hover {
    background-color: #444444;
    border-color: #444444;
    color: #ffffff;
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
