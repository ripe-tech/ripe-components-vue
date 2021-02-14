<template>
    <details-ripe
        v-bind:title="_title"
        v-bind:name="name"
        v-bind:values="fields"
        v-bind:item="item"
        v-bind:get-items="getItems"
        v-bind:options-items="optionsItems"
        v-bind:loaded="Boolean(entity)"
        v-on:click:stats="onStatsButtonClick"
        v-on:click:refresh="onRefreshButtonClick"
        v-on:click:edit="onEditButtonClick"
        v-on:click:delete="onDeleteButtonClick"
    >
        <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
        <template v-for="slot in Object.keys($scopedSlots)" v-bind:slot="slot" slot-scope="scope">
            <slot v-bind:name="slot" v-bind="scope" v-bind:entity="entity" />
        </template>
    </details-ripe>
</template>

<style lang="scss" scoped></style>

<script>
import { partMixin } from "../../../../mixins";

export const EntityShow = {
    name: "entity-show",
    mixins: [partMixin],
    props: {
        /**
         * The entity name. Example: for an entity "Person" which has a property
         * "name" with the value "John", this prop value should be "Person".
         */
        name: {
            type: String,
            required: true
        },
        /**
         * Used to specify which of the entity's properties are going be shown.
         * Example: [{ value: "name" }, { value: "email", label: "Personal email" }].
         */
        fields: {
            type: Array,
            required: true
        },
        /**
         * Method used to get the entity to be shown.
         */
        getEntity: {
            type: Function,
            required: true
        },
        /**
         * Gets all entities.
         */
        getEntities: {
            type: Function,
            required: true
        },
        /**
         * Container title. If set, overrides the breadcrumbs.
         */
        title: {
            type: String,
            default: null
        },
        /**
         * Container breadcrumbs. The entity's value defined by the "getEntityName" prop
         * will be appended to these breadcrumbs.
         */
        breadcrumbs: {
            type: Array,
            default: null
        },
        /**
         * Used to get a user-facing value that identifies the entity.
         * Defaults to the property "name".
         */
        getEntityName: {
            type: Function,
            default: entity => entity.name
        },
        /**
         * Overrides the entity list route. Example:
         * { name: "person-list", params: { a: "...", b: "..." } }.
         */
        listRoute: {
            type: Object | String,
            default: null
        },
        /**
         * Entity's edit page route. If set, an edit option is shown in the options
         * dropdown. Example: { name: "person-edit", params: { username: "..." } }.
         */
        editRoute: {
            type: Object | String,
            default: null
        },
        /**
         * Entity's delete method. If set, a delete option is shown in the options
         * dropdown.
         */
        deleteEntity: {
            type: Function,
            default: null
        },
        /**
         * Returns a the message to show when an error occurs.
         */
        getErrorMessage: {
            type: Function,
            default: error => error.message || "Something went wrong"
        },
        /**
         * Props that can be used to customize the error message.
         */
        errorMessageProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            entity: {}
        };
    },
    computed: {
        item() {
            return this._entityToItem(this.entity);
        },
        getItems() {
            return async () => {
                const entitites = await this.getEntities();
                return entitites.map(entity => this._entityToItem(entity));
            };
        },
        entityName() {
            return this.getEntityName(this.entity);
        },
        _title() {
            if (this.title) return this.title;
            if (this.breadcrumbs) return this.breadcrumbs.concat([{ text: this.entityName }]);
            return null;
        },
        _listRoute() {
            return this.listRoute || { name: `${this.name.toLowerCase()}-list` };
        },
        optionsItems() {
            return [
                this.editRoute ? { label: "Edit", value: "edit", event: "edit" } : null,
                this.deleteEntity ? { label: "Delete", value: "delete", event: "delete" } : null
            ].filter(v => v);
        }
    },
    created: async function() {
        await this.loadEntity();
    },
    methods: {
        _entityToItem(entity) {
            return entity;
        },
        async loadEntity() {
            this.entity = await this.getEntity();
        },
        async delete() {
            try {
                await this.deleteEntity();
                this.$router.push(this._listRoute);
            } catch (error) {
                this.notify(this.getErrorMessage(error), {
                    icon: "error",
                    iconColor: "#ce544d",
                    topHeight: 130,
                    timeout: 2000,
                    ...this.errorMessageProps
                });
            }
        },
        onStatsButtonClick() {
            this.$router.push(this._listRoute);
        },
        async onRefreshButtonClick() {
            await this.loadEntity();
        },
        onEditButtonClick() {
            this.$router.push(this.editRoute);
        },
        async onDeleteButtonClick() {
            const confirmed = await this.alert(
                `Are you sure you really want to <strong>delete ${this.name} ${this.entityName}</strong>?<br/>Please bare in mind that this action <strong>is not reversible</strong>!`,
                { title: `Delete ${this.name} ${this.entityName}` }
            );

            if (confirmed) await this.delete();
        }
    }
};

export default EntityShow;
</script>
