<template>
    <div class="progress-list">
        <div class="progres-list-items">
            <progress-list-item
                v-for="(item, index) in items"
                v-bind:key="index"
                v-bind:title="item.title"
                v-bind:description="item.description"
                v-bind:finished="item.finished"
                v-bind:progress="item.progress"
                v-bind:actionText="item.actionText"
                v-bind:actionIcon="item.actionIcon"
            />
        </div>
        <slot>
            <div class="footer">{{ footerText }}</div>
        </slot>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.progress-list {
    background-color: $soft-blue;
    padding: 18px 24px 18px 24px;
}

.progress-list > .progres-list-items {
    margin: 22px 0px 30px 0px;
}

.progress-list > .progres-list-items > .progress-list-item {
    margin: 0px 0px 18px 0px;
}

.progress-list > .footer {
  font-size: 14px;
  letter-spacing: 0.3px;
  color: #57626e;
}


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