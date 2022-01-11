<template>
    <div class="section">
        <div class="title" v-if="title">
            <slot name="title">
                {{ title }}
            </slot>
        </div>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";

.section {
    border-top: 1px solid $light-white;
    padding-bottom: 24px;
    padding-top: 24px;
}

.section > .title {
    color: $black;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.35px;
    margin-bottom: 30px;
    text-transform: uppercase;
}

.section > .form-input,
.section > .description {
    margin-bottom: 24px;
    margin-top: 0px;
}

.section > .form-input:last-child,
.section > .description:last-child {
    margin-bottom: 0px;
}
</style>

<script>
export const Section = {
    name: "section-ripe",
    props: {
        title: {
            type: String,
            default: null
        }
    }
};

export default Section;
</script>
