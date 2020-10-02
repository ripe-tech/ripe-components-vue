<template>
    <listing
        v-bind:name="name"
        v-bind:title-text="_title"
        v-bind:create-url="createRoute"
        v-bind:table-columns="columns"
        v-bind:table-alignment="'left'"
        v-bind:lineup-fields="columns"
        v-bind:get-items="getEntities"
        v-on:click:table="onTableRowClick"
    />
</template>

<style lang="scss" scoped></style>

<script>
export const EntityListing = {
    name: "entity-listing",
    props: {
        name: {
            type: String,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        getEntities: {
            type: Function,
            required: true
        },
        title: {
            type: String,
            default: null
        },
        createRoute: {
            type: String | Object,
            default: null
        },
        getShowRoute: {
            type: Function,
            default: null
        }
    },
    computed: {
        _title() {
            return this.title || `${this.name}s`;
        },
        createUrl() {
            return this.createRoute || { name: `${this.name}-create` };
        }
    },
    methods: {
        showRoute(item) {
            return this.getShowRoute
                ? this.getShowRoute(item)
                : { name: `${this.name}-show`, params: { id: item.id.name } };
        },
        onTableRowClick(item) {
            this.$router.push(this.showRoute(item));
        }
    }
};

export default EntityListing;
</script>
