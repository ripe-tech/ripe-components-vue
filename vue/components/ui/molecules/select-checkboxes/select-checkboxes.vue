<template>
    <select-ripe
        class="select-checkboxes"
        v-bind:options="selectOptions"
        v-bind:value="'checkbox-group'"
        v-bind:disabled="disabled"
        v-bind="{
            autoScroll: false,
            maxHeight: 210,
            ...selectProps
        }"
        ref="select"
        v-on:select:keydown="scrollToCheckbox"
    >
        <template v-slot:checkbox-group>
            <div class="checkboxes" ref="checkboxes" v-on:click.stop>
                <checkbox-group v-bind:items="_items" v-bind:values.sync="valuesData" />
            </div>
        </template>
    </select-ripe>
</template>

<style lang="scss" scoped>
.select-checkboxes .checkboxes {
    box-sizing: border-box;
    margin: 5px 15px 5px 15px;
    width: 100%;
}

.select-checkboxes .checkboxes ::v-deep .checkbox-item {
    width: 100%;
}

.select-checkboxes .checkboxes ::v-deep .checkbox {
    width: 100%;
}

.select-checkboxes .checkboxes ::v-deep .checkbox > .checkbox-input > .label {
    margin-left: 10px;
}
</style>

<script>
import { scrollMixin } from "../../../../mixins";

export const SelectCheckboxes = {
    name: "select-checkboxes",
    mixins: [scrollMixin],
    props: {
        /**
         * Placeholder shown in the select button
         * when no options are selected.
         */
        placeholder: {
            type: String,
            default: null
        },
        /**
         * Label shown in the select button.
         */
        label: {
            type: String,
            default: null
        },
        /**
         * The separator to use when building the label
         * consisting of the selected values.
         */
        labelSeparator: {
            type: String,
            default: " / "
        },
        /**
         * Checkbox group items.
         */
        items: {
            type: Array,
            default: () => []
        },
        /**
         * Values of the checked items.
         */
        values: {
            type: Object,
            default: () => ({})
        },
        /**
         * If the underlying select element should be disabled
         * disallowing interaction.
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Set of props passed on to select-ripe.
         */
        selectProps: {
            type: Object,
            default: () => ({})
        },
        /**
         * Whether to show an option that represents a global
         * select that checks all options.
         */
        showAll: {
            type: Boolean,
            default: false
        },
        /**
         * The label to be used to the global select that
         * checks all options.
         */
        allLabel: {
            type: String,
            default: "All"
        },
        /**
         * The internal value to be used to represent the
         * global select that checks all options.
         */
        allValue: {
            type: String,
            default: "$ALL"
        }
    },
    data: function() {
        return {
            valuesData: this.values
        };
    },
    computed: {
        selectOptions() {
            return [{ label: this._label, value: "checkbox-group" }];
        },
        _label() {
            if (this.label) return this.label;
            if (this.allSelected) return this.allLabel;
            const selectedLabels = this.items
                .filter(item => this.valuesData[item.value])
                .map(item => item.label || item.value);
            if (selectedLabels.length === 0) return this.placeholder;
            return selectedLabels.join(this.labelSeparator);
        },
        _items() {
            if (!this.showAll) return this.items;
            return [
                { label: this.allLabel, value: this.allValue },
                ...this.items.map(item => ({
                    ...item,
                    disabled: this.allSelected ? true : item.disabled
                }))
            ];
        },
        allSelected() {
            return Boolean(this.valuesData[this.allValue]);
        }
    },
    watch: {
        values: {
            handler: function(value) {
                this.valuesData = value;
            }
        },
        allSelected: {
            handler: function(value) {
                const valuesData = {};
                this._items.forEach(item => (valuesData[item.value] = value));
                this.valuesData = valuesData;
            }
        },
        valuesData: {
            handler: function(value) {
                this.$emit("update:values", value);
            },
            deep: true
        }
    },
    methods: {
        scrollToCheckbox(key, keyBuffer) {
            const index = this._items.findIndex(option =>
                option.label?.toUpperCase().startsWith(keyBuffer)
            );
            const dropdown = this.$refs.select.$refs.dropdown.$refs.dropdown;
            const dropdownElement = dropdown.getElementsByClassName("dropdown-item")[0];
            const elements = dropdownElement.getElementsByClassName("checkbox-item");
            this.scrollToIndex(dropdown, elements, index);
        }
    }
};

export default SelectCheckboxes;
</script>
