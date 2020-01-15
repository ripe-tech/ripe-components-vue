<template>
    <div class="table-menu" v-bind:class="[menuMode, menuOrientation]">
        <content-menu
            v-bind:menu-orientation="menuOrientation"
            v-bind:menu-mode="menuMode"
            v-bind:menu-visible.sync="menuVisibleData"
            v-bind:menu-width="menuWidth"
            v-bind:animation-timeout="animationTimeout"
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
                            <slot name="item" v-bind:item="item" v-bind:index="index" />
                        </template>
                    </table-ripe>
                </div>
            </template>
            <template v-slot:menu>
                <div class="menu-content" v-bind:style="menuStyle">
                    <div v-for="(editColumn, index) in editColumns" v-bind:key="index">
                        <form-input
                            v-bind:header="findValueLabelIndex(editColumn)"
                            v-if="isTextInput(items[editIndex][editColumn])"
                        >
                            <input-ripe
                                v-bind:value.sync="items[editIndex][editColumn]"
                                v-bind:variant="inputVariant"
                            />
                        </form-input>
                        <form-input
                            v-bind:header="null"
                            v-if="isBooleanInput(items[editIndex][editColumn])"
                        >
                            <checkbox
                                v-bind:items="buildCheckboxItem(editColumn, editColumn)"
                                v-bind:values="
                                    buildCheckboxValue(editColumn, items[editIndex][editColumn])
                                "
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
            editIndex: 0
        };
    },
    computed: {
        menuStyle() {
            const base = {};
            base["background-color"] = this.menuBackgroundColor ? this.menuBackgroundColor : null;
            return base;
        }
    },
    watch: {
        menuVisible(value) {
            this.menuVisibleData = value;
        }
    },
    methods: {
        toggleMenu() {
            this.menuVisibleData = !this.menuVisibleData;
        },
        setMenuItem(index) {
            this.editIndex = index;
            this.menuVisibleData = true;
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
            const column = this.columns.find(l => l.value === value);
            return column.label || value;
        },
        toggleCheckbox(property, value) {
            this.$set(this.items[this.editIndex], property, value);
        },
        onClickItem(item, index) {
            this.editIndex === index ? this.toggleMenu() : this.setMenuItem(index);
        }
    }
};

export default TableMenu;
</script>
