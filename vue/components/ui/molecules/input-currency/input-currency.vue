<template>
    <input-symbol
        v-bind:symbol="symbol"
        v-bind:value.sync="valueData"
        v-bind:variant="variant"
        v-bind:border="border"
        v-bind:placeholder="placeholder"
        v-bind:autofocus="autofocus"
        v-bind:disabled="disabled"
        v-bind:width="width"
        v-bind:height="height"
        v-bind:align="align"
    />
</template>

<script>
import { Decimal } from "decimal.js";

import exchangeRates from "./exchange_rates.json";
import symbols from "./symbols.json";

export const InputCurrency = {
    name: "input-currency",
    props: {
        currency: {
            type: String,
            default: "USD"
        },
        value: {
            type: Number,
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
    computed: {
        normalizedCurrency() {
            return this.currency.toUpperCase();
        },
        symbol() {
            return symbols[this.normalizedCurrency] || this.normalizedCurrency;
        }
    },
    data: function() {
        return {
            valueData: this.value
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        normalizedCurrency(after, before) {
            this.valueData = this._exchange(this.valueData, before, after);
        }
    },
    methods: {
        _exchange(value, currency, newCurrency) {
            if (currency === newCurrency) return value;

            const rates = exchangeRates[currency] || {};
            const rate = rates[newCurrency];
            if (!rate) return value;

            return Decimal.mul(value, rate).toDecimalPlaces(2, Decimal.ROUND_UP);
        }
    }
};

export default InputCurrency;
</script>
