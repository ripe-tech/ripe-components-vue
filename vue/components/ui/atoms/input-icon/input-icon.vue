<template>
    <div v-bind:class="classes" class="input-icon" v-bind:style="style">
        <div class="before-input">
            <slot name="slot-before" />
        </div>
        <input
            v-bind:type="type"
            class="input"
            v-bind:value="value"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:maxLength="maxLength"
            ref="input"
            v-on:input="event => onInput(event.target.value)"
            v-on:click="onClick"
            v-on:focus="focused = true"
            v-on:blur="focused = false"
            v-on:keyup="onKeyup"
            v-on:keydown="onKeydown"
        />
        <div class="after-input">
            <slot name="slot-after" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-icon {
    background-color: $white;
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    display: flex;
    height: 34px;
    letter-spacing: 0.25px;
    line-height: 34px;
    transition: width 0.2s ease,
        border-color 0.2s ease,
        background-color 0.2s ease,
        box-shadow 0.2s ease;
    width: 100%;
}

.input-icon > .before-input,
.input-icon > .after-input {
    align-items: center;
    display: flex;
    height: 100%;
    margin: auto;
    margin: 0px 8px 0px 8px;
}

.input-icon > .before-input > *,
.input-icon > .after-input > * {
    height: 24px;
    width: 24px;
}

.input-icon > input {
    appearance: none;
    border: none;
    color: $black;
    display: flex;
    font-family: $font-family;
    font-size: 13px;
    font-weight: 500;
    outline: none;
    width: 100%;
}

.input-icon > .input::-webkit-input-placeholder {
    color: $upper-grey;
}

.input-icon > .input.monospaced {
    font-family: "consolas", monospace;
    letter-spacing: 0px;
}

.input-icon > .input.ellipsis {
    text-overflow: ellipsis;
}

.input-icon > .input.dark {
    background-color: $soft-blue;
}

.input-icon > .input.border-strong {
    border-width: 2px;
}

.input-icon:hover:not(.disabled):not(:focus) {
    border-color: $aqcua-blue;
}

.input-icon.focus {
    background-color: $white;
    border-color: $aqcua-blue;
}

.input-icon > .input.dark:focus {
    box-shadow: 0px 1px 8px 0px rgba(32, 33, 36, 0.14);
}

.input-icon.disabled {
    opacity: 0.4;
}
</style>

<script>
export const InputIcon = {
    name: "input-icon",
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
        },
        maxLength: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            focused: false,
            suggestionsVisible: false,
            valueData: this.value
        };
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
        setValidationMessage(value) {
            this.$refs.input.setCustomValidity(value || "");
        },
        onInput(value) {
            this.setValue(value);
        },
        onClick(event) {
            this.$emit("click", event);
        },
        onFocus(event) {
            this.$emit("focus", event);
        },
        onBlur(event) {
            this.$emit("blur", event);
        },
        onKeyup(event) {
            this.$emit("keyup", event);
        },
        onKeydown(event) {
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
            if (this.focused) base.focus = true;
            if (this.disabled) base.disabled = true;
            return base;
        }
    },
    watch: {
        validationMessage(value) {
            this.setValidationMessage(value);
        }
    }
};

export default InputIcon;
</script>
