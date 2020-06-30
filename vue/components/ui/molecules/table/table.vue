<template>
    <table class="table" v-bind:class="classes" v-bind:style="style">
        <global-events v-on:keydown.meta.65.exact="onMetaA" v-on:keydown.ctrl.65.exact="onCtrlA" />
        <thead class="table-head" v-if="header">
            <tr>
                <th class="checkbox-global" v-if="checkboxes">
                    <checkbox
                        v-bind:size="8"
                        v-bind:checked="nrChecked > 0"
                        v-bind:icon="globalCheckboxIcon"
                        v-on:click="onGlobalCheckboxClick"
                    />
                </th>
                <th
                    v-bind:class="{ clickable: column.sortable !== false }"
                    v-bind:style="[column.style, { width: column.width }]"
                    v-for="column in columns"
                    v-bind:key="column.value"
                >
                    <slot name="column" v-bind:column="column">
                        <div
                            class="table-column"
                            v-bind:class="columnClass(column)"
                            v-if="columnLabel(column)"
                            v-on:click="sortColumn(column)"
                        >
                            <span>{{ columnLabel(column) }}</span>
                        </div>
                    </slot>
                </th>
            </tr>
        </thead>
        <transition-group tag="tbody" v-bind:name="transition" class="table-body">
            <template v-for="(item, index) in sortedItems">
                <slot name="before-row" v-bind:item="item" v-bind:index="index" />
                <slot name="row" v-bind:item="item" v-bind:index="index">
                    <tr
                        v-bind:style="rowStyle(item)"
                        v-bind:class="rowClasses(item)"
                        v-bind:key="item.id"
                        v-on:click="onClick(item, index)"
                    >
                        <td class="checkbox-item" v-if="checkboxes">
                            <checkbox
                                v-bind:size="8"
                                v-bind:checked="checkedItemsData[item.id]"
                                v-on:update:checked="value => onChecked(item.id, value)"
                            />
                        </td>
                        <slot v-bind:item="item" v-bind:index="index">
                            <td
                                v-bind:class="column.value"
                                v-bind:style="[column.style, { width: column.width }]"
                                v-for="column in columns"
                                v-bind:key="column.value"
                            >
                                <slot
                                    v-bind:column="column"
                                    v-bind:item="item"
                                    v-bind:index="index"
                                    v-bind:name="`cell-${column.value}`"
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
                </slot>

                <slot name="after-row" v-bind:item="item" v-bind:index="index" />
            </template>
        </transition-group>
    </table>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.fade-enter-active {
    transition-duration: 0.25s;
}

.table {
    border-collapse: collapse;
    border-spacing: 0px;
    color: #0d0d0d;
    margin: 0px 0px 0px 0px;
    table-layout: fixed;
    text-align: center;
    width: 100%;
}

.table tr {
    border-bottom: 1px solid $border-color;
}

.table tr.clickable {
    cursor: pointer;
}

.table thead tr {
    border-bottom: 1px solid $border-color;
}

.table thead tr th.checkbox-global {
    text-align: center;
    width: 58px;
}

.table.table-dense thead tr th.checkbox-global {
    width: 38px;
}

.table tbody tr:last-child {
    border-bottom: none;
}

.table tbody tr.hoverable:hover,
.table tbody tr.hoverable.hover {
    background-color: $selected-color;
}

.table tbody tr.selected {
    background-color: $selected-dark-color;
}

.table th {
    color: $label-color;
    font-size: 12px;
    font-weight: 600;
    height: 38px;
    letter-spacing: 0.5px;
    line-height: 38px;
    padding: 0px 0px 0px 0px;
    text-transform: uppercase;
    user-select: none;
    white-space: pre;
}

.table th.clickable {
    cursor: pointer;
}

.table.table-dense th {
    font-weight: 600;
}

.table ::v-deep td {
    font-size: 14px;
    font-weight: 600;
    height: 80px;
    overflow: hidden;
    padding: 0px 20px 0px 20px;
    text-overflow: ellipsis;
    word-break: break-all;
}

.table.table-dense ::v-deep td {
    height: 38px;
    padding: 0px 10px 0px 10px;
}

.table.table-auto ::v-deep td {
    height: auto;
    line-height: 18px;
    padding: 10px 20px 10px 20px;
}

.table ::v-deep td > * {
    vertical-align: middle;
}

.table ::v-deep td.image {
    line-height: 0px;
    user-select: none;
}

.table ::v-deep td.image > * {
    display: inline;
}

.table ::v-deep td.image img {
    height: auto;
    max-height: 100%;
    max-width: 100%;
    width: auto;
}

.table ::v-deep td.date > img {
    margin: 0px 5px 0px 5px;
    width: 12px;
}

.table ::v-deep td.status {
    padding: 0px 20px 0px 20px;
}

.table ::v-deep td.status > p {
    height: auto;
    line-height: normal;
    margin: 0px 0px 8px 0px;
}

.table ::v-deep td.status > p.small {
    font-size: 13px;
}

.table ::v-deep td.icons > .icon {
    height: 20px;
    margin-right: 4px;
    opacity: 0.6;
    transition: opacity 0.125s ease-in-out;
}

.table ::v-deep td.icons > .icon:hover {
    opacity: 1;
}

.table ::v-deep td > .column-container {
    display: inline-block;
    height: auto;
}

.table ::v-deep td > .column-container > .name,
.table ::v-deep td > .column-container > .details {
    display: block;
    line-height: 14px;
    word-break: break-word;
}

.table ::v-deep td > .column-container > .details {
    color: #6d6d6d;
    font-size: 10px;
    letter-spacing: 0.25px;
    margin-top: 8px;
    text-transform: uppercase;
}

.table ::v-deep td > .column-container > .details.highlight:hover,
.table ::v-deep td > .column-container > .details.highlight.hover {
    color: $link-hover-color;
}

.table th > .table-column {
    transition: color 0.1s ease-in;
}

.table th > .table-column.sortable.active,
.table th > .table-column.sortable:hover {
    color: #0d0d0d;
}

.table th > .table-column > span {
    padding: 0px 20px 0px 20px;
    position: relative;
}

.table.table-dense th > .table-column > span {
    padding: 0px 16px 0px 16px;
}

.table th > .table-column > span::before {
    background: url("~./assets/sorting.svg") no-repeat left top;
    content: "";
    display: inline-block;
    height: 8px;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: opacity 0.1s ease-in;
    width: 20px;
}

.table.text-align-left th > .table-column > span::before {
    left: auto;
    right: 0px;
}

.table th > .table-column.descending > span::before,
.table th > .table-column:not(.active) > span::before {
    background-position-y: bottom;
}

.table th > .table-column.sortable.active > span::before,
.table th > .table-column.sortable:hover > span::before {
    opacity: 1;
}
</style>

<script>
export const Table = {
    name: "table-ripe",
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
        header: {
            type: Boolean,
            default: true
        },
        transition: {
            type: String,
            default: null
        },
        sort: {
            type: String,
            default: null
        },
        reverse: {
            type: Boolean,
            default: false
        },
        alignment: {
            type: String,
            default: null
        },
        variant: {
            type: String,
            default: null
        },
        rowSelection: {
            type: Boolean,
            default: false
        },
        selectedRow: {
            type: Number,
            default: null
        },
        checkboxes: {
            type: Boolean,
            default: false
        },
        checkedItems: {
            type: Object,
            default: () => ({})
        },
        clickableRows: {
            type: Boolean,
            default: true
        },
        hoverableRows: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        sort(value) {
            this.sortData = value;
        },
        items(value) {
            this.collectCheckedItems();
        },
        reverse(value) {
            this.reverseData = value;
        },
        checkedItems(value) {
            this.checkedItemsData = value;
        },
        checkedItemsData(value) {
            this.$emit("update:checked-items", value);
        },
        selectedRow(value) {
            this.selectedRowData = value;
        }
    },
    data: function() {
        return {
            sortData: this.sort,
            reverseData: this.reverse,
            selectedRowData: this.selectedRow,
            checkedItemsData: this.checkedItems
        };
    },
    computed: {
        itemsWithIndex() {
            return this.items.map((item, index) => ({ _originalIndex: index, ...item }));
        },
        sortedItems() {
            if (!this.sortData) {
                return this.itemsWithIndex;
            }

            const items = [...this.itemsWithIndex];
            return this.sortMethod(items, this.sortData, this.reverseData);
        },
        style() {
            const base = {
                "text-align": this.alignment || "center"
            };
            return base;
        },
        classes() {
            const base = {};
            base[`text-align-${this.alignment || "center"}`] = true;
            if (this.variant) base[`table-${this.variant}`] = true;
            return base;
        },
        nrChecked() {
            return Object.keys(this.checkedItemsData).length;
        },
        globalCheckboxIcon() {
            return this.nrChecked === this.itemsWithIndex.length || this.nrChecked === 0
                ? "check"
                : "minus";
        }
    },
    methods: {
        checkAll() {
            this.setCheckedAll(true);
        },
        uncheckAll() {
            this.setCheckedAll(false);
        },
        setChecked(id, value) {
            if (value) {
                this.$set(this.checkedItemsData, id, true);
            } else {
                this.$delete(this.checkedItemsData, id);
            }
        },
        setCheckedAll(value) {
            this.itemsWithIndex.forEach(item => this.setChecked(item.id, value));
        },
        collectCheckedItems() {
            const checkedItems = {};
            this.itemsWithIndex.forEach(item => {
                if (this.checkedItemsData[item.id]) checkedItems[item.id] = true;
            });
            this.checkedItemsData = checkedItems;
        },
        columnLabel(column) {
            if (column.label !== undefined && column.label !== null) return column.label;
            if (column.value !== undefined && column.value !== null) return column.value;
            if (column.name !== undefined && column.name !== null) return column.name;
            return null;
        },
        columnClass(column) {
            const sortValue = column.sortValue || column.value;
            const sortable = column.sortable === undefined ? true : column.sortable;

            const base = { sortable: sortable };

            // in case the current column is the one currently selected
            // for sorting, then the proper classes must be added according
            // to the current sorting criteria
            if (sortValue === this.sortData) {
                const order = this.reverseData ? "descending" : "ascending";
                base.active = true;
                base[order] = true;
            }

            return base;
        },
        sortColumn(column) {
            const sortValue = column.sortValue || column.value;
            const sortable = column.sortable === undefined ? true : column.sortable;

            if (!sortable) return;

            this.reverseData = sortValue === this.sortData ? !this.reverseData : true;
            this.sortData = sortValue;

            this.$emit("update:sort", this.sortData);
            this.$emit("update:reverse", this.reverseData);
        },
        rowStyle(item) {
            const base = {};
            return Object.assign({}, item.style, base);
        },
        rowClasses(item) {
            const base = {
                selected: this.isRowSelected(item.id),
                clickable: item.clickable === undefined ? this.clickableRows : item.clickable,
                hoverable: item.hoverable === undefined ? this.hoverableRows : item.hoverable
            };
            return Object.assign({}, item.classes, base);
        },
        isRowSelected(id) {
            return this.rowSelection !== null && id === this.selectedRowData;
        },
        onClick(item, index) {
            if (this.rowSelection) {
                this.selectedRowData =
                    this.selectedIdData === null || this.selectedRowData !== item.id
                        ? item.id
                        : null;
            }

            this.$emit("click", item, item._originalIndex, index, this.selectedRowData);
        },
        onGlobalCheckboxClick() {
            const checkAll = this.nrChecked === 0;
            this.setCheckedAll(checkAll);
        },
        onChecked(id, value) {
            this.setChecked(id, value);
        },
        onCtrlA() {
            this.checkAll();
        },
        onMetaA() {
            this.checkAll();
        }
    }
};

export default Table;
</script>
