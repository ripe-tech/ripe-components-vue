<template>
    <padded class="entity-editor">
        <container-form
            v-bind:values.sync="valuesData"
            v-bind:title="_title"
            v-bind:fields="fields"
            v-bind:on-delete="onDelete"
            v-bind:form-props="{
                onDiscard: onDiscard,
                onSave: onSave,
                ...formProps
            }"
            v-if="!loading"
            v-on:header-button:click="onHeaderButtonClick"
        >
            <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
            <template
                v-for="slot in Object.keys($scopedSlots)"
                v-bind:slot="slot"
                slot-scope="scope"
            >
                <slot v-bind:name="slot" v-bind="scope" />
            </template>
        </container-form>
        <container-ripe class="container-loading" v-else>
            <loader loader="line-scale" v-bind:count="5" />
        </container-ripe>
    </padded>
</template>

<style lang="scss" scoped>
.entity-editor > .container-loading {
    padding: 150px 0px 150px 0px;
}
</style>

<script>
export const EntityEditor = {
    name: "entity-editor",
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
         * Used to structure and populate the create form. Example:
         * {
         *     "Person Info": [
         *         [
         *             {
         *                 fields: [
         *                     {
         *                         value: "name",
         *                         label: "Name*",
         *                         type: "text",
         *                         props: { placeholder: "First and last" }
         *                     }
         *                 ]
         *             }
         *         ]
         *     ]
         * }.
         */
        fields: {
            type: Object,
            required: true
        },
        /**
         * Method used to get the entity to be edited.
         */
        getEntity: {
            type: Function,
            required: true
        },
        /**
         * Method used to save the changes made.
         */
        updateEntity: {
            type: Function,
            required: true
        },
        /**
         * Used to get a user-facing value that identifies the entity.
         * Defaults to the property "name".
         */
        getName: {
            type: Function,
            default: entity => entity.name
        },
        /**
         * Container title. If set, overrides the breadcrumbs.
         */
        title: {
            type: String,
            default: null
        },
        /**
         * Container breadcrumbs. The entity's value defined by the "getName" prop
         * will be appended to these breadcrumbs.
         */
        breadcrumbs: {
            type: Array,
            default: null
        },
        /**
         * Entity's delete method. If set, a delete button is shown in upper top corner
         * of the container.
         */
        onDelete: {
            type: Function,
            default: null
        },
        /**
         * Values resulted from changing the form's inputs. This prop supports the ".sync"
         * modifier.
         */
        values: {
            type: Object,
            default: () => ({})
        },
        /**
         * Overrides the next route. Example:
         * { name: "person-show", params: { name: "...", email: "..." } }.
         */
        next: {
            type: String | Object,
            default: null
        },
        /**
         * Props that can be used to customize the form.
         */
        formProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            valuesData: {},
            entity: null
        };
    },
    computed: {
        loading() {
            return !this.entity;
        },
        entityName() {
            return this.entity ? this.getName(this.entity) : null;
        },
        _title() {
            if (this.title) return this.title;
            if (this.breadcrumbs) return this.breadcrumbs.concat([{ text: this.entityName }]);
            return null;
        },
        _next() {
            return (
                this.next || {
                    name: `${this.name.toLowerCase()}-show`,
                    params: { id: this.values.id }
                }
            );
        }
    },
    created: async function() {
        await this.loadEntity();
    },
    watch: {
        values(value) {
            this.valuesData = value;
        },
        valuesData(value) {
            this.$emit("update:values", value);
        }
    },
    methods: {
        resetForm() {
            this.valuesData = { ...this.entity };
        },
        async loadEntity() {
            this.entity = await this.getEntity();
            this.resetForm();
        },
        onDiscard() {
            this.resetForm();
        },
        async onSave(values) {
            await this.updateEntity(values);
        },
        onHeaderButtonClick(event, buttonId) {
            this.$emit("header-button:click", event, buttonId);
            this.$emit(`header-button:click:${buttonId}`, event);
        }
    }
};

export default EntityEditor;
</script>
