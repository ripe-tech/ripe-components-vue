<template>
    <transition name="fade">
        <div class="bubble" v-bind:style="style" v-show="isVisible" v-on:click.stop>
            <global-events v-on:keydown.esc="onHandleGlobal" v-on:click="onHandleGlobal" />
            <slot v-bind:hide="hide" />
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";
@import "css/variables.scss";
@import "css/animations.scss";

.bubble {
    animation: fade-grow-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: $white;
    border: 1px solid transparent;
    border: 1px solid $light-white;
    box-shadow: 0px 6px 24px 0px rgba(67, 86, 100, 0.15);
    line-height: 16px;
    position: absolute;
    right: 8px;
    text-align: left;
    top: 56px;
}

.bubble.fade-leave-active {
    animation: fade-shrink-visibility 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

body.mobile .bubble {
    left: 0px;
    right: 0px;
    top: 0px;
}
</style>

<script>
export const Bubble = {
    name: "bubble",
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        top: {
            type: Number,
            default: null
        },
        right: {
            type: Number,
            default: null
        },
        bottom: {
            type: Number,
            default: null
        },
        left: {
            type: Number,
            default: null
        },
        width: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            visibleData: true
        };
    },
    watch: {
        visible(value) {
            this.visibleData = value;
        }
    },
    computed: {
        isVisible() {
            return this.visible && this.visibleData;
        },
        style() {
            return {
                top: this.top === null ? null : `${this.top}px`,
                right: this.right === null ? null : `${this.right}px`,
                bottom: this.bottom === null ? null : `${this.bottom}px`,
                left: this.left === null ? null : `${this.left}px`,
                width: this.width === null ? null : `${this.width}px`
            };
        }
    },
    methods: {
        hide() {
            if (!this.visibleData) return;
            this.visibleData = false;
            this.$emit("update:visible", this.visibleData);
        },
        onHandleGlobal() {
            this.hide();
        }
    }
};

export default Bubble;
</script>
