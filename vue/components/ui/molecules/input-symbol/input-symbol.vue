<template>
    <div class="input-symbol" v-bind:class="classes" v-bind:style="style">
        <input-ripe
            v-bind:value.sync="valueData"
            v-bind:variant="variant"
            v-bind:border="border"
            v-bind:type="type"
            v-bind:placeholder="placeholder"
            v-bind:disabled="disabled"
            v-bind:height="height"
            v-bind:min-width="0"
            v-bind:align="align"
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

.input-symbol > .input {
    border: none;
    border-radius: 6px 0px 0px 6px;
    flex-shrink: 1;
    padding-right: 7px;
}

.input-symbol > .input:focus {
    border-color: $light-white;
}

.input-symbol > .symbol {
    background-color: #fcfcfc;
    border-left: 1px solid #e4e8f0;
    border-radius: 0px 6px 6px 0px;
    box-sizing: border-box;
    color: #5d5d5d;
    display: inline-block;
    flex-shrink: 0;
    font-size: 13px;
    font-weight: 800;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    text-align: center;
    width: 34px;
}

.input-symbol.color-white > .symbol {
    background-color: #fcfcfc;
}

.input-symbol.color-dark > .symbol {
    background-color: #f9fafd;
}
</style>

<script>
export const InputSymbol = {
    props: {
        symbol: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            default: ""
        },
        type: {
            type: String,
            default: null
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
        classes() {
            const base = {
                disabled: this.disabled
            };
            if (this.variant) base[`color-${this.variant}`] = true;
            if (this.border) base[`border-${this.border}`] = true;
            return base;
        },
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
