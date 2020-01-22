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
                <slot name="table-header" />
                <div class="table-content" v-bind:style="contentStyle" id="table-content">
                    <table-ripe
                        v-bind:columns="columns"
                        v-bind:items="itemsWithIndex"
                        v-bind:sort.sync="sortData"
                        v-bind:sort-method="sortMethod"
                        v-bind:reverse.sync="reverseData"
                    >
                        <template v-slot:row="{ item }">
                            <tr
                                v-bind:class="[{ selected: item.id === selectedItem.id }]"
                                v-bind:key="item.id"
                                v-on:click="onClickItem(item)"
                            >
                                <td
                                    v-bind:class="column.value"
                                    v-for="column in columns"
                                    v-bind:key="column.value"
                                >
                                    <checkmark
                                        v-bind:value="item[column.value]"
                                        v-if="column.type === 'boolean'"
                                    />
                                    <span v-else>{{ item[column.value] }}</span>
                                </td>
                            </tr>
                        </template>
                    </table-ripe>
                </div>
                <slot name="table-footer" />
            </template>
            <template v-slot:menu>
                <div class="menu-container" v-bind:style="menuStyle">
                    <slot name="menu-header">
                        <h2 class="menu-title" v-if="menuTitle">{{ menuTitle }}</h2>
                    </slot>
                    <slot name="menu-content">
                        <div v-for="(editColumn, index) in editColumns" v-bind:key="index">
                            <form-input
                                v-bind:header="getColumnLabel(editColumn)"
                                v-if="isMoney(editColumn)"
                            >
                                <input-currency
                                    v-bind:currency="getColumnSymbol(editColumn, selectedItem)"
                                    v-bind:value.sync="selectedItem[editColumn]"
                                    v-bind:variant="inputVariant"
                                />
                            </form-input>
                            <form-input v-bind:header="null" v-else-if="isBoolean(editColumn)">
                                <checkbox
                                    v-bind:items="
                                        buildCheckboxItem(
                                            getColumnLabel(editColumn, getColumnLabel),
                                            editColumn
                                        )
                                    "
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
                                    ref="textInput"
                                />
                            </form-input>
                        </div>
                    </slot>
                    <slot name="menu-footer">
                        <button-color
                            class="delete-item"
                            v-bind:text="'Delete'"
                            v-bind:small="true"
                            v-bind:icon="'bin'"
                            v-bind:color="'red'"
                            v-bind:min-width="0"
                            v-on:click="onClickDeleteItem"
                        />
                    </slot>
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

.table-menu .content-menu ::v-deep .menu > .menu-container {
    padding: 10px 20px 0px 20px;
}

.table-menu .content-menu ::v-deep .menu .menu-title {
    color: $dark;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 0px 10px 0px;
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
    width: 60%;
}

.table-menu .content-menu ::v-deep .menu .form-input > .content {
    width: 100%;
}

.table-menu .content-menu ::v-deep .content .table-content {
    overflow-y: auto;
}

.table-menu .content-menu ::v-deep .content .table .table-head .table-column {
    overflow: hidden;
    text-overflow: ellipsis;
}

.table-menu .content-menu .content .table .table-body > tr {
    cursor: pointer;
    transition: opacity 0.1s ease-in-out;
}

.table-menu .content-menu .content .table .table-body > tr:hover {
    background-color: $selected-color;
}

.table-menu .content-menu .content .table .table-body > tr.selected {
    background-color: $border-color;
}

.table-menu .content-menu .menu .button-color.delete-item {
    margin: 20px 0px 20px 0px;
}
</style>

<script>
export const TableMenu = {
    name: "table-menu",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        editColumns: {
            type: Array,
            default: []
        },
        selectedIndex: {
            type: Number,
            default: null
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
        mode: {
            type: String,
            default: "collapse"
        },
        alignment: {
            type: String,
            default: "right"
        },
        maxHeight: {
            type: Number,
            default: null
        },
        menuWidth: {
            type: Number,
            default: 300
        },
        menuTitle: {
            type: String,
            default: "Arguments"
        },
        menuVisible: {
            type: Boolean,
            default: true
        },
        menuBackgroundColor: {
            type: String,
            default: "#ffffff"
        },
        inputVariant: {
            type: String,
            default: "dark"
        },
        animationDuration: {
            type: Number,
            default: 0.3
        }
    },
    data: function() {
        return {
            selectedIndexData: this.selectedIndex,
            menuVisibleData: this.menuVisible,
            sortData: this.sort,
            reverseData: this.reverse
        };
    },
    computed: {
        itemsWithIndex() {
            return this.items.map((item, index) => ({ _originalIndex: index, ...item }));
        },
        menuStyle() {
            const base = {};
            base["background-color"] = this.menuBackgroundColor ? this.menuBackgroundColor : null;
            return base;
        },
        contentStyle() {
            const base = {};
            base["max-height"] = this.maxHeight ? `${this.maxHeight}px` : null;
            return base;
        },
        selectedItem() {
            return this.items[this.selectedIndexData] || {};
        }
    },
    watch: {
        selectedIndex(value) {
            this.setMenuItem(value);
        },
        selectedIndexData(value) {
            this.$emit("update:selected-index", value);
        },
        menuVisible(value) {
            this.menuVisibleData = value;
        },
        menuVisibleData(value) {
            this.$emit("update:menu-visible", value);
        },
        sort(value) {
            this.sortData = value;
        },
        sortData(value) {
            this.sortData = value;
            this.$emit("update:sort", value);
        },
        reverse(value) {
            this.reverseData = value;
        },
        reverseData(value) {
            this.reverseData = value;
            this.$emit("update:reverse", value);
        }
    },
    methods: {
        setMenuItem(index) {
            this.selectedIndexData = index;
            this.menuVisibleData = true;
            this.focusFirstTextInput();
        },
        buildCheckboxItem(label, value) {
            return [{ label: label, value: value }];
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
        getColumnSymbol(value, item) {
            if (item.currency) {
                return item.currency.toUpperCase();
            } else {
                return this.columns.find(l => l.value === value).symbol || "?";
            }
        },
        isBoolean(value) {
            return this.getColumnType(value) === "boolean";
        },
        isMoney(value) {
            return this.getColumnType(value) === "money";
        },
        toggleMenu() {
            this.menuVisibleData = !this.menuVisibleData;
        },
        toggleCheckbox(property, value) {
            if (!(property in this.selectedItem)) return;
            this.$set(this.items[this.selectedIndexData], property, value);
        },
        focusFirstTextInput() {
            const textInputs = this.$refs.textInput;
            if (textInputs[0]) textInputs[0].focus();
        },
        scrollToBottom() {
            const table = document.getElementById("table-content");
            table.scrollTop = table.scrollHeight;
        },
        scrollToTop() {
            const table = document.getElementById("table-content");
            table.scrollTop = 0;
        },
        onClickItem(item) {
            this.selectedItem.id === item.id ? this.toggleMenu() : this.setMenuItem(item._originalIndex);
        },
        onClickAddItem() {
            this.$emit("click:create");
        },
        onClickDeleteItem() {
            this.$emit("click:delete", this.selectedItem, this.selectedIndexData);
        }
    }
};

export default TableMenu;
</script>
