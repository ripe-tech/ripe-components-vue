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
            <div class="selected-attachments-container">                    
                <div v-for="(attachment, index) in attachmentsData" v-bind:key="index">
                    {{ attachment.name }}
                </div>
            </div>
            <input type="file" ref="attachmentsInput" v-on:change="onAttachmentsInputChange()" multiple hidden>
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

.rich-textarea .options .selected-attachments-container{
    font-size: 14px;
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
            type: FileList,
            default: null
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
        emitUpdateAttachments(value) {
            this.$emit("update:attachments", value);
        },
        focusTextarea() {
            this.$refs.textarea.focus();
        },
        onClick() {
            this.focusTextarea();
        },
        onAttachmentClick() {
            this.$refs.attachmentsInput.click();
        },
        onAttachmentsInputChange() {
            this.emitUpdateAttachments(this.$refs.attachmentsInput.files);
        },
        onSmileClick() {
            this.$emit("click:smile");
        }
    }
};

export default RichTextarea;
</script>
