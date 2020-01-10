<template>
    <div class="search-persistent">
        <search
            v-bind:variant="variant"
            v-bind:icon-visible="iconVisible"
            v-bind:enable-delete="enableDelete"
            v-bind:suggestions="suggestions"
            v-bind:width="isMobileWidth() ? null : width"
            v-bind:placeholder="placeholder ? placeholder : `Search ${name}`"
            v-bind:value.sync="filterData"
            v-bind:loading="loading"
        />
        <select-ripe
            v-bind:class="{ 'filter-selected': isFilterSelected }"
            v-bind:placeholder="'Filter'"
            v-bind:options="persistentFilters"
            v-bind:value.sync="selectedFilterValueData"
        >
            <template v-for="(item, index) in persistentFilters" v-bind:slot="item.value">
                <div
                    class="filter-item selected-filter-item"
                    v-bind:title="item.label"
                    v-if="isSelectedFilterItem(item)"
                    v-bind:key="index"
                >
                    <div class="filter-label">
                        {{ item.label }}
                    </div>
                    <div class="selected-filter-item-buttons">
                        <button-icon
                            v-bind:icon="'save'"
                            v-bind:color="'black'"
                            v-on:click.native.stop="onSelectedFilterUpdateButtonClick(item.label)"
                        />
                        <button-icon
                            v-bind:icon="'bin'"
                            v-bind:color="'black'"
                            v-on:click.native.stop="onSelectedFilterDeleteButtonClick(item.label)"
                        />
                    </div>
                </div>
                <div
                    class="filter-item filter-label"
                    v-bind:title="item.label"
                    v-else
                    v-bind:key="index"
                >
                    {{ item.label }}
                </div>
            </template>
            <template v-slot:save_filter_option>
                <button-color
                    class="save-filter-button"
                    v-bind:text="'Save Filter'"
                    v-bind:secondary="true"
                    v-bind:alignment="'left'"
                    v-bind:icon="'add'"
                    v-on:click.native.stop="onSaveFilterButtonClick()"
                />
            </template>
        </select-ripe>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.search-persistent {
    font-size: 0px;
}

.search-persistent .search {
    margin-bottom: 3px;
    vertical-align: middle;
}

.search-persistent .search ::v-deep .input {
    border-radius: 6px 0px 0px 6px;
    border-right: none;
}

.search-persistent .search ::v-deep .input:focus {
    border-right: 1px solid $aqcua-blue;
}

.search-persistent .select {
    display: inline-block;
    text-align: left;
    vertical-align: middle;
}

.search-persistent .select ::v-deep .select-container .select-button {
    border-radius: 0px 6px 6px 0px;
    font-size: 14px;
    font-weight: 600;
}

.search-persistent .select.filter-selected ::v-deep .select-container .select-button {
    background-color: $dark;
    background-image: url("~./assets/chevron-down-white.svg");
    color: $white;
}

.search-persistent .select ::v-deep .select-container .dropdown-container {
    position: relative;
}

.search-persistent .select ::v-deep .dropdown-container {
    float: right;
    height: 0px;
    margin-top: 0px;
    max-width: 0px;
    position: relative;
    right: 0px;
}

.search-persistent .select ::v-deep .dropdown-container .dropdown {
    background-color: $white;
    margin: 0px 0px 0px -200px;
}

.search-persistent .select ::v-deep .dropdown-container .dropdown li:last-child .button {
    border: none;
}

.search-persistent .select .filter-label {
    overflow: hidden;
    padding: 0px 0px 0px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search-persistent .select .filter-item {
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 32px;
}

.search-persistent .select .selected-filter-item {
    background-color: $dark;
    color: $white;
    height: 32px;
}

.search-persistent .select .selected-filter-item .filter-label {
    display: inline-block;
    width: 110px;
}

.search-persistent .select .filter-item .selected-filter-item-buttons {
    float: right;
    font-size: 0px;
    margin: 0px 5px 0px 0px;
}

.search-persistent .select .filter-item .selected-filter-item-buttons .button {
    margin: 0px 1px 0px 1px;
}

.save-filter-button {
    border-radius: 0px 0px 0px 0px;
    box-sizing: unset;
}
</style>

<script>
import { partMixin } from "../../../../mixins";
import { SaveFilterModal } from "./save-filter-modal.vue";

export const SearchPersistent = {
    name: "search-persistent",
    mixins: [partMixin],
    props: {
        variant: {
            type: String,
            default: null
        },
        filter: {
            type: String,
            default: null
        },
        persistentFilters: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: "Search"
        },
        suggestions: {
            type: Array,
            default: () => []
        },
        grow: {
            type: Boolean,
            default: false
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        iconVisible: {
            type: Boolean,
            default: true
        },
        enableDelete: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            selectedFilterValueData: null,
            filterData: this.filter
        };
    },
    watch: {
        filter(value) {
            this.filterData = value;
        },
        selectedFilterValueData(value) {
            const filterObject = this.persistentFilters.find(
                filter => filter.value === this.selectedFilterValueData
            );

            this.filterData = filterObject ? filterObject.filter : "";
        },
        persistentFilters(value) {
            if (!this.filterData) return;

            const filterObject = this.persistentFilters.find(
                filter => filter.filter === this.filterData
            );

            if (!filterObject) return;

            this.selectedFilterValueData = filterObject.value;
        },
        filterData(value) {
            if (value === "") this.unselectFilter();

            this.$emit("update:filter", value);
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;

            return base;
        },
        isFilterSelected() {
            return this.selectedFilterValueData !== null;
        }
    },
    methods: {
        blur() {
            this.$refs.input.blur();
        },
        deleteValue() {
            this.$emit("update:value", "");
        },
        unselectFilter() {
            this.selectedFilterValueData = null;
        },
        onDeleteIconClick() {
            this.deleteValue();
        },
        isSelectedFilterItem(item) {
            return item.value === this.selectedFilterValueData;
        },
        async onSelectedFilterUpdateButtonClick(name) {
            await this.alertMessage(
                `Are you sure you really want to <strong>update Filter "${name}"</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                {
                    title: `Update filter ${name}`,
                    confirmText: "Save filter",
                    confirmIcon: "save",
                    cancelText: "Discard changes",
                    cancelIcon: "close",
                    buttonsAlignment: "right",
                    isButtonSmall: false,
                    task: async (alert, component) => {
                        const obj = { name: name, filter: this.filter };
                        this.$emit("click:update-filter", obj);
                    }
                }
            );
        },
        async onSelectedFilterDeleteButtonClick(name) {
            await this.alertMessage(
                `Are you sure you really want to <strong>delete Filter "${name}"</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                {
                    title: `Delete filter ${name}`,
                    confirmText: "Delete filter",
                    confirmIcon: "bin",
                    confirmColor: "red",
                    cancelText: "Discard changes",
                    cancelIcon: "close",
                    buttonsAlignment: "right",
                    isButtonSmall: false,
                    task: async (alert, component) => {
                        const obj = { label: name, filter: this.filter };
                        this.$emit("click:delete-filter", obj);
                    }
                }
            );
        },
        async saveFilter() {
            await this.alertComponent(SaveFilterModal, {
                filter: this.filter,
                task: async (alert, component) => {
                    this.$emit("click:save-filter", component.$data);
                }
            });
        },
        async onSaveFilterButtonClick() {
            await this.saveFilter();
        }
    }
};

export default SearchPersistent;
</script>
