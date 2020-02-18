<template>
    <div class="breadcrumbs">
        <template v-for="(breadcrumb, index) in breadcrumbs">
            <template v-if="index != Object.keys(breadcrumbs).length - 1">
                <link-ripe v-bind:key="index" v-bind:text="breadcrumb.text" v-bind:href="breadcrumb.route" v-bind:color="'grey'"/>
                <div v-bind:key="`${index}-division`" class="breadcrumb-division" />
            </template>
            <div v-else v-bind:key="index" class="breadcrumb-last">{{breadcrumb.text}}</div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const Breadcrumbs = {
    name: "breadcrumbs",
    props: {
        breadcrumbs: {
            type: Array,
            default: () => []
        }
    }
};

export default Breadcrumbs;
</script>
