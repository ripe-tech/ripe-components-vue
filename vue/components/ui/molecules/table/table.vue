<template>
    <table class="table" v-bind:class="classes" v-bind:style="style">
        <thead class="table-head">
            <tr>
                <th class="checkboxes-th" v-if="enableCheckboxes">
                    <checkbox
                        v-bind:size="8"
                        v-bind:checked="globalCheckboxValueData"
                        v-bind:icon="globalCheckboxIcon"
                        v-on:update:checked="onGlobalCheckbox"
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
                        v-bind:class="{
                            selected:
                                allowSelectedHighlight &&
                                item._originalIndex === selectedOriginalIndex
                        }"
                        v-bind:key="item.id"
                        v-on:click="onClick(item, index)"
                    >
                        <td class="checkbox-td" v-if="enableCheckboxes">
                            <checkbox
                                v-bind:size="8"
                                v-bind:checked.sync="selectedCheckboxesData[index]"
                                v-on:click.native.exact.stop
                            />
                        </td>
                        <td
                            v-bind:class="column.value"
                            v-for="column in columns"
                            v-bind:key="column.value"
                        >
                            <slot
                                v-bind:item="item"
                                v-bind:index="index"
                                v-bind:column="column"
                                v-bind:name="`item-${column.value}`"
                            >
                                <slot v-bind:item="item" v-bind:index="index" v-bind:column="column">
                                    {{
                                        item[column.value] !== null && item[column.value] !== undefined
                                            ? item[column.value]
                                            : "-"
                                    }}
                                </slot>
                            </slot>
                        </td>
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

.table .table-head .checkboxes-th {
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
    background-color: #e3e8f1;
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

.table.dense th {
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

.table .checkbox-td {
    padding: 0px 0px 0px 0px;
}

.table.dense ::v-deep td {
    height: 40px;
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
        enableCheckboxes: {
            type: Boolean,
            default: false
        },
        selectedCheckboxes: {
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
        allowSelectedHighlight: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        sort(value) {
            this.sortData = value;
        },
        items(value) {
            const addedItemsNr = value.length - this.itemsData.length;

            this.itemsData = value.map((item, index) => {
                return Object.assign(item, this.itemsData[index]);
            });

            this.itemsData = this.initLazyLoadedItems(this.itemsData, addedItemsNr);
        },
        reverse(value) {
            this.reverseData = value;
        },
        selectedCheckboxesData(value) {
            this.selectionChange();
            this.$emit("update:selected-checkboxes", this.selectedCheckboxesData);
        }
    },
    data: function() {
        return {
            itemsData: this.enableCheckboxes ? this.checkableItems() : this.itemsWithIndex(),
            sortData: this.sort,
            reverseData: this.reverse,
            globalCheckboxValueData: false,
            globalCheckboxIcon: "check",
            selectedCheckboxesData: this.enableCheckboxes ? this.selectedCheckboxes : [],
            selectedOriginalIndex: null
        };
    },
    computed: {
        sortedItems() {
            if (!this.sortData) {
                return this.itemsData;
            }

            const items = [...this.itemsData];
            const sortedItems = this.sortMethod(items, this.sortData, this.reverseData);
            this.sortCheckboxes(sortedItems);

            return sortedItems;
        },
        style() {
            const base = {};
            if (this.alignment !== null) base["text-align"] = this.alignment;
            return base;
        },
        classes() {
            const base = {
                alignment: this.alignment === "left" ? "text-align-left" : ""
            };
            if (this.variant) base[this.variant] = true;
            return base;
        },
        isAllChecked() {
            return (
                this.selectedCheckboxesData.length > 0 &&
                !this.selectedCheckboxesData.some(value => value === false || value === undefined)
            );
        },
        isAllUnchecked() {
            return !this.selectedCheckboxesData.some(value => value === true);
        }
    },
    methods: {
        itemsWithIndex() {
            return this.items.map((item, index) => ({ _originalIndex: index, ...item }));
        },
        checkableItems() {
            return this.itemsWithIndex().map((item, index) => ({ ...item, _checkboxIndex: index }));
        },
        initialSelectedCheckboxes() {
            return new Array(this.items.length).fill(false).map((value, index) => {
                return Boolean(this.selectedCheckboxes[index]);
            });
        },
        initLazyLoadedItems(items, addedItemsNr) {
            let item = null;
            for (let i = items.length - addedItemsNr; i < items.length; i++) {
                item = items[i];
                item._originalIndex = items[i]._checkboxIndex = i;
                this.$set(this.selectedCheckboxesData, i, false);
            }

            return items;
        },
        selectionChange() {
            if (this.isAllChecked) {
                this.globalCheckboxIcon = "check";
                this.globalCheckboxValueData = true;
            } else if (this.isAllUnchecked) {
                this.globalCheckboxIcon = "check";
                this.globalCheckboxValueData = false;
            } else {
                this.globalCheckboxIcon = "minus";
                this.globalCheckboxValueData = true;
            }
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
        sortCheckboxes(sortedItems) {
            const unsortedCheckboxes = [...this.selectedCheckboxesData];
            sortedItems.forEach((item, index) => {
                this.$set(
                    this.selectedCheckboxesData,
                    index,
                    unsortedCheckboxes[item._checkboxIndex]
                );
                item._checkboxIndex = index;
            });
        },
        onGlobalCheckbox(value) {
            this.selectedCheckboxesData = new Array(this.items.length).fill(value);
        },
        onClick(item, index) {
            this.selectedOriginalIndex =
                this.selectedOriginalIndex === null ||
                this.selectedOriginalIndex !== item._originalIndex
                    ? item._originalIndex
                    : null;
            this.$emit("click", item, this.selectedOriginalIndex, index);
        }
    },
    mounted: function() {
        this.selectedCheckboxesData = this.initialSelectedCheckboxes();
    }
};

export default Table;
</script>
