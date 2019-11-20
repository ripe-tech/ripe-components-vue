<template>
    <transition name="fade">
        <div class="overlay" v-show="isVisible" v-on:click="onClick" />
    </transition>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.overlay {
    background-color: rgba(0, 0, 0, 0.7);
    bottom: 0px;
    display: block;
    left: 0px;
    opacity: 1;
    position: fixed;
    right: 0px;
    top: 0px;
    transition: opacity 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>

<script>
export const OverlayPlatforme = {
    name: "overlay-platforme",
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        global: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            visibleData: !this.global
        };
    },
    computed: {
        isVisible() {
            return (this.visible || this.global) && this.visibleData;
        }
    },
    created: function() {
        this.$bus.$on("show-overlay", () => {
            if (!this.global) return;
            this.show();
        });
        this.$bus.$on("hide-overlay", () => {
            if (!this.global) return;
            this.hide();
        });
        this.$bus.$on("toggle-overlay", payLoad => {
            if (!this.global) return;
            this.toggle();
        });
    },
    methods: {
        show() {
            this.visibleData = true;
        },
        hide() {
            this.visibleData = false;
        },
        toggle() {
            this.visibleData = !this.visibleData;
        },
        onClick() {
            this.$bus.$emit("overlay-clicked");
            this.$emit("click");
        }
    }
};

export default OverlayPlatforme;
</script>
