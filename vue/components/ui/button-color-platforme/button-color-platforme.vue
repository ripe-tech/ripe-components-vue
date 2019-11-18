<template>
    <div class="button button-color" v-bind:class="style" v-on:click="handleClick">
        {{ text }}
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
    user-select: none;
}

.button-color.button-color-small {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    min-width: 160px;
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
                "button-color-small": this.small
            };
            base["button-color-" + this.color] = this.color;
            return base;
        }
    }
};

export default ButtonColorPlatforme;
</script>
