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
        v-bind:loading="loading"
        v-bind:auto-hide="false"
        v-on:update:visible="onUpdateVisible"
        v-on:click:confirm="onConfirm"
        v-on:click:cancel="onCancel"
    >
        <p><span v-html="text" /></p>
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
            task: null,
            visible: false,
            loading: false
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
                subTitle,
                text,
                task
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
            this.task = task || null;

            this.visible = true;
            this.loading = false;
        },
        markDone(event) {
            this.$bus.$emit(event);
            this.visible = false;
        },
        async confirm() {
            if (this.task) {
                try {
                    this.loading = true;
                    await this.task(this);
                } catch (err) {
                    console.err(err);
                }
            }
            this.markDone("alert_confirm");
        },
        async cancel() {
            this.markDone("alert_cancel");
        },
        async onUpdateVisible(visible) {
            if (visible) return;
            await this.cancel();
        },
        async onConfirm() {
            await this.confirm();
        },
        async onCancel() {
            await this.cancel();
        }
    }
};

export default AlertPlatforme;
</script>
