<template>
    <div class="checkbox-group">
        <div class="group" v-for="(item, index) in itemsData" v-bind:key="index">
            <checkbox
                v-bind:label="item.label"
                v-bind:value.sync="item.value"
                v-bind:index="index"
                v-bind:disabled="item.disabled || disabled"
                v-bind:error="item.error || error"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.group {
    display: block;
    line-height: 13px;
    outline: none;
    padding: 10px 0px 10px 0px;
    user-select: none;
    width: fit-content;
}
</style>
<script>
export const CheckboxGroup = {
    name: "checkbox-group",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        error: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            itemsData: this.items
        };
    },
    watch: {
        items(value) {
            this.itemsData = value;
        }
    }
};

export default CheckboxGroup;
</script>
