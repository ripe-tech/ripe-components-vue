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
    >
        <template v-slot:checkbox-group>
            <div class="checkboxes" v-on:click.stop>
                <checkbox-group v-bind:items="items" v-bind:values.sync="valuesData" />
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
export const SelectCheckboxes = {
    name: "select-checkboxes",
    props: {
        /**
         * Label shown in the select button.
         */
        label: {
            type: String,
            required: true
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
        }
    },
    data: function() {
        return {
            valuesData: this.values
        };
    },
    computed: {
        selectOptions() {
            return [{ label: this.label, value: "checkbox-group" }];
        }
    },
    watch: {
        values: {
            handler: function(value) {
                this.valuesData = value;
            }
        },
        valuesData: {
            deep: true,
            handler: function(value) {
                this.$emit("update:values", value);
            }
        }
    }
};

export default SelectCheckboxes;
</script>
