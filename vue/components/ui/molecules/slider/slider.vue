<template>
    <input-ripe
        class="slider"
        v-bind="mergedInputProps"
        v-bind:value.sync="valueData"
        v-bind:type="'range'"
        v-on:update:value="onInput"
        v-on:blur="onBlur"
        v-on:focus="onFocus"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.slider {
    appearance: none;
    border: none;
    height: 20px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
}

.slider::-webkit-slider-runnable-track {
    background: #57626e;
    border-radius: 4px;
    cursor: pointer;
    height: 3px;
}

.slider::-moz-range-track {
    background: #57626e;
    border-radius: 4px;
    cursor: pointer;
    height: 3px;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #57626e;
    border: 2px solid $light-white;
    border-radius: 50%;
    cursor: col-resize;
    height: 16px;
    margin-top: -7px;
    width: 16px;
}

.slider:focus::-webkit-slider-thumb {
    border-color: $aqcua-blue;
}

.slider::-moz-range-thumb {
    background: #57626e;
    border: 2px solid $light-white;
    border-radius: 50%;
    cursor: col-resize;
    height: 12px;
    width: 12px;
}

.slider:focus::-moz-range-thumb {
    border-color: $aqcua-blue;
}
</style>

<script>
export const Slider = {
    props: {
        /**
         * The value of the slider knob.
         */
        value: {
            type: String | Number,
            default: null
        },
        /**
         * Set of props passed on to input-ripe.
         */
        inputProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            valueData: null,
            defaultInputProps: {
                min: 0,
                max: 100,
                step: 1
            }
        };
    },
    watch: {
        value: function(value) {
            this.valueData = value;
        }
    },
    computed: {
        mergedInputProps() {
            return {
                ...this.defaultInputProps,
                ...this.inputProps
            };
        }
    },
    created: function() {
        this.valueData = this.value || this.mergedInputProps.min;
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

export default Slider;
</script>
