<template>
    <input
        type="text"
        class="input-platforme"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        ref="input"
        v-on:input="onInput($event.target.value)"
        v-on:focus="onFocus"
        v-on:blur="onBlur"
    />
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
    border: 1px solid $aqcua-blue;
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

input[type="text"]:disabled {
    background-color: $light-grey;
    border-color: transparent;
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
        }
    },
    mounted: function() {
        this.autofocus && this.focus();
    },
    methods: {
        setValue(value) {
            this.$emit("update:value", value);
        },
        focus() {
            this.$refs.input.focus();
        },
        blur() {
            this.$refs.input.blur();
        },
        onInput(value) {
            this.setValue(value);
        },
        onFocus() {
            this.$emit("focus");
        },
        onBlur() {
            this.$emit("blur");
        }
    }
};

export default InputPlatforme;
</script>
