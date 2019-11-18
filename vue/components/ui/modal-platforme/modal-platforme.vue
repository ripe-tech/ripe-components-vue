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
        <div v-bind:class="['modal', className]" v-show="isVisible" v-bind:id="className">
            <global-events v-on:keydown.esc="hide" />
            <div
                class="modal-overlay"
                v-bind:class="{ clickable: overlayLeave }"
                v-if="overlay"
                v-on:click="overlayLeave && hide()"
            />
            <div class="modal-container">
                <div class="button button-close" v-if="buttonClose" v-on:click="hide()">
                    <slot name="button-close-content">
                        <img src="~./assets/close.svg" />
                    </slot>
                </div>
                <h1 class="title" v-if="title">{{ title }}</h1>
                <h2 class="sub-title" v-if="subTitle">{{ subTitle }}</h2>
                <div class="modal-content">
                    <slot />
                </div>
                <div class="buttons-container">
                    <div
                        class="button button-color button-color-secondary button-cancel"
                        v-if="cancelText"
                        v-on:click="cancel"
                    >
                        {{ cancelText }}
                    </div>
                    <div
                        class="button button-color button-apply"
                        v-if="applyText"
                        v-on:click="apply"
                    >
                        {{ applyText }}
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.modal {
    bottom: 0px;
    left: 0px;
    opacity: 1;
    position: fixed;
    right: 0px;
    text-align: center;
    top: 0px;
    transition: opacity 0.125s ease-in-out;
    z-index: 10;
}

.modal.fade-enter,
.modal.fade-leave-to {
    opacity: 0;
}

.modal.fade-leave-active {
    transition-delay: 0.25s;
}

.modal.fade-enter-to {
    opacity: 1;
}

.modal > .modal-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    left: 0px;
    position: absolute;
    top: 0px;
    width: 100%;
}

.modal > .modal-container {
    background-color: #ffffff;
    border-radius: 4px 4px 4px 4px;
    box-shadow: 0px 0px 12px #2d2d2d;
    display: inline-block;
    max-height: 80%;
    opacity: 1;
    overflow-y: auto;
    padding: 40px 40px 40px 40px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    transition: opacity 0.125s ease-out 0.125s, transform 0.25s ease-in-out 0.125s;
}

body.tablet .modal > .modal-container,
body.mobile .modal > .modal-container {
    box-sizing: border-box;
    max-height: 90%;
    max-width: 100%;
    padding: 20px 10px 20px 10px;
}

.modal.fade-enter > .modal-container,
.modal.fade-leave-to > .modal-container {
    opacity: 0;
    transform: translateY(-48%);
}

.modal.fade-enter-to > .modal-container {
    opacity: 1;
    transform: translateY(-50%);
}

.modal > .modal-container > .button.button-close {
    left: 0px;
    margin: auto;
    padding: 5px 5px 5px 5px;
    position: absolute;
    text-align: left;
    top: 0px;
}

.modal > .modal-container > .button.button-close > img {
    height: 25px;
    margin: auto;
    vertical-align: middle;
    width: 25px;
}

body.mobile .modal > .modal-container > .button.button-close > img {
    height: 15px;
    width: 15px;
}

.modal > .modal-container > .modal-content {
    opacity: 1;
    transition: opacity 0.25s ease-in-out 0.125s;
}

.modal.fade-enter > .modal-container > .modal-content,
.modal.fade-leave-to > .modal-container > .modal-content {
    opacity: 0;
}

.modal.fade-enter-to > .modal-container > .modal-content {
    opacity: 1;
}

.modal > .modal-container > .buttons-container > .button {
    display: inline-block;
}

.modal > .modal-container > .buttons-container > .button.button-cancel {
    margin-right: 20px;
}
</style>

<script>
export const ModalPlatforme = {
    name: "modal-platforme",
    props: {
        applyText: {
            type: String,
            default: null
        },
        buttonClose: {
            type: Boolean,
            default: true
        },
        cancelText: {
            type: String,
            default: null
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
        title: {
            type: String,
            default: null
        },
        subTitle: {
            type: String,
            default: null
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
            visibleData: true
        };
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
        apply() {
            this.$emit("click:apply");
            this.hide();
        },
        cancel() {
            this.$emit("click:cancel");
            this.hide();
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
