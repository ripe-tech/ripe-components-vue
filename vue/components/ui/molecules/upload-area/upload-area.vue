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
                <transition name="fade-in" mode="out-in">
                    <p class="description" v-bind:key="dragging">
                        {{ descriptionText }}
                    </p>
                </transition>
                <button-icon v-bind:icon="'cloud-upload'" v-bind:size="110" />
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
    position: relative;
    transition: background-color 0.125s ease-in, border-color 0.125s ease-in;
}

.upload-area.dragging .upload-area-container {
    background-color: $selected-color;
    border-color: $label-color;
    pointer-events: none;
}

.upload-area .upload-area-container > .description {
    color: $dark;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    margin: 0px 0px 8px 0px;
}

.fade-in-enter-active {
    transition: all 0.125s ease-in-out;
}

.fade-in-leave-active {
    transition: all 0.125s ease-in-out;
}

.fade-in-enter,
.fade-in-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.upload-area .upload-area-container .button-icon {
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 40px;
    transform: none;
    transition: opacity 0.125s ease-in;
}

.upload-area.dragging .upload-area-container .button-icon {
    animation: zoom 2.5s ease-in-out infinite;
    height: 40px;
    opacity: 1;
}

@keyframes zoom {

    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.upload-area .upload-area-container .upload-button {
    transition: opacity 0.125s ease-in, background-color 0.125s ease-in, border-color 0.125s ease-in;
}

.upload-area.dragging .upload-area-container .upload-button {
    opacity: 0;
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
            default: "Drop your files to upload"
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
