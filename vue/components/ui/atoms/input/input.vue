<template>
    <input
        type="text"
        class="input"
        v-bind:style="style"
        v-bind:class="classes"
        v-bind:value="value"
        v-bind:placeholder="placeholder"
        v-bind:disabled="disabled"
        ref="input"
        v-on:input="onInput($event.target.value)"
        v-on:focus="onFocus"
        v-on:blur="onBlur"
        v-on:keyup.enter="onEnter"
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
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    width: 100%;
}

input::-webkit-input-placeholder {
    color: $upper-grey;
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
        fontWeight: {
            type: Number,
            default: null
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
        },
        onEnter() {
            this.$emit("enter");
        }
    },
    computed: {
        style() {
            const base = {
                width: this.width === null ? null : `${this.width}px`,
                height: this.height === null ? null : `${this.height}px`,
                "min-width": this.minWidth === null ? null : `${this.minWidth}px`,
                "font-weight": this.fontWeight === null ? null : `${this.fontWeight}`,
                "text-align": this.align
            };
            return base;
        },
        classes() {
            const base = {};
            if (this.variant) base[this.variant] = true;
            if (this.border) base[`border-${this.border}`] = true;
            if (this.ellipsis) base.ellipsis = true;
            return base;
        }
    }
};

export default Input;
</script>
