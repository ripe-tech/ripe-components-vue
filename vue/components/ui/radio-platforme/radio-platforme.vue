<template>
    <div class="radio-group">
        <label-platforme class="title" v-bind:text="labelTitle" v-if="labelTitle" />
        <div class="radio-group-choices">
            <div
                class="radio-group-choice"
                v-bind:class="{
                    disabled: disabled || item.disabled,
                    error: item.error,
                    checked: item.value === value
                }"
                v-for="item in items"
                v-bind:key="item.value"
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

.radio-group-choice:hover {
    background-color: #ebecf0;
}

.radio-group-choice:hover > .circular-button {
    border-color: #c1c7d0;
}

.radio-group-choice:active {
    background-color: #dde0e2;
}

.radio-group-choice {
    cursor: pointer;
    display: block;
    line-height: 13px;
    padding: 10px 0px 10px 0px;
    user-select: none;
}

.radio-group-choice.disabled > .label {
    cursor: not-allowed;
}

.radio-group-choice > .value {
    display: none;
}

.radio-group-choice.checked > .circular-button {
    background-color: #ffffff;
    border-color: $dark;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.radio-group-choice.disabled {
    cursor: not-allowed;
}

.radio-group-choice.disabled > .circular-button {
    background-color: #f4f5f7;
    border: 2px solid #f4f5f7;
}

.radio-group-choice.checked.disabled > .circular-button {
    background-color: #a6adb4;
    border-color: #f6f7f9;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.radio-group-choice.error > .circular-button {
    background-color: #f4f5f7;
    border: 2px solid $red;
}

.radio-group-choice.error > .circular-button.checked {
    border: 4px solid $red;
}

.radio-group-choice:active:not(.disabled) > .circular-button {
    background-color: $dark;
    border-color: #c3c9cf;
    border-width: 4px;
    padding: 1px 1px 1px 1px;
}

.radio-group-choice > .label {
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 13px;
    margin: 0px 0px 0px 6px;
    vertical-align: bottom;
}

.radio-group-choice > .circular-button {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 50%;
    display: inline-block;
    height: 2px;
    margin: 0px 0px 0px 6px;
    padding: 3px 3px 3px 3px;
    vertical-align: bottom;
    width: 2px;
}

.footer {
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
            default: false
        }
    },
    methods: {
        onClick(item) {
            if (item.disabled || this.disabled) return;
            if (this.value === item.value) return;
            this.$emit("update:value", item.value);
        }
    }
};

export default RadioPlatforme;
</script>
