<template>
    <container-menu
        class="table-menu"
        v-bind:alignment="menuAlignment"
        v-bind:mode="menuMode"
        v-bind:menu-visible.sync="menuVisibleData"
        v-bind:menu-width="menuWidth"
        v-bind:animation-duration="animationDuration"
    >
        <template v-slot:content>
            <slot name="header">
                <h2 class="content-title" v-if="tableTitle">{{ tableTitle }}</h2>
            </slot>
            <div class="content" ref="content">
                <table-ripe
                    v-bind:columns="columns"
                    v-bind:items="itemsWithIndex"
                    v-bind:sort.sync="sortData"
                    v-bind:sort-method="sortMethod"
                    v-bind:reverse.sync="reverseData"
                >
                    <template v-slot:row="{ item, index }">
                        <tr
                            v-bind:class="[{ selected: isSelected(item) }]"
                            v-bind:key="item.id || item.tmp_id"
                            v-on:click="event => onClickItem(event, item, index)"
                        >
                            <slot v-bind:item="item" v-bind:index="index">
                                <td
                                    v-bind:class="column.value"
                                    v-for="column in columns"
                                    v-bind:key="column.value"
                                >
                                    <slot
                                        v-bind:item="item"
                                        v-bind:index="index"
                                        v-bind:name="`item-${column.value}`"
                                    >
                                        {{
                                            item[column.value] !== null &&
                                                item[column.value] !== undefined
                                                ? item[column.value]
                                                : "-"
                                        }}
                                    </slot>
                                </td>
                            </slot>
                        </tr>
                    </template>
                </table-ripe>
            </div>
            <slot name="footer">
                <button-color
                    class="add-item"
                    v-bind:text="'Add row'"
                    v-bind:small="true"
                    v-bind:icon="'add'"
                    v-bind:color="'white'"
                    v-bind:min-width="0"
                    v-on:click="onClickAddItem"
                />
            </slot>
        </template>
        <template v-slot:menu>
            <div class="menu-container" v-bind:style="menuStyle" ref="menu-container">
                <slot name="menu-header">
                    <h2 class="menu-title" v-if="menuTitle">{{ menuTitle }}</h2>
                </slot>
                <slot name="menu-content">
                    <slot
                        v-bind:selectedItem="selectedItem"
                        v-bind:name="`arg-${column.value}`"
                        v-for="column in editColumns"
                    >
                        <form-input
                            v-bind:header="column.label"
                            v-bind:variant="'inline'"
                            v-bind:class="column.value"
                            v-bind:key="column.value"
                        >
                            <input-ripe v-bind:value.sync="selectedItem[column.value]" />
                        </form-input>
                    </slot>
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
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.table-menu > .content-title,
.table-menu > .menu-title {
    color: $dark;
    font-size: 18px;
    font-weight: 500;
}

.table-menu .content-title {
    padding: 10px 0px 10px 20px;
}

.table-menu .content {
    min-height: 75px;
    overflow-x: hidden;
    overflow-y: auto;
}

.table-menu .content .table tr {
    cursor: pointer;
    transition: opacity 0.1s ease-in-out;
}

.table-menu .content .table tr:hover {
    background-color: $selected-color;
}

.table-menu .content .table tr.selected {
    background-color: #e3e8f1;
}

.table-menu .menu-title {
    padding: 10px 0px 10px 0px;
}

.table-menu.left ::v-deep .menu {
    border-right: 1px solid $border-color;
}

.table-menu.right ::v-deep .menu {
    border-left: 1px solid $border-color;
}

.table-menu.floating ::v-deep .menu {
    border: 1px solid $border-color;
}

.table-menu .menu-container {
    box-sizing: border-box;
    height: 100%;
    padding: 10px 20px 0px 20px;
}

.table-menu .menu-container > .button-color.delete-item {
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
            default: false
        },
        menuBackgroundColor: {
            type: String,
            default: "#ffffff"
        },
        animationDuration: {
            type: Number,
            required: false
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
        selectedItem() {
            return this.items[this.selectedIndexData] || {};
        },
        menuStyle() {
            const base = {};
            base["background-color"] = this.menuBackgroundColor ? this.menuBackgroundColor : null;
            return base;
        },
        editColumns() {
            return this.columns.filter(column => column.edit);
        }
    },
    watch: {
        selectedIndex(value) {
            this.openMenu(value);
        },
        selectedIndexData(value) {
            this.$emit("update:selected-index", value);
        },
        menuVisible(value) {
            this.menuVisibleData = value;
        },
        menuVisibleData(value) {
            this.focusFirstMenuInput();
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
        addEmpty() {
            const newItem = { tmp_id: String(Math.random()) };
            this.items.push(newItem);
            this.menuVisibleData = true;
            this.selectedIndexData = this.items.length - 1;
        },
        delete(index) {
            this.items.splice(index, 1);
            this.selectedIndexData = Math.max(0, index - 1);
        },
        isSelected(item) {
            return (
                this.selectedItem.id === item.id ||
                (this.selectedItem.tmp_id && this.selectedItem.tmp_id === item.tmp_id)
            );
        },
        scrollTop() {
            const content = this.$refs.content;
            content.scrollTop = 0;
        },
        scrollBottom() {
            const content = this.$refs.content;
            content.scrollTop = content.scrollHeight;
        },
        openMenu(index) {
            this.selectedIndexData = index;
            this.menuVisibleData = true;
        },
        focusFirstMenuInput() {
            this.$refs["menu-container"].getElementsByTagName("input")[0].focus();
        },
        toggleMenu() {
            this.menuVisibleData = !this.menuVisibleData;
        },
        onClickItem(event, item, index) {
            if (this.isSelected(item)) {
                this.toggleMenu();
            } else {
                this.openMenu(item._originalIndex);
            }
            this.$emit("click:item", event, item, index);
        },
        onClickAddItem(event) {
            this.addEmpty();
            this.$emit("click:add", event);
        },
        onClickDeleteItem(event) {
            this.delete(this.selectedIndexData);
            this.$emit("click:delete", event, this.selectedItem, this.selectedIndexData);
        }
    }
};

export default TableMenu;
</script>
