<template>
    <div
        class="button-upload"
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
            v-bind:text="buttonText || buttonTextComputed"
            v-bind:icon="'cloud-upload'"
            v-bind:alignment="'center'"
            v-bind:disabled="disabled"
            v-on:click="onUploadButtonClick"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-upload {
    display: inline-block;
}

.button-upload.disabled.dragging > .button-upload {
    cursor: not-allowed;
}

.button-upload > .button-upload {
    transition: opacity 0.125s ease-in;
    z-index: 1;
}

.button-upload.dragging > .button-upload {
    opacity: 0.6;
}
</style>

<script>
import { uploadMixin } from "../../../../mixins/upload";

export const ButtonUpload = {
    name: "button-upload",
    mixins: [uploadMixin],
    props: {
        buttonText: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
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
    mounted: function() {
        this.initUploadArea(this.$refs.filesInput);
    },
    computed: {
        classes() {
            const base = {
                dragging: this.dragging,
                disabled: this.draggingDisabled
            };
            return base;
        },
        buttonTextComputed() {
            if (this.multiple) return "Upload Files";
            return "Upload File";
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
export default ButtonUpload;
</script>
