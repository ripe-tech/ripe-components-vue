<template>
    <div class="upload-area">
        <slot name="drag-area-slot">
            <div class="area-container">
                <p class="description">Drag & drop your files here or</p>
                <button-color class="upload-button" v-bind:text="'Upload Files'" v-bind:icon="'cloud'" />
            </div>
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.upload-area .area-container {
    border-radius: 8px;
    border: dashed 2px $light-white;
    text-align: center;
}

</style>

<script>
export const UploadArea = {
    name: "upload-area",
    props: {
        helloText: {
            type: String,
            default: null
        }
    }
};
export default UploadArea;
</script>