<template>
    <div class="filter-ripe" v-bind:class="{ loading }">
        <slot name="list">
            <table-ripe
                v-bind:columns="tableColumns"
                v-bind:items="items"
                v-bind:sort-method="onSort"
                v-bind:transition="tableTransition"
                v-bind:sort="sort"
                v-bind:reverse="reverse"
                v-bind:alignment="tableAlignment"
                v-bind:variant="tableVariant"
                v-bind:row-selection="rowSelection"
                v-bind:clickable-rows="clickableRows"
                v-bind:checkboxes="checkboxes"
                v-bind:checked-items="checkedItems"
                v-on:update:checked-items="value => $emit('update:checked-items', value)"
                v-on:click="onTableClick"
            >
                <template v-slot="{ item, index }">
                    <slot name="table-item" v-bind:item="item" v-bind:index="index" />
                </template>
                <slot
                    v-bind:name="slot"
                    v-for="slot in tableSlots"
                    v-bind:slot="slot.replace('table-', '')"
                />
                <template
                    v-for="slot in tableScopedSlots"
                    v-bind:slot="slot.replace('table-', '')"
                    slot-scope="scope"
                >
                    <slot v-bind:name="slot" v-bind="scope" />
                </template>
            </table-ripe>
            <lineup
                v-bind:items="items"
                v-bind:fields="lineupFields"
                v-bind:get-item-url="getItemUrl"
                v-bind:columns="lineupColumns"
                v-bind:variant="lineupVariant"
                v-on:click="onLineupClick"
            >
                <slot
                    v-bind:name="slot"
                    v-for="slot in lineupSlots"
                    v-bind:slot="slot.replace('lineup-', '')"
                />
                <template
                    v-for="slot in lineupScopedSlots"
                    v-bind:slot="slot.replace('lineup-', '')"
                    slot-scope="scope"
                >
                    <slot v-bind:name="slot" v-bind="scope" />
                </template>
            </lineup>
            <div class="empty-message" v-if="items.length === 0 && loading === false">
                <slot name="empty">
                    <h1>No items found</h1>
                </slot>
            </div>
            <loader-logo class="loader-bottom" />
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

body.mobile .filter-ripe .table {
    display: none;
}

.filter-ripe .lineup {
    display: none;
}

body.mobile .filter-ripe .lineup {
    display: block;
}

.filter-ripe .empty-message {
    line-height: 30px;
    margin: 82px 0px 82px;
    text-align: center;
}

.filter-ripe .empty-message > h1 {
    font-weight: 500;
}

.filter-ripe .loader,
.filter-ripe .loader-logo {
    display: none;
    margin: 24px 0px 24px 0px;
    opacity: 0;
    pointer-events: none;
    text-align: center;
}

.filter-ripe.loading .loader,
.filter-ripe.loading .loader-logo {
    display: block;
    opacity: 1;
}
</style>

<script>
import { equal } from "yonius";

export const Filter = {
    name: "filter-ripe",
    props: {
        filter: {
            type: String,
            default: ""
        },
        getItems: {
            type: Function,
            default: () => []
        },
        checkboxes: {
            type: Boolean,
            default: false
        },
        checkedItems: {
            type: Object,
            default: () => ({})
        },
        getItemUrl: {
            type: Function,
            default: null
        },
        tableColumns: {
            type: Array,
            default: () => []
        },
        tableAlignment: {
            type: String,
            default: null
        },
        tableVariant: {
            type: String,
            default: null
        },
        rowSelection: {
            type: Boolean,
            default: false
        },
        clickableRows: {
            type: Boolean,
            default: true
        },
        lineupFields: {
            type: Array,
            default: () => []
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
        defaultReverse: {
            type: Boolean,
            default: false
        },
        defaultSort: {
            type: String,
            default: "id"
        },
        filterTimeout: {
            type: Number,
            default: 200
        },
        useQuery: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        const { sort = this.defaultSort, reverse = this.defaultReverse } = this.useQuery
            ? this.parseQuery()
            : {};
        return {
            items: [],
            sort: sort,
            reverse: reverse,
            start: 0,
            itemsToLoad: true,
            loading: false,
            tableTransition: ""
        };
    },
    computed: {
        signature() {
            return `${this.sort}:${this.reverse}:${this.filter}:${this.start}`;
        },
        /**
         * Normalized options (in native Javascript format) ready to be sent
         * to the item retrieval operations. This object can be safely used
         * internally as opposed to the context field which is string oriented.
         */
        options() {
            return {
                sort: this.sort,
                reverse: this.reverse,
                filter: this.filter,
                start: this.start,
                limit: this.limit
            };
        },
        tableSlots() {
            return Object.keys(this.$slots).filter(slot => slot.startsWith("table-"));
        },
        tableScopedSlots() {
            return Object.keys(this.$scopedSlots).filter(slot => slot.startsWith("table-"));
        },
        lineupSlots() {
            return Object.keys(this.$slots).filter(slot => slot.startsWith("lineup-"));
        },
        lineupScopedSlots() {
            return Object.keys(this.$scopedSlots).filter(slot => slot.startsWith("lineup-"));
        }
    },
    watch: {
        options: {
            deep: true,
            immediate: true,
            handler: async function(options, oldOptions) {
                // if the sort or the filter string have changed then
                // resets the start parameter as the current items
                // will be invalid
                if (this.start !== 0 && oldOptions && this.start === oldOptions.start) {
                    this.start = 0;
                    return;
                }

                // runs the internal filter refresh logic, that should
                // trigger underlying remote operations (async call)
                // in case no effective refresh was performed there's
                // nothing remaining to be done (returns control flow)
                const refreshed = await this.refresh();
                if (!refreshed) return;

                // updates the top level query for the current page
                // and triggers the update event (for listeners)
                if (this.useQuery) this.updateQuery(options);
                this.$emit("update:options", options);
            }
        },
        loading: {
            handler: function(value) {
                this.$emit("update:loading", value);
            },
            immediate: true
        },
        items: {
            handler: function(value) {
                this.$emit("update:items", value);
            },
            immediate: true
        }
    },
    methods: {
        onSort(items, column, reverse) {
            this.sort = column;
            this.reverse = reverse;
            return items;
        },
        loadMore() {
            if (!this.itemsToLoad || this.loading) return;
            this.start += this.limit;
        },
        parseQuery() {
            const query = this.$route.query;
            const { sort, reverse, filter } = query;
            return {
                sort: sort || undefined,
                reverse: reverse === null || reverse === undefined ? undefined : reverse === "1",
                filter: filter || undefined
            };
        },
        updateQuery(options) {
            const { sort, reverse, filter } = options;

            const query = this.$route.query;
            const current = Object.assign({}, query);
            const next = Object.assign({}, query);

            if (sort) next.sort = sort;
            else delete next.sort;

            next.reverse = reverse ? "1" : "0";

            if (filter) next.filter = filter;
            else delete next.filter;

            if (equal(current, next)) return;

            this.$router.replace({ query: next });
        },
        setItem(index, item) {
            this.$set(this.items, index, item);
        },
        removeItem(index) {
            this.items.splice(index, 1);
        },
        async refresh(force = true) {
            // in case there's a request already being handled and
            // the force flag is not set returns immediately, not
            // going to override the request
            if (!force && this.loading) return false;

            // saves the signature that triggered this request and
            // marks the current component as loading
            const options = this.options;
            const signature = this.signature;
            this.loading = true;

            // waits for a short time for new get items requests
            // which would make this request unnecessary
            await new Promise(resolve => setTimeout(resolve, this.filterTimeout));
            if (this.signature !== signature) {
                return false;
            }

            // makes the items request and checks if it is still
            // to be used when the result is retrieved
            const items = await this.getItems(options);
            if (this.signature !== signature) {
                return false;
            }

            // in case either the items are not defined or are null
            // an immediate return of the control flow is performed
            if (items === undefined || items === null) {
                return false;
            }

            // if this request was triggered for pagination then
            // appends the new items to the current items, otherwise
            // replaces the current items
            const pagination = this.start > 0;
            this.tableTransition = pagination || this.items.length === 0 ? "fade" : "";
            this.items = !pagination ? items : [...this.items, ...items];
            this.loading = false;
            this.itemsToLoad = items.length === this.limit;

            // returns a valid value as an "effective" refresh operation
            // has just been performed (all tests passed)
            return true;
        },
        onTableClick(item, index) {
            this.$emit("click:table", item, index);
        },
        onLineupClick(item, index) {
            this.$emit("click:lineup", item, index);
        }
    }
};

export default Filter;
</script>
