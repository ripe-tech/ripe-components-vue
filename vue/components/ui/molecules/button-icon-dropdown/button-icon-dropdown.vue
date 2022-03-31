<template>
    <div class="button-icon-dropdown">
        <button-icon
            v-bind="buttonIconProps"
            v-bind:icon-opacity="disabled ? 0.5 : 1"
            v-bind:selectable="!disabled"
            v-bind:icon="'options'"
            v-bind:size="32"
            v-bind:active="dropdownVisible"
            ref="button-icon"
            v-on:click.stop="onButtonIconClick"
        />
        <dropdown
            v-bind="dropdownProps"
            v-bind:disabled="disabled"
            v-bind:vertical-padding="4"
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
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            dropdownVisible: false
        };
    },
    methods: {
        onButtonIconClick() {
            if (this.disabled) return;
            this.dropdownVisible = !this.dropdownVisible;
        },
        onDropdownItemClick(item, index) {
            if (this.disabled) return;
            this.$emit(`click:item:${item.event}`, item, index);
        }
    }
};

export default ButtonIconDropdown;
</script>
