<template>
    <div class="radio-group">
        <label-platforme class="title" v-bind:text="labelTitle" v-if="labelTitle" />
        <div class="choices">
            <div
                class="choice"
                v-bind:class="{
                    disabled: disabled || item.disabled,
                    error: error || item.error,
                    checked: item.value === value
                }"
                v-bind:index="index"
                v-bind:tabindex="index === 0 ? 0 : -1"
                v-for="(item, index) in items"
                v-bind:key="item.value"
                v-bind:ref="`choice-${index}`"
                v-on:keydown.32="onSpacebar(item)"
                v-on:keydown.38="onArrowUp(index)"
                v-on:keydown.40="onArrowDown(index)"
                v-on:click="onClick(item)"
            >
                <input type="radio" class="value" v-bind:id="item.value" />
                <div class="circular-button" />
                <label v-bind:for="item.value" class="label">
                    {{ item.label ? item.label : item.value }}
                </label>
            </div>
        </div>
        <label-platforme
            class="footer"
            v-bind:size="'small'"
            v-bind:text="labelFooter"
            v-if="labelFooter"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.radio-group {
    display: inline-block;
}

.radio-group > .title {
    color: $pale-grey;
    display: block;
}

.choice {
    cursor: pointer;
    display: block;
    line-height: 13px;
    padding: 10px 6px 10px 6px;
    user-select: none;
}

.choice:hover {
    background-color: #ebecf0;
}

.choice:active {
    background-color: #dde0e2;
}

.choice.disabled {
    cursor: not-allowed;
}

.choice > .value {
    display: none;
}

.choice > .circular-button {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 50%;
    display: inline-block;
    height: 2px;
    padding: 3px 3px 3px 3px;
    vertical-align: bottom;
    width: 2px;
}

.choice:hover > .circular-button {
    border-color: #c1c7d0;
}

.choice:active:not(.disabled) > .circular-button {
    background-color: $dark;
    border-color: #c3c9cf;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.choice.checked > .circular-button {
    background-color: $white;
    border-color: $dark;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.choice.error > .circular-button {
    background-color: #f4f5f7;
    border: 2px solid $red;
}

.choice.error.checked > .circular-button {
    border: 4px solid $red;
}

.choice.disabled > .circular-button {
    background-color: #f4f5f7;
    border: 2px solid #f4f5f7;
}

.choice.checked.disabled > .circular-button {
    background-color: #a6adb4;
    border-color: $pale-grey;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.choice > .label {
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 13px;
    margin: 0px 0px 0px 6px;
    vertical-align: bottom;
}

.choice.disabled > .label {
    cursor: not-allowed;
}

.radio-group > .footer {
    color: $pale-grey;
    display: block;
    padding: 4px 0px 0px 0px;
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
        },
        labelTitle: {
            type: String,
            default: null
        },
        labelFooter: {
            type: String,
            default: null
        }
    },
    methods: {
        onSpacebar(item) {
            this.setItem(item);
        },
        onArrowUp(index) {
            if (index === 0) return;

            this.$refs[`choice-${index - 1}`][0].focus();
            this.setItem(this.items[index - 1]);
        },
        onArrowDown(index) {
            if (index >= this.items.length - 1) return;

            this.$refs[`choice-${index + 1}`][0].focus();
            this.setItem(this.items[index + 1]);
        },
        onClick(item) {
            this.setItem(item);
        },
        setItem(item) {
            if (item.disabled || this.disabled) return;
            if (this.value === item.value) return;
            this.$emit("update:value", item.value);
        },
        unsetItem(item) {
            if (item.disabled || this.disabled) return;
            if (this.value !== item.value) return;
            this.$emit("update:value", null);
        }
    }
};

export default RadioPlatforme;
</script>
