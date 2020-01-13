<template>
    <div
        class="input-symbol"
        v-bind:class="[
            { disabled: disabled },
            `color-${variant}`,
            `border-${border}`,
            `text-align-${align}`
        ]"
    >
        <input-ripe
            v-bind:value.sync="valueData"
            v-bind:variant="variant"
            v-bind:border="border"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:width="width"
            v-bind:height="height"
            v-on:update:value="onInput($event)"
            v-on:blur="onBlur"
            v-on:focus="onFocus"
        />
        <div class="symbol" v-bind:style="style">
            {{ symbol }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-symbol.disabled {
    opacity: 0.4;
}

.input-symbol .input {
    border-radius: 6px 0px 0px 6px;
    padding-right: 7px;
    text-align: right;
    vertical-align: top;
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
    border: 1px solid #e4e8f0;
    border-left: none;
    border-radius: 0px 6px 6px 0px;
    box-sizing: border-box;
    display: inline-block;
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

.input-symbol.border-strong .symbol {
    border-width: 2px;
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
