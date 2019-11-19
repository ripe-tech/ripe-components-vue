<template>
    <modal-platforme
        v-bind:confirm-text="confirmText"
        v-bind:buttons-alignment="buttonsAlignment"
        v-bind:button-close="buttonClose"
        v-bind:cancel-text="cancelText"
        v-bind:global-events="globalEvents"
        v-bind:overlay="overlay"
        v-bind:overlay-leave="overlayLeave"
        v-bind:title="title"
        v-bind:sub-title="subTitle"
        v-bind:visible="visible"
        v-on:update:visible="onUpdateVisible"
        v-on:click:confirm="onConfirm"
        v-on:click:cancel="onCancel"
    >
        <p>{{ text }}</p>
    </modal-platforme>
</template>

<script>
export const AlertPlatforme = {
    name: "alert-platforme",
    data: function() {
        return {
            confirmText: null,
            cancelText: null,
            buttonsAlignment: null,
            buttonConfirm: true,
            buttonCancel: true,
            buttonClose: true,
            globalEvents: true,
            overlay: true,
            overlayLeave: true,
            title: null,
            subTitle: null,
            text: null,
            visible: false
        };
    },
    watch: {},
    mounted: function() {
        this.$bus.$on("alert", options => this.show(options));
    },
    methods: {
        show(options) {
            if (this.visible) return;

            const {
                confirmText,
                cancelText,
                buttonsAlignment,
                buttonConfirm,
                buttonCancel,
                buttonClose,
                globalEvents,
                overlay,
                overlayLeave,
                title,
                text,
                subTitle
            } = options;

            this.confirmText = confirmText || "Confirm";
            this.cancelText = cancelText || "Cancel";
            this.buttonsAlignment = buttonsAlignment;
            this.buttonConfirm = buttonConfirm;
            this.buttonCancel = buttonCancel;
            this.buttonClose = buttonClose;
            this.globalEvents = globalEvents;
            this.overlay = overlay;
            this.overlayLeave = overlayLeave;
            this.title = title;
            this.subTitle = subTitle;
            this.text = text;

            this.visible = true;
        },
        markDone(event) {
            this.$bus.$emit(event);
            this.visible = false;
        },
        onUpdateVisible(visible) {
            if (visible) return;
            this.markDone("alert_cancel");
        },
        onConfirm() {
            this.markDone("alert_confirm");
        },
        onCancel() {
            this.markDone("alert_cancel");
        }
    }
};

export default AlertPlatforme;
</script>
