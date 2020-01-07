<template>
    <div class="animated-button-icon">
        <button-icon
            class="button button-icon-front"
            v-bind:icon="icon"
            v-bind:color="color"
            v-bind:size="size"
            v-bind:disabled="disabled"
            v-bind:class="{ visible: !clicked }"
            v-on:click="onClick"
        />
        <button-icon
            class="button button-icon-click"
            v-bind:icon="clickIcon"
            v-bind:color="color"
            v-bind:size="size"
            v-bind:disabled="true"
            v-bind:class="{ visible: clicked }"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.animated-button-icon {
    display: inline-block;
    position: relative;
}

.button {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.125s linear;
}

.button.visible {
    opacity: 1;
}

.button.button-icon-front.visible {
    pointer-events: auto;
}

.button.button-icon-click {
    left: 0px;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0px;
}

.button.button-icon-click.visible {
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
        clickIcon: {
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
            clicked: false
        };
    },
    methods: {
        onClick() {
            if (this.disabled || this.clicked) return;
            this.$emit("click");

            this.clicked = true;
            setTimeout(() => {
                this.clicked = false;
            }, this.animationTimeout);
        }
    }
};

export default AnimatedButtonIcon;
</script>
