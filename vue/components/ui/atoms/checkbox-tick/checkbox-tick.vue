<template>
    <div
        tabindex="0"
        class="checkbox-tick"
        v-bind:class="classes"
        v-on:click="onClick"
        v-on:mousedown="onMouseDown"
        v-on:mouseup="onMouseUp"
        v-on:keydown.space="onSpace"
    >
        <global-events v-on:mouseup="onMouseUp" />
        <slot
            name="before-item"
            v-bind:label="label"
            v-bind:value="value"
            v-bind:checked="checkedData"
        />
        <div class="checkbox-tick-input">
            <div class="checkbox-tick-square" v-bind:style="getStyle" />
            <label class="label" v-if="label || value">{{ label ? label : value }}</label>
        </div>
        <slot
            name="after-item"
            v-bind:label="label"
            v-bind:value="value"
            v-bind:checked="checkedData"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.checkbox-tick {
    font-size: 0px;
    outline: none;
    user-select: none;
}

.checkbox-tick > .checkbox-tick-input {
    display: inline-block;
}

.checkbox-tick > .checkbox-tick-input > .value {
    display: none;
}

.checkbox-tick > .checkbox-tick-input > .checkbox-tick-square {
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

.checkbox-tick:not(.disabled):not(.error) > .checkbox-tick-input:active > .checkbox-tick-square {
    border: 2px solid #c3c9cf;
    padding: 3px 3px 3px 3px;
}

.checkbox-tick.error > .checkbox-tick-input > .checkbox-tick-square {
    background-color: #f4f5f7;
    border: 2px solid $dark-red;
}

.checkbox-tick.disabled > .checkbox-tick-input > .checkbox-tick-square {
    background: none center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f4f5f7;
    cursor: default;
}

.checkbox-tick.checked > .checkbox-tick-input > .checkbox-tick-square {
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.checkbox-tick.error.checked > .checkbox-tick-input > .checkbox-tick-square {
    border: 2px solid $dark-red;
}

.checkbox-tick.disabled.checked > .checkbox-tick-input > .checkbox-tick-square {
    border: 2px solid #f6f7f9;
    padding: 3px 3px 3px 3px;
}

.checkbox-tick:focus:not(.disabled) > .checkbox-tick-input > .checkbox-tick-square {
    border-color: $aqcua-blue;
}

.checkbox-tick > .checkbox-tick-input > .label {
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    margin: 0px 0px 0px 8px;
    vertical-align: middle;
}

.checkbox-tick.disabled > .checkbox-tick-input > .label {
    cursor: default;
}
</style>
<script>
export const CheckboxTick = {
    name: "checkbox-tick",
    props: {
        label: {
            type: String,
            default: null
        },
        value: {
            type: String,
            default: null
        },
        checked: {
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
            checkedData: this.checked,
            active: false
        };
    },
    watch: {
        checked(value) {
            this.checkedData = value;
        }
    },
    computed: {
        classes() {
            return {
                checked: this.checkedData,
                disabled: this.disabled,
                error: this.error
            };
        },
        sizeStyle() {
            return {
                width: `${this.size}px`,
                height: `${this.size}px`
            };
        },
        checkedStyle() {
            const icon = require(`./assets/${this.icon}.svg`);
            return {
                background: `url(${icon}) center / ${this.size / 2 + 5}px ${this.size / 2 +
                    4}px no-repeat #1d2631`
            };
        },
        activeCheckStyle() {
            const icon = require(`./assets/${this.icon}-dark.svg`);
            return {
                background: `url(${icon}) center / ${this.size / 2 + 5}px ${this.size / 2 +
                    4}px no-repeat #f4f5f7`
            };
        },
        disabledStyle() {
            const icon = require(`./assets/${this.icon}-gray.svg`);
            return {
                background: `url(${icon}) center / ${this.size / 2 + 5}px ${this.size / 2 +
                    4}px no-repeat #f4f5f7`
            };
        },
        getStyle() {
            let base = {};
            if (this.disabled && this.checkedData) base = this.disabledStyle;
            else if (this.checkedData) base = this.checkedStyle;
            else if (this.active) base = this.activeCheckStyle;
            return { ...this.sizeStyle, ...base };
        }
    },
    methods: {
        toggle() {
            if (this.disabled) return;

            this.checkedData = !this.checkedData;
            this.$emit("update:checked", this.checkedData, this.value, this.index);
        },
        onSpace() {
            this.toggle();
        },
        onClick() {
            this.toggle();
        },
        onMouseDown() {
            this.active = true;
        },
        onMouseUp() {
            this.active = false;
        }
    }
};

export default CheckboxTick;
</script>
