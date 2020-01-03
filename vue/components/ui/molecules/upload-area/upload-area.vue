<template>
    <div
        class="upload-area"
        v-bind:class="{ dragOver: dragging }"
        v-on:dragover.stop.prevent="onDragOver($event)"
        v-on:drop.stop.prevent="onDrop($event)"
        v-on:dragenter.stop.prevent="setDragging(true)"
        v-on:dragend.stop.prevent="setDragging(false)"
        v-on:dragleave.stop.prevent="setDragging(false)"
    >
        <slot>
            <div class="area-container">
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
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.upload-area {
    transition: opacity 0.3s ease-in-out;
}

.upload-area.dragOver {
    opacity: 0.5;
}

.upload-area .area-container {
    align-items: center;
    border: dashed 2px $light-white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 150px;
    justify-content: center;
}

.upload-area.dragOver .area-container {
    pointer-events: none;
}

.upload-area .area-container .description {
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
        files: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {
            filesData: this.files,
            dragging: false,
            draggingOverCounter: 0
        };
    },
    methods: {
        setFiles(filesList) {
            if (!filesList || !filesList.length) return;

            this.filesData = [...filesList];
            this.$emit("update:files", this.filesData);
        },
        setDragging(dragging) {
            dragging ? this.draggingOverCounter++: this.draggingOverCounter--;

            this.dragging = Boolean(Math.max(this.draggingOverCounter));
        },
        onDragOver(event) {
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(event) {
            this.setFiles(event.dataTransfer.files);
            this.setDragging(false);
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
