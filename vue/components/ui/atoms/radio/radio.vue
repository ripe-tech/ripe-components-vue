<template>
    <div
        class="radio"
        v-bind:class="classes"
        v-bind:tabindex="tabindex"
        ref="radio"
        v-on:click="onClick"
        v-on:keydown="onKeydown"
    >
        <div class="radio-input">
            <input type="radio" class="value" v-bind:id="value" />
            <div class="radio-circle" />
            <label v-bind:for="value" class="label" v-if="label">
                {{ label }}
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.radio {
    display: inline-block;
    font-size: 0px;
    outline: none;
    user-select: none;
}

.radio > .radio-input {
    display: inline-block;
}

.radio > .radio-input > .value {
    display: none;
}

.radio > .radio-input > .radio-circle {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 50% 50% 50% 50%;
    cursor: pointer;
    display: inline-block;
    height: 4px;
    padding: 3px 3px 3px 3px;
    vertical-align: middle;
    width: 4px;
}

.radio:not(.disabled):not(.error):active > .radio-input > .radio-circle {
    background: url("~./assets/check-dark.svg") center / 4px no-repeat #f4f5f7;
}

.radio.error > .radio-input > .radio-circle {
    background-color: #f4f5f7;
    border: 2px solid $dark-red;
}

.radio.disabled > .radio-input > .radio-circle {
    background: #f4f5f7;
    border: 2px solid #f4f5f7;
    cursor: default;
}

.radio.checked > .radio-input > .radio-circle {
    background: url("~./assets/check.svg") center / 4px no-repeat $dark;
    border: 2px solid $dark;
}

.radio.error.checked > .radio-input > .radio-circle {
    background: url("~./assets/check.svg") center / 4px no-repeat $dark;
    border: 2px solid $dark-red;
}

.radio.disabled.checked > .radio-input > .radio-circle {
    background: url("~./assets/check-gray.svg") center / 4px no-repeat #f4f5f7;
    border: 2px solid #f6f7f9;
}

.radio:focus:not(.disabled) > .radio-input > .radio-circle {
    border-color: $aqcua-blue;
}

.radio > .radio-input > .label {
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    margin: 0px 0px 0px 4px;
    vertical-align: middle;
}

.radio.disabled > .radio-input > .label {
    cursor: default;
    opacity: 0.6;
}
</style>

<script>
export const Radio = {
    name: "radio",
    props: {
        label: {
            type: String,
            default: null
        },
        value: {
            default: null
        },
        checked: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: null
        }
    },
    computed: {
        tabindex() {
            return this.disabled ? "" : "0";
        },
        classes() {
            const base = {
                disabled: this.disabled,
                checked: this.checked
            };
            if (this.variant) base[this.variant] = true;
            return base;
        }
    },
    methods: {
        focus() {
            this.$refs.radio.focus();
        },
        blur() {
            this.$refs.radio.blur();
        },
        isDisabled() {
            return this.disabled;
        },
        isFocused() {
            return document.activeElement === this.$refs.radio;
        },
        isFocusable() {
            return !this.isDisabled();
        },
        onClick(event) {
            this.$emit("click", event);
        },
        onKeydown(event) {
            this.$emit("keydown", event);
        }
    }
};

export default Radio;
</script>
