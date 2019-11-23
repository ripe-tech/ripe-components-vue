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
    border-bottom: 1px solid $border-color;
    padding: 28px 15px 28px 15px;
}

.list > .item:first-child {
    border-top: 1px solid $border-color;
}

.list > .item ::v-deep .row {
    font-size: 0px;
    margin-top: 30px;
}

.list > .item ::v-deep .row:first-child {
    margin-top: 0px;
}

.list > .item ::v-deep .row > .half {
    display: inline-block;
    width: 50%;
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
