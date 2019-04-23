<template>
    <transition name="fade">
        <div class="overlay" v-show="visible" v-on:click="onClick" />
    </transition>
</template>

<style scoped>
.overlay {
    background-color: #000000;
    bottom: 0px;
    display: block;
    left: 0px;
    opacity: 0.7;
    position: fixed;
    right: 0px;
    top: 0px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>

<script>
export const OverlayPlatforme = {
    data: function() {
        return {
            visible: false
        };
    },
    created: function() {
        this.$bus.$on("show-overlay", () => {
            this.visible = true;
        });
        this.$bus.$on("hide-overlay", () => {
            this.visible = false;
        });
        this.$bus.$on("toggle-overlay", payLoad => {
            this.visible = !this.visible;
        });
    },
    methods: {
        onClick() {
            this.$bus.$emit("overlay-clicked");
        }
    }
};

export default OverlayPlatforme;
</script>
