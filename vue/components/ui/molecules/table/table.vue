<template>
    <table class="table" v-bind:class="classes" v-bind:style="style">
        <global-events
            v-on:keydown.meta.65.exact="onMetaA"
            v-on:keydown.ctrl.65.exact="onCtrlA"
            v-on:keydown.ctrl.alt.65.exact="onCtrlAltA"
            v-on:keydown.meta.alt.65.exact="onMetaAltA"
            v-on:mouseover="onMouseOver"
        />
        <thead class="table-head">
            <tr>
                <th class="checkbox-global" v-if="checkboxes">
                    <checkbox
                        v-bind:size="8"
                        v-bind:checked="!isAllUnchecked"
                        v-bind:icon="globalCheckboxIcon"
                        v-on:click="onGlobalCheckboxClick"
                    />
                </th>
                <th
                    v-bind:style="{ width: column.width }"
                    v-for="column in columns"
                    v-bind:key="column.value"
                >
                    <slot name="column" v-bind:column="column">
                        <div
                            class="table-column"
                            v-bind:class="columnClass(column.value)"
                            v-if="column.label || column.value || value.name"
                            v-on:click="sortColumn(column.value)"
                        >
                            <span>{{ column.label || column.value || value.name }}</span>
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
                        v-bind:key="item.id"
                        v-on:click="onRowClick(item, index)"
                    >
                        <td class="checkbox-item" v-if="checkboxes">
                            <checkbox
                                v-bind:size="8"
                                v-bind:checked="checkedItemsData[item.id]"
                                v-on:update:checked="value => onChecked(item.id, value)"
                                v-on:click.exact="onCheckboxClick(index, item.id)"
                                v-on:click.shift.exact="onCheckboxShiftClick(index, item.id)"
                            />
                        </td>
                        <slot v-bind:item="item" v-bind:index="index">
                            <td
                                v-bind:class="column.value"
                                v-for="column in columns"
                                v-bind:key="column.value"
                            >
                                <slot
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

.table.selection-disabled {
    user-select: none;
}

.table thead > tr > th.checkbox-global {
    width: 45px;
}

.table tr {
    border-bottom: 1px solid $border-color;
    cursor: pointer;
}

.table thead tr {
    border-bottom: 1px solid $border-color;
}

.table tbody tr:last-child {
    border-bottom: none;
}

.table tbody tr:hover {
    background-color: $selected-color;
}

.table tbody tr.selected {
    background-color: $light-white;
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

.table tbody > tr > td.checkbox-item {
    padding: 0px 0px 0px 0px;
}

.table.table-dense ::v-deep td {
    height: 40px;
    padding: 0px 10px 0px 10px;
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

.table .table-column {
    transition: color 0.1s ease-in;
}

.table .table-column.active,
.table .table-column:hover {
    color: #0d0d0d;
}

.table .table-column > span {
    padding: 0px 20px 0px 20px;
    position: relative;
}

.table.table-dense .table-column > span {
    padding: 0px 16px 0px 16px;
}

.table .table-column > span::before {
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

.table.text-align-left .table-column > span::before {
    left: auto;
    right: 0px;
}

.table .table-column.descending > span::before,
.table .table-column:not(.active) > span::before {
    background-position-y: bottom;
}

.table .table-column.active > span::before,
.table .table-column:hover > span::before {
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
        checkboxes: {
            type: Boolean,
            default: false
        },
        checkedItems: {
            type: Object,
            default: () => {}
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
        transition: {
            type: String,
            default: null
        },
        alignment: {
            type: String,
            default: null
        },
        variant: {
            type: String,
            default: null
        },
        allowSelectedHighlight: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            itemsData: this.items,
            sortData: this.sort,
            reverseData: this.reverse,
            checkedItemsData: this.checkedItems,
            lastClickedIndex: null
        };
    },
    watch: {
        sort(value) {
            this.sortData = value;
        },
        items(value) {
            this.itemsData = value;
            this.garbageCollectCheckedItems();
            this.resetSelectionIndexes();
        },
        reverse(value) {
            this.reverseData = value;
        },
        checkedItems(value) {
            this.checkedItemsData = value;
        },
        checkedItemsData(value) {
            this.$emit("update:checked-items", value);
        }
    },
    computed: {
        itemsWithIndex() {
            return this.itemsData.map((item, index) => ({ _originalIndex: index, ...item }));
        },
        sortedItems() {
            if (!this.sortData) {
                return this.itemsWithIndex;
            }

            const items = [...this.itemsWithIndex];
            return this.sortMethod(items, this.sortData, this.reverseData);
        },
        style() {
            const base = {};
            if (this.alignment !== null) base["text-align"] = this.alignment;
            return base;
        },
        classes() {
            const base = {
                alignment: this.alignment === "left" ? "text-align-left" : "",
                "selection-disabled": this.lastClickedIndex !== null
            };
            if (this.variant) base[`table-${this.variant}`] = true;
            return base;
        },
        nrChecked() {
            return Object.keys(this.checkedItemsData).length;
        },
        isAllChecked() {
            return this.nrChecked > 0 && this.nrChecked === this.itemsWithIndex.length;
        },
        isAllUnchecked() {
            return this.nrChecked === 0;
        },
        globalCheckboxIcon() {
            return this.isAllChecked || this.isAllUnchecked ? "check" : "minus";
        }
    },
    mounted: function() {
        this.garbageCollectCheckedItems();
    },
    methods: {
        garbageCollectCheckedItems() {
            const checkedItems = {};

            this.itemsWithIndex.forEach(item => {
                if (this.checkedItemsData[item.id]) checkedItems[item.id] = true;
            });

            this.checkedItemsData = checkedItems;
        },
        checkAll() {
            this.setAllCheckedItemsValue(true);
            this.lastClickedIndex = null;
        },
        uncheckAll() {
            this.setAllCheckedItemsValue(false);
            this.lastClickedIndex = null;
        },
        setAllCheckedItemsValue(value) {
            this.checkedItemsData = {};
            if (value) {
                this.itemsWithIndex.forEach(item => {
                    this.$set(this.checkedItemsData, item.id, true);
                });
            }
        },
        setChecked(itemId, value) {
            if (value) this.$set(this.checkedItemsData, itemId, true);
            else this.$delete(this.checkedItemsData, itemId);
        },
        columnClass(column) {
            const order = this.reverseData ? "ascending" : "descending";
            return this.sortData === column ? `active ${order}` : "";
        },
        sortColumn(column) {
            this.reverseData = this.sortData === column ? !this.reverseData : false;
            this.sortData = column;
            this.$emit("update:sort", this.sortData);
            this.$emit("update:reverse", this.reverseData);
        },
        checkboxClick(index, itemId) {
            this.lastClickedIndex = index;
        },
        rowCtrlClick(index, itemId) {
            this.setChecked(itemId, !this.checkedItemsData[itemId]);
        },
        onGlobalCheckboxClick() {
            this.setAllCheckedItemsValue(this.isAllUnchecked);
            this.lastClickedIndex = null;
        },
        onChecked(itemId, value) {
            this.setChecked(itemId, value);
        },
        onRowClick(item, index) {
            this.$emit("click", item, item._originalIndex, index);
        },
        onCheckboxClick(index, itemId) {
            this.checkboxClick(index, itemId);
        },
        onCheckboxShiftClick(index, itemId) {
            if (this.lastClickedIndex !== null) {
                const lower = Math.min(index, this.lastClickedIndex);
                const upper = Math.max(index, this.lastClickedIndex);
                for (let i = lower; i <= upper; i++) {
                    this.setChecked(this.itemsWithIndex[i].id, true);
                }
            }
        },
        onCtrlA() {
            this.checkAll();
        },
        onMetaA() {
            this.checkAll();
        },
        onCtrlAltA() {
            this.uncheckAll();
        },
        onMetaAltA() {
            this.uncheckAll();
        }
    }
};

export default Table;
</script>
