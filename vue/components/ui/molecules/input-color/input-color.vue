<template>
    <div class="input-color-container" v-bind:class="classes">
        <div class="picker-color" v-bind:style="style" v-on:click="onPickerClick" />
        <input-symbol
            class="input-color"
            v-bind:value.sync="valueData"
            v-bind:width="100"
            v-bind="inputProps"
            v-bind:symbol="'#'"
            v-on:update:value="onUserInput"
        />
        <input
            class="input-color-native"
            type="color"
            v-bind:value="inputValue"
            ref="inputColorNative"
            v-on:input="onPickerInput($event.target.value)"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.input-color-container {
    display: inline-block;
    font-size: 0px;
}

.input-color-container > .picker-color {
    border: 1px solid #e4e8f0;
    border-radius: 6px 6px 6px 6px;
    display: inline-block;
    height: 34px;
    margin: 0px 5px 0px 0px;
    width: 100px;
}

.input-color-container:not(.disabled) > .picker-color:hover {
    border-color: $aqcua-blue;
    cursor: pointer;
}

.input-color-container.disabled > .picker-color {
    opacity: 0.4;
}

.input-color-container.disabled > .picker-color:hover {
    cursor: not-allowed;
}

.input-color-container > .input-color {
    display: inline-flex;
    vertical-align: top;
}

.input-color-container.invalid > .input-color {
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
         * The hex color value.
         */
        value: {
            type: String,
            default: "000000"
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
            valueData: this.value
        };
    },
    computed: {
        classes() {
            const base = {};
            if (this.inputProps && this.inputProps.disabled) base.disabled = true;
            if (!this.hasValidColor) base.invalid = true;
            return base;
        },
        style() {
            const base = {
                "background-color": this.valueData === null ? null : this.inputValue,
                height: this.height === null ? null : this.height + "px"
            };
            return base;
        },
        colorPrefixed() {
            return `#${this.valueData}`;
        },
        inputValue() {
            return this.hasValidColor ? this.colorPrefixed : "#ffffff";
        },
        /**
         * Weather or not `valueData` is a string with valid hex color code.
         *
         * @returns {Boolean} If `valueData` is a string with a valid hex color
         * code according to pre-defined regex.
         */
        hasValidColor() {
            return /^#([0-9A-F]{3}){1,2}$/i.test(this.colorPrefixed);
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
        setValue(value) {
            this.valueData = value.replace("#", "");
        },
        showColorMenu() {
            this.$refs.inputColorNative.click();
        },
        onUserInput(value) {
            this.setValue(value);
        },
        onPickerInput(value) {
            this.setValue(value);
        },
        onPickerClick() {
            if (this.inputProps && this.inputProps.disabled) return;
            this.showColorMenu();
        }
    }
};

export default InputColor;
</script>
