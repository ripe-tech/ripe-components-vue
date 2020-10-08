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

export const EntityShower = {
    name: "entity-shower",
    mixins: [partMixin],
    props: {
        /**
         * The entity name
         */
        name: {
            type: String,
            required: true
        },
        /**
         * Entity fields that are going to be shown
         */
        fields: {
            type: Array,
            required: true
        },
        /**
         * Container title, if set will override the breadcrumbs
         */
        title: {
            type: String,
            default: null
        },
        /**
         * Container breadcrumbs on which the entity's name field will
         * be appended. Is overridden by title
         */
        breadcrumbs: {
            type: Array,
            default: null
        },
        /**
         * Gets the entity to be show
         */
        getEntity: {
            type: Function,
            required: true
        },
        /**
         * Gets the list of all entities
         */
        getEntities: {
            type: Function,
            required: true
        },
        /**
         * Loaded entity field that is used as its name. Defaults to
         * property "name"
         */
        getEntityName: {
            type: Function,
            default: entity => entity.name
        },
        /**
         * Overrides the entity list route
         */
        listRoute: {
            type: Object | String,
            default: null
        },
        /**
         * Entity's edit page route. If set, an edit option is shown
         * in the options dropdown
         */
        editRoute: {
            type: Object | String,
            default: null
        },
        /**
         * Entity's delete method. If set, a delete option is shown in
         * the options dropdown
         */
        deleteEntity: {
            type: Function,
            default: null
        },
        /**
         * Message shown when an error occurs
         * the options dropdown
         */
        getErrorMessage: {
            type: Function,
            default: error => error.message || "Something went wrong"
        },
        /**
         * Props that can be used to customize the error notification
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

export default EntityShower;
</script>
