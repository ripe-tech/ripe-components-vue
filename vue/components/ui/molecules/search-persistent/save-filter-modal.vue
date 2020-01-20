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
        <form-input v-bind:header="'Tenancy'" v-if="!isTenancyEmpty">
            <checkbox
                v-bind:items="tenancyItemsData"
                v-bind:values.sync="tenancyCheckboxValuesData"
            >
                <template v-slot="{ item }">
                    <select-ripe
                        v-bind:visible.sync="tenancies[item.value].selectVisible"
                        v-bind:placeholder="selectPlaceholder(item)"
                        v-bind:width="200"
                        v-bind:align="'left'"
                        v-bind:max-height="150"
                        v-bind:options="getTenancyItems(item.value)"
                        v-if="isTenancySelectValid(item.value)"
                        v-show="isTenancyChoiceSelected(item.value)"
                        v-on:update:visible="value => onUpdateSelectVisible(item.value, value)"
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
            filterNameData: null,
            searchData: this.search,
            tenancyItemsData: this.tenancyItems,
            tenancyCheckboxValuesData: {},
            tenancies: {}
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
                Object.keys(this.tenancyCheckboxValuesData).length > 0 &&
                this.isTenancyFormValid
            );
        },
        filters() {
            return Object.keys(this.tenancyCheckboxValuesData).map(tenancy => ({
                name: this.filterNameData,
                value: this.searchData,
                tenancy: this.getSelectedTenancy(tenancy),
                context: "" // TODO
            }));
        },
        isTenancyEmpty() {
            return this.tenancyItemsData.length === 1;
        },
        isTenancyFormValid() {
            for (const item of this.tenancyItemsData) {
                if (
                    this.isTenancyChoiceSelected(item.value) &&
                    this.getSelectedTenancy(item.value) === null
                ) {
                    return false;
                }
            }

            return true;
        },
        userTenancy() {
            return { choices: [], selectedValue: "user", selectVisible: false };
        },
        builtTenancies() {
            const builtTenancies = {};

            this.tenancyItems.forEach(item => {
                if (item.value === "user") builtTenancies[item.value] = this.userTenancy;
                else {
                    builtTenancies[item.value] = {
                        choices: [],
                        selectedValue: null,
                        selectVisible: false
                    };
                }
            });

            return builtTenancies;
        }
    },
    mounted: async function() {
        this.tenancies = this.builtTenancies;

        // Getting brands, channels and factories
        this.tenancies.brand.choices = await this.getBrands();
        this.tenancies.channel.choices = await this.getChannels();
        this.tenancies.factory.choices = await this.getFactories();

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
                if (!this.isTenancyChoiceValid(this.tenancyItemsData[i].value)) {
                    this.tenancyItemsData.splice(i, 1);
                    i--;
                }
            }
        },
        isTenancyChoiceSelected(value) {
            return Boolean(this.tenancyCheckboxValuesData[value]);
        },
        isTenancyChoiceValid(value) {
            return value === "user" || this.hasTenancyItems(value);
        },
        isTenancySelectValid(value) {
            return this.hasTenancyItems(value) && this.hasRequiredItemsLength(value);
        },
        hasTenancyItems(value) {
            return Boolean(this.tenancies[value] && this.tenancies[value].choices.length);
        },
        hasRequiredItemsLength(value) {
            return Boolean(this.tenancies[value] && this.tenancies[value].choices.length > 1);
        },
        getTenancyItems(value) {
            return this.tenancies[value] ? this.tenancies[value].choices : null;
        },
        getSelectedTenancy(value) {
            if (this.tenancies[value]) {
                return this.hasRequiredItemsLength(value) || value === "user"
                    ? this.tenancies[value].selectedValue
                    : this.tenancies[value].choices[0].value;
            } else return null;
        },
        setSelectedTenancy(value, selectedValue) {
            if (!this.tenancies[value]) throw new Error("Invalid tenancy value");

            this.tenancies[value].selectedValue = selectedValue;
        },
        selectPlaceholder(item) {
            return `Select ${item.label}`;
        },
        closeAllSelects() {
            Object.keys(this.tenancies).forEach(key => {
                this.tenancies[key].selectVisible = false;
            });
        },
        onDiscardClick() {
            this.$emit("click:cancel");
        },
        onSaveClick() {
            this.$emit("click:confirm");
        },
        onUpdateSelectVisible(tenancyValue, visibleValue) {
            this.closeAllSelects();
            this.tenancies[tenancyValue].selectVisible = visibleValue;
        },
        onSelected(tenancyValue, selectedValue) {
            this.setSelectedTenancy(tenancyValue, selectedValue);
        }
    }
};

export default SaveFilterModal;
</script>
