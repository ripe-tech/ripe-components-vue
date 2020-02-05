<template>
    <div class="table-menu" v-bind:class="[menuMode, menuAlignment]">
        <container-menu
            v-bind:alignment="menuAlignment"
            v-bind:mode="menuMode"
            v-bind:menu-visible.sync="menuVisibleData"
            v-bind:menu-width="menuWidth"
            v-bind:animation-duration="animationDuration"
        >
            <template v-slot:content>
                <slot name="table-header">
                    <h2 class="table-title" v-if="tableTitle">{{ tableTitle }}</h2>
                </slot>
                <div class="table-content" v-bind:style="tableStyle" ref="table-content">
                    <table-ripe
                        v-bind:columns="columns"
                        v-bind:items.sync="itemsData"
                        v-bind:enable-checkboxes="enableCheckboxes"
                        v-bind:checked-items.sync="checkedItemsData"
                        v-bind:sort.sync="sortData"
                        v-bind:sort-method="sortMethod"
                        v-bind:reverse.sync="reverseData"
                        v-bind:allow-selected-highlight="allowSelectedHighlight"
                        v-on:click="
                            (item, selectedOriginalIndex) =>
                                onClickItem(item, selectedOriginalIndex)
                        "
                    >
                        <template v-slot:row-column="{ item, column }">
                            <checkmark
                                v-bind:value="item[column.value]"
                                v-if="column.type === 'boolean'"
                            />
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
                        <div
                            class="argument"
                            v-bind:class="editColumn"
                            v-for="(editColumn, index) in editColumns"
                            v-bind:key="index"
                        >
                            <form-input v-bind:header="getColumnLabel(editColumn)">
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
        </container-menu>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.table-menu.left .container-menu ::v-deep .menu {
    border-right: 1px solid $border-color;
}

.table-menu.right .container-menu ::v-deep .menu {
    border-left: 1px solid $border-color;
}

.table-menu.floating .container-menu ::v-deep .menu {
    border: 1px solid $border-color;
}

.table-menu .container-menu ::v-deep .menu > .menu-container {
    padding: 10px 20px 0px 20px;
}

.table-menu .container-menu ::v-deep .menu .form-input {
    display: flex;
    margin: 0px 0px 5px 0px;
}

.table-menu .container-menu ::v-deep .menu .form-input > .label {
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

.table-menu .container-menu ::v-deep .menu .form-input > .content {
    width: 100%;
}

.table-menu .container-menu ::v-deep .content .table-title,
.table-menu .container-menu ::v-deep .menu .menu-title {
    color: $dark;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 0px 10px 0px;
}

.table-menu .container-menu ::v-deep .content .table-title {
    padding: 10px 0px 10px 20px;
}

.table-menu .container-menu ::v-deep .content .table-content {
    overflow-y: auto;
}

.table-menu .container-menu ::v-deep .content .table .table-head .table-column {
    overflow: hidden;
    text-overflow: ellipsis;
}

.table-menu .container-menu .content .table .table-body > tr {
    cursor: pointer;
    transition: opacity 0.1s ease-in-out;
}

.table-menu .container-menu .menu .button-color.delete-item {
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
            default: () => []
        },
        enableCheckboxes: {
            type: Boolean,
            default: false
        },
        checkedItems: {
            type: Object,
            default: () => {}
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
        menuMode: {
            type: String,
            required: false
        },
        menuAlignment: {
            type: String,
            required: false
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
            required: false
        },
        tableTitle: {
            type: String,
            default: null
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
            required: false
        },
        allowSelectedHighlight: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            itemsData: this.items,
            checkedItemsData: this.checkedItems,
            selectedIndexData: this.selectedIndex,
            menuVisibleData: this.menuVisible,
            sortData: this.sort,
            reverseData: this.reverse
        };
    },
    computed: {
        selectedItem() {
            return this.itemsData[this.selectedIndexData] || {};
        },
        tableStyle() {
            const base = {};
            base["max-height"] = this.maxHeight ? `${this.maxHeight}px` : null;
            return base;
        },
        menuStyle() {
            const base = {};
            base["background-color"] = this.menuBackgroundColor ? this.menuBackgroundColor : null;
            return base;
        }
    },
    watch: {
        selectedIndex(value) {
            this.setMenuItem(value);
        },
        selectedIndexData(value) {
            this.$emit("update:selected-index", value);
        },
        items(value) {
            this.itemsData = value;
        },
        itemsData(value) {
            this.$emit("update:items", value);
        },
        checkedItemsData(value) {
            this.$emit("update:checked-items", value);
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
            this.showMenu();
            this.focusFirstTextInput();
        },
        getColumnLabel(value) {
            const column = this.columns.find(l => l.value === value);
            return column.label || value;
        },
        scrollTop() {
            const table = this.$refs["table-content"];
            table.scrollTop = 0;
        },
        scrollBottom() {
            const table = this.$refs["table-content"];
            table.scrollTop = table.scrollHeight;
        },
        showMenu() {
            this.menuVisibleData = true;
        },
        hideMenu() {
            this.menuVisibleData = false;
        },
        toggleMenu() {
            this.menuVisibleData = !this.menuVisibleData;
        },
        focusFirstTextInput() {
            const textInputs = this.$refs.textInput || [];
            if (textInputs.length > 0) textInputs[0].focus();
        },
        onClickItem(item, selectedOriginalIndex) {
            console.log("selectedOriginalIndex", selectedOriginalIndex);
            selectedOriginalIndex === null
                ? this.hideMenu()
                : this.setMenuItem(selectedOriginalIndex);
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
