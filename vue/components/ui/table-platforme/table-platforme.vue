<template>
    <table>
        <thead>
            <tr>
                <th
                    v-bind:style="{ width: column.width }"
                    v-for="column in columns"
                    v-bind:key="column.id"
                >
                    <slot name="column" v-bind:column="column">
                        <div
                            class="column"
                            v-bind:class="columnClass(column.id)"
                            v-if="column.title"
                            v-on:click="sort(column.id)"
                        >
                            <span>{{ column.title }}</span>
                        </div>
                    </slot>
                </th>
            </tr>
        </thead>
        <transition-group tag="tbody" v-bind:name="transition">
            <tr v-for="(item, index) in sortedItems" v-bind:key="item.id">
                <slot v-bind:item="item" v-bind:index="index">
                    <td v-for="column in columns" v-bind:key="column.id" />
                </slot>
            </tr>
        </transition-group>
    </table>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

table {
    border-collapse: collapse;
    border-spacing: 0px;
    color: #0d0d0d;
    margin: 0px 0px 0px 0px;
    margin: 20px 0px 32px 0px;
    table-layout: fixed;
    text-align: center;
    width: 100%;
}

.fade-enter-active {
    transition-duration: 0.25s;
}

tr {
    border-bottom: 1px solid $border-color;
    cursor: pointer;
}

thead tr {
    border-bottom: 1px solid $border-color;
}

tbody tr:last-child {
    border-bottom: none;
}

tbody tr:hover {
    background-color: $selected-color;
}

th {
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

table ::v-deep td {
    font-size: 14px;
    height: 80px;
    overflow: hidden;
    padding: 0px 0px 0px 0px;
    text-overflow: ellipsis;
    text-transform: capitalize;
    word-break: break-all;
}

table ::v-deep td > * {
    height: 100%;
    vertical-align: middle;
}

table ::v-deep td > a {
    border: none;
    margin: auto;
    text-decoration: none;
}

table ::v-deep td > a:hover {
    border: none;
    text-decoration: none;
}

table ::v-deep td.image img {
    height: auto;
    max-height: 100%;
    max-width: 100%;
    width: auto;
}

.column {
    transition: color 0.1s ease-in;
}

.column.active,
.column:hover {
    color: #0d0d0d;
}

.column > span {
    padding: 0px 20px 0px 20px;
    position: relative;
}

.column > span::before {
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

.column.descending > span::before,
.column:not(.active) > span::before {
    background-position-y: bottom;
}

.column.active > span::before,
.column:hover > span::before {
    opacity: 1;
}
</style>

<script>
export const TablePlatforme = {
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
        initialSort: {
            type: String,
            default: null
        },
        initialReverse: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            sortColumn: this.initialSort,
            reverseSort: this.initialReverse
        };
    },
    computed: {
        sortedItems() {
            if (!this.sortColumn) {
                return this.items;
            }

            const items = [...this.items];
            return this.sortMethod(items, this.sortColumn, this.reverseSort);
        }
    },
    methods: {
        columnClass(column) {
            const order = this.reverseSort ? "ascending" : "descending";
            return this.sortColumn === column ? `active ${order}` : "";
        },
        sort(column) {
            this.reverseSort = this.sortColumn === column ? !this.reverseSort : false;
            this.sortColumn = column;
            this.$emit("sort", this.sortColumn, this.reverseSort);
        }
    }
};

export default TablePlatforme;
</script>
