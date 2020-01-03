<template>
    <div
        class="upload-area"
        v-bind:class="{ dragOver: isDraggingOver }"
        v-on:dragover.stop.prevent="onDragOver($event)"
        v-on:drop.stop.prevent="onDrop($event)"
        v-on:dragenter.stop.prevent="isDraggingOver = true"
        v-on:dragend.stop.prevent="isDraggingOver = false"
        v-on:dragleave.stop.prevent="isDraggingOver = false"
        v-on:drag-end.stop.prevent="isDraggingOver = false"
    >
        <slot>
            <div class="area-container">
                <div class="center">
                    <p class="description">
                        Drag & drop your files here or
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
            </div>
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.upload-area {
    opacity: 1;
    transition: 0.3s;
}

.upload-area.dragOver {
    opacity: 0.5;
    transition: 0.3s;
}

.upload-area .area-container {
    border: dashed 2px $light-white;
    border-radius: 8px;
    height: 150px;
    position: relative;
}

.upload-area.dragOver .area-container .center {
    pointer-events: none;
}

.upload-area .area-container .center {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.upload-area .area-container .center .description {
    color: $dark;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    margin: 0px 0px 22px 0px;
}

.upload-area .area-container .center .upload-button {
    width: 120px;
}
</style>

<script>
export const UploadArea = {
    name: "upload-area",
    props: {
        files: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {
            filesData: this.files,
            isDraggingOver: false
        };
    },
    methods: {
        emitUpdateFiles(value) {
            this.$emit("update:files", value);
        },
        selectFiles(filesList) {
            if (!filesList || !filesList.length) return;

            this.filesData = [...filesList];
            this.emitUpdateFiles(this.filesData);
        },
        onDragOver(event) {
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(event) {
            this.selectFiles(event.dataTransfer.files);
            this.isDraggingOver = false;
        },
        onFilesInputChange() {
            this.selectFiles(this.$refs.filesInput.files);
        },
        onUploadButtonClick() {
            this.$refs.filesInput.click();
        }
    }
};
export default UploadArea;
</script>
