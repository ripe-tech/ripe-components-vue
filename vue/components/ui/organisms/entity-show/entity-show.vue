<template>
    <details-ripe
        v-bind:title="_title"
        v-bind:name="name"
        v-bind:values="fields"
        v-bind:item="entity"
        v-bind:get-items="getEntities"
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
        name: {
            type: String,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        getEntity: {
            type: Function,
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
        breadcrumbs: {
            type: Array,
            default: null
        },
        getEntityName: {
            type: Function,
            required: entity => entity.name || null
        },
        listRoute: {
            type: Object | String,
            default: null
        },
        editRoute: {
            type: Object | String,
            default: null
        },
        deleteEntity: {
            type: Function,
            default: null
        },
        errorMessage: {
            type: Boolean,
            default: true
        },
        getErrorMessage: {
            type: Function,
            default: error => error.message || "Something went wrong"
        },
        errorMessageProps: {
            type: Object,
            default: () => ({})
        },
        detailsProps: {
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
        entityName() {
            return this.getEntityName(this.entity);
        },
        _title() {
            if (this.title) return this.title;
            if (this.breadcrumbs) return this.title.concat([{ text: this.entityName }]);

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
