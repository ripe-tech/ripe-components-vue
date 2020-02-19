<template>
    <div class="progress-list">
        <template v-for="(item, index) in items">
            <progress-list-item
                v-bind:key="index"
                v-bind:title="item.title"
                v-bind:description="item.description"
                v-bind:finished="item.finished"
                v-bind:progress="item.progress"
                v-bind:actionText="item.actionText"
                v-bind:actionIcon="item.actionIcon"
            />
        </template>
        {{ footerText }}
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const ProgressList = {
    name: "progress-list",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        footerText: {
            type: String,
            default: null
        }
    }
};
export default ProgressList;
</script>