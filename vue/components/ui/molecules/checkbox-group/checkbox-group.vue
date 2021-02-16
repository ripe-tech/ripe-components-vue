<template>
    <div class="checkbox-group">
        <div class="checkbox-item" v-for="(item, index) in items" v-bind:key="index">
            <slot
                name="before-item"
                v-bind:index="index"
                v-bind:item="item"
                v-bind:checked="checkedData[item.value]"
            />
            <checkbox
                v-bind:label="item.label || item.value"
                v-bind:checked.sync="checkedData[item.value]"
                v-bind:index="index"
                v-bind:disabled="item.disabled || disabled"
                v-bind:variant="item.error || error ? 'error' : null"
                ref="checkboxes"
            />
            <slot
                name="after-item"
                v-bind:index="index"
                v-bind:item="item"
                v-bind:checked="checkedData[item.value]"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.checkbox-item {
    display: block;
    font-size: 0px;
    line-height: 33px;
    outline: none;
    padding: 0px 0px 0px 0px;
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
            default: () => ({})
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
    },
    methods: {
        focus() {
            const firstFocusable = this.$refs.checkboxes.find(c => c.isFocusable());
            if (!firstFocusable) return;
            firstFocusable.focus();
        },
        blur() {
            const firstFocused = this.$refs.checkboxes.find(c => c.isFocused());
            if (!firstFocused) return;
            return firstFocused.blur();
        }
    }
};

export default CheckboxGroup;
</script>
