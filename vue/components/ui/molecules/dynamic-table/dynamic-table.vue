<template>
    <div class="dynamic-table" v-on:mouseleave.stop="mouseLeave">
        <table-ripe
            v-bind:columns="columns"
            v-bind:items="items"
            v-bind:sort-method="sortMethod"
            v-bind:transition="transition"
            v-bind:sort="sort"
            v-bind:header-height="headerHeight"
            v-bind:reverse="reverse"
            v-on:mouse:over="mouseOver"
        />
        <div class="column-container" v-bind:style="columnStyle">
            <div
                class="button-container"
                v-bind:class="{ hovered: hoveredItem === index }"
                v-for="(item, index) in items"
                v-bind:key="index"
            >
                <button-dropdown
                    class="button-dropdown"
                    v-bind:text="'Edit'"
                    v-bind:icon="'edit'"
                    v-bind:items="dropdownOptions"
                    v-bind:ref="'buttonDropdown'"
                    v-on:click:item-dropdown="dropdownItemClicked"
                    v-on:click:primary-button="editClicked"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.dynamic-table {
    display: flex;
    flex-direction: row;
    position: relative;
}

body.mobile .dynamic-table {
    display: none;
}

.dynamic-table .column-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 0px;
}

.dynamic-table .column-container .button-container {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

.dynamic-table .column-container .button-container.hovered {
    overflow: visible;
}

.dynamic-table .button-dropdown {
    min-width: 120px;
}
</style>

<script>
export const DynamicTable = {
    name: "DynamicTable",
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        },
        sortMethod: {
            type: Function
        },
        transition: {
            type: String
        },
        sort: {
            type: String
        },
        reverse: {
            type: Boolean
        },
        headerHeight: {
            type: Number,
            default: 36
        },
        buttonOffset: {
            type: Number,
            default: 140
        }
    },
    data: function() {
        return {
            hoveredItem: null
        };
    },
    computed: {
        dropdownOptions() {
            return [
                { value: "duplicate", label: "Duplicate" },
                { value: "delete", label: "Delete" }
            ];
        },
        columnStyle() {
            return {
                margin: `${this.headerHeight}px 0px 0px 0px`,
                height: `calc(100% - ${this.headerHeight}px`,
                right: `${this.buttonOffset}px`
            };
        }
    },
    methods: {
        mouseLeave() {
            this.closeDropdown();
            this.hoveredItem = null;
        },
        mouseOver(item, index) {
            this.closeDropdown();
            this.hoveredItem = index;
        },
        editClicked() {
            this.$emit("click:edit", this.hoveredItem);
        },
        dropdownItemClicked(item) {
            this.$emit("click:item-options", { value: item.value, index: this.hoveredItem });
        },
        closeDropdown() {
            if (this.hoveredItem === null || this.hoveredItem === undefined) return;
            if (!this.$refs.buttonDropdown[this.hoveredItem].dropdownVisible) return;
            this.$refs.buttonDropdown[this.hoveredItem].toggleDropdown();
        }
    }
};

export default DynamicTable;
</script>
