<template>
    <modal
        class="save-filter-modal"
        v-bind:buttons-alignment="'right'"
        v-bind:title="'New filter'"
        v-bind:cancel-text="'Discard changes'"
        v-bind:confirm-text="'Save filter'"
        v-bind:name="'save-filter-modal'"
        v-bind="$attrs"
        v-bind:min-width="600"
        v-on="$listeners"
    >
        <form-input v-bind:header="'Filter Name'">
            <input-ripe
                v-bind:variant="'dark'"
                v-bind:value.sync="filterNameData"
                v-bind:placeholder="'Filter Name'"
            />
        </form-input>
        <form-input v-bind:header="'Search'">
            <input-ripe v-bind:variant="'dark'" v-bind:value.sync="searchData" />
        </form-input>
        <form-input v-bind:header="'Tenacy'">
            <checkbox v-bind:items="tenancyItems" v-bind:values.sync="tenacyValuesData">
                <template v-slot:extra-info="{ item, index }">
                    <select-ripe
                        v-bind:placeholder="selectPlaceholder(item)"
                        v-bind:width="200"
                        v-bind:align="'left'"
                        v-bind:max-height="150"
                        v-bind:options="testSelectOptions"
                        v-on:update:value="(value, selectedItemIndex) => onSelected(item.label, value, selectedItemIndex)"
                    />
                </template>
            </checkbox>
        </form-input>
        <template v-slot:buttons-content>
            <button-color
                v-bind:class="'button-cancel'"
                v-bind:icon="'close'"
                v-bind:secondary="true"
                v-bind:text="'Discard changes'"
                v-on:click="onDiscardClick"
            />
            <button-color
                v-bind:disabled="!isFormValid"
                v-bind:class="'button-confirm'"
                v-bind:icon="'save'"
                v-bind:text="'Save filter'"
                v-on:click="onSaveClick"
            />
        </template>
    </modal>
</template>

<style lang="scss" scoped>
.form-input {
    margin: 0px 0px 17px 0px;
}

.select {
    display: inline-block;
    vertical-align: middle;
    margin: 0px 10px 0px 10px;
}
</style>

<script>
export const SaveFilterModal = {
    name: "save-filter-modal",
    props: {
        search: {
            type: String,
            required: false
        },
        tenancyItems: {
            type: Array,
            default: () => [
                {
                    value: "user",
                    label: "User"
                },
                {
                    value: "brand",
                    label: "Brand"
                },
                {
                    value: "channel",
                    label: "Channel"
                },
                {
                    value: "factory",
                    label: "Factory"
                }
            ]
        }
    },
    data: function() {
        return {
            tenacyValuesData: {},
            filterNameData: null,
            searchData: this.search,

            testSelectOptions: [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" },
                    { value: "option_4", label: "D" },
                    { value: "option_5", label: "E" },
                    { value: "option_6", label: "F" },
                    { value: "option_7", label: "G" },
                    { value: "option_8", label: "H" },
                    { value: "option_9", label: "I" },
                    { value: "option_10", label: "J" },
                    { value: "option_11", label: "K" },
                    { value: "option_12", label: "L" },
                    { value: "option_13", label: "M" },
                    { value: "option_14", label: "N" }
                ]
        };
    },
    watch: {
        search(value) {
            this.searchData = value;
        }
    },
    computed: {
        isFormValid() {
            return (
                this.searchData &&
                this.filterNameData &&
                Object.keys(this.tenacyValuesData).length > 0
            );
        },
        filters() {
            return Object.keys(this.tenacyValuesData).map(tenancy => ({
                name: this.filterNameData,
                value: this.searchData,
                tenancy: tenancy,
                context: "" // TODO
            }));
        }
    },
    mounted: async function() {},
    methods: {
        selectPlaceholder(item) {
            return `Select ${item.label}`;
        },
        onDiscardClick() {
            this.$emit("click:cancel");
        },
        onSaveClick() {
            this.$emit("click:confirm");
        },
        onSelected(tenancy, value, selectedValueIndex) {
            console.log(`Select ${tenancy}: `, selectedValueIndex, value);
        }
    }
};

export default SaveFilterModal;
</script>
