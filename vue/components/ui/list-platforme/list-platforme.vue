<template>
    <transition-group tag="div" v-bind:name="transition" class="list">
        <div class="item" v-for="(item, index) in items" v-bind:key="item.id">
            <slot v-bind:item="item" v-bind:index="index" />
        </div>
    </transition-group>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.list > .item {
    border: 1px solid $border-color;
    padding: 28px 15px 28px 15px;
}

.list > .item ::v-deep .row {
    display: flexbox;
}

.list > .item ::v-deep .row > .row-item {
    flex: 1 0;
}
</style>

<script>
export const ListPlatforme = {
    props: {
        items: {
            type: Array,
            required: true
        },
        transition: {
            type: String,
            default: null
        }
    }
};

export default ListPlatforme;
</script>
