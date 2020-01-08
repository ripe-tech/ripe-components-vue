<template>
    <div class="listing" v-bind:class="{ loading, empty: items.length === 0 }">
        <button
            class="scroll-button"
            v-bind:class="{ show: showScrollTop }"
            v-on:click="scrollToTop"
        />
        <container-ripe>
            <div class="container-header">
                <div
                    class="container-header-right"
                    v-bind:class="{ 'has-persistent-filters': hasPersistentFilters }"
                >
                    <slot name="icons" />
                    <search
                        v-bind:variant="'dark'"
                        v-bind:width="isMobileWidth() ? null : searchWidth"
                        v-bind:placeholder="filterText ? filterText : `Search ${name}`"
                        v-bind:value.sync="filter"
                        v-bind:loading="loading"
                    />
                    <select-ripe
                        v-bind:class="{ 'filter-selected': isFilterSelected }"
                        v-bind:placeholder="'Filter'"
                        v-bind:options="persistentFilters"
                        v-bind:value.sync="filterValueData"
                        v-if="hasPersistentFilters"
                    >
                        <template
                            v-for="(item, index) in persistentFilters"
                            v-bind:slot="item.value"
                        >
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
                                        v-bind:color="'inverted'"
                                        v-on:click.native.stop="
                                            onSelectedFilterUpdateButtonClick(item.label)
                                        "
                                    />
                                    <button-icon
                                        v-bind:icon="'bin'"
                                        v-bind:color="'inverted'"
                                        v-on:click.native.stop="
                                            onSelectedFilterDeleteButtonClick(item.label)
                                        "
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
                <h1 class="title" v-if="titleText">{{ titleText }}</h1>
                <h1 class="title" v-else>
                    Your <span class="name">{{ name }}</span>
                </h1>
            </div>
            <filter-ripe
                v-bind:get-items="getItemsWithParams"
                v-bind:get-item-url="getItemUrl"
                v-bind:columns="columns"
                v-bind:values="values"
                v-bind:filter="filter"
                v-bind:use-query="useQuery"
                v-bind:loading.sync="loading"
                v-bind:items.sync="items"
                v-bind:options.sync="filterOptions"
                ref="filter"
                v-on:update:options="filterUpdated"
                v-on:click:lineup="onLineupClick"
            >
                <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
                <template
                    v-for="slot in Object.keys($scopedSlots)"
                    v-bind:slot="slot"
                    slot-scope="scope"
                >
                    <slot v-bind:name="slot" v-bind="scope" />
                </template>
                <template v-slot:item="{ item, index }">
                    <slot
                        name="item"
                        v-bind:item="item"
                        v-bind:index="index"
                        v-bind:add-filter="addFilter"
                    />
                </template>
                <template v-slot:empty>
                    <h1 v-if="notFoundText">{{ notFoundText }}</h1>
                    <h1 v-else>No {{ name }} found</h1>
                </template>
            </filter-ripe>
        </container-ripe>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

::v-deep .highlight:hover,
::v-deep .highlight.hover {
    color: $link-hover-color;
}

.scroll-button {
    background: $white url("~./assets/arrow-up.svg") no-repeat center;
    border: none;
    border-radius: 40px;
    bottom: 20px;
    box-shadow: 0px 0px 36px -15px #aaaaaa;
    height: 50px;
    opacity: 0;
    outline: none;
    padding: 15px;
    position: fixed;
    right: 20px;
    transform: scale(0.75);
    transition: opacity 0.125s ease-in-out, transform 0.125s ease-in-out;
    width: 50px;
}

.scroll-button.show {
    cursor: pointer;
    opacity: 0.7;
    transform: scale(1);
}

.scroll-button.show:hover {
    opacity: 1;
    transform: scale(1.15);
}

.listing {
    box-sizing: border-box;
}

.listing.loading.empty ::v-deep .loader.loader-bottom {
    margin: 76px 0px 76px 0px;
}

.container-ripe {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fade-enter-active .container-ripe,
.fade-leave-active .container-ripe {
    transition: opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fade-enter .container-ripe,
.fade-leave-active .container-ripe {
    opacity: 0;
}

.listing.empty .container-ripe {
    min-height: 315px;
}

.container-header-right {
    float: right;
    font-size: 0px;
}

.container-header-right.has-persistent-filters .search ::v-deep .input {
    border-radius: 6px 0px 0px 6px;
    border-right: none;
}

.container-header-right.has-persistent-filters .search ::v-deep .input:focus {
    border-right: 1px solid $aqcua-blue;
}

body.mobile .container-header-right {
    float: none;
    width: 100%;
}

.container-header-right > * {
    display: inline-block;
    vertical-align: middle;
}

.container-header-right .select {
    text-align: left;
}

.container-header-right .select ::v-deep .select-container .select-button {
    border-radius: 0px 6px 6px 0px;
    font-size: 14px;
    font-weight: 600;
}

.container-header-right .select.filter-selected ::v-deep .select-container .select-button {
    background-color: $dark;
    background-image: url("~./assets/chevron-down-white.svg");
    color: $white;
}

.container-header-right .select ::v-deep .dropdown-container {
    float: right;
    height: 0px;
    margin-top: 0px;
    max-width: 0px;
    position: relative;
    right: 0px;
}

.container-header-right .select ::v-deep .dropdown-container .dropdown {
    background-color: $white;
    margin: 0px 0px 0px -200px;
}

.container-header-right .select ::v-deep .dropdown-container .dropdown li:last-child .button {
    border: none;
}

.container-header-right .select .filter-label {
    overflow: hidden;
    padding: 0px 0px 0px 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.container-header-right .select .filter-item {
    font-size: 14px;
    letter-spacing: 0.3px;
    line-height: 32px;
}

.container-header-right .select .selected-filter-item {
    background-color: $dark;
    color: $white;
    height: 32px;
}

.container-header-right .select .selected-filter-item .filter-label {
    display: inline-block;
    width: 110px;
}

.container-header-right .select .filter-item .selected-filter-item-buttons {
    float: right;
    font-size: 0px;
    margin: 0px 5px 0px 0px;
}

.container-header-right .select .filter-item .selected-filter-item-buttons .button {
    margin: 0px 1px 0px 1px;
}

.save-filter-button {
    border-radius: 0px 0px 0px 0px;
    box-sizing: unset;
}

.listing .filter-ripe ::v-deep table {
    margin-bottom: 0px;
}

.container-header {
    padding: 24px 28px 24px 28px;
}

body.mobile .container-header {
    height: auto;
    padding: 20px 20px 20px 20px;
}

.title {
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 0.5px;
    line-height: 34px;
    margin: 0px 0px 0px 0px;
    text-align: left;
}

body.mobile .title {
    margin-top: 16px;
}

.title .name {
    text-transform: capitalize;
}

input[type="text"] {
    background-color: #f2f2f2;
    border: 1px solid transparent;
    font-size: 13px;
    height: 32px;
    line-height: 32px;
    margin-left: 24px;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    width: 260px;
}

input[type="text"]:hover {
    border-color: #dddddd;
}

input[type="text"]:focus {
    background-color: $white;
    border-color: #aaaaaa;
}
</style>

<script>
import { filterMixin, partMixin, utilsMixin, scrollMixin } from "../../../../mixins";
import { SaveFilterModal } from "./save-filter-modal.vue";

export const Listing = {
    name: "listing",
    mixins: [partMixin, filterMixin, utilsMixin, scrollMixin],
    props: {
        context: {
            type: Object,
            default: () => ({})
        },
        columns: {
            type: Array,
            required: true
        },
        values: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        getItems: {
            type: Function,
            required: true
        },
        getItemUrl: {
            type: Function,
            default: null
        },
        filterFields: {
            type: Object,
            default: null
        },
        notFoundText: {
            type: String,
            default: null
        },
        titleText: {
            type: String,
            default: null
        },
        filterText: {
            type: String,
            default: null
        },
        useQuery: {
            type: Boolean,
            default: true
        },
        searchWidth: {
            type: Number,
            default: 304
        },
        hasPersistentFilters: {
            type: Boolean,
            default: false
        },
        persistentFilters: {
            type: Array,
            default: []
        }
    },
    data: function() {
        return {
            items: [],
            filter: this.context && this.context.filter ? this.context.filter : "",
            filterValueData: null,
            filterOptions: null,
            loading: false,
            visibleLightbox: null
        };
    },
    computed: {
        isFilterSelected() {
            return this.filterValueData !== null;
        }
    },
    watch: {
        filterValueData(value) {
            const filterObject = this.persistentFilters.find(
                filter => filter.value === this.filterValueData
            );
            this.filter = filterObject ? filterObject.filter : "";
        },
        persistentFilters(value) {
            if (!this.filter) return;

            const filterObject = this.persistentFilters.find(
                filter => filter.filter === this.filter
            );

            if (!filterObject) return;
            this.filterValueData = filterObject.value;
        },
        filter(value) {
            if (value === "") this.filterValueData = null;
        }
    },
    methods: {
        addFilter(key, value) {
            const base = `${key}=`;
            const tuple = `${key}=${value}`;
            if (this.filter && this.filter.search(base) !== -1) return;
            this.filter += this.filter ? ` and ${tuple}` : tuple;
            this.showScrollTop = true;
            this.scrollTop = true;
        },
        async getItemsWithParams(options) {
            options = this.filterFields
                ? {
                      params: this.getFilterParams({
                          options: options,
                          filterFields: this.filterFields
                      })
                  }
                : options;
            const items = await this.getItems(options);
            return items;
        },
        setItem(index, item) {
            this.getFilter().setItem(index, item);
        },
        removeItem(index) {
            this.getFilter().removeItem(index);
        },
        async refresh() {
            await this.getFilter().refresh();
        },
        async saveFilter() {
            await this.alertComponent(SaveFilterModal, {
                filter: this.filter,
                task: async (alert, component) => {
                    this.$emit("click:save-filter", component.$data);
                }
            });
        },
        getFilter() {
            return this.$refs.filter;
        },
        isSelectedFilterItem(item) {
            return item.value === this.filterValueData;
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
        async onSaveFilterButtonClick() {
            await this.saveFilter();
        },
        onLineupClick(item, index) {
            this.$emit("click:lineup", item, index);
        }
    },
    beforeRouteUpdate: function(to, from, next) {
        this.filter = to.query.filter || "";
        next();
    }
};

export default Listing;
</script>
