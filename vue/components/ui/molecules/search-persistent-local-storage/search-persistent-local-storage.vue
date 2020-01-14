<template>
    <div class="search-persistent-local-storage">
        <global />
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

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

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
        return {};
    },
    methods: {}
};

export default SearchPersistentLocalStorage;
</script>
