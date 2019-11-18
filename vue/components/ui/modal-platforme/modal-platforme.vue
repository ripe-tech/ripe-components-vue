<template>
    <transition
        name="fade"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
    >
        <div v-bind:class="['modal', className]" v-show="visible" v-bind:id="className">
            <global-events v-on:keydown.esc="hide" />
            <div class="modal-overlay" v-bind:class="{ clickable: overlayLeave }" v-if="overlay" v-on:click="overlayLeave && hide()" />
            <div class="modal-container">
                <div class="button button-close" v-if="buttonClose" v-on:click="hide()">
                    <img src="~./assets/close.svg" />
                </div>
                <div class="modal-content">
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const ModalPlatforme = {
    name: "modal-platforme",
    props: {
        buttonClose: {
            type: Boolean,
            default: true
        },
        globalEvents: {
            type: Boolean,
            default: true
        },
        name: {
            type: String,
            mandatory: true
        },
        overlay: {
            type: Boolean,
            default: true
        },
        overlayLeave: {
            type: Boolean,
            default: true
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        className() {
            return `modal-${name}`;
        },
        isVisible() {
            return this.visible && this.visibleData;
        }
    },
    data: function() {
        return {
            visibleData: false
        }
    },
    watch: {
        visible(value) {
            this.visibleData = value;
        }
    },
    methods: {
        show() {
            if (this.visibleData) return;
            this.visibleData = true;
            this.$emit("update:visible", this.visibleData);
        },
        hide() {
            if (!this.visibleData) return;
            this.visibleData = false;
            this.$emit("update:visible", this.visibleData);
        },
        handleGlobal() {
            if (!this.globalEvents) return;
            this.hide();
        },
        beforeEnter() {
            this.$emit("before_enter");
        },
        enter() {
            this.$emit("enter");
        },
        afterEnter() {
            this.$emit("after_enter");
        },
        enterCancelled() {
            this.$emit("enter_cancelled");
        },
        beforeLeave() {
            this.$emit("before_leave");
        },
        leave() {
            this.$emit("leave");
        },
        afterLeave() {
            this.$emit("after_leave");
        },
        leaveCancelled() {
            this.$emit("leave_cancelled");
        }
    }
};

export default ModalPlatforme;
</script>
