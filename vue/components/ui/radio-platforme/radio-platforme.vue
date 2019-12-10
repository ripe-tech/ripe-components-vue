<template>
    <div class="radio">
        <div
            class="choice"
            v-bind:class="{
                disabled: disabled || item.disabled,
                error: error || item.error,
                checked: item.value === value
            }"
            v-bind:index="index"
            v-bind:tabindex="_getTabIndex(item, index)"
            v-for="(item, index) in items"
            v-bind:key="item.value"
            v-bind:ref="`choice-${index}`"
            v-on:keydown.space="onSpacebar(item)"
            v-on:keydown.up="onArrowUp(index)"
            v-on:keydown.down="onArrowDown(index)"
            v-on:click="onClick(item)"
        >
            <input type="radio" class="value" v-bind:id="item.value" />
            <div class="radio-circle" />
            <label v-bind:for="item.value" class="label">
                {{ item.label ? item.label : item.value }}
            </label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.choice {
    display: block;
    line-height: 13px;
    outline: none;
    padding: 10px 6px 10px 6px;
    user-select: none;
    width: fit-content;
}

.choice > .value {
    display: none;
}

.choice > .radio-circle {
    background-color: #fafbfc;
    border: 4px solid #dfe1e5;
    border-radius: 50% 50% 50% 50%;
    cursor: pointer;
    display: inline-block;
    height: 2px;
    padding: 3px 3px 3px 3px;
    vertical-align: middle;
    width: 2px;
}

.choice:not(.disabled):not(.error):active > .radio-circle {
    background-color: #f4f5f7;
    border: 6px solid #c3c9cf;
    padding: 1px 1px 1px 1px;
}

.choice.error > .radio-circle {
    background-color: #f4f5f7;
    border-color: $dark-red;
}

.choice.disabled > .radio-circle {
    background-color: #f4f5f7;
    border-color: #f4f5f7;
    cursor: default;
}

.choice.checked > .radio-circle {
    background-color: $white;
    border-color: $dark;
    border-width: 6px;
    padding: 1px 1px 1px 1px;
}

.choice.error.checked > .radio-circle {
    border-color: $dark-red;
}

.choice.disabled.checked > .radio-circle {
    background-color: #f4f5f7;
    border-color: #a6adb4;
    border-width: 6px;
    padding: 3px 3px 3px 3px;
}

.choice:focus:not(.disabled) > .radio-circle {
    border-color: $aqcua-blue;
}

.choice > .label {
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    margin: 0px 0px 0px 4px;
    vertical-align: middle;
}

.choice.disabled > .label {
    cursor: default;
}
</style>

<script>
export const RadioPlatforme = {
    name: "radio-platforme",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        firstEnabledIndex() {
            if (this.disabled) return null;

            const firstEnabled = this.items
                .map((item, index) => [item, index])
                .find(([item, index]) => !item.disabled);

            return firstEnabled ? firstEnabled[1] : null;
        }
    },
    methods: {
        setItem(item) {
            if (item.disabled || this.disabled) return;
            if (this.value === item.value) return;
            this.$emit("update:value", item.value);
        },
        onSpacebar(item) {
            this.setItem(item);
        },
        onArrowUp(index) {
            let newIndex;

            // tries to find a suitable item to focus
            for (let i = index - 1; i >= 0; i--) {
                if (!this.items[i].disabled) {
                    newIndex = i;
                    break;
                }
            }

            // if it can't find an item to focus until
            // the beginning of the list, searches from the
            // end
            if (newIndex === undefined) {
                for (let i = this.items.length - 1; i > index; i--) {
                    if (!this.items[i].disabled) {
                        newIndex = i;
                        break;
                    }
                }
            }

            if (newIndex === undefined) return;

            this.$refs[`choice-${newIndex}`][0].focus();
            this.setItem(this.items[newIndex]);
        },
        onArrowDown(index) {
            let newIndex;

            // tries to find a suitable item to focus
            for (let i = index + 1; i < this.items.length; i++) {
                if (!this.items[i].disabled) {
                    newIndex = i;
                    break;
                }
            }

            // if it can't find an item to focus until
            // the end of the list, searches from the
            // beginning
            if (newIndex === undefined) {
                for (let i = 0; i < index; i++) {
                    if (!this.items[i].disabled) {
                        newIndex = i;
                        break;
                    }
                }
            }

            if (newIndex === undefined) return;

            this.$refs[`choice-${newIndex}`][0].focus();
            this.setItem(this.items[newIndex]);
        },
        onClick(item) {
            this.setItem(item);
        },
        _getTabIndex(item, index) {
            if (this.disabled || item.disabled) return null;

            return this.firstEnabledIndex === index ? 0 : -1;
        }
    }
};

export default RadioPlatforme;
</script>
