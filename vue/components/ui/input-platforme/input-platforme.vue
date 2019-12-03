<template>
    <div class="input">
        <input
            type="text"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            ref="input"
            v-on:input="$emit('update:value', $event.target.value)"
            v-on:focus="onFocused"
            v-on:blur="onBlurred"
        />
        <div class="text">
            <div class="text-container" v-if="error">
                <span class="input-text-error" />
                <label-platforme v-bind:color="'error'" v-bind:text="error" />
            </div>
            <div class="text-container" v-if="warning">
                <span class="input-text-warning" />
                <label-platforme v-bind:text="warning" />
            </div>
            <div class="text-container" v-if="success">
                <span class="input-text-success" />
                <label-platforme v-bind:text="success" v-bind:color="'success'" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

input[type="text"] {
    background-color: #f2f2f2;
    border: 1px solid $light-white;
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
    background-color: $light-grey;
    border-color: #dfe1e5;
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

.input-text-success {
    background: url("~./../../../assets/icons/green/icon-check-filled.svg") no-repeat;
    display: inline-block;
    height: 16px;
    vertical-align: top;
    width: 15px;
}

.input-text-warning {
    background: url("~./../../../assets/icons/yellow/icon-warning.svg") no-repeat;
    display: inline-block;
    height: 11px;
    width: 13px;
}

.input-text-error {
    background: url("~./../../../assets/icons/red/icon-error.svg") no-repeat;
    display: inline-block;
    height: 11px;
    width: 13px;
}
</style>

<script>
export const InputPlatforme = {
    name: "input-platforme",
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
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        blur() {
            this.$refs.input.blur();
        },
        onFocused() {
            this.$emit("focus");
        },
        onBlurred() {
            this.$emit("blur");
        }
    }
};

export default InputPlatforme;
</script>
