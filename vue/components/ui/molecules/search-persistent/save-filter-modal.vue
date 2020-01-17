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
        <form-input v-bind:header="'Tenacy'" v-if="!isTenancyEmpty">
            <checkbox v-bind:items="tenancyItemsData" v-bind:values.sync="tenacyValuesData">
                <template v-slot="{ item, index }">
                    <select-ripe
                        v-bind:visible.sync="visibleSelects[index]"
                        v-bind:placeholder="selectPlaceholder(item)"
                        v-bind:width="200"
                        v-bind:align="'left'"
                        v-bind:max-height="150"
                        v-bind:options="getTenancySelectOptions(item.value)"
                        v-if="isValidSelect(item.value)"
                        v-show="isTenancySelected(item.value)"
                        v-on:update:visible="value => onUpdateSelectVisible(value, index)"
                        v-on:update:value="value => onSelected(item.value, value)"
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
            brandSelected: null,
            channels: [],
            channelSelected: null,
            factories: [],
            factorySelected: null
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
                tenancy: this.getSelectedTenancy(tenancy), 
                context: "" // TODO
            }));
        },
        isTenancyEmpty() {
            return this.tenancyItemsData.length === 1;
        }
    },
    mounted: async function() {
        // Getting brands, channels and factories
        this.brands = await this.getBrands();
        this.channels = await this.getChannels();
        this.factories = await this.getFactories();

        this.removeInvalidChoices();
    },
    methods: {
        async getBrands() {
            // TODO fix me, I'm hardcoded and have 7 options
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
            // TODO fix me, I'm hardcoded and have 1 option
            return [{ value: "channel_a", label: "Channel A" }];
        },
        async getFactories() {
            // TODO fix me, I'm hardcoded and have 5 option
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
                if (!this.isValidChoice(this.tenancyItemsData[i].value)) {
                    this.tenancyItemsData.splice(i, 1);
                    i--;
                }
            }
        },
        isValidChoice(tenancyValue) {
            return tenancyValue === "user" || this.hasTenancySelectOptions(tenancyValue);
        },
        isValidSelect(tenancyValue) {
            return (
                this.hasTenancySelectOptions(tenancyValue) &&
                this.hasRequiredOptionsLength(tenancyValue)
            );
        },
        hasTenancySelectOptions(tenancyValue) {
            switch (tenancyValue) {
                case "brand":
                    return this.brands.length;
                case "channel":
                    return this.channels.length;
                case "factory":
                    return this.factories.length;
                default:
                    return false;
            }
        },
        hasRequiredOptionsLength(tenancyValue) {
            switch (tenancyValue) {
                case "brand":
                    return this.brands.length > 1;
                case "channel":
                    return this.channels.length > 1;
                case "factory":
                    return this.factories.length > 1;
                default:
                    return false;
            }
        },
        getTenancySelectOptions(tenancyValue) {
            if (!this.hasTenancySelectOptions(tenancyValue)) return null;

            switch (tenancyValue) {
                case "brand":
                    return this.brands;
                case "channel":
                    return this.channels;
                case "factory":
                    return this.factories;
                default:
                    return null;
            }
        },
        getSelectedTenancy(tenancyValue) {
                switch (tenancyValue) {
                case "user": return "user";
                case "brand":
                    if(!this.hasRequiredOptionsLength(tenancyValue)) return this.brands[0].value;
                    else return this.brandSelected;
                case "channel":
                    if(!this.hasRequiredOptionsLength(tenancyValue)) return this.channels[0].value;
                    else return this.channelSelected;
                case "factory":
                    if(!this.hasRequiredOptionsLength(tenancyValue)) return this.factories[0].value;
                    else return this.factorySelected;
                default:
                    return null;
            }
        },
        setSelectedTenancy(tenancyValue, selectedValue) {
            console.log("selecting;", tenancyValue);

                switch (tenancyValue) {
                case "brand": this.brandSelected = selectedValue; break;
                case "channel": this.channelSelected = selectedValue; break;
                case "factory": this.factorySelected = selectedValue; break;
                default: throw new Error("Invalid tenancy value");
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
        onSelected(tenancyValue, selectedValue) {
            this.setSelectedTenancy(tenancyValue, selectedValue);
        }
    }
};

export default SaveFilterModal;
</script>
