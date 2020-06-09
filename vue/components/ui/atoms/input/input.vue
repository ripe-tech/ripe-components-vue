<template>
    <input
        v-bind:type="type"
        class="input"
        v-bind:style="style"
        v-bind:class="classes"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-bind:disabled="disabled"
        ref="input"
        v-on:click="onClick"
        v-on:input="onInput($event.target.value)"
        v-on:focus="onFocus"
        v-on:blur="onBlur"
        v-on:keyup="onKeyup"
        v-on:keydown="onKeyDown"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input {
    appearance: none;
    background-color: $white;
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    color: $black;
    font-family: $font-family;
    font-size: 13px;
    font-weight: 500;
    height: 34px;
    letter-spacing: 0.25px;
    line-height: 34px;
    outline: none;
    padding-left: 12px;
    padding-right: 12px;
    transition: width 0.2s ease,
        border-color 0.2s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease;
    width: 100%;
}

.input::-webkit-input-placeholder {
    color: $upper-grey;
}

.input.monospaced {
    font-family: consolas, monospace;
    letter-spacing: 0px;
}

.input.ellipsis {
    text-overflow: ellipsis;
}

.input.dark {
    background-color: $soft-blue;
}

.input.border-strong {
    border-width: 2px;
}

.input:hover {
    border-color: #dfe1e5;
}

.input:focus {
    background-color: $white;
    border-color: $aqcua-blue;
}

.input.dark:focus {
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

.input:disabled {
    opacity: 0.4;
}
</style>

<script>
export const Input = {
    name: "input-ripe",
    props: {
        variant: {
            type: String,
            default: null
        },
        border: {
            type: String,
            default: "thin"
        },
        value: {
            type: String | Number,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: ""
        },
        align: {
            type: String,
            default: null
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        monospaced: {
            type: Boolean,
            default: false
        },
        ellipsis: {
            type: Boolean,
            default: true
        },
        width: {
            type: Number,
            default: null
        },
        minWidth: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        },
        fontSize: {
            type: Number,
            default: null
        },
        fontWeight: {
            type: Number,
            default: null
        },
        validationMessage: {
            type: String,
            default: null
        }
    },
    mounted: function() {
        if (this.autofocus) this.focus();
        this.setValidationMessage(this.validationMessage);
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
        onClick(event) {
            this.$emit("click", event);
        },
        setValidationMessage(value) {
            this.$refs.input.setCustomValidity(value || "");
        },
        onInput(value) {
            this.setValue(value);
        },
        onFocus() {
            this.$emit("focus");
        },
        onBlur() {
            this.$emit("blur");
        },
        onKeyup(event) {
            this.$emit("keyup", event);
        },
        onKeyDown(event) {
            this.$emit("keydown", event);
        }
    },
    computed: {
        style() {
            const base = {
                width: this.width === null ? null : `${this.width}px`,
                height: this.height === null ? null : `${this.height}px`,
                "min-width": this.minWidth === null ? null : `${this.minWidth}px`,
                "font-size": this.fontSize === null ? null : `${this.fontSize}px`,
                "font-weight": this.fontWeight === null ? null : `${this.fontWeight}`,
                "text-align": this.align
            };
            return base;
        },
        classes() {
            const base = { monospaced: this.monospaced };
            if (this.variant) base[this.variant] = true;
            if (this.border) base[`border-${this.border}`] = true;
            if (this.ellipsis) base.ellipsis = true;
            if (this.validationMessage) base.validation = true;
            return base;
        }
    },
    watch: {
        validationMessage(value) {
            this.setValidationMessage(value);
        }
    }
};

export default Input;
</script>
