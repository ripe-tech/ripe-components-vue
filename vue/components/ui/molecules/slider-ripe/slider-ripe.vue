<template>
    <input-ripe
        class="slider-ripe"
        v-bind:value.sync="valueData"
        v-bind:type="'range'"
        v-bind:disabled="disabled"
        v-bind:min-width="0"
        v-bind:width="width"
        v-bind:min="min"
        v-bind:max="max"
        v-bind:step="step"
        ref="input"
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
    border: 2px solid #e4e8f0;
    border-radius: 50%;
    cursor: col-resize;
    height: 16px;
    margin-top: -7px;
    width: 16px;
}

.slider-ripe::-moz-range-thumb {
    background: #57626e;
    border: 2px solid #e4e8f0;
    border-radius: 50%;
    cursor: col-resize;
    height: 12px;
    width: 12px;
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

export default SliderRipe;
</script>
