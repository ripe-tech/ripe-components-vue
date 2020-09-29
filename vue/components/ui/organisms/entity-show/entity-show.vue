<template>
    <details-ripe
        v-bind:title="title"
        v-bind:name="name"
        v-bind:values="values"
        v-bind:item="entity"
        v-bind:get-items="getEntities"
    >
        <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
        <template v-for="slot in Object.keys($scopedSlots)" v-bind:slot="slot" slot-scope="scope">
            <slot v-bind:name="slot" v-bind="scope" />
        </template>
    </details-ripe>
</template>

<style lang="scss" scoped></style>

<script>
export const EntityShow = {
    name: "entity-show",
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        values: {
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
        }
    },
    data: function() {
        return {
            entity: {}
        };
    }
};

export default EntityShow;
</script>
