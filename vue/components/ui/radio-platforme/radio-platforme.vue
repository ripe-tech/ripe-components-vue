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
    border: 2px solid #dfe1e5;
    border-radius: 50% 50% 50% 50%;
    cursor: pointer;
    display: inline-block;
    height: 4px;
    padding: 3px 3px 3px 3px;
    vertical-align: middle;
    width: 4px;
}

.choice:not(.disabled):not(.error):active > .radio-circle {
    background: url("~./assets/check-dark.svg") center / 4px no-repeat #f4f5f7;
    border: 2px solid #c3c9cf;
    padding: 3px 3px 3px 3px;
}

.choice.error > .radio-circle {
    background-color: #f4f5f7;
    border: 2px solid $dark-red;
}

.choice.disabled > .radio-circle {
    background: #f4f5f7;
    border: 2px solid #f4f5f7;
    cursor: default;
}

.choice.checked > .radio-circle {
    background: url("~./assets/check.svg") center / 4px no-repeat $dark;
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.choice.error.checked > .radio-circle {
    background: url("~./assets/check.svg") center / 4px no-repeat $dark;
    border: 2px solid $dark-red;
}

.choice.disabled.checked > .radio-circle {
    background: url("~./assets/check-gray.svg") center / 4px no-repeat #f4f5f7;
    border: 2px solid #f6f7f9;
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
        focusAndSetItem(index) {
            const item = this.items[index];

            if (item.disabled || this.disabled) return false;
            if (this.value === item.value) return false;

            this.$refs[`choice-${index}`][0].focus();
            this.setItem(item);
        },
        setItem(item) {
            if (item.disabled || this.disabled) return false;
            if (this.value === item.value) return false;

            this.$emit("update:value", item.value);
            return true;
        },
        onSpacebar(item) {
            this.setItem(item);
        },
        onArrowUp(index) {
            // tries to find a suitable item to focus
            for (let i = index + 1; i < this.items.length; i++) {
                if (this.focusAndSetItem(i)) return;
            }

            // if it can't find an item to focus until
            // the end of the list, searches from the
            // beginning
            for (let i = 0; i < index; i++) {
                if (this.focusAndSetItem(i)) return;
            }
        },
        onArrowDown(index) {
            // tries to find a suitable item to focus
            for (let i = index - 1; i >= 0; i--) {
                if (this.focusAndSetItem(i)) return;
            }

            // if it can't find an item to focus until
            // the beginning of the list, searches from the
            // end
            for (let i = this.items.length - 1; i > index; i--) {
                if (this.focusAndSetItem(i)) return;
            }
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
