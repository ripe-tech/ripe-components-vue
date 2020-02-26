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
                v-bind:ref="`checkbox-${index}`"
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
    computed: {
        firstEnabledIndex() {
            if (this.disabled) return null;

            const firstEnabled = this.items
                .map((item, index) => [item, index])
                .find(([item, index]) => !item.disabled);

            return firstEnabled ? firstEnabled[1] : null;
        },
        firstEnabledItem() {
            return this.$refs[`checkbox-${this.firstEnabledIndex}`];
        }
    },
    watch: {
        values(value) {
            this.checkedData = value;
        }
    },
    methods: {
        focus() {
            return this.firstEnabledItem.focus();
        },
        blur() {
            return this.firstEnabledItem.blur();
        }
    }
};

export default CheckboxGroup;
</script>
