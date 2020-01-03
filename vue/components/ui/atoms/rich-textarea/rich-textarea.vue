<template>
    <div class="rich-textarea" v-bind:class="classes" v-on:click="onClick">
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
        />
        <div class="options">
            <div
                class="attachment"
                v-bind:title="attachment.name"
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
                    v-on:click="onRemoveAttachmentButtonClick(index)"
                />
            </div>
            <input
                type="file"
                multiple
                hidden
                ref="attachmentsInput"
                v-on:change="onAttachmentsInputChange()"
            />
            <button-icon
                class="button-attachment"
                v-bind:disabled="disabled"
                v-bind:icon="'clip'"
                v-if="attachment"
                v-on:click="onAttachmentClick()"
            />
            <button-icon
                class="button-smile"
                v-bind:disabled="disabled"
                v-bind:icon="'happy-face'"
                v-if="smile"
                v-on:click="onSmileClick()"
            />
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

.rich-textarea:focus-within {
    border-color: $aqcua-blue;
}

.rich-textarea .textarea,
.rich-textarea .textarea:focus,
.rich-textarea .textarea:hover,
.rich-textarea .textarea:disabled {
    background-color: transparent;
    border: none;
    border-radius: 6px 6px 0px 0px;
    height: 56px;
    width: 100%;
}

.rich-textarea.disabled {
    opacity: 0.4;
}

.rich-textarea .options {
    background: #fafafa;
    border-radius: 0px 0px 6px 6px;
    border-top: 1px solid #e4e8f0;
    padding: 6px 12px 6px 12px;
}

.rich-textarea .options .attachment {
    background-color: $white;
    border: 1px solid $light-white;
    display: flex;
    line-height: 20px;
    width: 33%;
}

.rich-textarea .options .attachment .attachment-name {
    cursor: default;
    flex: 1 0;
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.rich-textarea.border-strong .options {
    border-width: 2px;
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
        }
    },
    methods: {
        focusTextarea() {
            this.$refs.textarea.focus();
        },
        addAttachments(fileList) {
            this.attachmentsData = (this.attachmentsData || []).concat([...fileList]);
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
        }
    }
};

export default RichTextarea;
</script>
