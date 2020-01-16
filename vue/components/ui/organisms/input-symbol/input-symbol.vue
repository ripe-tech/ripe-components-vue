<template>
    <div
        class="input-symbol"
        v-bind:class="[
            { disabled: disabled },
            `color-${variant}`,
            `border-${border}`,
            `text-align-${align}`
        ]"
        v-bind:style="style"
    >
        <input-ripe
            v-bind:value.sync="valueData"
            v-bind:variant="variant"
            v-bind:border="border"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:height="height"
            v-on:update:value="onInput"
            v-on:blur="onBlur"
            v-on:focus="onFocus"
        />
        <div class="symbol" v-bind:style="symbolStyle">
            {{ symbol }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-symbol {
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    display: flex;
    width: 100%;
}

.input-symbol.border-strong {
    border-width: 2px;
}

.input-symbol.disabled {
    opacity: 0.4;
}

.input-symbol:focus-within {
    border-color: $aqcua-blue;
}

.input-symbol .input {
    border: none;
    flex-shrink: 1;
    padding-right: 7px;
    text-align: right;
    vertical-align: top;
}

.input-symbol .input:focus {
    border-color: $light-white;
}

.input-symbol.text-align-left .input {
    text-align: left;
}

.input-symbol.text-align-center .input {
    text-align: center;
}

.input-symbol.text-align-right .input {
    text-align: right;
}

.input-symbol .symbol {
    background-color: #ffffff;
    border-left: 1px solid $light-white;
    border-radius: 0px 6px 6px 0px;
    box-sizing: border-box;
    display: inline-block;
    flex-shrink: 0;
    font-size: 13px;
    height: 34px;
    line-height: 30px;
    overflow: hidden;
    padding: 1px 10px 1px 10px;
}

.input-symbol.color-white .symbol {
    background-color: #ffffff;
}

.input-symbol.color-dark .symbol {
    background-color: #f9fafd;
}
</style>

<script>
export const InputSymbol = {
    props: {
        symbol: {
            type: String,
            default: "$"
        },
        value: {
            type: [String, Number],
            default: ""
        },
        variant: {
            type: String,
            default: null
        },
        border: {
            type: String,
            default: "thin"
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
        width: {
            type: Number,
            default: null
        },
        height: {
            type: Number,
            default: null
        },
        align: {
            type: String,
            default: "right"
        }
    },
    data: function() {
        return {
            valueData: this.value
        };
    },
    computed: {
        style() {
            const base = {
                width: this.width === null ? null : `${this.width}px`
            };
            return base;
        },
        symbolStyle() {
            const base = {
                height: this.height === null ? null : `${this.height}px`,
                "line-height": this.height === null ? null : `${this.height}px`
            };
            return base;
        }
    },
    watch: {
        value: function(value) {
            this.valueData = value;
        }
    },
    methods: {
        onInput(value) {
            this.$emit("update:value", value);
        },
        onFocus() {
            this.$emit("focus");
        },
        onBlur() {
            this.$emit("blur");
        }
    }
};

export default InputSymbol;
</script>
