<template>
    <div class="checkbox-group">
        <div class="group" v-for="(item, index) in items" v-bind:key="index">
            <checkbox
                v-bind:label="item.label"
                v-bind:value="item.value"
                v-bind:checked.sync="checkedData[item.value]"
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
    font-size: 0px;
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
        values: {
            type: Object,
            default: () => {}
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
            checkedData: this.values
        };
    },
    watch: {
        values(value) {
            this.checkedData = value;
        }
    }
};

export default CheckboxGroup;
</script>
