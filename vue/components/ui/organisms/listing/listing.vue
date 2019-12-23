<template>
    <div class="listing" v-bind:class="{ loading, empty: items.length === 0 }">
        <button
            class="scroll-button"
            v-bind:class="{ show: showScrollTop }"
            v-on:click="scrollToTop"
        />
        <container-ripe>
            <div class="container-header">
                <div class="container-header-right">
                    <slot name="icons" />
                    <loader loader="ball-scale-multiple" class="loader-header" />
                    <search
                        v-bind:width="isMobileWidth() ? null : searchWidth"
                        v-bind:placeholder="filterText ? filterText : `Search ${name}`"
                        v-bind:value.sync="filter"
                    />
                </div>
                <h1 class="title" v-if="titleText">{{ titleText }}</h1>
                <h1 class="title" v-else>
                    Your <span class="name">{{ name }}</span>
                </h1>
            </div>
            <filter-ripe
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

.listing .loader.loader-header ::v-deep div {
    height: 20px;
    width: 20px;
}

.listing.loading.empty ::v-deep .loader.loader-bottom {
    margin: 76px 0px 76px 0px;
}

.listing .container-header-right .loader {
    display: inline-block;
    vertical-align: middle;
}

.listing.loading .container-header-right .search ::v-deep svg {
    display: none;
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
    text-align: right;
}

body.mobile .container-header-right {
    float: none;
    width: 100%;
}

.listing .filter-ripe ::v-deep table {
    margin-bottom: 0px;
}

.container-header {
    height: 34px;
    padding: 24px 28px 24px 28px;
}

body.mobile .container-header {
    height: auto;
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

export default Listing;
</script>
