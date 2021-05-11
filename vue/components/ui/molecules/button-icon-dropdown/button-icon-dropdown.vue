<template>
    <div class="button-icon-dropdown">
        <button-icon
            v-bind:icon="'options'"
            v-bind:size="32"
            v-bind:active="dropdownVisible"
            v-on:click.stop="onButtonIconClick"
        />
        <dropdown
            class="options-dropdown"
            v-bind:items="items"
            v-bind:visible.sync="dropdownVisible"
            v-bind:owners="$refs['button-options-loading']"
            v-on:item-clicked="onOptionsItemClick"
        >
            <slot
                v-bind:name="slot"
                v-for="slot in optionsSlots"
                v-bind:slot="slot.replace('options-', '')"
            />
            <template
                v-for="slot in optionsScopedSlots"
                v-bind:slot="slot.replace('options-', '')"
                slot-scope="scope"
            >
                <slot v-bind:name="slot" v-bind="scope" />
            </template>
        </dropdown>
    </div>
</template>

<style lang="scss" scoped></style>

<script>
export const ButtonIconDropdown = {
    name: "button-icon-dropdown",
    props: {
        items: {
            type: Array,
            default: () => []
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
        }
    }
};

export default ButtonIconDropdown;
</script>
