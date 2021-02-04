<template>
    <listing
        class="entity-list"
        v-bind:name="name"
        v-bind:title-text="_title"
        v-bind:create-url="createUrl"
        v-bind:table-columns="_columns"
        v-bind:table-alignment="'left'"
        v-bind:lineup-fields="_columns"
        v-bind:get-items="getEntities"
        v-bind="listingProps"
        v-on:click:table="onTableRowClick"
    >
        <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
        <template v-for="slot in Object.keys($scopedSlots)" v-bind:slot="slot" slot-scope="scope">
            <slot v-bind:name="slot" v-bind="scope" />
        </template>
        <template v-slot:table-cell-actions="{ item }">
            <router-link
                class="button-edit"
                v-bind:to="editRoute(item)"
                v-if="editEntity"
            >
                <button-icon v-bind:icon="'edit'" v-bind:text="'Edit'" v-bind:size="42" />
            </router-link>
            <button-icon
                v-bind:icon="'bin'"
                v-bind:text="'Delete'"
                v-bind:size="42"
                v-if="deleteEntity"
                v-on:click.stop="onDeleteButtonClick(item)"
            />
        </template>
    </listing>
</template>

<style lang="scss" scoped></style>

<script>
import { partMixin } from "../../../../mixins";

export const EntityList = {
    name: "entity-list",
    mixins: [partMixin],
    props: {
        /**
         * The entity name, if we are listing entities "Person"
         * which have a property "name" with the value "John",
         * this prop value should be "Person".
         */
        name: {
            type: String,
            required: true
        },
        /**
         * Used to specify the columns of the entities list.
         * as sequence of object containing value and label.
         */
        columns: {
            type: Array,
            required: true
        },
        /**
         * Method that gets all the entities to be listed.
         */
        getEntities: {
            type: Function,
            required: true
        },
        /**
         * Container title, as in the entity's name suffixed
         * with "s".
         */
        title: {
            type: String,
            default: null
        },
        /**
         * Method that overrides each of entities show route.
         */
        getShowRoute: {
            type: Function,
            default: null
        },
        /**
         * Controls the visibility of the create button, used to create
         * new entities.
         */
        createEntity: {
            type: Boolean,
            default: true
        },
        /**
         * Overrides the entity create route.
         */
        createRoute: {
            type: String | Object,
            default: null
        },
        /**
         * Show/hide the edit button that appears in each table row.
         */
        editEntity: {
            type: Boolean,
            default: true
        },
        /**
         * Method that overrides each of entities edit route.
         */
        getEditRoute: {
            type: Function,
            default: null
        },
        /**
         * Entities delete method, if set a delete button is shown in the
         * actions column for each table row.
         */
        deleteEntity: {
            type: Function,
            default: null
        },
        /**
         * Used to get a value that identifies the entity. Defaults to
         * the property "name".
         */
        getEntityName: {
            type: Function,
            default: entity => entity.name
        },
        /**
         * Props that can be used to customize the listing component.
         */
        listingProps: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        _title() {
            return this.title || `${this.name}s`;
        },
        createUrl() {
            if (!this.createEntity) return null;
            return this.createRoute || { name: `${this.name.toLowerCase()}-create` };
        },
        actionsWidth() {
            let width = 40;
            if (this.editEntity) width += 85;
            if (this.deleteEntity) width += 100;
            return width;
        },
        _columns() {
            return this.editEntity || this.deleteEntity
                ? this.columns.concat([
                      { value: "actions", label: "Actions", width: `${this.actionsWidth}px` }
                  ])
                : this.columns;
        }
    },
    methods: {
        editRoute(item) {
            return this.getEditRoute
                ? this.getEditRoute(item)
                : { name: `${this.name.toLowerCase()}-edit`, params: { id: item.id } };
        },
        showRoute(item) {
            return this.getShowRoute
                ? this.getShowRoute(item)
                : { name: `${this.name.toLowerCase()}-show`, params: { id: item.id.name } };
        },
        onTableRowClick(item) {
            this.$router.push(this.showRoute(item));
        },
        async onDeleteButtonClick(item) {
            const confirmed = await this.alert(
                `Are you sure you really want to <strong>delete ${this.name} ${this.getEntityName(
                    item
                )}</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                { title: `Delete ${this.name} ${this.getEntityName(item)}` }
            );
            if (!confirmed) return;
            await this.deleteEntity(item);
        }
    }
};

export default EntityList;
</script>
