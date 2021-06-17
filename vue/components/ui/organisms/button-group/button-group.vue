<template>
    <div class="button-group">
        <button-toggle
            v-bind:disabled="item.disabled === undefined ? disabled : item.disabled"
            v-bind:text="item.label || item.value"
            v-bind:value="valueData === item.value"
            v-bind:button-icon-props="item.buttonProps"
            v-bind:orientation="calculateOrientation(index)"
            v-bind="{
                ...item.buttonProps,
                disabled: item.disabled || disabled
            }"
            v-for="(item, index) in items"
            v-bind:key="item.value"
            v-on:click="event => onClick(event, item)"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";
</style>

<script>
export const ButtonGroup = {
    name: "button-group",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            valueData: this.value
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueData(value) {
            this.$emit("update:value", value);
        }
    },
    methods: {
        calculateOrientation(index) {
            if (index === 0) return "left";
            if (index === this.items.length - 1) return "right";
            return "middle";
        },
        onClick(event, item) {
            this.valueData = item.value;
        }
    }
};

export default ButtonGroup;
</script>
