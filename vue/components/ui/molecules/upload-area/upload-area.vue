<template>
    <div
        class="upload-area"
        v-bind:class="{ dragging: dragging }"
        v-on:dragover.prevent="onDragOver($event)"
        v-on:drop.prevent="onDrop($event)"
        v-on:dragenter="onDragEnter"
        v-on:dragend="onDragEnd"
        v-on:dragleave="onDragLeave"
    >
        <slot>
            <div class="upload-area-container">
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
    pointer-events: none;
    opacity: 0.3;
}

.upload-area .upload-area-container .description {
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
    watch: {
        files(value) {
            this.filesData = value;
        }
    },
    methods: {
        setFiles(filesList) {
            if (!filesList) return;

            this.filesData = [...filesList];
            this.$emit("update:files", this.filesData);
        },
        setDragging(dragging) {
            console.log("setDragging", dragging, this.draggingOverCounter, Math.max(this.draggingOverCounter));
            dragging ? this.draggingOverCounter++ : this.draggingOverCounter--;

            this.dragging = Boolean(Math.max(this.draggingOverCounter));
        },
        onDragOver(event) {
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(event) {
            this.setFiles(event.dataTransfer.files);
            this.setDragging(false);
        },
        onDragEnter() {
            console.log("onDragEnter");
            this.setDragging(true);
        },
        onDragEnd() {
            console.log("onDragEnd");
            this.setDragging(false);
        },
        onDragLeave() {
            console.log("onDragLeave");
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
