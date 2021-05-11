<template>
    <div class="button-icon-dropdown">
        <button-icon
            v-bind="buttonIconProps"
            v-bind:icon="'options'"
            v-bind:size="32"
            v-bind:active="dropdownVisible"
            ref="button-icon"
            v-on:click.stop="onButtonIconClick"
        />
        <dropdown
            v-bind="dropdownProps"
            v-bind:items="items"
            v-bind:visible.sync="dropdownVisible"
            v-bind:owners="$refs['button-icon']"
            v-on:item-clicked="onDropdownItemClick"
        >
            <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
            <template
                v-for="slot in Object.keys($scopedSlots)"
                v-bind:slot="slot"
                slot-scope="scope"
            >
                <slot v-bind:name="slot" v-bind="scope" />
            </template>
        </dropdown>
    </div>
</template>

<style lang="scss" scoped>
.button-icon-dropdown > .dropdown-container {
    margin-top: 5px;
}
</style>

<script>
export const ButtonIconDropdown = {
    name: "button-icon-dropdown",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        buttonIconProps: {
            type: Object,
            default: () => ({})
        },
        dropdownProps: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            dropdownVisible: false
        };
    },
    methods: {
        onButtonIconClick() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        onDropdownItemClick(item, index) {
            this.$emit(`click:item:${item.event}`, item, index);
        }
    }
};

export default ButtonIconDropdown;
</script>
