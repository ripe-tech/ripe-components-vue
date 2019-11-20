<template>
    <label class="label" v-bind:class="{ 'label-small': small }" v-bind:for="target">{{
        text
    }}</label>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.label {
    color: #57626e;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 15px;
}

.label.label-small {
    color: #a4adb5;
    font-size: 11px;
    line-height: 13px;
}
</style>

<script>
export const LabelPlatforme = {
    props: {
        text: {
            type: String,
            mandatory: true
        },
        small: {
            type: Boolean,
            default: false
        },
        target: {
            type: String,
            default: null
        }
    }
};

export default LabelPlatforme;
</script>
