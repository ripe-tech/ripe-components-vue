<template>
    <div class="button-icon-animated" v-bind:class="{ 'not-animating': !animating }">
        <button-icon
            class="button-icon-front"
            v-bind:icon="icon"
            v-bind:icon-opacity="iconOpacity"
            v-bind:icon-color="iconColor"
            v-bind:icon-fill="iconFill"
            v-bind:icon-stroke-width="iconStrokeWidth"
            v-bind:color="color"
            v-bind:size="size"
            v-bind:disabled="disabled"
            v-on:click="onClick"
        />
        <button-icon
            class="button-icon-back"
            v-bind:icon="animationIcon"
            v-bind:icon-opacity="iconOpacity"
            v-bind:icon-color="iconColor"
            v-bind:icon-fill="iconFill"
            v-bind:icon-stroke-width="iconStrokeWidth"
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
}

.button-icon-animated .button-icon-front {
    opacity: 0;
}

.button-icon-animated .button-icon-back {
    left: 0px;
    opacity: 1;
    pointer-events: auto;
    position: absolute;
    top: 0px;
}

.button-icon-animated.not-animating .button-icon-back {
    opacity: 0;
    pointer-events: none;
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
        iconOpacity: {
            type: Number,
            default: 0.5
        },
        iconColor: {
            type: String,
            default: null
        },
        iconFill: {
            type: String,
            default: null
        },
        iconStrokeWidth: {
            type: Number,
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
        disabled: {
            type: Boolean,
            default: false
        },
        animationTimeout: {
            type: Number,
            default: 7500
        }
    },
    data: function() {
        return {
            animating: false
        };
    },
    methods: {
        onClick(event) {
            this.$emit("click", event);
            this.animating = true;
            setTimeout(() => {
                this.animating = false;
            }, this.animationTimeout);
        }
    }
};

export default ButtonIconAnimated;
</script>
