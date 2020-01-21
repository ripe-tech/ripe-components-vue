<template>
    <modal
        class="save-filter-modal"
        v-bind:buttons-alignment="'right'"
        v-bind:title="'New filter'"
        v-bind:cancel-text="'Discard changes'"
        v-bind:confirm-text="'Save filter'"
        v-bind:name="'save-filter-modal'"
        v-bind:width="600"
        v-bind="$attrs"
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
        <form-input v-bind:header="'Tenancy'" v-if="tenancyItemsCheckable.length !== 1">
            <checkbox v-bind:items="tenancyItemsCheckable" v-bind:values.sync="checkboxValuesData">
                <template v-slot="{ item }">
                    <select-ripe
                        v-bind:placeholder="`Select ${item.label}`"
                        v-bind:width="200"
                        v-bind:max-height="150"
                        v-bind:options="tenancies[item.value].choices"
                        v-if="tenancies[item.value].choices.length > 1"
                        v-show="isTenancyItemSelected(item.value)"
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
.save-filter-modal ::v-deep .modal-container {
    max-width: 100%;
    overflow-y: visible;
}

.form-input {
    margin: 0px 0px 17px 0px;
}

.form-input .content .checkbox .select {
    display: inline-block;
    margin: 0px 10px 0px 10px;
    vertical-align: middle;
}

.form-input .content .checkbox ::v-deep .choice {
    padding: 0px 0px 0px 0px;
}

.form-input .content .checkbox ::v-deep .choice .checkbox-input{
    margin: 10px 10px 10px 0px;
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
        const user = this.$root ? (this.$root.account ? this.$root.account.username : null) : null;
        return {
            filterNameData: null,
            searchData: this.search,
            checkboxValuesData: {},
            tenancies: {
                user: {
                    choices: user ? [user] : [],
                    selectedValue: user
                },
                brand: {
                    choices: [],
                    selectedValue: null
                },
                channel: {
                    choices: [],
                    selectedValue: null
                },
                factory: {
                    choices: [],
                    selectedValue: null
                }
            }
        };
    },
    watch: {
        search(value) {
            this.searchData = value;
        }
    },
    computed: {
        filters() {
            return Object.keys(this.checkboxValuesData).map(tenancy => ({
                name: this.filterNameData,
                value: this.searchData,
                tenancy: tenancy,
                context: this.getContext(tenancy)
            }));
        },
        isFormValid() {
            return (
                this.searchData &&
                this.filterNameData &&
                Object.keys(this.checkboxValuesData).length > 0 &&
                this.hasSomeContextNotSet
            );
        },
        hasSomeContextNotSet() {
            return !this.tenancyItemsCheckable.some(
                item =>
                    this.isTenancyItemSelected(item.value) && this.getContext(item.value) === null
            );
        },
        tenancyItemsCheckable() {
            return this.tenancyItems.filter(item => this.tenancies[item.value].choices.length > 0);
        }
    },
    mounted: async function() {
        // Getting brands, channels and factories
        this.tenancies.brand.choices = await this.getBrands();
        this.tenancies.channel.choices = await this.getChannels();
        this.tenancies.factory.choices = await this.getFactories();
        this._selectDefaultValue("brand");
        this._selectDefaultValue("channel");
        this._selectDefaultValue("factory");
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
        isTenancyItemSelected(value) {
            return Boolean(this.checkboxValuesData[value]);
        },
        getContext(tenancy) {
            return this.tenancies[tenancy].selectedValue;
        },
        setSelectedTenancy(tenancy, value) {
            this.tenancies[tenancy].selectedValue = value;
        },
        onSelected(tenancy, value) {
            this.setSelectedTenancy(tenancy, value);
        },
        onDiscardClick() {
            this.$emit("click:cancel");
        },
        onSaveClick() {
            this.$emit("click:confirm");
        },
        _selectDefaultValue(tenancy) {
            if (this.tenancies[tenancy].choices.length === 1) {
                this.tenancies[tenancy].selectedValue = this.tenancies[tenancy].choices[0].value;
            }
        }
    }
};

export default SaveFilterModal;
</script>
