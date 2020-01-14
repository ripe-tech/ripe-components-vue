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
            <checkbox v-bind:items="tenancyItems" v-bind:values.sync="tenacyValuesData" />
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
        }
    },
    mounted: async function() {},
    methods: {
        onDiscardClick() {
            this.$emit("click:cancel");
        },
        onSaveClick() {
            this.$emit("click:confirm");
        }
    }
};

export default SaveFilterModal;
</script>
