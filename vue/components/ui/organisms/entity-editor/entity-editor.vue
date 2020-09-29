<template>
    <padded class="entity-editor">
        <form-ripe
            v-bind:title="composedTitle"
            v-bind:items="items"
            v-bind:values.sync="valuesData"
            v-bind="{
                saveNotification: !isCreate,
                acceptButtonProps: acceptButtonProps,
                ...formProps
            }"
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
        entityName: {
            type: String,
            required: true
        },
        items: {
            type: Object,
            required: true
        },
        values: {
            type: Object,
            required: true
        },
        getEntity: {
            type: Function,
            default: null
        },
        createEntity: {
            type: Function,
            default: null
        },
        updateEntity: {
            type: Function,
            default: null
        },
        clearFormValues: {
            type: Object,
            default: () => ({})
        },
        getEntityName: {
            type: Function,
            default: null
        },
        title: {
            type: String | Array,
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
            entity: null,
            invalidRequest: false
        };
    },
    computed: {
        isCreate() {
            return Boolean(this.createEntity);
        },
        loading() {
            return !this.isCreate && !this.entity && !this.invalidRequest;
        },
        name() {
            if (this.isCreate) return `New ${this.entityName}`;
            else return this.entity ? this.getEntityName(this.entity) : null;
        },
        composedTitle() {
            return Array.isArray(this.title)
                ? this.title.concat([{ text: this.name }])
                : this.title;
        },
        acceptButtonProps() {
            return this.isCreate ? { text: `Create ${this.entityName}` } : {};
        }
    },
    created: async function() {
        if (!this.isCreate) await this.loadEntity();
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
        clearForm() {
            this.valuesData = this.clearFormValues;
        },
        async loadEntity() {
            try {
                this.invalidRequest = false;
                this.entity = await this.getEntity();
                this.resetForm();
            } catch (error) {
                this.invalidRequest = true;
            }
        },
        onDiscard() {
            if (this.isCreate) this.clearForm();
            else this.resetForm();
        },
        async onSave(values) {
            if (this.isCreate) await this.createEntity(values);
            else await this.updateEntity(values);
        }
    }
};

export default EntityEditor;
</script>
