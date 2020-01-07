<template>
    <img
        class="button button-icon"
        v-bind:disabled="disabled"
        v-bind:style="style"
        v-bind:class="classes"
        v-bind:src="iconPath"
        v-on:click="handleClick"
    />
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
    transition: background-color 0.15s ease-in-out, opacity 0.15s ease-in-out;
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

.button-icon.button-icon-white {
    background-color: $white;
}

.button-icon.button-icon-white:hover:not(.disabled) {
    background-color: $lighter-grey;
}

.button-icon.button-icon-grey {
    background-color: $lighter-grey;
}

.button-icon.button-icon-grey:hover:not(.disabled) {
    background-color: #dedede;
}

.button-icon.button-icon-inverted {
    background-color: $dark;
}

.button-icon.button-icon-inverted:hover:not(.disabled) {
    background-color: #41566f;
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
        color: {
            type: String,
            default: null
        },
        size: {
            type: Number,
            default: 28
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        iconPath() {
            const iconColor = this.color === "inverted" ? "white" : "black";
            
            return require(`./../../../../assets/icons/${iconColor}/${this.icon}.svg`);
        },
        style() {
            return {
                height: `${this.size}px`,
                width: `${this.size}px`,
                padding: `${parseInt(this.size / 4.5)}px`,
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
