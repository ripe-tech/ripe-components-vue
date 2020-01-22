<template>
    <div class="checkbox">
        <div
            tabindex="0"
            class="choice"
            v-bind:class="{
                checked: value,
                disabled: disabled,
                error: error
            }"
            v-on:click="onClick()"
            v-on:mousedown="onMouseDown()"
            v-on:mouseup="onMouseUp()"
            v-on:keydown.space="onSpace()"
        >
            <slot name="before-item" v-bind:item="{ label, value }" />
            <div class="checkbox-input">
                <div class="checkbox-square" v-bind:style="getStyle" />
                <label class="label">{{ label }}</label>
            </div>
            <slot name="after-item" v-bind:item="{ label, value }" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.choice > .checkbox-input {
    display: inline-block;
}

.choice > .checkbox-input > .value {
    display: none;
}

.choice > .checkbox-input > .checkbox-square {
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

.choice:not(.disabled):not(.error) > .checkbox-input:active > .checkbox-square {
    border: 2px solid #c3c9cf;
    padding: 3px 3px 3px 3px;
}

.choice.error > .checkbox-input > .checkbox-square {
    background-color: #f4f5f7;
    border: 2px solid $dark-red;
}

.choice.disabled > .checkbox-input > .checkbox-square {
    background: none center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f4f5f7;
    cursor: default;
}

.choice.checked > .checkbox-input > .checkbox-square {
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.choice.error.checked > .checkbox-input > .checkbox-square {
    border: 2px solid $dark-red;
}

.choice.disabled.checked > .checkbox-input > .checkbox-square {
    border: 2px solid #f6f7f9;
    padding: 3px 3px 3px 3px;
}

.choice:focus:not(.disabled) > .checkbox-input > .checkbox-square {
    border-color: $aqcua-blue;
}

.choice > .checkbox-input > .label {
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    margin: 0px 0px 0px 4px;
    vertical-align: middle;
}

.choice.disabled > .checkbox-input > .label {
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
        checkedStyle() {
            const icon = require(`./assets/${this.icon}.svg`);
            return {
                background: `url(${icon}) center / 7px 6px no-repeat #1d2631`
            };
        },
        activeCheckStyle() {
            const icon = require(`./assets/${this.icon}-dark.svg`);
            return {
                background: `url(${icon}) center / 7px 6px no-repeat #f4f5f7`
            };
        },
        disabledStyle() {
            const icon = require(`./assets/${this.icon}-gray.svg`);
            return {
                background: `url(${icon}) center / 7px 6px no-repeat #f4f5f7`
            };
        },
        getStyle() {
            if (this.disabled && this.value) return this.disabledStyle;
            if (this.value) return this.checkedStyle;
            if (this.active) return this.activeCheckStyle;
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
