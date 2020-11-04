<template>
    <input-ripe
        class="slider-ripe"
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

.slider-ripe {
    appearance: none;
    border: none;
    height: 20px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
}

.slider-ripe::-webkit-slider-runnable-track {
    background: #57626e;
    border-radius: 4px;
    cursor: pointer;
    height: 3px;
}

.slider-ripe::-moz-range-track {
    background: #57626e;
    border-radius: 4px;
    cursor: pointer;
    height: 3px;
}

.slider-ripe::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #57626e;
    border: 2px solid $light-white;
    border-radius: 50%;
    cursor: col-resize;
    height: 16px;
    margin-top: -7px;
    width: 16px;
}

.slider-ripe:focus::-webkit-slider-thumb {
    border-color: $aqcua-blue;
}

.slider-ripe::-moz-range-thumb {
    background: #57626e;
    border: 2px solid $light-white;
    border-radius: 50%;
    cursor: col-resize;
    height: 12px;
    width: 12px;
}

.slider-ripe:focus::-moz-range-thumb {
    border-color: $aqcua-blue;
}
</style>

<script>
export const SliderRipe = {
    props: {
        /**
         * The value of the slider knob.
         */
        value: {
            type: String | Number,
            default: null
        },
        /**
         * Set of props that are passed to input-ripe component.
         * `min` - The minimum value of the slider track.
         * `max` - The maximum value of the slider track.
         * `step` - The step unit of the slider knob.
         * `disabled` - Weather or not the slider is disabled and unable to move.
         * `width` - The width of the slider track in pixels.
         */
        inputProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            valueData: this.value || 0,
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

export default SliderRipe;
</script>
