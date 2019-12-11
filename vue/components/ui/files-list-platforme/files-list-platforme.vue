<template>
    <div class="files-list-container">
        <div class="files-title">
            <span>Files</span>
        </div>
        <div class="files-list">
            <p>File 1</p>
            <p>File 2</p>
            <p>File 3</p>
            <p>File 4</p>
            <p>File 5</p>
            <p>File 6</p>
            <p>File 7</p>
            <p>File 8</p>
            <p>File 9</p>
            <p>File 10</p>
            <p>File 11</p>
            <p>File 12</p>
            <p>File 13</p>
            <p>File 14</p>
            <p>File 15</p>
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
        hello: {
            type: String,
            default: null
        }
    }
};
export default FilesListPlatforme;
</script>