<template>
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
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

input[type="text"] {
    appearance: none;
    background-color: #f2f2f2;
    border: 1px solid transparent;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    font-size: 13px;
    height: 34px;
    line-height: 34px;
    outline: none;
    padding-left: 12px;
    padding-right: 12px;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    width: 304px;
}

input[type="text"]:hover {
    border-color: #dddddd;
}

input[type="text"]:focus {
    background-color: #ffffff;
    border-color: #dddddd;
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}
</style>

<script>
export const InputPlatforme = {
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
