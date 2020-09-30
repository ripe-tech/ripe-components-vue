<template>
    <padded class="entity-creator">
        <form-ripe
            v-bind:title="_title"
            v-bind:fields="fields"
            v-bind:values.sync="valuesData"
            v-bind="{
                saveNotification: false,
                acceptButtonProps: { text: `Create ${name}` },
                ...formProps
            }"
            v-bind:on-discard="onDiscard"
            v-bind:on-save="onSave"
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
            type: String | Array,
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
            return Array.isArray(this.title)
                ? this.title.concat([{ text: `New ${this.name}` }])
                : this.title;
        }
    },
    watch: {
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
        }
    }
};

export default EntityCreator;
</script>
