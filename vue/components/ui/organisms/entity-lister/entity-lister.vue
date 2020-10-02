<template>
    <listing
        class="entity-lister"
        v-bind:name="name"
        v-bind:title-text="_title"
        v-bind:create-url="createUrl"
        v-bind:table-columns="_columns"
        v-bind:table-alignment="'left'"
        v-bind:lineup-fields="_columns"
        v-bind:get-items="getEntities"
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
                v-if="editButton"
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

export const EntityLister = {
    name: "entity-lister",
    mixins: [partMixin],
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
        getShowRoute: {
            type: Function,
            default: null
        },
        createButton: {
            type: Boolean,
            default: true
        },
        createRoute: {
            type: String | Object,
            default: null
        },
        editButton: {
            type: Boolean,
            default: true
        },
        getEditRoute: {
            type: Function,
            default: null
        },
        deleteEntity: {
            type: Function,
            default: null
        },
        getEntityName: {
            type: Function,
            default: entity => entity.name
        }
    },
    computed: {
        _title() {
            return this.title || `${this.name}s`;
        },
        createUrl() {
            if (!this.createButton) return null;

            return this.createRoute || { name: `${this.name}-create` };
        },
        actionsWidth() {
            let width = 40;
            if (this.editButton) width += 85;
            if (this.deleteEntity) width += 100;
            return width;
        },
        _columns() {
            return this.editButton || this.deleteEntity
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
                : { name: `${this.name}-edit`, params: { id: item.id } };
        },
        showRoute(item) {
            return this.getShowRoute
                ? this.getShowRoute(item)
                : { name: `${this.name}-show`, params: { id: item.id.name } };
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

            if (confirmed) await this.deleteEntity(item);
        }
    }
};

export default EntityLister;
</script>
