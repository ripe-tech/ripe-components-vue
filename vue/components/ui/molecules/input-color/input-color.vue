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
            v-bind:value="valueNative"
            v-bind:disabled="disabled"
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
            default: "#000000"
        },
        /**
         * Set of props passed on to input-ripe.
         */
        inputProps: {
            type: Object,
            default: () => {}
        }
    },
    data: function() {
        return {
            valueData: null
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
                "background-color": this.valueData === null ? null : this.valueNative,
                height: this.height === null ? null : this.height + "px"
            };
            return base;
        },
        colorPrefixed() {
            return `#${this.valueData}`;
        },
        valueNative() {
            return this.hasValidColor ? this.colorPrefixed : "#ffffff";
        },
        /**
         * Weather or not `valueData` is a string with valid hex color code.
         * @returns true if `valueData` is a string with a valid hex color code or false if otherwise.
         */
        hasValidColor() {
            return /^#([0-9A-F]{3}){1,2}$/i.test(`#${this.valueData}`);
        }
    },
    created: function() {
        this.valueData = this.value;
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueData(value) {
            this.valueData = value.replaceAll("#", "");
        },
        colorPrefixed(value) {
            this.$emit("update:value", value);
        }
    },
    methods: {
        showColorMenu() {
            this.$refs.inputColorNative.click();
        },
        onUserInput(value) {
            this.valueData = value;
        },
        onPickerInput(value) {
            this.valueData = value.replace("#", "");
        },
        onPickerClick() {
            this.showColorMenu();
        }
    }
};

export default InputColor;
</script>
