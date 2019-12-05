<template>
    <div class="button button-color" v-bind:class="classes" v-on:click="handleClick">
        <loader-platforme
            loader="ball-scale-multiple"
            class="loader"
            v-bind:loader-style="loaderStyle"
            v-show="loading"
        />
        <img class="icon" v-bind:src="iconPath" v-if="icon && !loading" />
        <img class="icon-hover" v-bind:src="iconHoverPath" v-if="icon && !loading" />
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
    font-size: 0px;
    font-weight: 600;
    height: 40px;
    letter-spacing: 0.5px;
    line-height: 40px;
    min-width: 180px;
    padding: 0px 20px 0px 20px;
    text-align: center;
    transition: background-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
    user-select: none;
    vertical-align: middle;
}

.button-color > * {
    display: inline-block;
    font-size: 13px;
    line-height: 40px;
    vertical-align: middle;
}

.button-color.button-color-small {
    height: 32px;
    line-height: 32px;
    min-width: 160px;
}

.button-color.button-color-small > * {
    font-size: 12px;
    line-height: 32px;
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
    text-align: center;
}

.button-color.disabled {
    cursor: default;
    opacity: 0.4;
    pointer-events: none;
}

.button-color:hover {
    background-color: #5d5d5d;
}

.button-color:active {
    background-color: #2d2d2d;
}

.button-color.button-color-secondary,
.button-color.button-color-white {
    background-color: $white;
    border: 1px solid #e4e8f0;
    color: $grey;
    transition: opacity 0.15s ease-in-out;
}

.button-color.button-color-secondary:hover,
.button-color.button-color-white:hover {
    background-color: #000000;
    border: 1px solid #000000;
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
    float: left;
    height: 22px;
    margin-top: 9px;
    width: 22px;
}

.button-color.button-color-left .icon,
.button-color.button-color-left .icon-hover {
    margin-right: 8px;
}

.button-color.button-color-small .icon,
.button-color.button-color-small .icon-hover {
    height: 18px;
    margin-top: 7px;
    width: 18px;
}

.button-color .icon {
    display: inline-block;
}

.button-color:hover .icon {
    display: none;
}

.button-color .icon-hover {
    display: none;
}

.button-color:hover .icon-hover {
    display: inline-block;
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
        }
    },
    methods: {
        handleClick() {
            this.$emit("click");
        }
    },
    computed: {
        iconPath() {
            let iconColor;

            switch (this.color) {
                case "white":
                    iconColor = "black";
                    break;
                default:
                    iconColor = "white";
                    break;
            }

            if (this.secondary) iconColor = "black";

            return require(`./../../../assets/icons/${iconColor}/${this.icon}.svg`);
        },
        iconHoverPath() {
            let iconColor;

            switch (this.color) {
                case "white":
                    iconColor = "white";
                    break;
                default:
                    iconColor = "white";
                    break;
            }

            if (this.secondary) iconColor = "white";

            return require(`./../../../assets/icons/${iconColor}/${this.icon}.svg`);
        },
        alignmentStyle() {
            if (this.alignment) return this.alignment;
            if (this.icon) return "right";
            return "center";
        },
        classes() {
            const base = {
                "button-color-secondary": this.secondary,
                "button-color-small": this.small,
                "button-color-icon": this.icon,
                disabled: this.disabled,
                loading: this.loading
            };

            if (this.color) {
                base["button-color-" + this.color] = this.color;
            }

            if (this.alignmentStyle) {
                base["button-color-" + this.alignmentStyle] = this.alignmentStyle;
            }

            return base;
        }
    }
};

export default ButtonColorPlatforme;
</script>
