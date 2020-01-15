<template>
    <div class="table-menu">
        <content-menu
            v-bind:menu-orientation="menuOrientation"
            v-bind:menu-mode="menuMode"
            v-bind:menu-visible="menuVisibleData"
            v-bind:menu-width="menuWidth"
            v-bind:animation-timeout="animationTimeout"
        >
            <template v-slot:content>
                <div>
                    <table-ripe
                        v-bind:columns="columns"
                        v-bind:items="items"
                        v-bind:sort.sync="sortData"
                        v-bind:reverse.sync="reverseData"
                        v-if="debugThis(items, columns)"
                        v-on:click:item="toggleMenu(item, index)"
                    >
                        <template v-slot="{ item, index }">
                            <slot name="item" v-bind:item="item" v-bind:index="index" />
                        </template>
                    </table-ripe>
                </div>
            </template>
            <template v-slot:menu>
                <div>
                    <div
                        v-for="(editColumn, index) in editColumns"
                        v-bind:key="index"
                    >
                        <form-input
                            v-bind:header="editColumn"
                            v-if="isTextInput(items[editIndex][editColumn])"
                        >
                            <input-ripe
                                v-bind:value.sync="items[editIndex][editColumn]"
                            />
                        </form-input>
                        <form-input
                            v-bind:header="null"
                            v-if="isBooleanInput(items[editIndex][editColumn])"
                        >
                            <checkbox
                                v-bind:items="buildCheckboxItem(editColumn, editColumn)"
                                v-bind:values="buildCheckboxValue(editColumn, items[editIndex][editColumn])"
                                v-on:selected:value="toggleCheckbox($event, true)"
                                v-on:deselected:value="toggleCheckbox($event, false)"
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

.table-menu .content-menu ::v-deep .menu {
    padding: 20px 0px 0px 0px;
    box-sizing: border-box;
}

.table-menu .content-menu ::v-deep .menu .form-input {
    font-size: 0;
}

.table-menu .content-menu ::v-deep .menu .form-input > .label,
.table-menu .content-menu ::v-deep .menu .form-input > .content {
    display: inline-block;
}

.table-menu .content-menu ::v-deep .menu .form-input > .label {
    color: #57626e;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-overflow: ellipsis;
    text-transform: capitalize;
    width: 35%;
}

.table-menu .content-menu ::v-deep .menu .form-input > .content {
    width: 65%;
}

.table-menu .content-menu ::v-deep .content .table .table-head .table-column {
    text-overflow: ellipsis;
    overflow: hidden;
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
        sort: {
            type: String,
            default: null
        },
        reverse: {
            type: Boolean,
            default: false
        },
        menuOrientation: {
            type: String,
            default: "right"
        },
        menuMode: {
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
        animationTimeout: {
            type: Number,
            default: 0.3
        },
        editColumns: {
            type: Array,
            default: []
        }
    },
    data: function() {
        return {
            reverseData: this.reverse,
            menuVisibleData: this.menuVisible,
            sortData: this.sort,
            menuItem: {},
            editIndex: 0
        };
    },
    watch: {
        sort(value) {
            this.sortData = value;
        },
        reverse(value) {
            this.reverseData = value;
        },
        menuVisible(value) {
            this.menuVisibleData = value;
        }
    },
    methods: {
        toggleMenu(item, index) {
            this.menuVisibleData = !this.menuVisibleData;
        },
        setMenuItem(item, index) {
            const menuItem = {};
            this.editColumns.forEach(e => {
                console.log(`key=${e}  value=${item[e]}`);
                menuItem[e] = item[e];
            });
            this.menuItem = Object.assign({}, menuItem);
        },
        debugThis(items, columns) {
            console.log("items", items);
            console.log("columns", columns);
            return true;
        },
        isTextInput(item) {
            return typeof item === "string" || typeof item === "number";
        },
        isBooleanInput(item) {
            return typeof item === "boolean";
        },
        buildCheckboxItem(label, value) {
            return [{ label: this.findValueLabelIndex(value), value: value }];
        },
        buildCheckboxValue(label, value) {
            const checkboxValue = { [label]: value };
            return checkboxValue;
        },
        findValueLabelIndex(value) {
            const column = this.columns.find((l) => (l.value === value));
            return column.label || value;
        },
        toggleCheckbox(property, value) {
            this.$set(this.items[this.editIndex], property, value);
        }
    }
};

export default TableMenu;
</script>
