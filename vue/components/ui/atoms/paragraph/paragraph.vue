<template>
    <p class="paragraph" v-bind:class="style" v-bind:for="target">
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
    name: "paragraph"
};

export default Paragraph;
</script>
