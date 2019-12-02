<template>
    <div class="checkbox-platforme">
        <label-platforme class="title" v-bind:text="labelTitle" v-if="labelTitle" />
        <div class="checkbox-group">
            <div
                class="checkbox-choice"
                v-bind:class="{
                    checked: values[item.value],
                    disabled: disabled || item.disabled,
                    error: error || item.error
                }"
                v-for="(item, index) in items"
                v-bind:key="index"
                v-on:click="onClick(item)"
            >
                <input type="checkbox" class="checkbox" v-bind:id="item.value" />
                <div class="checkbox-square" />
                <label-platforme class="label-text" v-bind:for="item.value">
                    {{ item.label ? item.label : item.value }}
                </label-platforme>
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

.checkbox-platforme {
    display: inline-block;
}

.title {
    color: $pale-grey;
    display: block;
}

.checkbox-choice {
    display: block;
    padding: 3.5px 0px 3.5px 0px;
    user-select: none;
}

.checkbox-label {
    display: inline-block;
    font-size: 14px;
    line-height: 12px;
}

.checkbox-choice.disabled:hover,
.checkbox-choice.disabled:hover ::v-deep label {
    cursor: not-allowed;
}

.checkbox-choice:hover,
.checkbox-choice:hover ::v-deep label {
    cursor: pointer;
    opacity: 0.8;
}

.checkbox {
    display: none;
}

.checkbox-choice.checked > .checkbox-square {
    background: url("~./assets/check.svg") center / 7px 6px no-repeat $dark;
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.checkbox-choice.disabled > .checkbox-square {
    background: none center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f4f5f7;
}

.checkbox-choice.disabled.checked > .checkbox-square {
    background: url("~./assets/check-gray.svg") center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f6f7f9;
    padding: 3px 3px 3px 3px;
}

.checkbox-choice.error > .checkbox-square {
    background-color: #f4f5f7;
    border: 2px solid $dark-peach;
}

.checkbox-choice.error.checked > .checkbox-square {
    background: url("~./assets/check.svg") center / 7px 6px no-repeat $dark;
    border: 2px solid $dark-peach;
}

.checkbox-choice:not(.disabled):active > .checkbox-square {
    background: url("~./assets/check-dark.svg") center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #d6dade;
    padding: 3px 3px 3px 3px;
}

.checkbox-choice-text {
    display: inline-block;
    font-size: 14px;
    line-height: 13px;
    vertical-align: bottom;
}

.checkbox-square {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 2px 2px 2px 2px;
    display: inline-block;
    height: 2px;
    margin: 0px 0px 0px 6px;
    padding: 3px 3px 3px 3px;
    vertical-align: bottom;
    width: 2px;
}

.label-text {
    color: $grey;
    margin: 0px 0px 0px 6px;
}

.footer {
    color: $pale-grey;
    display: block;
    padding: 4px 0px 0px 0px;
}
</style>
<script>
export const CheckboxPlatforme = {
    name: "checkbox-platforme",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        values: {
            type: Object,
            default: () => {}
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
            if (this.disabled || item.disabled) {
                return;
            }
            this.values[item.value] ? this.removeItem(item) : this.addItem(item);
        },
        removeItem(item) {
            this.$emit("unselected:value", item.value);

            const updated = Object.assign({}, this.values);
            delete updated[item.value];
            this.$emit("update:values", updated);
        },
        addItem(item) {
            this.$emit("selected:value", item.value);

            const updated = Object.assign({}, this.values);
            updated[item.value] = true;
            this.$emit("update:values", updated);
        }
    }
};

export default CheckboxPlatforme;
</script>
