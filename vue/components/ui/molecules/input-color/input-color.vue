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
            v-show="false"
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

.input-color-container > .input {
    vertical-align: top;
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
    border-color: $red;
    cursor: not-allowed;
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
            return base;
        },
        style() {
            const base = {
                "background-color": this.valueData === null ? null : this.valueData,
                height: this.height === null ? null : this.height + "px"
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
        showColorMenu() {
            this.$refs.nativeColorInput.click();
        },
        onInput(value) {
            this.valueData = value;
            this.$emit("update:value", value);
        },
        onClickPicker() {
            this.showColorMenu();
        }
    }
};

export default InputColor;
</script>
