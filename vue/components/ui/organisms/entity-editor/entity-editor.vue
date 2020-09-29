<template>
    <padded class="entity-editor">
        <form-ripe
            v-bind:title="_title"
            v-bind:items="items"
            v-bind:values.sync="valuesData"
            v-bind="{ saveNotification: true, ...formProps }"
            v-bind:on-discard="onDiscard"
            v-bind:on-save="onSave"
            v-if="!loading"
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
        getName: {
            type: Function,
            required: true
        },
        items: {
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
        title: {
            type: String | Array,
            default: null
        },
        values: {
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
            valuesData: this.values,
            entity: null
        };
    },
    computed: {
        loading() {
            return !this.entity;
        },
        name() {
            return this.entity ? this.getName(this.entity) : null;
        },
        _title() {
            return Array.isArray(this.title)
                ? this.title.concat([{ text: this.name }])
                : this.title;
        }
    },
    created: async function() {
        await this.loadEntity();
    },
    watch: {
        valuesData(value) {
            this.$emit("update:values", value);
        }
    },
    methods: {
        resetForm() {
            this.valuesData = { ...this.entity };
        },
        async loadEntity() {
            this.entity = await this.getEntitie();
            this.resetForm();
        },
        onDiscard() {
            this.resetForm();
        },
        async onSave(values) {
            this.updateEntity(values);
        }
    }
};

export default EntityEditor;
</script>
