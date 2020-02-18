<template>
    <div class="progress-list-item">
        {{ title }}<br />
        {{ description }}<br />
        {{ finished }}<br />
        {{ progress }}<br />
        {{ actionText }}<br />
        {{ actionIcon }}<br />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const ProgressListItem = {
    name: "progress-list-item",
    props: {
        title: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        finished: {
            type: Boolean,
            default: false
        },
        progress: {
            type: Number,
            default: null
        },
        actionText: {
            type: String,
            default: null
        },
        actionIcon: {
            type: String,
            default: null
        }
    }
};
export default ProgressListItem;
</script>
