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
        <div class="text-container">
            <div class="text" v-if="error">
                <span class="icon icon-error" />
                <label-platforme v-bind:text="error" v-bind:color="'error'" />
            </div>
            <div class="text" v-if="warning">
                <span class="icon icon-warning" />
                <label-platforme v-bind:text="warning" />
            </div>
            <div class="text" v-if="success">
                <span class="icon icon-success" />
                <label-platforme v-bind:text="success" v-bind:color="'success'" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.form-input .header,
.form-input .footer {
    display: block;
}

.form-input .header {
    margin-bottom: 6px;
}

.form-input .footer {
    color: $medium-grey;
    margin-top: 4px;
}

.form-input .icon {
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    height: 15px;
    vertical-align: middle;
    width: 15px;
}

.form-input .icon-success {
    background-image: url("~./assets/check-filled.svg");
}

.form-input .icon-warning {
    background-image: url("~./assets/warning.svg");
}

.form-input .icon-error {
    background-image: url("~./assets/error.svg");
}
</style>

<script>
export const FormInput = {
    name: "form-input",
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
        },
        error: {
            type: String,
            default: null
        },
        warning: {
            type: String,
            default: null
        },
        success: {
            type: String,
            default: null
        }
    }
};

export default FormInput;
</script>
