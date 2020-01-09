<template>
    <div
        class="input-symbol"
        v-bind:class="[
            { disabled: $attrs.disabled },
            `color-${$attrs.variant}`,
            `border-${this.$attrs.border}`
        ]"
    >
        <input-ripe
            class="input-ripe"
            v-bind:value.sync="valueData"
            v-bind="$attrs"
            v-on="$listeners"
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

.input-symbol .input-ripe {
    border-radius: 6px 0px 0px 6px;
    padding-right: 7px;
    text-align: right;
    text-overflow: ellipsis;
    vertical-align: top;
}

.input-symbol .symbol {
    background-color: #ffffff;
    border: 1px solid #e4e8f0;
    border-left: none;
    border-radius: 0px 6px 6px 0px;
    box-sizing: border-box;
    display: inline-block;
    font-size: 14px;
    line-height: 32px;
    padding: 0px 10px 0px 10px;
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
import Vue from "vue";

export const InputSymbol = Vue.component("input-symbol", {
    props: {
        symbol: {
            type: String,
            default: "$"
        },
        value: {
            type: [String, Number],
            default: ""
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
                height: this.$attrs.height === null ? null : `${this.$attrs.height}px`,
                "line-height": this.$attrs.height === null ? null : `${this.$attrs.height}px`
            };
            return base;
        }
    },
    watch: {
        value: function(value) {
            this.valueData = value;
        }
    }
});

export default InputSymbol;
</script>
