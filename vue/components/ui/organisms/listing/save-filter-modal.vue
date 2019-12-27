<template>
    <modal
        class="save-filter-modal"
        v-bind:buttons-alignment="'right'"
        v-bind:title="'New filter'"
        v-bind:cancel-text="'Discard changes'"
        v-bind:confirm-text="'Save filter'"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <div>TODO Content Here</div>
    </modal>
</template>

<style lang="scss" scoped>

</style>

<script>
import Vue from "vue";

export const SaveFilterModal = Vue.component("save-filter-modal", {
    inheritAttrs: false,
    props: {
    },
    data: function() {
        return {};
    },
    computed: {
    },
    mounted: async function() {
    },
    methods: {
    }
});

export default SaveFilterModal;
</script>
