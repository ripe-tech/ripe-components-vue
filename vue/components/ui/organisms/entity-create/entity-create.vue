<template>
    <padded class="entity-create">
        <container-form
            v-bind:values.sync="valuesData"
            v-bind:title="_title"
            v-bind:fields="fields"
            v-bind:form-props="{
                saveNotification: false,
                onDiscard: onDiscard,
                onSave: onSave,
                ...formProps,
                acceptButtonProps: { text: `Create ${name}`, ...formProps.acceptButtonProps }
            }"
            v-bind="containerFormProps"
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
    </padded>
</template>

<style lang="scss" scoped></style>

<script>
export const EntityCreate = {
    name: "entity-create",
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
         * Used to structure and populate the create form.
         */
        fields: {
            type: Object,
            required: true
        },
        /**
         * Method used to create the entity.
         */
        createEntity: {
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
         * Container breadcrumbs. The entity's name will be appended to these breadcrumbs.
         */
        breadcrumbs: {
            type: Array,
            default: null
        },
        /**
         * Values resulted from the form's inputs. The initial values of this prop are used
         * as the clear values for when the discard button is pressed.
         */
        values: {
            type: Object,
            default: () => ({})
        },
        /**
         * Overrides the next route.
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
        },
        /**
         * Props that can be used to customize the container-form.
         */
        containerFormProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            valuesData: this.values,
            clearFormValues: { ...this.values }
        };
    },
    computed: {
        _title() {
            if (this.title) return this.title;
            if (this.breadcrumbs) return this.breadcrumbs.concat([{ text: `New ${this.name}` }]);
            return null;
        }
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
        clearForm() {
            this.valuesData = { ...this.clearFormValues };
        },
        goNext() {
            if (!this.$router) return;
            const next = this.next || {
                name: `${this.name.toLowerCase()}-show`,
                params: { id: this.values.id }
            };
            this.$router.push(next);
        },
        async onDiscard() {
            this.clearForm();
        },
        async onSave(values) {
            await this.createEntity(values);
            this.goNext();
        },
        onHeaderButtonClick(event, buttonId) {
            this.$emit("header-button:click", event, buttonId);
            this.$emit(`header-button:click:${buttonId}`, event);
        }
    }
};

export default EntityCreate;
</script>
