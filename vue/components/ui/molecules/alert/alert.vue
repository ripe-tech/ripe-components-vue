<template>
    <component
        v-bind="attrs"
        v-bind:confirm-text="confirmText"
        v-bind:confirm-icon="confirmIcon"
        v-bind:confirm-color="confirmColor"
        v-bind:buttons-alignment="buttonsAlignment"
        v-bind:button-close="buttonClose"
        v-bind:cancel-text="cancelText"
        v-bind:cancel-icon="cancelIcon"
        v-bind:cancel-color="cancelColor"
        v-bind:buttons-small="buttonsSmall"
        v-bind:global-events="globalEvents"
        v-bind:overlay="overlay"
        v-bind:overlay-leave="overlayLeave"
        v-bind:title="title"
        v-bind:sub-title="subTitle"
        v-bind:visible="visible"
        v-bind:loading="loading"
        v-bind:auto-hide="false"
        v-if="component"
        v-bind:is="component"
        v-bind:key="key"
        ref="component"
        v-on="listeners"
        v-on:update:visible="onUpdateVisible"
        v-on:click:confirm="onConfirm"
        v-on:click:cancel="onCancel"
    />
    <modal
        v-bind="attrs"
        v-bind:confirm-text="confirmText"
        v-bind:confirm-icon="confirmIcon"
        v-bind:confirm-color="confirmColor"
        v-bind:buttons-alignment="buttonsAlignment"
        v-bind:button-close="buttonClose"
        v-bind:cancel-text="cancelText"
        v-bind:cancel-icon="cancelIcon"
        v-bind:cancel-color="cancelColor"
        v-bind:buttons-small="buttonsSmall"
        v-bind:global-events="globalEvents"
        v-bind:overlay="overlay"
        v-bind:overlay-leave="overlayLeave"
        v-bind:title="title"
        v-bind:sub-title="subTitle"
        v-bind:visible="visible"
        v-bind:loading="loading"
        v-bind:auto-hide="false"
        v-else
        ref="modal"
        v-on="listeners"
        v-on:update:visible="onUpdateVisible"
        v-on:click:confirm="onConfirm"
        v-on:click:cancel="onCancel"
    >
        <p><span v-html="text" /></p>
    </modal>
</template>

<script>
export const Alert = {
    name: "alert",
    inheritAttrs: false,
    data: function() {
        return {
            attrs: null,
            listeners: null,
            component: null,
            confirmText: null,
            confirmIcon: null,
            confirmColor: null,
            cancelText: null,
            cancelIcon: null,
            cancelColor: null,
            buttonsSmall: true,
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
            loading: false,
            key: true
        };
    },
    mounted: function() {
        this.$bus.$on("alert", options => this.show(options));
        this.$bus.$on("alert:reset", options => this.reset());
    },
    methods: {
        show(options) {
            if (this.visible) return;

            const {
                listeners,
                component,
                confirmText,
                confirmIcon,
                confirmColor,
                cancelText,
                cancelIcon,
                cancelColor,
                buttonsAlignment,
                buttonConfirm,
                buttonCancel,
                buttonClose,
                buttonsSmall,
                globalEvents,
                overlay,
                overlayLeave,
                title,
                subTitle,
                text,
                task,
                reset = true,
                ...attrs
            } = options;

            this.attrs = attrs || {};
            this.listeners = listeners || {};
            this.confirmText = confirmText || "Confirm";
            this.confirmIcon = confirmIcon;
            this.confirmColor = confirmColor;
            this.cancelText = cancelText || "Cancel";
            this.cancelIcon = cancelIcon;
            this.cancelColor = cancelColor;
            this.buttonsAlignment = buttonsAlignment;
            this.buttonConfirm = buttonConfirm;
            this.buttonCancel = buttonCancel;
            this.buttonClose = buttonClose;
            this.buttonsSmall = buttonsSmall;
            this.globalEvents = globalEvents;
            this.overlay = overlay;
            this.overlayLeave = overlayLeave;
            this.title = title;
            this.subTitle = subTitle;
            this.text = text;
            this.task = task || null;

            this.visible = true;
            this.loading = false;
            this.component = component;

            // alternate the key to force the component
            // to be destroyed and mounted again
            if (reset) this.reset();
        },
        reset() {
            this.key = !this.key;
        },
        markDone(event) {
            this.$bus.$emit(event);
            this.visible = false;
        },
        getComponentRef() {
            return this.component ? this.$refs.component : this.$refs.modal;
        },
        async confirm() {
            if (this.task) {
                try {
                    this.loading = true;
                    await this.task(this, this.getComponentRef());
                } catch (err) {
                    console.err(err);
                }
            }
            this.markDone("alert:confirm");
        },
        async cancel() {
            this.markDone("alert:cancel");
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

export default Alert;
</script>
