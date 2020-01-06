<template>
    <div
        class="upload-area"
        v-bind:class="{ dragging: dragging }"
        v-on:dragover.prevent="onDragOver($event)"
        v-on:drop.prevent="onDrop($event)"
        v-on:dragenter="onDragEnter($event)"
        v-on:dragleave="onDragLeave($event)"
    >
        <slot>
            <div class="upload-area-container">
                <p class="description">
                    {{ descriptionText }}
                </p>
                <input
                    type="file"
                    multiple
                    hidden
                    ref="filesInput"
                    v-on:change="onFilesInputChange()"
                />
                <button-color
                    class="upload-button"
                    v-bind:text="'Upload File'"
                    v-bind:icon="'cloud-upload'"
                    v-bind:alignment="'center'"
                    v-on:click="onUploadButtonClick()"
                />
            </div>
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.upload-area .upload-area-container {
    align-items: center;
    border: dashed 2px $light-white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 150px;
    justify-content: center;
    transition: opacity 0.125s ease-in;
}

.upload-area.dragging .upload-area-container {
    opacity: 0.3;
    pointer-events: none;
}

.upload-area .upload-area-container > .description {
    color: $dark;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    margin: 0px 0px 22px 0px;
}
</style>

<script>
export const UploadArea = {
    name: "upload-area",
    props: {
        description: {
            type: String,
            default: "Drag & drop your files"
        },
        descriptionDragging: {
            type: String,
            default: 'Just "drop" your files'
        },
        files: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        descriptionText() {
            return this.dragging ? this.descriptionDragging : this.description;
        }
    },
    data: function() {
        return {
            filesData: this.files,
            dragging: false,
            dragEnterTarget: null
        };
    },
    watch: {
        files(value) {
            this.filesData = value;
        }
    },
    methods: {
        setFiles(filesList) {
            this.filesData = [...filesList];
            this.$emit("update:files", this.filesData);
        },
        onDragOver(event) {
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(event) {
            this.setFiles(event.dataTransfer.files);
            this.dragging = false;
        },
        onDragEnter(event) {
            this.dragging = true;
        },
        onDragLeave(event) {
            // event was fired from a children, ignore
            if (event.currentTarget.contains(event.relatedTarget)) return false;
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
export default UploadArea;
</script>
