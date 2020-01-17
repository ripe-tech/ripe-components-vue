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
                        v-if="getTenancySelectOptions(item.value)"
                        v-show="isTenancySelected(item.value)"
                        v-bind:placeholder="selectPlaceholder(item)"
                        v-bind:width="200"
                        v-bind:align="'left'"
                        v-bind:max-height="150"
                        v-bind:options="getTenancySelectOptions(item.value)"
                        v-on:update:value="(value, selectedItemIndex) => onSelected(item.value, value, selectedItemIndex)"
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
            searchData: this.search
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
        getBrands() {
            // TODO fix me, I'm hardcoded
            return [
                { value: "brand_a", label: "Brand A" },
                { value: "brand_b", label: "Brand B" },
                { value: "brand_c", label: "Brand C" },
                { value: "brand_d", label: "Brand D" },
                { value: "brand_e", label: "Brand E" },
                { value: "brand_f", label: "Brand F" },
                { value: "brand_g", label: "Brand G" }
            ];
        },
        getChannels() {
            // TODO fix me, I'm hardcoded
            return [
                { value: "channel_a", label: "Channel A" },
                { value: "channel_b", label: "Channel B" },
                { value: "channel_c", label: "Channel C" }
            ];
        },
        getFactories() {
            // TODO fix me, I'm hardcoded
            return [
                { value: "factory_a", label: "Factory A" },
                { value: "factory_b", label: "Factory B" },
                { value: "factory_c", label: "Factory C" },
                { value: "factory_d", label: "Factory D" },
                { value: "factory_e", label: "Factory E" }
            ];
        },
        getTenancySelectOptions(tenancyValue) {
            switch (tenancyValue) {
                case "brand":
                    return this.getBrands();
                case "channel":
                    return this.getChannels();
                case "factory":
                    return this.getFactories();
                default: return null;
            }
        },
        isTenancySelected(tenancyValue) {
            return Boolean(this.tenacyValuesData[tenancyValue]);
        },
        selectPlaceholder(item) {
            return `Select ${item.label}`;
        },
        onDiscardClick() {
            this.$emit("click:cancel");
        },
        onSaveClick() {
            this.$emit("click:confirm");
        },
        onSelected(tenancyValue, value, selectedValueIndex) {
            //TODO
            console.log(`Select ${tenancyValue}: `, selectedValueIndex, value);
        }
    }
};

export default SaveFilterModal;
</script>
