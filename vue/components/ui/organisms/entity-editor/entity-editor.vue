<template>
    <padded>
        <form-ripe
            v-bind:title="breadcrumbs"
            v-bind:items="formItems"
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
.entity-edit > .container-loading {
    padding: 150px 0px 150px 0px;
}
</style>

<script>
export const EntityEditor = {
    name: "entity-editor",
    props: {
        isCreate: {
            type: Boolean,
            default: false
        },
        entityName: {
            type: String,
            required: true
        },
        breadcrumbs: {
            type: String | Array,
            default: () => []
        },
        formItems: {
            type: Object,
            required: true
        },
        values: {
            type: Object,
            required: true
        },
        isFormValid: {
            type: Boolean,
            required: true
        },
        formProps: {
            type: Object,
            default: () => ({})
        },
        clearFormValues: {
            type: Object,
            default: () => ({})
        },
        getEntity: {
            type: Function,
            default: () => {}
        },
        createEntity: {
            type: Function,
            default: () => {}
        },
        updateEntity: {
            type: Function,
            default: () => {}
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
        loading() {
            return !this.isCreate && !this.entity && !this.invalidRequest;
        },
        entityCreateName() {
            return `Create ${this.entityName}`;
        },
        name() {
            if (this.isCreate) return this.entityCreateName;
            else return this.entity ? this.getEntityName(this.entity) : null;
        },
        composedBreadcrumbs() {
            return [
                ...this.breadcrumbs,
                this.list ? this._listRoute : null,
                { text: this.name }
            ].filter(v => v);
        },
        acceptButtonProps() {
            return this.isCreate ? { text: this.entityCreateName } : {};
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
            if (!this.isFormValid) throw Error("Invalid Form");

            if (this.isCreate) await this.createEntity(values);
            else await this.updateEntity(values);
        }
    }
};

export default EntityEditor;
</script>
