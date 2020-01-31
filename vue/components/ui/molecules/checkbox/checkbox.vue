<template>
    <div class="checkbox">
        <checkbox-tick
            v-bind:label="item.label"
            v-bind:value="item.value"
            v-bind:checked.sync="checkedData[item.value]"
            v-bind:index="index"
            v-bind:disabled="item.disabled || disabled"
            v-bind:error="item.error || error"
            v-for="(item, index) in items"
            v-bind:key="index"
        >
            <template v-slot:before-item="{ label, value, checked }">
                <slot
                    name="before-item"
                    v-bind:label="label"
                    v-bind:value="value"
                    v-bind:checked="checked"
                />
            </template>
            <template v-slot:after-item="{ label, value, checked }">
                <slot
                    name="after-item"
                    v-bind:label="label"
                    v-bind:value="value"
                    v-bind:checked="checked"
                />
            </template>
        </checkbox-tick>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.checkbox > .checkbox-tick {
    padding: 10px 0px 10px 0px;
}
</style>
<script>
export const Checkbox = {
    name: "checkbox",
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

export default Checkbox;
</script>
