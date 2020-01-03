<template>
    <table class="table">
        <thead class="table-head">
            <tr>
                <th
                    v-bind:style="{ width: column.width }"
                    v-for="column in columns"
                    v-bind:key="column.value"
                >
                    <slot name="column" v-bind:column="column">
                        <div
                            class="table-column"
                            v-bind:class="columnClass(column.value)"
                            v-if="column.label"
                            v-on:click="sortColumn(column.value)"
                        >
                            <span>{{ column.label }}</span>
                        </div>
                    </slot>
                </th>
            </tr>
        </thead>
        <transition-group tag="tbody" v-bind:name="transition" class="table-body">
            <tr v-for="(item, index) in sortedItems" v-bind:key="item.id">
                <slot v-bind:item="item" v-bind:index="index">
                    <td
                        v-bind:class="column.value"
                        v-for="column in columns"
                        v-bind:key="column.value"
                    >
                        {{ item[column.value] }}
                    </td>
                </slot>
            </tr>
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
    margin: 20px 0px 32px 0px;
    table-layout: fixed;
    text-align: center;
    width: 100%;
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

.table th {
    color: $label-color;
    font-size: 12px;
    font-weight: 800;
    height: 36px;
    letter-spacing: 1px;
    line-height: 36px;
    text-transform: uppercase;
    user-select: none;
    white-space: pre;
}

.table ::v-deep td {
    font-size: 14px;
    font-weight: 600;
    height: 80px;
    overflow: hidden;
    padding: 0px 0px 0px 0px;
    text-overflow: ellipsis;
    word-break: break-all;
}

.table ::v-deep td > * {
    vertical-align: middle;
}

.table ::v-deep td.image {
    line-height: 0px;
    user-select: none;
}

.table ::v-deep td.image > * {
    height: 100%;
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
    font-weight: 800;
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
        }
    },
    watch: {
        sort(value) {
            this.sortData = value;
        },
        reverse(value) {
            this.reverseData = value;
        }
    },
    data: function() {
        return {
            sortData: this.sort,
            reverseData: this.reverse
        };
    },
    computed: {
        sortedItems() {
            if (!this.sortData) {
                return this.items;
            }

            const items = [...this.items];
            return this.sortMethod(items, this.sortData, this.reverseData);
        }
    },
    methods: {
        columnClass(column) {
            const order = this.reverseData ? "ascending" : "descending";
            return this.sortData === column ? `active ${order}` : "";
        },
        sortColumn(column) {
            this.reverseData = this.sortData === column ? !this.reverseData : false;
            this.sortData = column;
            this.$emit("update:sort", this.sortData);
            this.$emit("update:reverse", this.reverseData);
        }
    }
};

export default Table;
</script>
