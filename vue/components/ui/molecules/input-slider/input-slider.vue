<template>
    <div class="input-slider" v-bind:class="classes">
        <slider-ripe
            v-bind:value.sync="valueData"
            v-bind:disabled="disabled"
            v-bind:min="min"
            v-bind:max="max"
            v-bind:step="step"
            v-on:blur="onBlur"
            v-on:focus="onFocus"
        />
        <input-symbol
            v-bind:value="valueData"
            v-bind:input-props="inputProps"
            v-bind:disabled="disabled"
            v-bind:width="100"
            v-bind:height="32"
            v-bind:symbol="symbol"
            v-bind:variant="variant"
            v-on:update:value="onUserInput"
            v-on:blur="onBlur"
            v-on:focus="onFocus"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-slider {
    align-items: center;
    display: flex;
}

.input-slider > .slider-ripe {
    margin: 0px 10px 0px 0px;
}
</style>

<script>
export const InputSlider = {
    props: {
        /**
         * The value of the slider knob.
         */
        value: {
            type: String | Number,
            default: null
        },
        /**
         * The minimum value of the slider track.
         */
        min: {
            type: Number,
            default: 0
        },
        /**
         * The maximum value of the slider track.
         */
        max: {
            type: Number,
            default: 100
        },
        /**
         * The step unit of the slider knob.
         */
        step: {
            type: Number,
            default: 1
        },
        /**
         * Weather or not the slider is disabled and unable to move.
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The width of the slider track in pixels.
         */
        width: {
            type: Number,
            default: 150
        },
        /**
         * The unit symbol to show on the user text input next to the slider.
         */
        symbol: {
            type: String,
            default: "%"
        },
        /**
         * The color variant of the text input next to the slider.
         * @options dark
         */
        variant: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            valueData: this.value || this.min
        };
    },
    computed: {
        style() {
            const base = {
                width: this.width === null ? null : `${this.width}px`
            };
            return base;
        },
        classes() {
            return "";
        }
    },
    watch: {
        value: function(value) {
            this.valueData = value;
        },
        valueData: function(value) {
            this.$emit("update:value", value);
        }
    },
    methods: {
        isInvalid(value) {
            return value > this.max || value < this.min || isNaN(value);
        },
        setValue(value) {
            if (!this.isInvalid(value)) this.valueData = value;
        },
        onUserInput(value) {
            this.setValue(value);
        },
        onFocus() {
            this.$emit("focus");
        },
        onBlur() {
            this.$emit("blur");
        }
    }
};

export default InputSlider;
</script>
