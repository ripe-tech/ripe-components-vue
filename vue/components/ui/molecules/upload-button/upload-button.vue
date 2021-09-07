<template>
    <div
        class="upload-button"
        v-bind:class="classes"
        v-on:dragover.prevent="event => onDragOver(event)"
        v-on:drop.prevent="event => onDrop(event)"
        v-on:dragenter="event => onDragEnter(event)"
        v-on:dragleave="event => onDragLeave(event)"
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

.upload-button.disabled > .button-upload {
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
export const UploadButton = {
    name: "upload-button",
    props: {
        buttonText: {
            type: String,
            default: "Upload Files"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        files: {
            type: Array,
            default: () => []
        },
        multiple: {
            type: Boolean,
            default: true
        },
        accept: {
            type: String,
            default: null
        }
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
    data: function() {
        return {
            filesData: this.files,
            dragging: false,
            draggingDisabled: false,
            dragEnterTarget: null
        };
    },
    watch: {
        files(value) {
            if (!value || value.length === 0) this.clear();
            this.filesData = value;
        },
        dragging(value) {
            this.$emit("update:dragging", value);
        }
    },
    methods: {
        setFiles(filesList) {
            this.filesData = [...filesList];
            this.$emit("update:files", this.filesData);
        },
        clear() {
            this.$refs.filesInput.value = null;
        },
        openModal() {
            this.$refs.filesInput.click();
        },
        onDragOver(event) {
            if (this.disabled) return;
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(event) {
            if (this.disabled) return;
            this.setFiles(event.dataTransfer.files);
            this.dragging = false;
        },
        onDragEnter(event) {
            if (this.disabled) {
                this.draggingDisabled = true;
                return;
            }
            this.dragging = true;
        },
        onDragLeave(event) {
            if (event.currentTarget.contains(event.relatedTarget)) return false;
            if (this.disabled) this.draggingDisabled = false;
            this.dragging = false;
        },
        onFilesInputChange() {
            this.setFiles(this.$refs.filesInput.files);
        },
        onUploadButtonClick() {
            this.$refs.filesInput.click();
        }
    }
};
export default UploadButton;
</script>
