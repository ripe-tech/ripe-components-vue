<template>
    <input-ripe
        class="slider-ripe"
        v-bind:value.sync="valueData"
        v-bind:variant="variant"
        v-bind:border="border"
        v-bind:type="'range'"
        v-bind:disabled="disabled"
        v-bind:height="height"
        v-bind:min-width="0"
        v-bind:class="classes"
        v-bind:style="style"
        ref="input"
        v-on:update:value="onInput"
        v-on:blur="onBlur"
        v-on:focus="onFocus"
    />
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

input[type=range] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #7C7C7C;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -14px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #7C7C7C;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #7C7C7C;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

input[type=range]::-ms-fill-lower {
  background: #7C7C7C;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type=range]::-ms-fill-upper {
  background: #7C7C7C;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]:focus::-ms-fill-lower {
  background: #7C7C7C;
}

input[type=range]:focus::-ms-fill-upper {
  background: #7C7C7C;
}
</style>

<script>
export const SliderRipe = {
    props: {
        value: {
            type: String | Number,
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
        }
    },
    watch: {
        value: function(value) {
            this.valueData = value;
        }
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
        blur() {
            this.$refs.input.blur();
        },
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
