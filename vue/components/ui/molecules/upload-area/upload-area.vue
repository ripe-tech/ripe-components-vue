<template>
    <div
        class="upload-area"
        v-on:dragover.stop.prevent="onDragOver($event)"
        v-on:drop.stop.prevent="onDrop($event)"
    >
        <slot name="drag-area-slot">
            <div class="area-container">
                <div class="center">
                    <p class="description">
                        Drag & drop your files here or
                    </p>
                    <button-color
                        class="upload-button"
                        v-bind:text="'Upload File'"
                        v-bind:icon="'cloud-upload'"
                        v-bind:alignment="'center'"
                    />
                </div>
            </div>
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.upload-area .area-container {
    border: dashed 2px $light-white;
    border-radius: 8px;
    height: 150px;
    position: relative;
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
    props: {},
    methods: {
        onDragOver(event) {
            event.dataTransfer.dropEffect = "copy";
        },
        onDrop(event) {
            const files = event.dataTransfer.files;
            if (!files || !files.length) return;

            console.log("Showing Files !");
            for (const file of files) {
                //TODO do stuff with files
                console.log(file.name);
            }
        }
    }
};
export default UploadArea;
</script>
