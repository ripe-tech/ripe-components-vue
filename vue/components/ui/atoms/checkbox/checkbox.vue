<template>
    <div
        tabindex="0"
        class="checkbox"
        v-bind:class="{
            checked: valueData,
            disabled: disabled,
            error: error
        }"
        v-on:click="onClick()"
        v-on:mousedown="onMouseDown()"
        v-on:mouseup="onMouseUp()"
        v-on:keydown.space="onSpace()"
    >
        <slot name="before-item" v-bind:label="label" v-bind:value="value" />
        <div class="checkbox-input">
            <div class="checkbox-square" v-bind:style="getStyle" />
            <label class="label" v-if="label">{{ label }}</label>
        </div>
        <slot name="after-item" v-bind:label="label" v-bind:value="value" />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.checkbox {
    display: inline-block;
    font-size: 0px;
    outline: none;
}

.checkbox > .checkbox-input {
    display: inline-block;
}

.checkbox > .checkbox-input > .value {
    display: none;
}

.checkbox > .checkbox-input > .checkbox-square {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 2px 2px 2px 2px;
    cursor: pointer;
    display: inline-block;
    height: 4px;
    padding: 3px 3px 3px 3px;
    vertical-align: middle;
    width: 4px;
}

.checkbox:not(.disabled):not(.error) > .checkbox-input:active > .checkbox-square {
    border: 2px solid #c3c9cf;
    padding: 3px 3px 3px 3px;
}

.checkbox.error > .checkbox-input > .checkbox-square {
    background-color: #f4f5f7;
    border: 2px solid $dark-red;
}

.checkbox.disabled > .checkbox-input > .checkbox-square {
    background: none center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f4f5f7;
    cursor: default;
}

.checkbox.checked > .checkbox-input > .checkbox-square {
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.checkbox.error.checked > .checkbox-input > .checkbox-square {
    border: 2px solid $dark-red;
}

.checkbox.disabled.checked > .checkbox-input > .checkbox-square {
    border: 2px solid #f6f7f9;
    padding: 3px 3px 3px 3px;
}

.checkbox:focus:not(.disabled) > .checkbox-input > .checkbox-square {
    border-color: $aqcua-blue;
}

.checkbox > .checkbox-input > .label {
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    margin: 0px 0px 0px 4px;
    vertical-align: middle;
}

.checkbox.disabled > .checkbox-input > .label {
    cursor: default;
}
</style>
<script>
export const Checkbox = {
    name: "checkbox",
    props: {
        label: {
            type: String,
            default: null
        },
        value: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: "check"
        },
        size: {
            type: Number,
            default: 4
        }
    },
    data: function() {
        return {
            valueData: this.value,
            active: false
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        }
    },
    computed: {
        style() {
            return {
                width: `${this.size}px`,
                height: `${this.size}px`
            };
        },
        checkedStyle() {
            const icon = require(`./assets/${this.icon}.svg`);
            return {
                background: `url(${icon}) center / ${this.size / 2 + 4}px ${this.size / 2 +
                    3}px no-repeat #1d2631`
            };
        },
        activeCheckStyle() {
            const icon = require(`./assets/${this.icon}-dark.svg`);
            return {
                background: `url(${icon}) center / ${this.size / 2 + 4}px ${this.size / 2 +
                    3}px no-repeat #f4f5f7`
            };
        },
        disabledStyle() {
            const icon = require(`./assets/${this.icon}-gray.svg`);
            return {
                background: `url(${icon}) center / ${this.size / 2 + 4}px ${this.size / 2 +
                    3}px no-repeat #f4f5f7`
            };
        },
        getStyle() {
            let base = {};
            if (this.disabled && this.valueData) base = this.disabledStyle;
            else if (this.valueData) base = this.checkedStyle;
            else if (this.active) base = this.activeCheckStyle;
            return { ...this.style, ...base };
        }
    },
    methods: {
        toggleItem(item) {
            if (this.disabled) return;

            this.valueData = !this.valueData;
            this.$emit("update:value", this.valueData, this.index);
        },
        onSpace() {
            this.toggleItem();
        },
        onClick() {
            this.toggleItem();
        },
        onMouseDown() {
            this.active = true;
        },
        onMouseUp() {
            this.active = false;
        }
    }
};

export default Checkbox;
</script>
