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
import currencies from "./assets/currencies.json";

export const InputCurrency = {
    name: "input-currency",
    props: {
        currency: {
            type: String,
            default: "USD"
        },
        rates: {
            type: Object,
            default: () => ({})
        },
        value: {
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
    computed: {
        symbol() {
            return this._symbol(this.currency);
        },
        places() {
            return this._places(this.currency);
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
        valueData(value) {
            this.$emit("update:value", value);
        },
        currency(after, before) {
            this.valueData = this._exchange(parseFloat(this.valueData), before, after);
        }
    },
    methods: {
        _exchange(value, baseCurrency, targetCurrency) {
            const rates = this._rates(baseCurrency);
            const places = this._places(targetCurrency);
            const rate = rates[targetCurrency];

            if (baseCurrency === targetCurrency) return value.toFixed(places);
            if (!rate) return value.toFixed(places);

            const multiplier = Math.pow(10, places);
            return (Math.round(value * rate * multiplier) / multiplier).toFixed(places);
        },
        _rates(currency) {
            return this.rates[currency] || {};
        },
        _symbol(currency) {
            const currencyInfo = currencies[currency] || {};
            return currencyInfo.symbol || currency;
        },
        _places(currency, fallback = 2) {
            const currencyInfo = currencies[currency] || {};
            return currencyInfo.places || fallback;
        }
    }
};

export default InputCurrency;
</script>
