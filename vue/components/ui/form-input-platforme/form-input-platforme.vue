<template>
    <div class="form-input">
        <label-platforme class="header" v-bind:text="header" v-bind:for="id" v-if="header" />
        <slot />
        <label-platforme
            class="footer"
            v-bind:size="'small'"
            v-bind:text="footer"
            v-bind:for="id"
            v-if="footer"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.label {
    display: block;
}

.header {
    margin-bottom: 7px;
}

.footer {
    color: $medium-grey;
    margin-top: 4px;
}
</style>

<script>
export const FormInputPlatforme = {
    name: "form-input-platforme",
    props: {
        id: {
            type: String,
            default: null
        },
        header: {
            type: String,
            default: null
        },
        footer: {
            type: String,
            default: null
        }
    }
};

export default FormInputPlatforme;
</script>
