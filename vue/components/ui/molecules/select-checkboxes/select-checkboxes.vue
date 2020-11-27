<template>
    <select-ripe
        class="select-checkboxes"
        v-bind:options="selectOptions"
        v-bind:value="'checkbox-group'"
        v-bind="{
            autoScroll: false,
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
    margin: 0px 0px 0px 15px;
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
         * Checkbox group items. Example:
         * [
         *     { label: "Japan", value: "japan"},
         *     { value: "canada" },
         *     { label: "Bali", value: "bali", disabled: true },
         *     { label: "Tibet", value: "tibet", error: true }
         * ].
         */
        items: {
            type: Array,
            default: () => []
        },
        /**
         * Values of the checked items. Example:
         * {
         *     japan: false,
         *     canada: false,
         *     bali: true
         * }.
         */
        values: {
            type: Object,
            default: () => ({})
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
