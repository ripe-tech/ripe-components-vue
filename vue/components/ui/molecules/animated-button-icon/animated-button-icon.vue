<template>
    <div class="animated-button-icon">
        <button-icon
            class="button-icon-front"
            v-bind:icon="icon"
            v-bind:color="color"
            v-bind:size="size"
            v-bind:disabled="disabled"
            v-bind:class="{ visible: !animating }"
            v-on:click="onClick"
        />
        <button-icon
            class="button-icon-back"
            v-bind:icon="animationIcon"
            v-bind:color="color"
            v-bind:size="size"
            v-bind:class="{ visible: animating }"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.animated-button-icon {
    display: inline-block;
    position: relative;
}

.button-icon-front,
.button-icon-back {
    pointer-events: none;
    transition: opacity 0.125s linear;
}

.button-icon-front {
    opacity: 0;
}

.button-icon-front.visible {
    opacity: 1;
    pointer-events: auto;
}

.button-icon-back {
    left: 0px;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0px;
}

.button-icon-back.visible {
    opacity: 1;
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
            if (this.disabled) return;
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
