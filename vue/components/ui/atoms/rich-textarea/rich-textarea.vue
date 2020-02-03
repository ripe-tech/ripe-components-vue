<template>
    <div class="rich-textarea" v-bind:style="style" v-bind:class="classes" v-on:click="onClick">
        <div class="textarea-container">
            <textarea-ripe
                class="textarea"
                v-bind:variant="variant"
                v-bind:border="border"
                v-bind:value.sync="valueData"
                v-bind:placeholder="placeholder"
                v-bind:disabled="disabled"
                v-bind:resize="resize"
                v-bind:id="id"
                ref="textarea"
                v-on:focus="onTextareaFocus"
                v-on:blur="onTextareaBlur"
            />
            <button-icon
                class="send-button"
                v-bind:disabled="disabled || sendButtonDisabled"
                v-bind:text="'Send message'"
                v-bind:small="true"
                v-bind:icon="'send'"
                v-bind:padding-left="12"
                v-bind:padding-right="10"
                v-on:click="onSendMessageClick"
            />
        </div>
        <div class="options">
            <input
                type="file"
                multiple
                hidden
                ref="attachmentsInput"
                v-on:change="onAttachmentsInputChange"
            />
            <div class="attachments" v-show="attachments.length > 0">
                <div
                    class="attachment"
                    v-for="(attachment, index) in attachmentsData"
                    v-bind:key="index"
                >
                    <div class="attachment-name">
                        {{ attachment.name }}
                    </div>
                    <button-icon
                        class="button-remove-attachment"
                        v-bind:size="20"
                        v-bind:icon="'close'"
                        v-on:click="() => onRemoveAttachmentButtonClick(index)"
                    />
                </div>
            </div>
            <div class="buttons">
                <button-icon
                    class="button-attachment"
                    v-bind:disabled="disabled"
                    v-bind:icon="'clip'"
                    v-if="attachment"
                    v-on:click="onAttachmentClick"
                />
                <button-icon
                    class="button-smile"
                    v-bind:disabled="disabled"
                    v-bind:icon="'happy-face'"
                    v-if="smile"
                    v-on:click="onSmileClick"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.rich-textarea {
    background-color: $white;
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    display: inline-block;
    font-size: 0px;
    padding: 0px 0px 0px 0px;
    width: 100%;
}

.rich-textarea.border-strong {
    border-width: 2px;
}

.rich-textarea:active:not(.disabled),
.rich-textarea:focus-within {
    border-color: $aqcua-blue;
}

.rich-textarea.disabled {
    opacity: 0.4;
}

.rich-textarea > .textarea-container {
    position: relative;
}

.rich-textarea > .textarea-container > .textarea,
.rich-textarea > .textarea-container > .textarea:focus,
.rich-textarea > .textarea-container > .textarea:hover,
.rich-textarea > .textarea-container > .textarea:disabled {
    background-color: transparent;
    border: none;
    border-radius: 6px 6px 0px 0px;
    height: 56px;
    width: 100%;
}

.rich-textarea > .textarea-container > .send-button {
    bottom: 12px;
    position: absolute;
    right: 12px;
}

.rich-textarea > .options {
    background: #fafafa;
    border-radius: 0px 0px 6px 6px;
    border-top: 1px solid #e4e8f0;
    padding: 6px 12px 6px 12px;
}

.rich-textarea.border-strong > .options {
    border-width: 2px;
}

.rich-textarea > .options > .attachments {
    display: inline-block;
    margin-bottom: 6px;
    max-height: 200px;
    min-width: 160px;
    overflow-y: auto;
}

.rich-textarea > .options > .attachments > .attachment {
    background-color: $white;
    border: 1px solid $light-white;
    border-top: none;
    display: flex;
    font-weight: 600;
    line-height: 20px;
    padding: 4px 2px 4px 8px;
}

.rich-textarea > .options > .attachments > .attachment:first-child {
    border-top: 1px solid $light-white;
}

.rich-textarea > .options > .attachments > .attachment > .attachment-name {
    flex: 1 0;
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
}

.rich-textarea > .options > .attachments > .attachment > .button-remove-attachment {
    display: inline-flex;
}
</style>

<script>
export const RichTextarea = {
    name: "rich-textarea",
    props: {
        id: {
            type: String,
            default: null
        },
        variant: {
            type: String,
            default: null
        },
        border: {
            type: String,
            default: "thin"
        },
        value: {
            type: String,
            default: null
        },
        attachments: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        sendButtonDisabled: {
            type: Boolean,
            default: false
        },
        resize: {
            type: Boolean,
            default: true
        },
        attachment: {
            type: Boolean,
            default: true
        },
        smile: {
            type: Boolean,
            default: true
        },
        width: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            valueData: this.value,
            attachmentsData: this.attachments
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        attachments(value) {
            this.attachmentsData = value;
        },
        valueData(value) {
            this.$emit("update:value", value);
        }
    },
    computed: {
        classes() {
            const base = { disabled: this.disabled };
            if (this.variant) base[this.variant] = true;
            if (this.border) base[`border-${this.border}`] = true;
            return base;
        },
        style() {
            const base = {};
            if (this.width !== null) base.width = `${this.width}px`;
            return base;
        }
    },
    methods: {
        focusTextarea() {
            this.$refs.textarea.focus();
        },
        addAttachments(attachments) {
            this.attachmentsData = (this.attachmentsData || []).concat([...attachments]);
            this.$emit("update:attachments", this.attachmentsData);
        },
        removeAttachment(index) {
            this.attachmentsData.splice(index, 1);
            this.$emit("update:attachments", this.attachmentsData);
        },
        onClick() {
            this.focusTextarea();
        },
        onRemoveAttachmentButtonClick(index) {
            this.removeAttachment(index);
        },
        onAttachmentClick() {
            this.$refs.attachmentsInput.click();
        },
        onAttachmentsInputChange() {
            this.addAttachments(this.$refs.attachmentsInput.files);
        },
        onSmileClick() {
            this.$emit("click:smile");
        },
        onTextareaFocus() {
            this.$emit("focus:textarea");
        },
        onTextareaBlur() {
            this.$emit("blur:textarea");
        },
        onSendMessageClick() {
            this.$emit("click:send-message");
        }
    }
};

export default RichTextarea;
</script>
