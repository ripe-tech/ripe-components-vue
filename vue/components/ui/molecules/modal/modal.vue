<template>
    <transition name="fade">
        <div v-bind:class="['modal', className]" v-show="isVisible" v-bind:id="className">
            <global-events v-on:keydown.esc="handleGlobal" />
            <overlay
                v-bind:class="{ clickable: overlayLeave }"
                v-bind:visible="isVisible"
                v-if="overlay"
                ref="overlay"
                v-on:click="onOverlayClick"
            />
            <div class="modal-container" v-bind:style="modalContainerStyle" ref="modalSection">
                <div class="button button-close-container" v-if="buttonClose">
                    <slot name="button-close-content">
                        <button-icon
                            v-bind:icon="'close'"
                            v-bind:size="30"
                            v-on:click="handleClose"
                        />
                    </slot>
                </div>
                <h1 class="title" v-if="title">{{ title }}</h1>
                <h2 class="sub-title" v-if="subTitle">{{ subTitle }}</h2>
                <div class="modal-content" ref="content">
                    <slot />
                </div>
                <div
                    class="buttons-container"
                    v-bind:style="{ 'text-align': buttonsAlignment }"
                    ref="buttons"
                >
                    <slot name="buttons-content">
                        <button-color
                            v-bind:class="'button-cancel'"
                            v-bind:secondary="true"
                            v-bind:small="buttonsSmall"
                            v-bind:text="cancelText"
                            v-bind:color="cancelColor"
                            v-bind:icon="cancelIcon"
                            v-bind:disabled="loading || cancelDisabled"
                            v-if="buttonCancel && cancelText"
                            v-on:click="cancel"
                        />
                        <button-color
                            v-bind:class="'button-confirm'"
                            v-bind:small="buttonsSmall"
                            v-bind:text="confirmText"
                            v-bind:color="confirmColor"
                            v-bind:icon="confirmIcon"
                            v-bind:disabled="loading || confirmDisabled"
                            v-bind:loading="loading"
                            v-if="buttonConfirm && confirmText"
                            v-on:click="confirm"
                        />
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
@import "css/animations.scss";

.modal {
    bottom: 0px;
    left: 0px;
    opacity: 1;
    position: fixed;
    right: 0px;
    text-align: center;
    top: 0px;
    transition: opacity 0.25s;
    z-index: 40;
}

.modal > .overlay {
    z-index: 0;
}

.modal > .modal-container {
    animation: fade-grow-rise 0.35s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: $white;
    border-radius: 4px 4px 4px 4px;
    box-shadow: 0px 0px 24px $blacker;
    box-sizing: border-box;
    display: inline-block;
    max-height: 80%;
    max-height: 100%;
    max-width: 100%;
    opacity: 1;
    overflow-y: auto;
    padding: 20px 26px 20px 26px;
    position: relative;
    width: 460px;
}

body.tablet .modal > .modal-container,
body.mobile .modal > .modal-container {
    padding: 14px 20px 14px 20px;
}

.modal.fade-leave-active > .modal-container {
    animation: fade-shrink-visibility 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

.modal > .modal-container > .button.button-close-container {
    box-sizing: border-box;
    left: 0px;
    margin: auto;
    padding: 12px 14px 12px 14px;
    pointer-events: none;
    position: absolute;
    text-align: right;
    top: 0px;
    width: 100%;
}

.modal > .modal-container > .button.button-close-container ::v-deep .button-icon {
    pointer-events: all;
}

.modal > .modal-container > .buttons-container {
    user-select: none;
}

.modal > .modal-container > .buttons-container ::v-deep .button {
    margin: 0px 6px 0px 6px;
    min-width: 146px;
}

.modal > .modal-container > .buttons-container ::v-deep .button:first-child {
    margin-left: 0px;
}

.modal > .modal-container > .buttons-container ::v-deep .button:last-child {
    margin-right: 0px;
}

.modal > .modal-container > .title {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.5px;
    margin: 0px 0px 12px 0px;
    text-align: left;
}

.modal > .modal-container > .sub-title {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin: 0px 0px 12px 0px;
    text-align: left;
}

.modal > .modal-container > .modal-content {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.25px;
    line-height: 22px;
    margin: 22px 0px 26px 0px;
    text-align: left;
}
</style>

<script>
export const Modal = {
    name: "modal",
    props: {
        confirmText: {
            type: String,
            default: null
        },
        confirmIcon: {
            type: String,
            default: null
        },
        confirmColor: {
            type: String,
            default: ""
        },
        confirmDisabled: {
            type: Boolean,
            default: false
        },
        cancelText: {
            type: String,
            default: null
        },
        cancelIcon: {
            type: String,
            default: null
        },
        cancelColor: {
            type: String,
            default: ""
        },
        cancelDisabled: {
            type: Boolean,
            default: false
        },
        buttonsAlignment: {
            type: String,
            default: "center"
        },
        buttonConfirm: {
            type: Boolean,
            default: true
        },
        buttonCancel: {
            type: Boolean,
            default: true
        },
        buttonClose: {
            type: Boolean,
            default: true
        },
        buttonsSmall: {
            type: Boolean,
            default: true
        },
        globalEvents: {
            type: Boolean,
            default: true
        },
        autoHide: {
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
        },
        loading: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: null
        },
        minWidth: {
            type: Number,
            default: null
        }
    },
    computed: {
        className() {
            return this.name ? `modal-${this.name}` : null;
        },
        isVisible() {
            return this.visible && this.visibleData;
        },
        modalContainerStyle() {
            return {
                top: `${this.paddingTop}px`,
                width: this.width === null ? null : `${this.width}px`,
                "min-width": this.minWidth === null ? null : `${this.minWidth}px`
            };
        }
    },
    data: function() {
        return {
            visibleData: true,
            paddingTop: 0
        };
    },
    watch: {
        visible(value) {
            this.visibleData = value;
        },
        isVisible() {
            this.$nextTick(() => this.calculate());
        }
    },
    mounted: function() {
        this.$bus.$on("show-modal", modalName => {
            if (modalName !== this.name) return;
            this.show();
        });
        this.$bus.$on("hide-modal", modalName => {
            if (modalName !== this.name) return;
            this.hide();
        });
        this.$bus.$on("hide-global", () => {
            this.hide();
        });
        window.addEventListener("resize", this.onWindowResize);
        this._initObservers();
        this.calculate();
    },
    destroyed: function() {
        window.removeEventListener("resize", this.onWindowResize);
        this._destroyObservers();
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
        confirm() {
            this.$emit("click:confirm");
            if (this.autoHide) this.hide();
        },
        cancel() {
            this.$emit("click:cancel");
            if (this.autoHide) this.hide();
        },
        calculate() {
            if (this.$refs.modalSection.clientHeight === 0) return;
            this.paddingTop = window.innerHeight / 2 - this.$refs.modalSection.clientHeight / 2;
        },
        handleClose() {
            this.hide();
        },
        handleGlobal() {
            if (!this.globalEvents) return;
            this.hide();
        },
        onOverlayClick() {
            if (!this.overlayLeave) return;
            this.hide();
        },
        onWindowResize() {
            this.calculate();
        },
        onContentMutated(mutations) {
            this.calculate();
        },
        onButtonsMutated(mutations) {
            this.calculate();
        },
        _initObservers() {
            this.contentObserver = new MutationObserver(mutations =>
                this.onContentMutated(mutations)
            );
            this.buttonsObserver = new MutationObserver(mutations =>
                this.onButtonsMutated(mutations)
            );
            this.contentObserver.observe(this.$refs.content, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
            this.buttonsObserver.observe(this.$refs.buttons, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        },
        _destroyObservers() {
            if (this.contentObserver) this.contentObserver.disconnect();
            if (this.buttonsObserver) this.buttonsObserver.disconnect();
        }
    }
};

export default Modal;
</script>
