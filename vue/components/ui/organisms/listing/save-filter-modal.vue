<template>
    <modal
        class="save-filter-modal"
        v-bind:buttons-alignment="'right'"
        v-bind:title="'New filter'"
        v-bind:cancel-text="'Discard changes'"
        v-bind:confirm-text="'Save filter'"
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
        <form-input v-bind:header="'Tenacy'">
            <checkbox v-bind:items="testItems" v-bind:values.sync="tenacyValuesData" />
        </form-input>
        <template v-slot:buttons-content>
            <button-color
                v-bind:class="'button-cancel'"
                v-bind:icon="'close'"
                v-bind:secondary="true"
                v-bind:text="'Discard changes'"
            />
            <button-color
                v-bind:class="'button-confirm'"
                v-bind:icon="'save'"
                v-bind:text="'Save filter'"
            />
        </template>
    </modal>
</template>

<style lang="scss" scoped>
.form-input {
    margin: 0px 0px 17px 0px;
}

.save-filter-modal ::v-deep .modal-container {
    min-width: 600px;
}
</style>

<script>
export const SaveFilterModal = {
    name: "save-filter-modal",
    props: {},
    data: function() {
        return {
            testItems: [
                {
                    value: "1",
                    label: "Option 1"
                },
                {
                    value: "2",
                    label: "Option 2"
                },
                {
                    value: "3",
                    label: "Option 3"
                }
            ],
            tenacyValuesData: {},
            filterNameData: null,
            searchData: null
        };
    },
    computed: {},
    mounted: async function() {},
    methods: {}
};

export default SaveFilterModal;
</script>
