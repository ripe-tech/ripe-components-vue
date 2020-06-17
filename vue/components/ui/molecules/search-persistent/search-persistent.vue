<template>
    <div class="search-persistent" v-bind:style="style">
        <search
            v-bind:variant="variant"
            v-bind:icon-visible="iconVisible"
            v-bind:clear-visible="clearVisible"
            v-bind:suggestions="suggestions"
            v-bind:placeholder="placeholder ? placeholder : `Search ${name}`"
            v-bind:value.sync="valueData"
            v-bind:loading="loading"
        />
        <select-ripe
            v-bind:class="{ 'filter-selected': hasFilterSelected }"
            v-bind:style="selectButtonStyle"
            v-bind:placeholder="'Filter'"
            v-bind:options="selectOptions"
            v-bind:value="selectedFilterValue"
            v-bind:visible.sync="selectVisibleData"
            v-bind:dropdown-min-width="dropdownMinWidth"
            v-on:update:value="onSelected"
            v-on:animation:close:end="onDropdownAnimationCloseEnded"
        >
            <template v-for="(item, index) in filtersData" v-bind:slot="getSelectValue(item)">
                <div
                    class="filter-item"
                    v-bind:class="{ selected: isFilterSelected(index) }"
                    v-bind:key="`${item.name}${item.tenancy}`"
                >
                    <div class="filter-item-label">
                        {{ item.name }}
                    </div>
                    <div class="filter-item-buttons" v-show="isFilterSelected(index)">
                        <button-icon
                            v-bind:icon="'save'"
                            v-bind:color="'black'"
                            v-on:click.stop="onEditClick(item, index)"
                        />
                        <button-icon
                            v-bind:icon="'bin'"
                            v-bind:color="'black'"
                            v-on:click.stop="onDeleteClick(item, index)"
                        />
                    </div>
                </div>
            </template>
            <template v-slot:save_filter_option>
                <div
                    class="filter-item save-filter-button"
                    v-on:click.stop="onAddClick"
                >
                    <div class="filter-item-label">
                        Add Filter
                    </div>
                </div>
            </template>
        </select-ripe>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.search-persistent {
    display: flex;
    font-size: 0px;
}

.search-persistent > .search {
    flex: 1 0;
    margin-bottom: 3px;
    vertical-align: middle;
}

.search-persistent > .search ::v-deep .input {
    border-radius: 6px 0px 0px 6px;
    border-right: none;
}

.search-persistent > .search ::v-deep .input:focus {
    border-right: 1px solid $aqcua-blue;
}

.search-persistent > .select {
    display: inline-block;
    text-align: left;
    vertical-align: middle;
}

.search-persistent > .select ::v-deep .select-container > .select-button {
    background-color: $dark;
    background-image: url("~./assets/chevron-down-white.svg");
    border-radius: 0px 6px 6px 0px;
    color: $white;
    font-size: 14px;
    font-weight: 600;
}

.search-persistent > .select ::v-deep .dropdown-container > .dropdown {
    background-color: $white;
}

.search-persistent > .select .save-filter-button {
    padding-left: 14px;
}

.search-persistent > .select .save-filter-button > .filter-item-label {
    background: url("~./../../../../assets/icons/add.svg") center left no-repeat;
    background-size: 16px 16px;
    padding-left: 24px;
}

.search-persistent > .select .filter-item-label {
    overflow: hidden;
    padding: 0px 0px 0px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.search-persistent > .select .filter-item {
    font-size: 14px;
    letter-spacing: 0.5px;
    line-height: 32px;
}

.filter-item-buttons ::v-deep img {
    vertical-align: baseline;
}

.search-persistent > .select .filter-item.selected {
    background-color: $dark;
    color: $white;
    display: flex;
    height: 32px;
}

.search-persistent > .select .filter-item.selected > .filter-item-label {
    display: inline-block;
    flex: 1 0;
}

.search-persistent > .select .filter-item > .filter-item-buttons {
    display: inline-block;
    font-size: 0px;
}

.search-persistent > .select .filter-item > .filter-item-buttons > .button {
    margin-right: 1px;
}

.search-persistent > .select .filter-item > .filter-item-buttons > .button:last-child {
    margin-right: 0px;
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
        value: {
            type: String,
            default: null
        },
        filters: {
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
        clearVisible: {
            type: Boolean,
            default: true
        },
        selectVisible: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: null
        },
        selectMaxWidth: {
            type: Number,
            default: null
        },
        dropdownMinWidth: {
            type: Number,
            default: 200
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            pendingSelectedFilter: null,
            selectedFilter: null,
            valueData: this.value,
            filtersData: this.filters,
            selectVisibleData: this.selectVisible
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        filters(value) {
            this.filtersData = value;
        },
        selectVisible(value) {
            this.selectVisibleData = value;
        },
        valueData(value) {
            if (value === "") this.selectedFilter = null;
            this.$emit("update:value", value);
        },
        selectVisibleData(value) {
            this.$emit("update:selectVisible", value);
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;

            return base;
        },
        selectButtonStyle() {
            const base = {};
            if (this.selectMaxWidth) base["max-width"] = `${this.selectMaxWidth}px`;

            return base;
        },
        hasFilterSelected() {
            return this.selectedFilter !== null;
        },
        selectedFilterValue() {
            return this.hasFilterSelected
                ? this.getSelectValue(this.filtersData[this.selectedFilter])
                : null;
        },
        selectOptions() {
            return this.filtersData
                .map(filter => ({ label: filter.name, value: this.getSelectValue(filter) }))
                .concat([
                    {
                        separator: "separator"
                    },
                    {
                        label: "Save Filter",
                        value: "save_filter_option"
                    }
                ]);
        }
    },
    methods: {
        getSelectValue(filter) {
            return `${filter.name}${filter.tenancy}${filter.context}`;
        },
        selectFilter(index) {
            this.pendingSelectedFilter = index;

            this.valueData = this.filtersData[index].value;
        },
        isFilterSelected(index) {
            return index === this.selectedFilter;
        },
        filterExists(filter) {
            return this.filtersData.findIndex(
                f => f.name === filter.name && f.tenancy === filter.tenancy
            );
        },
        addFilters(filters) {
            for (let i = 0; i < filters.length; i++) {
                const index = this.filterExists(filters[i]);

                if (index >= 0) {
                    this.updateFilter(filters[i], index);
                    filters.splice(i, 1);
                }
            }

            this.filtersData = this.filtersData.concat(filters);
            this.$emit("add:filters", filters);
            this.$emit("update:filters", this.filtersData);
        },
        updateFilter(updatedFilter, index) {
            this.$set(this.filtersData, index, updatedFilter);
            this.$emit("update:filter", updatedFilter, index);
            this.$emit("update:filters", this.filtersData);
        },
        deleteFilter(index) {
            const deleted = this.filtersData[index];
            this.selectedFilter = null;
            this.filtersData.splice(index, 1);
            this.$emit("delete:filter", deleted, index);
            this.$emit("update:filters", this.filtersData);
        },
        async onEditClick(item, index) {
            const updatedFilter = { ...item, value: this.valueData };
            await this.alertMessage(
                `Are you sure you really want to <strong>update Filter "${item.name}"</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                {
                    title: `Update filter ${item.name}`,
                    confirmText: "Save filter",
                    confirmIcon: "save",
                    cancelText: "Discard changes",
                    cancelIcon: "close",
                    buttonsAlignment: "right",
                    isButtonSmall: false,
                    task: async (alert, component) => {
                        this.updateFilter(updatedFilter, index);
                    }
                }
            );
        },
        async onDeleteClick(item, index) {
            await this.alertMessage(
                `Are you sure you really want to <strong>delete Filter "${item.name}"</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                {
                    title: `Delete filter ${item.name}`,
                    confirmText: "Delete filter",
                    confirmIcon: "bin",
                    confirmColor: "red",
                    cancelText: "Discard changes",
                    cancelIcon: "close",
                    buttonsAlignment: "right",
                    isButtonSmall: false,
                    task: async (alert, component) => {
                        this.deleteFilter(index);
                    }
                }
            );
        },
        async onAddClick() {
            this.selectVisibleData = false;
            await this.alertComponent(SaveFilterModal, {
                search: this.valueData,
                task: async (alert, component) => {
                    this.addFilters(component.filters);
                }
            });
        },
        onSelected(item, index) {
            this.selectFilter(index);
        },
        onDropdownAnimationCloseEnded() {
            if (this.pendingSelectedFilter !== null) {
                this.selectedFilter = this.pendingSelectedFilter;
            }
            this.pendingSelectedFilter = null;
        }
    }
};

export default SearchPersistent;
</script>
