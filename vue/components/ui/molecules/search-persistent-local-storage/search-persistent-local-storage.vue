<template>
    <div class="search-persistent-local-storage">
        <search-persistent
            v-bind:value.sync="valueData"
            v-bind:filters.sync="filtersData"
            v-bind:placeholder="placeholder"
            v-bind:icon-visible="iconVisible"
            v-bind:clear-visible="clearVisible"
            v-bind:variant="variant"
            v-bind:width="width"
            v-bind:loading="loading"
        />
    </div>
</template>

<script>
export const SearchPersistentLocalStorage = {
    name: "search-persistent-local-storage",
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
            valueData: this.value,
            filtersData: this.filters
        };
    },
    watch: {
        filters(value) {
            this.filtersData = value;
        },
        valueData(value) {
            this.$emit("update:value", this.valueData);
        },
        filtersData(value) {
            this.saveFilters(this.filtersData);
            this.$emit("update:filters", this.filtersData);
        }
    },
    computed: {
        filtersKey() {
            return this.$root.account ? `filters${this.$root.account._id}` : "filters";
        }
    },
    mounted: function() {
        this.loadFilters();
    },
    methods: {
        saveFilters(filters) {
            localStorage.setItem(this.filtersKey, JSON.stringify(filters));
        },
        loadFilters() {
            const filters = localStorage.getItem(this.filtersKey);

            if (filters) this.filtersData = JSON.parse(filters);
        }
    }
};

export default SearchPersistentLocalStorage;
</script>
