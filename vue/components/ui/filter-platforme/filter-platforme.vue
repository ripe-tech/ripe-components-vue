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
            sort,
            reverse,
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
            async handler(options, oldOptions) {
                // if the sort or the filter string have changed then
                // resets the start parameter as the current items
                // will be invalid
                if (this.start !== 0 && oldOptions && this.start === oldOptions.start) {
                    this.start = 0;
                    return;
                }

                // saves the signature that triggered this request
                const signature = this.signature;
                this.loading = true;

                // waits for a short time for new get items requests
                // which would make this request unnecessary
                await new Promise(resolve => setTimeout(resolve, this.filterTimeout));
                if (this.signature !== signature) {
                    return;
                }

                // makes the items request and checks if it is still
                // to be used when the result is retrieved
                const items = await this.getItems(options);
                if (this.signature !== signature) {
                    return;
                }

                // in case either the items are not defined or are null
                // an immediate return of the control flow is performed
                if (items === undefined || items === null) {
                    return;
                }

                // if this request was triggered for pagination then
                // appends the new items to the current items, otherwise
                // replaces the current items
                const pagination = this.start > 0;
                this.tableTransition = pagination || this.items.length === 0 ? "fade" : "";
                this.items = !pagination ? items : [...this.items, ...items];
                this.loading = false;
                this.itemsToLoad = items.length === this.limit;
                this.useQuery && this.updateQuery(options);
                this.$emit("update:options", options);
            }
        },
        loading: {
            handler(value) {
                this.$emit("update:loading", value);
            },
            immediate: true
        },
        items: {
            handler(value) {
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
        }
    }
};

export default FilterPlatforme;
</script>
