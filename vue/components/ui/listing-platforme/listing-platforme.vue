<template>
    <div class="listing" v-bind:class="{ loading, empty: items.length === 0 }">
        <button
            class="scroll-button"
            v-bind:class="{ show: showScrollTop }"
            v-on:click="scrollToTop"
        />
        <container-platforme>
            <div class="container-header">
                <div class="container-header-right">
                    <slot name="icons" />
                    <loader-platforme loader="ball-scale-multiple" class="loader-header" />
                    <search-platforme
                        v-bind:placeholder="filterText ? filterText : `Search ${name}`"
                        v-bind:value.sync="filter"
                    />
                </div>
                <h1 class="title" v-if="titleText">{{ titleText }}</h1>
                <h1 class="title" v-else>
                    Your <span class="name">{{ name }}</span>
                </h1>
            </div>
            <filter-platforme
                v-bind:get-items="getItemsWithParams"
                v-bind:columns="columns"
                v-bind:values="values"
                v-bind:filter="filter"
                v-bind:use-query="useQuery"
                v-bind:loading.sync="loading"
                v-bind:items.sync="items"
                v-bind:options.sync="filterOptions"
                ref="filter"
                v-on:update:options="filterUpdated"
            >
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
                <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
                <template
                    v-for="slot in Object.keys($scopedSlots)"
                    v-bind:slot="slot"
                    slot-scope="scope"
                >
                    <slot v-bind:name="slot" v-bind="scope" />
                </template>
            </filter-platforme>
        </container-platforme>
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
    -webkit-box-shadow: 0px 0px 36px -15px #aaaaaa;
    -moz-box-shadow: 0px 0px 36px -15px #aaaaaa;
    box-shadow: 0px 0px 36px -15px #aaaaaa;
    height: 50px;
    opacity: 0;
    outline: none;
    padding: 15px;
    position: fixed;
    right: 20px;
    -webkit-transition: opacity 0.125s ease-in-out;
    transition: opacity 0.125s ease-in-out;
    width: 50px;
}

.scroll-button.show {
    cursor: pointer;
    opacity: 0.7;
}

.scroll-button.show:hover {
    opacity: 1;
}

.listing {
    box-sizing: border-box;
}

.listing ::v-deep .loader {
    opacity: 0;
    pointer-events: none;
}

.listing.loading ::v-deep .loader {
    opacity: 1;
}

.listing .loader.loader-header {
    left: 63px;
    top: 18px;
}

body.tablet .listing .loader.loader-header,
body.mobile .listing .loader.loader-header {
    left: 46px;
    position: absolute;
    top: 16px;
    transform: none;
}

.listing .loader.loader-header ::v-deep div {
    height: 20px;
    width: 20px;
}

.listing.loading.empty ::v-deep .loader.loader-bottom {
    margin: 76px 0px 76px 0px;
}

body.mobile .listing .container-header,
body.tablet .listing .container-header {
    box-sizing: border-box;
    height: auto;
    padding: 15px 15px 15px 15px;
    width: 100%;
}

body.mobile .listing .container-header-right,
body.tablet .listing .container-header-right {
    display: block;
    float: none;
}

.listing .container-header-right .loader {
    display: inline-block;
    vertical-align: middle;
}

.listing .container-header-right .search-platforme {
    margin-left: 24px;
}

body.mobile .listing .container-header-right .search-platforme,
body.tablet .listing .container-header-right .search-platforme {
    display: block;
    margin: 0px 0px 0px 0px;
}

body.mobile .listing .container-header-right .search-platforme ::v-deep > .input-platforme,
body.tablet .listing .container-header-right .search-platforme ::v-deep > .input-platforme {
    width: 100%;
}

.listing.loading .container-header-right .search-platforme ::v-deep svg {
    display: none;
}

.container-platforme {
    animation: fade-into-rise 0.45s cubic-bezier(0.645, 0.045, 0.355, 1);
}

body.mobile .container-platforme,
body.tablet .container-platforme {
    margin: 0px 0px 0px 0px;
}

.fade-enter-active .container-platforme,
.fade-leave-active .container-platforme {
    transition: opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.fade-enter .container-platforme,
.fade-leave-active .container-platforme {
    opacity: 0;
}

.listing.empty .container-platforme {
    min-height: 315px;
}

.container-header-right {
    float: right;
    text-align: right;
}

.search {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    width: 200px;
}

.listing ::v-deep .empty-message {
    line-height: 30px;
    margin: 82px 0px 82px;
}

.listing .filter-platforme ::v-deep table {
    margin-bottom: 0px;
}

.listing ::v-deep .column-container {
    display: inline-block;
    height: auto;
}

.listing ::v-deep .column-container > .name,
.listing ::v-deep .column-container > .details {
    display: block;
    line-height: 14px;
    word-break: break-word;
}

.listing ::v-deep .column-container > .details {
    color: #6d6d6d;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.25px;
    margin-top: 8px;
    text-transform: uppercase;
}

.listing ::v-deep .column-container > .details.highlight:hover,
.listing ::v-deep .column-container > .details.highlight.hover {
    color: $link-hover-color;
}

.listing ::v-deep td {
    font-weight: 600;
    text-transform: none;
}

.listing ::v-deep td.image {
    line-height: 0px;
    user-select: none;
}

.listing ::v-deep td.date > img {
    margin: 0px 5px 0px 5px;
    width: 12px;
}

.listing ::v-deep td.status {
    padding: 0px 20px 0px 20px;
}

.listing ::v-deep td.status > p {
    height: auto;
    line-height: normal;
    margin: 0px 0px 8px 0px;
}

.listing ::v-deep td.status > p.small {
    font-size: 13px;
}

.listing ::v-deep td.icons > .icon {
    height: 20px;
    margin-right: 4px;
    opacity: 0.6;
    transition: opacity 0.125s ease-in-out;
}

.listing ::v-deep td.icons > .icon:hover {
    opacity: 1;
}

.container-header {
    height: 34px;
    padding: 24px 28px 24px 28px;
}

.title {
    color: $black;
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 0.5px;
    line-height: 34px;
    margin: 0px 0px 0px 0px;
    text-align: left;
}

body.mobile .title,
body.tablet .title {
    font-weight: 600;
    letter-spacing: 0.6px;
    margin-top: 15px;
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
import { filterMixin, partMixin, utilsMixin, scrollMixin } from "../../../mixins";

export const ListingPlatforme = {
    name: "listing-platforme",
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
        }
    },
    data: function() {
        return {
            items: [],
            filter: this.context.filter,
            filterOptions: null,
            loading: false,
            visibleLightbox: null
        };
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
        getFilter() {
            return this.$refs.filter;
        }
    },
    beforeRouteUpdate: function(to, from, next) {
        this.filter = to.query.filter || "";
        next();
    }
};

export default ListingPlatforme;
</script>
