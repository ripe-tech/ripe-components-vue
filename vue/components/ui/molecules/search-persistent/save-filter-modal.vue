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
            <checkbox v-bind:items="tenancyItemsData" v-bind:values.sync="tenacyValuesData">
                <template v-slot="{ item, index }">
                    <select-ripe
                        v-bind:visible.sync="visibleSelects[index]"
                        v-bind:placeholder="selectPlaceholder(item)"
                        v-bind:width="200"
                        v-bind:align="'left'"
                        v-bind:max-height="150"
                        v-bind:options="getTenancySelectOptions(item.value)"
                        v-if="hasTenancySelectOptions(item.value)"
                        v-show="isTenancySelected(item.value)"
                        v-on:update:visible="value => onUpdateSelectVisible(value, index)"
                        v-on:update:value="
                            (value, selectedItemIndex) =>
                                onSelected(index, item.value, value, selectedItemIndex)
                        "
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

.form-input .content .checkbox .select {
    display: inline-block;
    margin: 0px 10px 0px 10px;
    vertical-align: middle;
}
</style>

<script>

// TODOs
// If a dropdown would only have 1 option then don't show it
// ✓ If a dropdown has 0 options then don't even show the checkbox 
// If all dropdowns are empty then don't show the "Tenancy" section

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
            tenancyItemsData: this.tenancyItems,
            visibleSelects: new Array(this.tenancyItems.length).fill(false),
            brands: [],
            channels: [],
            factories: []
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
    mounted: async function() {
        //Getting brands, channels and factories
        this.brands = await this.getBrands();
        this.channels = await this.getChannels();
        this.factories = await this.getFactories();
        
        this.removeInvalidChoices();
    },
    methods: {
        async getBrands() {
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
        async getChannels() {
            // TODO fix me, I'm hardcoded
            return [
                { value: "channel_a", label: "Channel A" },
                { value: "channel_b", label: "Channel B" },
                { value: "channel_c", label: "Channel C" }
            ];
        },
        async getFactories() {
            // TODO fix me, I'm hardcoded
            return [
                { value: "factory_a", label: "Factory A" },
                { value: "factory_b", label: "Factory B" },
                { value: "factory_c", label: "Factory C" },
                { value: "factory_d", label: "Factory D" },
                { value: "factory_e", label: "Factory E" }
            ];
        },
        removeInvalidChoices() {
            for (let i = 0; i < this.tenancyItemsData.length; i++) {
                if(!this.isValidChoice(this.tenancyItemsData[i].value)){
                    this.tenancyItemsData.splice(i, 1);
                    i--;
                } 
            }
        },
        isValidChoice(tenancyValue) {
            return tenancyValue === "user" || this.hasTenancySelectOptions(tenancyValue);
        },
        hasTenancySelectOptions(tenancyValue) {
            switch (tenancyValue) {
                case "brand": return this.brands.length;
                case "channel": return this.channels.length;
                case "factory": return this.factories.length;
                default: return false;
            }
        },
        getTenancySelectOptions(tenancyValue) {
            if (!this.hasTenancySelectOptions(tenancyValue)) return null;

            switch (tenancyValue) {
                case "brand": return this.brands;
                case "channel": return this.channels;
                case "factory": return this.factories;
                default: return null;
            }
        },
        isTenancySelected(tenancyValue) {
            return Boolean(this.tenacyValuesData[tenancyValue]);
        },
        selectPlaceholder(item) {
            return `Select ${item.label}`;
        },
        closeAllSelects() {
            this.visibleSelects = new Array(this.tenancyItemsData.length).fill(false);
        },
        setSelectVisible(index, value) {
            this.$set(this.visibleSelects, index, value);
        },
        onDiscardClick() {
            this.$emit("click:cancel");
        },
        onSaveClick() {
            this.$emit("click:confirm");
        },
        onUpdateSelectVisible(value, index) {
            this.closeAllSelects();
            this.setSelectVisible(index, value);
        },
        onSelected(tenancyValue, value, selectedValueIndex) {
            // TODO
            console.log(`Select ${tenancyValue}: `, selectedValueIndex, value);
        }
    }
};

export default SaveFilterModal;
</script>
