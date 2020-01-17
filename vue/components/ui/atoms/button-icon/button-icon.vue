<template>
    <span
        class="button button-icon"
        v-bind:style="style"
        v-bind:class="classes"
        v-on:click="handleClick"
    >
        <img v-bind:src="iconPath" />
        <span v-if="text">{{ text }}</span>
    </span>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-icon {
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-size: 0px;
    padding: 4px;
    text-align: center;
    transition: background-color 0.1s ease-in-out, opacity 0.05s ease-in-out;
    user-select: none;
    vertical-align: middle;
}

.button-icon.disabled {
    cursor: default;
    opacity: 0.4;
}

.button-icon:hover:not(.disabled) {
    background-color: $lighter-grey;
}

.button-icon.button-icon-grey {
    background-color: $lighter-grey;
}

.button-icon.button-icon-grey:hover:not(.disabled) {
    background-color: #dedede;
}

.button-icon.button-icon-white {
    background-color: $white;
}

.button-icon.button-icon-white:hover:not(.disabled) {
    background-color: $lighter-grey;
}

.button-icon.button-icon-black {
    background-color: $dark;
}

.button-icon.button-icon-black:hover:not(.disabled) {
    background-color: #41566f;
}

.button-icon > img {
    height: 100%;
    opacity: 0.5;
    vertical-align: middle;
}

.button-icon:hover:not(.disabled) > img {
    opacity: 1;
}

.button-icon > span {
    font-size: 13px;
    font-weight: 600;
    margin-left: 5px;
    margin-right: 3px;
    opacity: 0.5;
    vertical-align: middle;
}

.button-icon:hover:not(.disabled) > span {
    opacity: 1;
}
</style>

<script>
export const ButtonIcon = {
    name: "button-icon",
    props: {
        icon: {
            type: String,
            mandatory: true
        },
        text: {
            type: String,
            default: null
        },
        color: {
            type: String,
            default: null
        },
        size: {
            type: Number,
            default: 28
        },
        padding: {
            type: Number,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconPath() {
            let iconColor;
            switch (this.color) {
                case "black":
                    iconColor = "white";
                    break;

                default:
                    iconColor = "black";
                    break;
            }
            return require(`./../../../../assets/icons/${iconColor}/${this.icon}.svg`);
        },
        paddingBase() {
            return this.padding === null ? parseInt(this.size / 4.5) : this.padding;
        },
        style() {
            return {
                height: `${this.size}px`,
                "padding-top": `${this.paddingBase}px`,
                "padding-bottom": `${this.paddingBase}px`,
                "padding-left": `${
                    this.text ? parseInt(this.paddingBase * 1.3) : this.paddingBase
                }px`,
                "padding-right": `${
                    this.text ? parseInt(this.paddingBase * 1.3) : this.paddingBase
                }px`,
                "border-radius": `${this.size}px`
            };
        },
        classes() {
            const base = {
                disabled: this.disabled
            };
            if (this.color) base["button-icon-" + this.color] = this.color;
            return base;
        }
    },
    methods: {
        handleClick() {
            if (this.disabled) return;
            this.$emit("click");
        }
    }
};

export default ButtonIcon;
</script>
