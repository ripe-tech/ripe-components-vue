<template>
    <padded class="entity-editor">
        <form-ripe
            v-bind:values.sync="valuesData"
            v-bind="{
                title: _title,
                fields: fields,
                onDelete: onDelete,
                onDiscard: onDiscard,
                onSave: onSave,
                next: _next,
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
        </form-ripe>
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
        name: {
            type: String,
            required: true
        },
        fields: {
            type: Object,
            required: true
        },
        getEntity: {
            type: Function,
            required: true
        },
        updateEntity: {
            type: Function,
            required: true
        },
        getName: {
            type: Function,
            default: entity => entity.name
        },
        title: {
            type: String,
            default: null
        },
        breadcrumbs: {
            type: Array,
            default: null
        },
        onDelete: {
            type: Function,
            default: null
        },
        values: {
            type: Object,
            default: () => ({})
        },
        next: {
            type: String | Object,
            default: null
        },
        formProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            valuesData: this.values,
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
