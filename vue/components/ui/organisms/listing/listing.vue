<template>
    <div class="listing" v-bind:class="classes">
        <button
            class="scroll-button"
            v-bind:class="{ show: showScrollTop }"
            v-on:click="scrollToTop"
        />
        <container-ripe
            v-bind:mode="containerMode"
            v-bind:title="titleText ? titleText : `${titlePrefix} ${nameCapitalized}`"
            v-bind:header-buttons="containerHeaderButtons"
            v-on:header-button:click="onHeaderButtonClick"
        >
            <template v-slot:header>
                <slot v-bind:name="'header'" />
            </template>
            <template v-slot:header-before>
                <slot v-bind:name="'header-before'" />
            </template>
            <template v-slot:header-after>
                <slot v-bind:name="'header-after'" />
            </template>
            <template v-slot:header-buttons>
                <slot v-bind:name="'header-buttons'" />
            </template>
            <template v-slot:header-buttons-before>
                <slot v-bind:name="'header-buttons-before'" />
            </template>
            <template v-slot:header-buttons-inside-before>
                <slot v-bind:name="'header-buttons-inside-before'" />
            </template>
            <template v-slot:header-buttons-inside-after>
                <slot v-bind:name="'header-buttons-inside-after'" />
            </template>
            <template v-slot:header-buttons-after>
                <slot name="header-search">
                    <search
                        v-bind:variant="'dark'"
                        v-bind:width="isMobileWidth() ? null : searchWidth"
                        v-bind:placeholder="filterText ? filterText : `Search ${name}`"
                        v-bind:value.sync="filter"
                        v-bind:loading="loading"
                    />
                </slot>
            </template>
            <filter-ripe
                v-bind:get-items="getItems"
                v-bind:get-item-url="getItemUrl"
                v-bind:table-columns="tableColumns"
                v-bind:table-variant="tableVariant"
                v-bind:lineup-fields="lineupFields"
                v-bind:lineup-columns="lineupColumns"
                v-bind:lineup-variant="lineupVariant"
                v-bind:limit="limit"
                v-bind:default-reverse="defaultReverse"
                v-bind:filter="filter"
                v-bind:use-query="useQuery"
                v-bind:loading.sync="loading"
                v-bind:items.sync="items"
                v-bind:options.sync="filterOptions"
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
                <template v-slot:table-row="{ item, index }">
                    <slot
                        name="table-row"
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
@import "css/animations.scss";

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
    padding: 0px 16px 0px 16px;
}

.listing.container-expanded {
    padding: 0px 0px 0px 0px;
}

body.mobile .listing {
    padding: 0px 0px 0px 0px;
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

.listing .filter-ripe ::v-deep table {
    margin-bottom: 0px;
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

.listing .filter-ripe ::v-deep .lineup > .lineup-item {
    padding: 12px 8px 12px 8px;
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
        tableVariant: {
            type: String,
            default: null
        },
        lineupFields: {
            type: Array,
            required: true
        },
        lineupColumns: {
            type: Number,
            default: null
        },
        lineupVariant: {
            type: String,
            default: null
        },
        limit: {
            type: Number,
            default: 25
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
        titlePrefix: {
            type: String,
            default: "Your"
        },
        filterText: {
            type: String,
            default: null
        },
        defaultReverse: {
            type: Boolean,
            default: false
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
        containerHeaderButtons: {
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
        onHeaderButtonClick(event, buttonId) {
            this.$emit("header-button:click", event, buttonId);
        },
        onTableClick(item, index) {
            this.$emit("click:table", item, index);
        },
        onLineupClick(item, index) {
            this.$emit("click:lineup", item, index);
        }
    },
    computed: {
        nameCapitalized() {
            if (!this.name) return "";
            return this.name[0].toUpperCase() + this.name.slice(1);
        },
        classes() {
            const base = {
                loading: this.loading,
                empty: this.items.length === 0
            };

            if (this.containerMode) {
                base["container-" + this.containerMode] = this.containerMode;
            }

            return base;
        }
    },
    beforeRouteUpdate: function(to, from, next) {
        this.filter = to.query.filter || "";
        next();
    }
};

export default Listing;
</script>
