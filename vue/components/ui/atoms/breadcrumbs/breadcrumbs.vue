<template>
    <div class="breadcrumbs">
        <h1>Hi! I'm breadcrumbs</h1>
        {{ breadcrumbs }}
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
