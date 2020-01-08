<template>
    <div class="button-icon-animated" v-bind:class="{ 'not-animating': !animating }">
        <button-icon
            class="button-icon-front"
            v-bind:icon="icon"
            v-bind:color="color"
            v-bind:size="size"
            v-bind:disabled="disabled"
            v-on:click="onClick"
        />
        <button-icon
            class="button-icon-back"
            v-bind:icon="animationIcon"
            v-bind:color="color"
            v-bind:size="size"
            v-bind:disabled="disabled"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-icon-animated {
    display: inline-block;
    position: relative;
}

.button-icon-animated.not-animating .button-icon-front {
    opacity: 1;
    pointer-events: auto;
    transition: none;
}

.button-icon-animated .button-icon-front {
    opacity: 0;
    transition: opacity 0.25s ease-in;
}

.button-icon-animated .button-icon-back {
    left: 0px;
    opacity: 1;
    pointer-events: auto;
    position: absolute;
    top: 0px;
    transition: none;
}

.button-icon-animated.not-animating .button-icon-back {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-in;
}
</style>

<script>
export const ButtonIconAnimated = {
    name: "button-icon-animated",
    props: {
        icon: {
            type: String,
            mandatory: true
        },
        animationIcon: {
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
        },
        animationTimeout: {
            type: Number,
            default: 500
        }
    },
    data: function() {
        return {
            animating: false
        };
    },
    methods: {
        onClick() {
            this.$emit("click");

            this.animating = true;
            setTimeout(() => {
                this.animating = false;
            }, this.animationTimeout);
        }
    }
};

export default ButtonIconAnimated;
</script>
