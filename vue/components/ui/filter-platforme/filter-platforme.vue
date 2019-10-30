<template>
    <div class="filter-platforme">
        <slot name="list">
            <table-platforme
                class="table"
                v-bind:columns="columns"
                v-bind:items="items"
                v-bind:sort-method="onSort"
                v-bind:transition="tableTransition"
                v-bind:initial-sort="sort"
                v-bind:initial-reverse="reverse"
            >
                <template slot-scope="scope">
                    <slot name="item" v-bind="scope" />
                </template>
            </table-platforme>
            <div class="empty-message" v-if="items.length === 0 && loading === false">
                <slot name="empty">
                    <h1>No items found</h1>
                </slot>
            </div>
            <loader-platforme class="loader-bottom" loader="line-scale" v-bind:count="5" />
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.loader {
    display: none;
    margin: 24px 0px 24px 0px;
    opacity: 0;
    pointer-events: none;
}

.loading .loader {
    display: block;
    opacity: 1;
}
</style>

<script>
export const FilterPlatforme = {
    props: {
        filter: {
            type: String,
            default: ""
        },
        getItems: {
            type: Function,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        limit: {
            type: Number,
            default: 25
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
        const { sort = "id", reverse = false } = this.useQuery ? this.parseQuery() : {};
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
        options() {
            return {
                sort: this.sort,
                reverse: this.reverse,
                filter: this.filter,
                start: this.start,
                limit: this.limit
            };
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
                this.useQuery && this.updateQuery(options);
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
            if (!this.itemsToLoad || this.loading) {
                return;
            }
            this.start += this.limit;
        },
        parseQuery() {
            const query = this.$route.query;
            const { sort, reverse, filter } = query;
            return {
                sort: sort || undefined,
                reverse: reverse === null ? undefined : reverse === "true",
                filter: filter || undefined
            };
        },
        updateQuery(options) {
            const { sort, reverse, filter } = options;
            this.$router.replace({ query: { ...this.$route.query, sort, reverse, filter } });
        },
        setItem(index, item) {
            this.items.$set(index, item);
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
        }
    }
};

export default FilterPlatforme;
</script>
