<template>
    <div class="progress-list-item">
        <div class="information-container">
            <div class="information">
                <div class="title">{{ title }}</div>
                <div class="description">{{ description }}</div>
            </div>
            <div class="state">{{ actionText }}<br/>{{ actionIcon }}<br/>{{ finished }}</div>            
        </div>
        <div class="progress">{{ progress }} %</div>
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
