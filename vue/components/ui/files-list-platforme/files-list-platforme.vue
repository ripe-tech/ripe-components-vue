<template>
    <div class="files-list-container">
        <div class="files-title">
            <span>Files</span>
        </div>
        <div class="files-list">
            <div class="file-row" 
                v-for="file in filesItems"
                v-bind:key="file.name">
                {{ file.name}}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.files-list-container {
    background-color: $grey-6;
    border: solid 1px #e4e8f0;
}
.files-list-container .files-title {
    background-color: $white;
    border: solid 1px #e4e8f0;
    height: 42px;
}
.files-list-container .files-title span {
    color: $light-black;
    display: block;
    font-weight: bold;
    letter-spacing: 0.7px;
    line-height: 42px;
    margin: 0px 20px 0px 20px;
}
.files-list-container .files-list {
    overflow: auto;
}
</style>

<script>
export const FilesListPlatforme = {
    name: "files-list-platforme",
    props: {
        filesItems: {
            type: Array,
            default: () => []
        }
    }
};
export default FilesListPlatforme;
</script>