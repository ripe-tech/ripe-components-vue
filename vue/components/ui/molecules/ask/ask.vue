<template>
    <div class="ask">
        <modal
            class="modal"
            v-bind:visible="visible"
            v-bind:title="titleData"
            v-bind:sub-title="subTitleData"
            ref="modal"
        >
            <div class="message" v-html="messageHtml" />
            <template v-slot:footer>
                <div class="buttons-container">
                    <div class="buttons">
                        <button-color
                            class="button button-ask-cancel"
                            v-bind:secondary="true"
                            v-bind:disabled="loading"
                            v-bind:text="buttonCancelData"
                            v-bind:color="buttonCancelColor"
                            v-if="buttonCancelData"
                            v-on:click="onCancelClick"
                        />
                        <button-color
                            class="button button-ask-confirm"
                            v-bind:text="buttonConfirmData"
                            v-bind:color="buttonConfirmColorData"
                            v-bind:loading="loading"
                            v-if="buttonConfirmData"
                            v-on:click="onConfirmClick"
                        />
                    </div>
                </div>
            </template>
        </modal>
    </div>
</template>

<style scoped>
.ask {
    position: absolute;
    z-index: 11;
}

.ask .message {
    color: #57626e;
    font-size: 15px;
    font-weight: 400;
    line-height: 22px;
    margin: 28px 0px 28px 0px;
}

.ask .modal ::v-deep .modal-container {
    max-width: 100%;
    min-width: 520px;
}

.ask .buttons-container {
    display: flex;
    font-size: 0px;
    justify-content: flex-end;
    margin-top: 15px;
}

.ask .buttons-container > .buttons > .button.button-secondary {
    min-width: auto;
}

.ask .buttons-container > .buttons > .button:first-of-type {
    margin: 0px 5px 0px 0px;
}
</style>

<script>
export const Ask = {
    name: "ask",
    props: {
        callback: {
            type: Function,
            default: null
        },
        operation: {
            type: Function,
            default: null
        },
        title: {
            type: String,
            default: "Title"
        },
        subTitle: {
            type: String,
            default: "Title"
        },
        message: {
            type: String,
            default: "Message"
        },
        buttonConfirm: {
            type: String,
            default: "Confirm"
        },
        buttonConfirmColor: {
            type: String,
            default: null
        },
        buttonCancel: {
            type: String,
            default: "Cancel"
        },
        buttonCancelColor: {
            type: String,
            default: null
        },
        global: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            callbackData: this.callback,
            operationData: this.operation,
            titleData: this.title,
            subTitleData: this.subTitle,
            messageData: this.message,
            buttonConfirmData: this.buttonConfirm,
            buttonConfirmColorData: this.buttonConfirmColor,
            buttonCancelData: this.buttonCancel,
            buttonCancelColorData: this.buttonCancelColor,
            loading: false,
            visible: false
        };
    },
    computed: {
        messageHtml() {
            if (!this.messageData) return this.messageData;
            return this.messageData.replace(/\n/g, "<br/>");
        }
    },
    mounted: function() {
        if (this.global) {
            this.$bus.$on("ask", options => {
                this.callbackData = options.callback || null;
                this.operationData = options.operation || null;
                this.titleData = options.title || "Title";
                this.subTitleData = options.subTitle || null;
                this.messageData = options.message || "Message";
                this.buttonConfirmData =
                    options.buttonConfirm === undefined ? "Confirm" : options.buttonConfirm;
                this.buttonConfirmColorData = options.buttonConfirmColor || null;
                this.buttonCancelData =
                    options.buttonCancel === undefined ? "Cancel" : options.buttonCancel;
                this.buttonCcancelColorData = options.buttonCancelColor || null;
                this.visible = true;
                this.$refs.modal.show();
            });
        }
    },
    methods: {
        async onCancelClick() {
            await this.willHideModal();
            this.visible = false;
            this.$refs.modal.hide();
        },
        async onConfirmClick() {
            this.loading = true;
            try {
                if (this.operationData) {
                    await this.operationData({ result: true });
                }
            } finally {
                this.loading = false;
                this.$refs.modal.hide();
            }
            if (this.callbackData) {
                this.callbackData({ result: true });
            }
        },
        async willHideModal() {
            if (this.callbackData) {
                this.callbackData({ result: false });
            }
        }
    }
};

export default Ask;
</script>
