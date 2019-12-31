<template>
    <div class="upload-area">
        <p> {{ helloText }} </p>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
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