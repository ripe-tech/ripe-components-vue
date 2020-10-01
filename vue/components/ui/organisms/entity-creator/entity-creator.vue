<template>
    <padded class="entity-creator">
        <form-ripe
            v-bind:values.sync="valuesData"
            v-bind="{
                title: _title,
                fields: fields,
                saveNotification: false,
                acceptButtonProps: { text: `Create ${name}` },
                onDiscard: onDiscard,
                onSave: onSave,
                ...formProps
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
        name: {
            type: String,
            required: true
        },
        fields: {
            type: Object,
            required: true
        },
        createEntity: {
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
        values: {
            type: Object,
            default: () => ({})
        },
        clearFormValues: {
            type: Object,
            default: () => ({})
        },
        formProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            valuesData: this.values
        };
    },
    computed: {
        _title() {
            if (this.title) return this.title;
            if (this.breadcrumbs) return this.breadcrumbs.concat([{ text: this.name }]);
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
            this.valuesData = this.clearFormValues;
        },
        onDiscard() {
            this.clearForm();
        },
        async onSave(values) {
            await this.createEntity(values);
        },
        onHeaderButtonClick(event, buttonId) {
            this.$emit("header-button:click", event, buttonId);
        }
    }
};

export default EntityCreator;
</script>
