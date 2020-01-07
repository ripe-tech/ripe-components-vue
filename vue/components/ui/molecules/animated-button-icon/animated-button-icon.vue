<template>
    <div class="animated-button-icon" v-bind:class="{ 'not-animating': !animating }">
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
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.animated-button-icon {
    display: inline-block;
    position: relative;
}

.animated-button-icon.not-animating .button-icon-front {
    opacity: 1;
    pointer-events: auto;
    transition: none;
}

.animated-button-icon .button-icon-front {
    opacity: 0;
    transition: opacity 0.25s ease-in;
}

.animated-button-icon .button-icon-back {
    left: 0px;
    position: absolute;
    top: 0px;
    opacity: 1;
    pointer-events: auto;
    transition: none;
}

.animated-button-icon.not-animating .button-icon-back {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-in;
}
</style>

<script>
export const AnimatedButtonIcon = {
    name: "animated-button-icon",
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

export default AnimatedButtonIcon;
</script>
