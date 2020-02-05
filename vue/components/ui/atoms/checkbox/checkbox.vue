<template>
    <div
        tabindex="0"
        class="checkbox"
        v-bind:class="classes"
        v-on:click="onClick()"
        v-on:mousedown="onMouseDown()"
        v-on:mouseup="onMouseUp()"
        v-on:keydown.space="onSpace()"
    >
        <global-events v-on:mouseup="onMouseUp" />
        <div class="checkbox-input">
            <div class="checkbox-square" v-bind:style="squareStyle" />
            <label class="label" v-if="label">{{ label }}</label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.checkbox {
    display: inline-block;
    font-size: 0px;
    outline: none;
    user-select: none;
}

.checkbox > .checkbox-input {
    display: inline-block;
}

.checkbox > .checkbox-input > .value {
    display: none;
}

.checkbox > .checkbox-input > .checkbox-square {
    background-color: #fafbfc;
    background-position: center center;
    background-repeat: no-repeat;
    border: 2px solid #dfe1e5;
    border-radius: 2px 2px 2px 2px;
    cursor: pointer;
    display: inline-block;
    height: 4px;
    padding: 3px 3px 3px 3px;
    vertical-align: middle;
    width: 4px;
}

.checkbox.error > .checkbox-input > .checkbox-square {
    background-color: #f4f5f7;
    border: 2px solid $dark-red;
}

.checkbox.disabled > .checkbox-input > .checkbox-square {
    background-color: #f4f5f7;
    border: 2px solid #f4f5f7;
    cursor: default;
}

.checkbox.checked > .checkbox-input > .checkbox-square {
    background-color: $dark;
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.checkbox.checked.active > .checkbox-input > .checkbox-square {
    background-color: #f4f5f7;
}

.checkbox.error.checked > .checkbox-input > .checkbox-square {
    background-color: $dark;
    border: 2px solid $dark-red;
}

.checkbox.disabled.checked > .checkbox-input > .checkbox-square {
    background-color: #f4f5f7;
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
    opacity: 0.6;
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
        checked: {
            type: Boolean,
            default: false
        },
        disabled: {
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
        },
        variant: {
            type: String,
            default: null
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
            const base = {
                checked: this.checkedData,
                disabled: this.disabled,
                active: this.active
            };

            if (this.variant) base[this.variant] = true;

            return base;
        },
        squareStyle() {
            const base = {
                width: `${this.size}px`,
                height: `${this.size}px`,
                "background-size": `${this.size / 2 + 5}px ${this.size / 2 + 5}px`
            };

            if (this.disabled && this.checkedData) {
                base["background-image"] = `url(${require(`./assets/${this.icon}-gray.svg`)})`;
            }

            if (!this.disabled && this.checkedData) {
                base["background-image"] = `url(${require(`./assets/${this.icon}.svg`)})`;
            }

            if (!this.disabled && this.active) {
                base["background-image"] = `url(${require(`./assets/${this.icon}-dark.svg`)})`;
            }

            return base;
        }
    },
    methods: {
        toggle() {
            if (this.disabled) return;

            this.checkedData = !this.checkedData;
            this.$emit("update:checked", this.checkedData);
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

export default Checkbox;
</script>
