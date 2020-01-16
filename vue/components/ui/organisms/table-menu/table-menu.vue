<template>
    <div class="table-menu" v-bind:class="[mode, alignment]">
        <content-menu
            v-bind:alignment="alignment"
            v-bind:mode="mode"
            v-bind:menu-visible.sync="menuVisibleData"
            v-bind:menu-width="menuWidth"
            v-bind:animation-duration="animationDuration"
        >
            <template v-slot:content>
                <div>
                    <table-ripe
                        v-bind:columns="columns"
                        v-bind:items="items"
                        v-bind:sort.sync="sortData"
                        v-bind:sort-method="sortMethod"
                        v-bind:reverse.sync="reverseData"
                        v-on:click="onClickItem"
                    >
                        <template v-slot="{ item, index }">
                            <slot name="item" v-bind:item="item" v-bind:index="index">
                                <td
                                    v-bind:class="column.value"
                                    v-for="column in columns"
                                    v-bind:key="column.value"
                                >
                                    <span v-if="column.type !== 'boolean'">
                                        {{ item[column.value] }}
                                    </span>
                                    <checkmark v-bind:value="item[column.value]" v-else />
                                </td>
                            </slot>
                        </template>
                    </table-ripe>
                </div>
            </template>
            <template v-slot:menu>
                <div class="menu-content" v-bind:style="menuStyle">
                    <div v-for="(editColumn, index) in editColumns" v-bind:key="index">
                        <form-input
                            v-bind:header="getColumnLabel(editColumn)"
                            v-if="isMoney(editColumn)"
                        >
                            <input-symbol
                                v-bind:symbol="getColumnSymbol(editColumn)"
                                v-bind:value.sync="selectedItem[editColumn]"
                                v-bind:variant="inputVariant"
                            />
                        </form-input>
                        <form-input v-bind:header="null" v-else-if="isBoolean(editColumn)">
                            <checkbox
                                v-bind:items="buildCheckboxItem(editColumn, editColumn)"
                                v-bind:values="
                                    buildCheckboxValue(editColumn, selectedItem[editColumn])
                                "
                                v-on:selected:value="toggleCheckbox($event, true)"
                                v-on:deselected:value="toggleCheckbox($event, false)"
                            />
                        </form-input>
                        <form-input v-bind:header="getColumnLabel(editColumn)" v-else>
                            <input-ripe
                                v-bind:value.sync="selectedItem[editColumn]"
                                v-bind:variant="inputVariant"
                            />
                        </form-input>
                    </div>
                </div>
            </template>
        </content-menu>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.table-menu.left .content-menu ::v-deep .menu {
    border-right: 1px solid $border-color;
}

.table-menu.right .content-menu ::v-deep .menu {
    border-left: 1px solid $border-color;
}

.table-menu.floating .content-menu ::v-deep .menu {
    border: 1px solid $border-color;
}

.table-menu .content-menu ::v-deep .menu > .menu-content {
    padding: 10px 20px 0px 20px;
}

.table-menu .content-menu ::v-deep .menu .form-input {
    display: flex;
    margin: 0px 0px 5px 0px;
}

.table-menu .content-menu ::v-deep .menu .form-input > .label {
    color: #57626e;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 32px;
    margin: 0px 0px 0px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
    width: 35%;
}

.table-menu .content-menu ::v-deep .menu .form-input > .content {
    width: 100%;
}

.table-menu .content-menu ::v-deep .content .table .table-head .table-column {
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<script>
import { filterMixin, partMixin, utilsMixin, scrollMixin } from "../../../../mixins";

export const TableMenu = {
    name: "table-menu",
    mixins: [partMixin, filterMixin, utilsMixin, scrollMixin],
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        items: {
            type: Array,
            default: () => []
        },
        sort: {
            type: String,
            default: null
        },
        sortMethod: {
            type: Function,
            default: (items, column, reverse) => {
                return items.sort((first, second) => {
                    const order = reverse ? -1 : 1;
                    const sort = first[column] > second[column];
                    return order * (sort ? 1 : -1);
                });
            }
        },
        reverse: {
            type: Boolean,
            default: false
        },
        alignment: {
            type: String,
            default: "right"
        },
        mode: {
            type: String,
            default: "collapse"
        },
        menuVisible: {
            type: Boolean,
            default: true
        },
        menuWidth: {
            type: Number,
            default: 300
        },
        animationDuration: {
            type: Number,
            default: 0.3
        },
        editColumns: {
            type: Array,
            default: []
        },
        inputVariant: {
            type: String,
            default: "dark"
        },
        menuBackgroundColor: {
            type: String,
            default: "#ffffff"
        }
    },
    data: function() {
        return {
            menuVisibleData: this.menuVisible,
            selectedIndex: -1,
            reverseData: this.reverse,
            sortData: this.sort
        };
    },
    computed: {
        menuStyle() {
            const base = {};
            base["background-color"] = this.menuBackgroundColor ? this.menuBackgroundColor : null;
            return base;
        },
        selectedItem() {
            return this.items[this.selectedIndex] || {};
        }
    },
    watch: {
        menuVisible(value) {
            this.menuVisibleData = value;
        },
        sort(value) {
            this.sortData = value;
        },
        reverse(value) {
            this.reverseData = value;
        }
    },
    methods: {
        toggleMenu() {
            this.menuVisibleData = !this.menuVisibleData;
        },
        setMenuItem(index) {
            this.selectedIndex = index;
            this.menuVisibleData = true;
        },
        isBoolean(value) {
            return this.getColumnType(value) === "boolean";
        },
        isMoney(value) {
            return this.getColumnType(value) === "money";
        },
        buildCheckboxItem(label, value) {
            return [{ label: this.getColumnLabel(value), value: value }];
        },
        buildCheckboxValue(label, value) {
            return { [label]: value };
        },
        getColumnLabel(value) {
            const column = this.columns.find(l => l.value === value);
            return column.label || value;
        },
        getColumnType(value) {
            const column = this.columns.find(l => l.value === value);
            return column.type || "string";
        },
        getColumnSymbol(value) {
            const column = this.columns.find(l => l.value === value);
            return column.symbol || "?";
        },
        toggleCheckbox(property, value) {
            if (this.selectedIndex === -1) return;
            this.$set(this.items[this.selectedIndex], property, value);
        },
        onClickItem(item, index) {
            this.selectedIndex === index ? this.toggleMenu() : this.setMenuItem(index);
        }
    }
};

export default TableMenu;
</script>
