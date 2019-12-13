<template>
    <img
        class="button button-icon"
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
    transition: background-color 0.15s ease-in-out;
    user-select: none;
    vertical-align: middle;
}

.button-icon:hover {
    background-color: $lighter-grey;
}

.button-icon.button-icon-white {
    background-color: $white;
}

.button-icon.button-icon-white:hover {
    background-color: $lighter-grey;
}

.button-icon.button-icon-grey {
    background-color: $lighter-grey;
}

.button-icon.button-icon-grey:hover {
    background-color: #dedede;
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
        }
    },
    computed: {
        iconPath() {
            return require(`./../../../../assets/icons/black/${this.icon}.svg`);
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
            const base = {};
            if (this.color) base["button-icon-" + this.color] = this.color;
            return base;
        }
    },
    methods: {
        handleClick() {
            this.$emit("click");
        }
    }
};

export default ButtonIcon;
</script>
