<template>
    <div class="listing" v-bind:class="{ loading, empty: items.length === 0 }">
        <button
            class="scroll-button"
            v-bind:class="{ show: showScrollTop }"
            v-on:click="scrollToTop"
        />
        <container-ripe v-bind:mode="containerMode">
            <div class="container-header">
                <div class="container-header-right">
                    <div class="container-header-buttons" v-if="$slots['header-buttons']">
                        <slot name="header-buttons" />
                    </div>
                    <search
                        v-bind:variant="'dark'"
                        v-bind:width="isMobileWidth() ? null : searchWidth"
                        v-bind:placeholder="filterText ? filterText : `Search ${name}`"
                        v-bind:value.sync="filter"
                        v-bind:loading="loading"
                    />
                </div>
                <h1 class="title" v-if="titleText">{{ titleText }}</h1>
                <h1 class="title" v-else>
                    Your <span class="name">{{ name }}</span>
                </h1>
            </div>
            <filter-ripe
                v-bind:get-items="getItems"
                v-bind:get-item-url="getItemUrl"
                v-bind:table-columns="tableColumns"
                v-bind:lineup-fields="lineupFields"
                v-bind:lineup-columns="lineupColumns"
                v-bind:filter="filter"
                v-bind:use-query="useQuery"
                v-bind:loading.sync="loading"
                v-bind:items.sync="items"
                v-bind:options.sync="filterOptions"
                v-bind:enable-checkboxes="enableCheckboxes"
                v-bind:selected-checkboxes="selectedCheckboxes"
                v-bind:selected-items.sync="selectedItemsData"
                ref="filter"
                v-on:update:options="filterUpdated"
                v-on:click:table="onTableClick"
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
                <template v-slot:table-item="{ item, index }">
                    <slot
                        name="table-item"
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
    z-index: 1;
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
    text-align: right;
}

body.mobile .container-header-right {
    float: none;
    width: 100%;
}

.container-header-buttons {
    display: inline-block;
    margin-right: 8px;
    vertical-align: top;
}

body.mobile .container-header-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 10px;
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
import { partMixin, utilsMixin, scrollMixin } from "../../../../mixins";

export const Listing = {
    name: "listing",
    mixins: [partMixin, utilsMixin, scrollMixin],
    props: {
        context: {
            type: Object,
            default: () => ({})
        },
        tableColumns: {
            type: Array,
            required: true
        },
        lineupFields: {
            type: Array,
            required: true
        },
        lineupColumns: {
            type: Number,
            default: null
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
        containerMode: {
            type: String,
            default: null
        },
        enableCheckboxes: {
            type: Boolean,
            default: false
        },
        selectedCheckboxes: {
            type: Array,
            default: () => []
        }
    },
    data: function() {
        return {
            items: [],
            filter: this.context && this.context.filter ? this.context.filter : "",
            filterOptions: null,
            loading: false,
            visibleLightbox: null,
            selectedItemsData: []
        };
    },
    watch: {
        selectedItemsData(value) {
            this.$emit("update:selected-items", value);
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
        },
        onTableClick(item, index) {
            this.$emit("click:table", item, index);
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
