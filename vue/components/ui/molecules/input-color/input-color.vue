<template>
    <div class="input-color-container" v-bind:class="classes">
        <div class="color-picker" v-bind:style="style" v-on:click="onClickPicker" />
        <input-ripe
            class="input-color"
            v-bind:value.sync="valueData"
            v-bind:width="100"
            v-bind:disabled="disabled"
            v-bind:variant="variant"
            v-bind:height="height"
            v-on:update:value="onInput"
        />
        <input
            class="input-color-native"
            type="color"
            v-bind:value="valueData"
            v-bind:disabled="disabled"
            ref="nativeColorInput"
            v-on:input="onInput($event.target.value)"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-color-container {
    display: inline-block;
    font-size: 0px;
}

.input-color-container > .color-picker {
    border: 1px solid #e4e8f0;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    display: inline-block;
    height: 34px;
    margin: 0px 5px 0px 0px;
    width: 100px;
}

.input-color-container > .color-picker:hover {
    border-color: $aqcua-blue;
    cursor: pointer;
}

.input-color-container.disabled > .color-picker:hover {
    cursor: not-allowed;
}

.input-color-container > .input {
    vertical-align: top;
}

.input-color-container.invalid > .input {
    border-color: $red;
}

.input-color-container > .input-color-native {
    display: none;
}

.input-color-container > .input-color-native:invalid {
    display: inline-block;
}
</style>

<script>
export const InputColor = {
    props: {
        /**
         * The initial hex color value of the color-picker.
         */
        value: {
            type: String,
            default: "#000000"
        },
        /**
         * The variant color of the input for the color-picker.
         * @values dark
         */
        variant: {
            type: String,
            default: null
        },
        /**
         * The height of the color-picker color box and input in pixels.
         */
        height: {
            type: Number,
            required: false
        },
        /**
         * If weather or not the input-color is in read-only mode.
         */
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            valueData: this.value
        };
    },
    computed: {
        classes() {
            const base = {};
            if (this.disabled) base.disabled = true;
            if (!this.hasValidColor) base.invalid = true;
            return base;
        },
        style() {
            const base = {
                "background-color": this.valueData === null ? null : this.colorComputed,
                height: this.height === null ? null : this.height + "px"
            };
            return base;
        },
        colorComputed() {
            return this.hasValidColor ? this.valueData : "#ffffff";
        },
        /**
         * Weather or not `valueData` is a string with valid hex color code.
         * @returns true if `valueData` is a string with a valid hex color code or false if otherwise.
         */
        hasValidColor() {
            return /^#([0-9A-F]{3}){1,2}$/i.test(this.valueData);
        }
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueData(value) {
            this.$emit("update:value", value);
        }
    },
    methods: {
        showColorMenu() {
            this.$refs.nativeColorInput.click();
        },
        onInput(value) {
            this.valueData = value;
        },
        onClickPicker() {
            this.showColorMenu();
        }
    }
};

export default InputColor;
</script>
