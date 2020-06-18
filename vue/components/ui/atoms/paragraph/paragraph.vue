<template>
    <p class="paragraph">
        <slot>{{ text }}</slot>
    </p>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.paragraph {
    color: $grey;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 20px;
}
</style>

<script>
export const Paragraph = {
    name: "paragraph",
    props: {
        text: {
            type: String,
            default: null
        }
    }
};

export default Paragraph;
</script>
