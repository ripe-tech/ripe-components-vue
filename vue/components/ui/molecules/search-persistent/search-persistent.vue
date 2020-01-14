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
            v-bind:placeholder="'Filter'"
            v-bind:options="selectOptions"
            v-bind:value="selectedFilterValue"
            v-on:update:value="onSelected"
        >
            <template v-for="(item, index) in filters" v-bind:slot="item.value">
                <div
                    class="filter-item selected-filter-item"
                    v-bind:title="item.label"
                    v-if="isFilterSelected(index)"
                    v-bind:key="index"
                >
                    <div class="filter-label">
                        {{ item.label }}
                    </div>
                    <div class="selected-filter-item-buttons">
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
                    v-on:click.native.stop="onAddClick()"
                />
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

.search-persistent .search {
    flex: 1 0;
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
            selectedFilter: null,
            valueData: this.value,
            filtersData: this.filters
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        filters(value) {
            if (!this.valueData) return;

            const matchingFilter = this.filters.find(filter => filter.filter === this.valueData);

            if (!matchingFilter) return;

            this.selectedFilter = matchingFilter.value;
        },
        valueData(value) {
            if (value === "") this.selectedFilter = null;
            this.$emit("update:value", value);
        }
    },
    computed: {
        style() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;

            return base;
        },
        hasFilterSelected() {
            return this.selectedFilter !== null;
        },
        selectedFilterValue() {
            return this.hasFilterSelected ? this.filters[this.selectedFilter].value : null;
        },
        selectOptions() {
            return this.filters.concat([
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
        selectFilter(index) {
            this.selectedFilter = index;
            this.valueData = this.filtersData[index].filter;
        },
        isFilterSelected(index) {
            return index === this.selectedFilter;
        },
        addFilter(filter) {
            this.filtersData.push(filter);
            this.$emit("added:filter", filter);
            this.$emit("updated:filters", this.filtersData);
        },
        updateFilter(updatedFilter, index) {
            this.$set(this.filtersData, index, updatedFilter);
            this.$emit("updated:filter", updatedFilter, index);
            this.$emit("updated:filters", this.filtersData);
        },
        deleteFilter(index) {
            const deleted = this.filtersData[index];
            this.selectedFilter = null;
            this.filtersData.splice(index, 1);
            this.$emit("deleted:filter", deleted, index);
            this.$emit("updated:filters", this.filtersData);
        },
        async onEditClick(item, index) {
            const updatedFilter = { ...item, filter: this.valueData };
            await this.alertMessage(
                `Are you sure you really want to <strong>update Filter "${item.label}"</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                {
                    title: `Update filter ${item.label}`,
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
                `Are you sure you really want to <strong>delete Filter "${item.label}"</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                {
                    title: `Delete filter ${item.label}`,
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
            await this.alertComponent(SaveFilterModal, {
                search: this.valueData,
                task: async (alert, component) => {
                    console.log(component);
                }
            });
        },
        onSelected(item, index) {
            this.selectFilter(index);
        }
    }
};

export default SearchPersistent;
</script>
