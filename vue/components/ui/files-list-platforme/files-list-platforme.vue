<template>
    <h1>{{ hello }}</h1>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
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