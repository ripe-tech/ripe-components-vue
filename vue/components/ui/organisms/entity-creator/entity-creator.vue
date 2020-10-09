<template>
    <padded class="entity-creator">
        <form-ripe
            v-bind:values.sync="valuesData"
            v-bind="{
                title: _title,
                fields: fields,
                saveNotification: false,
                onDiscard: onDiscard,
                onSave: onSave,
                next: _next,
                ...formProps,
                acceptButtonProps: { text: `Create ${name}`, ...formProps.acceptButtonProps }
            }"
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
        </form-ripe>
    </padded>
</template>

<style lang="scss" scoped></style>

<script>
export const EntityCreator = {
    name: "entity-creator",
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
         *                     },
         *                     {
         *                         value: "email",
         *                         label: "E-mail*",
         *                         type: "text",
         *                         props: { placeholder: "User email" }
         *                     },
         *                     {
         *                         value: "address",
         *                         label: "Address",
         *                         type: "text",
         *                         meta: "longtext",
         *                         props: { placeholder: "Username" }
         *                     }
         *                 ]
         *             }
         *         ],
         *         [
         *             {
         *                 fields: [
         *                     {
         *                         value: "company",
         *                         label: "Organization",
         *                         type: "text",
         *                         props: { placeholder: "Organization" }
         *                     },
         *                     {
         *                         value: "position",
         *                         label: "Position",
         *                         type: "text",
         *                         props: { placeholder: "Position" }
         *                     },
         *                     {
         *                         value: "phone",
         *                         label: "Phone",
         *                         type: "text",
         *                         props: { placeholder: "+- - - -" }
         *                     }
         *                 ]
         *             }
         *         ]
         *     ]
         * }
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
         * as the clear values for when the discard button is pressed. Example:
         * { project: "required project example" }.
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
            valuesData: this.values,
            clearFormValues: { ...this.values }
        };
    },
    computed: {
        _title() {
            if (this.title) return this.title;
            if (this.breadcrumbs) return this.breadcrumbs.concat([{ text: `New ${this.name}` }]);
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
        onDiscard() {
            this.clearForm();
        },
        async onSave(values) {
            await this.createEntity(values);
        },
        onHeaderButtonClick(event, buttonId) {
            this.$emit("header-button:click", event, buttonId);
            this.$emit(`header-button:click:${buttonId}`, event);
        }
    }
};

export default EntityCreator;
</script>
