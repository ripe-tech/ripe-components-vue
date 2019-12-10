<template>
    <h1>{{ hello }}</h1>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

</style>

<script>
export const RichTextareaPlatforme = {
    name: "rich-textarea-platforme",
    props: {
        hello: {
            type: String,
            default: null
        }
    }
};

export default RichTextareaPlatforme;
</script>
