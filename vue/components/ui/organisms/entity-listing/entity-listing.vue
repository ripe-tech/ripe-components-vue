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
    >
        <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
        <template v-for="slot in Object.keys($scopedSlots)" v-bind:slot="slot" slot-scope="scope">
            <slot v-bind:name="slot" v-bind="scope" />
        </template>
    </listing>
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
