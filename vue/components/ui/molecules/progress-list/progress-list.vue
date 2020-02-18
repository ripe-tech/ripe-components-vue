<template>
    <div class="progress-list">
        <template v-for="(item, index) in items">
            <div v-bind:key="index">
                {{ index }}-{{ item }}
            </div>
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
