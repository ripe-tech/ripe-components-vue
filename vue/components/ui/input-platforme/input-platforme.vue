<template>
    <div>
        <input
            type="text"
            class="input-platforme"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            ref="input"
            v-on:input="$emit('update:value', $event.target.value)"
            v-on:focus="focused()"
            v-on:blur="blurred()"
        />
        <div class="help-text-validation">
            <button-icon-platforme v-bind:icon="'icon-error'" v-bind:size="32" v-show="showError" />
            <label-platforme v-bind:text="error" v-bind:color="'error'" v-show="showError" />

            <button-icon-platforme
                v-bind:icon="'icon-warning'"
                v-bind:size="32"
                v-show="showWarning"
            />
            <label-platforme v-bind:text="warning" v-show="showWarning" />

            <button-icon-platforme
                v-bind:icon="'icon-check-filled'"
                v-bind:size="32"
                v-show="showSuccess"
            />
            <label-platforme v-bind:text="success" v-bind:color="'success'" v-show="showSuccess" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

input[type="text"] {
    background-color: #f2f2f2;
    border: solid 1px $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    font-family: $font-family;
    font-size: 13px;
    height: 34px;
    letter-spacing: 0.25px;
    line-height: 34px;
    outline: none;
    padding-left: 12px;
    padding-right: 12px;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    width: 304px;
}

input[type="text"]:hover {
    background-color: #ebeef1;
    border: solid 1px #dfe1e5;
}

input[type="text"]:focus {
    background-color: $white;
    border: solid 2px $aqcua-blue;
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

input[type="text"]:disabled {
    background-color: $pale-grey;
    border-color: transparent;
}

.help-text-validation {
    display: block;
}
</style>

<script>
export const InputPlatforme = {
    name: "input-platforme",
    computed: {
        showSuccess() {
            return (
                (this.error === null || this.error === "") &&
                (this.warning === null || this.warning === "") &&
                this.success !== null &&
                this.success !== "" &&
                !this.disabled
            );
        },
        showError() {
            return (
                (this.success === null || this.success === "") &&
                (this.warning === null || this.warning === "") &&
                this.error !== null &&
                this.error !== "" &&
                !this.disabled
            );
        },
        showWarning() {
            return (
                (this.success === null || this.success === "") &&
                (this.error === null || this.error === "") &&
                this.warning !== null &&
                this.warning !== "" &&
                !this.disabled
            );
        }
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
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
    },
    mounted: function() {
        this.autofocus && this.focus();
    },
    watch: {
        disabled: function() {
            this.$refs.input.disabled = !!this
                .disabled; /*
            this.error = null;
            this.warning = null;
            this.success = null; */
        }
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        blur() {
            this.$refs.input.blur();
        },
        focused() {
            this.$emit("focus");
        },
        blurred() {
            this.$emit("blur");
        }
    }
};

export default InputPlatforme;
</script>
