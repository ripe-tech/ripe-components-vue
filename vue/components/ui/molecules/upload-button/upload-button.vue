<template>
    <div
        class="upload-button"
        v-bind:class="classes"
        v-on:dragover.prevent="onDragOver"
        v-on:drop.prevent="onDrop"
        v-on:dragenter="onDragEnter"
        v-on:dragleave="onDragLeave"
    >
        <input
            type="file"
            hidden
            v-bind:multiple="multiple"
            v-bind:accept="accept"
            ref="filesInput"
            v-on:change="onFilesInputChange"
        />
        <slot v-bind:open-modal="openModal" />
        <button-color
            class="button-upload"
            v-bind:text="buttonText"
            v-bind:icon="'cloud-upload'"
            v-bind:alignment="'center'"
            v-bind:disabled="disabled"
            v-on:click="onUploadButtonClick"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.upload-button {
    display: inline-block;
}

.upload-button.disabled.dragging > .button-upload {
    cursor: not-allowed;
}

.upload-button > .button-upload {
    transition: opacity 0.125s ease-in;
    z-index: 1;
}

.upload-button.dragging > .button-upload {
    opacity: 0.6;
}
</style>

<script>
import { uploadMixin } from "../../../../mixins/upload";

export const UploadButton = {
    name: "upload-button",
    mixins: [uploadMixin],
    props: {
        buttonText: {
            type: String,
            default: "Upload Files"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: true
        },
        accept: {
            type: String,
            default: null
        },
        draggable: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            fileInputRef: this.$refs.filesInput
        };
    },
    mounted: function() {
        this.fileInputRef = this.$refs.filesInput;
    },
    computed: {
        classes() {
            const base = {
                dragging: this.dragging,
                disabled: this.draggingDisabled
            };
            return base;
        }
    },
    watch: {
        files(value) {
            if (!value || value.length === 0) this.clear();
            this.filesData = value;
        },
        dragging(value) {
            this.$emit("update:dragging", value);
        }
    }
};
export default UploadButton;
</script>
