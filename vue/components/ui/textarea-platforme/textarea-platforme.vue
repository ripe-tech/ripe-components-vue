<template>
    <textarea
        class="textarea-platforme"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-bind:required="required"
        v-bind:autoFocus="autoFocus"
        v-bind:maxLength="maxLength"
        v-bind:cols="cols"
        v-bind:rows="rows"
        ref="input"
        v-on:keydown.esc="blur()"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.textarea-platforme {
    background-color: #f2f2f2;
    border: 1px solid transparent;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 20px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 6px;
}

.textarea-platforme:hover {
    border-color: #dddddd;
}

.textarea-platforme:focus {
    background-color: #ffffff;
    border-color: #dddddd;
    box-shadow: 0px 1px 8px 0px #20212424;
}
</style>

<script>
export const TextareaPlatforme = {
    props: {
        value: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            default: null
        },
        resizable: {
            type: String,
            default: null
        },
        maxLength: {
            type: Number,
            default: 1000
        },
        cols: {
            type: Number,
            default: 10
        },
        rows: {
            type: Number,
            default: 10
        },
        autoFocus: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        blur() {
            this.$refs.input.blur();
        }
    }
};

export default TextareaPlatforme;
</script>
