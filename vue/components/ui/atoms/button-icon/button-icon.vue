<template>
    <span
        class="button button-icon"
        v-bind:style="style"
        v-bind:class="classes"
        v-on:click="handleClick"
    >
        <loader loader="ball-clip-rotate" class="loader" v-bind:count="1" v-show="loading" />
        <icon
            v-bind:style="{ opacity: iconOpacity }"
            v-bind:icon="icon"
            v-bind:color="iconColor"
            v-bind:fill="iconFill"
            v-bind:stroke-width="iconStrokeWidth"
            v-show="!loading"
        />
        <span v-if="text">{{ text }}</span>
    </span>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-icon {
    box-sizing: border-box;
    color: #1d1d1d;
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
    cursor: inherit;
    opacity: 0.4;
}

.button-icon.unselectable {
    cursor: inherit;
    opacity: 1;
}

.button-icon:hover:not(.disabled):not(.unselectable) {
    background-color: $lighter-grey;
}

.button-icon:active:not(.disabled):not(.unselectable) {
    background-color: $light-grey;
}

.button-icon.button-icon-grey {
    background-color: $lighter-grey;
}

.button-icon.button-icon-grey:hover:not(.disabled):not(.unselectable) {
    background-color: #dedede;
}

.button-icon.button-icon-grey:active:not(.disabled):not(.unselectable) {
    background-color: #cecece;
}

.button-icon.button-icon-white {
    background-color: $white;
}

.button-icon.button-icon-white:hover:not(.disabled):not(.unselectable) {
    background-color: $lighter-grey;
}

.button-icon.button-icon-white:active:not(.disabled):not(.unselectable) {
    background-color: $light-grey;
}

.button-icon.button-icon-black {
    background-color: $dark;
}

.button-icon.button-icon-black:hover:not(.disabled):not(.unselectable) {
    background-color: #41566f;
}

.button-icon.button-icon-black:active:not(.disabled):not(.unselectable) {
    background-color: $dark;
}

.button-icon .loader {
    display: inline-block;
    vertical-align: middle;
}

.button-icon .loader ::v-deep div {
    border-color: #848484 #848484 transparent #848484;
    height: 10px;
    width: 10px;
}

.button-icon > .icon {
    height: 100%;
    opacity: 0.5;
}

.button-icon.button-icon-black > .icon {
    opacity: 1;
}

.button-icon.button-icon-text > .icon {
    vertical-align: middle;
}

.button-icon:hover:not(.disabled):not(.unselectable) > .icon {
    opacity: 1;
}

.button-icon > span {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.25px;
    margin-left: 6px;
    margin-right: 3px;
    opacity: 0.5;
    vertical-align: middle;
}

.button-icon.button-icon-black > span {
    opacity: 1;
}

.button-icon:hover:not(.disabled):not(.unselectable) > span {
    opacity: 1;
}
</style>

<script>
export const ButtonIcon = {
    name: "button-icon",
    props: {
        src: {
            type: String,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        iconOpacity: {
            type: Number,
            default: 0.5
        },
        iconFill: {
            type: String,
            default: null
        },
        iconStrokeWidth: {
            type: Number,
            default: null
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
        paddingTop: {
            type: Number,
            default: null
        },
        paddingBottom: {
            type: Number,
            default: null
        },
        paddingLeft: {
            type: Number,
            default: null
        },
        paddingRight: {
            type: Number,
            default: null
        },
        paddingFactor: {
            type: Number,
            default: 4.5
        },
        paddingTextFactor: {
            type: Number,
            default: 1.5
        },
        disabled: {
            type: Boolean,
            default: false
        },
        selectable: {
            type: Boolean,
            default: true
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconColor() {
            if (this.color === "black") return "white";
            return "black";
        },
        paddingBase() {
            return this.padding === null ? parseInt(this.size / this.paddingFactor) : this.padding;
        },
        style() {
            return {
                height: `${this.size}px`,
                width: `${this.size}px`,
                "line-height": this.text ? "normal" : `${this.size}px`,
                "padding-top": `${this.paddingTop === null ? this.paddingBase : this.paddingTop}px`,
                "padding-bottom": `${
                    this.paddingBottom === null ? this.paddingBase : this.paddingBottom
                }px`,
                "padding-left": `${
                    this.paddingLeft === null
                        ? this.text
                            ? parseInt(this.paddingBase * this.paddingTextFactor)
                            : this.paddingBase
                        : this.paddingLeft
                }px`,
                "padding-right": `${
                    this.paddingRight === null
                        ? this.text
                            ? parseInt(this.paddingBase * this.paddingTextFactor)
                            : this.paddingBase
                        : this.paddingRight
                }px`,
                "border-radius": `${this.size}px`
            };
        },
        classes() {
            const base = {
                disabled: this.disabled,
                unselectable: !this.selectable,
                "button-icon-text": Boolean(this.text)
            };
            if (this.color) base["button-icon-" + this.color] = this.color;
            return base;
        }
    },
    methods: {
        handleClick(event) {
            if (this.disabled) return;
            if (!this.selectable) return;
            this.$emit("click", event);
        }
    }
};

export default ButtonIcon;
</script>
