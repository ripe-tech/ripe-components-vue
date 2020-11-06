<template>
    <div class="input-slider" v-bind:class="classes">
        <slider
            v-bind:value.sync="valueData"
            v-bind="mergedSliderProps"
            v-bind:disabled="disabled"
            v-on:blur="onBlur"
            v-on:focus="onFocus"
        />
        <input-symbol
            v-bind:value="valueData"
            v-bind="mergedInputProps"
            v-bind:disabled="disabled"
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

.input-slider > .slider {
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
         * Weather or not the slider is disabled and unable to move.
         */
        disabled: {
            type: Boolean,
            required: false
        },
        /**
         * Set of props passed on to input-ripe.
         */
        inputProps: {
            type: Object,
            default: () => {}
        },
        /**
         * Set of props passed on to slider.
         */
        sliderProps: {
            type: Object,
            default: () => {}
        }
    },
    data: function() {
        return {
            valueData: this.value || (this.sliderProps && this.sliderProps.min) || 0,
            defaultInputProps: { symbol: "%", width: 100 },
            defaultSliderProps: {}
        };
    },
    computed: {
        classes() {
            return "";
        },
        mergedInputProps() {
            return {
                ...this.defaultInputProps,
                ...this.inputProps
            };
        },
        mergedSliderProps() {
            return {
                ...this.defaultSliderProps,
                ...this.sliderProps
            };
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
            return (
                value > this.mergedSliderProps.max ||
                value < this.mergedSliderProps.min ||
                isNaN(value)
            );
        },
        setValue(value) {
            if (this.isInvalid(value)) return;
            this.valueData = value;
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
