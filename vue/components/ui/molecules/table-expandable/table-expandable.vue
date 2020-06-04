<template>
    <table-ripe
        class="table-expandable"
        v-bind:items="itemsWithClasses"
        v-bind:columns="columnsWithArrow"
        v-bind:sort-method="sortMethod"
        v-bind:header="header"
        v-bind:transition="transition"
        v-bind:sort="sort"
        v-bind:reverse="reverse"
        v-bind:alignment="alignment"
        v-bind:variant="variant"
        v-bind:row-selection="rowSelection"
        v-bind:selected-row="selectedRow"
        v-bind:clickable-rows="clickableRows"
        v-bind:hoverable-rows="hoverableRows"
        v-on:click="onItemClick"
    >
        <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
        <template v-for="slot in Object.keys($scopedSlots)" v-bind:slot="slot" slot-scope="scope">
            <slot v-bind:name="slot" v-bind="scope" />
        </template>
        <template v-slot:cell-arrow="{ item, index }">
            <slot
                name="expand-icon"
                v-bind:item="item"
                v-bind:index="index"
                v-bind:expanded="isExpanded(item)"
                v-if="item.expandable !== false"
            >
                <icon
                    v-bind:icon="isExpanded(item) ? 'chevron-up' : 'chevron-down'"
                    v-bind:color="'#c2c7cc'"
                    v-bind:width="20"
                    v-bind:height="20"
                />
            </slot>
            <span class="expand-icon-missing" v-else />
        </template>
        <template v-slot:after-row="{ item, index }">
            <tr
                class="expanded-row"
                v-bind:class="expandedRowClasses(item, index)"
                v-if="item.expandable !== false"
                v-bind:key="index"
            >
                <td v-bind:colspan="columnsWithArrow.length">
                    <div
                        class="expanded-content"
                        v-bind:style="expandedContentStyle(item, index)"
                        v-bind:ref="`expandedContent-${index}`"
                    >
                        <slot name="expanded-content" v-bind:item="item" v-bind:index="index" />
                    </div>
                </td>
            </tr>
        </template>
    </table-ripe>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";

.table-expandable .expanded-row.expanded {
    border-bottom: 1px solid $light-white;
}

.table-expandable .expanded-row > td,
.table-expandable.table-auto .expanded-row > td,
.table-expandable.table-dense .expanded-row > td {
    height: 0px;
    padding: 0px 0px 0px 0px;
}

.table-expandable .expanded-row > td > .expanded-content {
    max-height: 0px;
    overflow: hidden;
    transition: max-height 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.table-expandable ::v-deep tr.expandable > td > * {
    border-bottom: 1px dotted #0d0d0d;
}
</style>

<script>
export const TableExpandable = {
    name: "table-expandable",
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
        clickableRows: {
            type: Boolean,
            default: true
        },
        hoverableRows: {
            type: Boolean,
            default: true
        }
    },
    data: function() {
        return {
            expanded: null,
            expandedHeight: null
        };
    },
    computed: {
        itemsWithClasses() {
            return this.items.map(item => {
                const expandable = item.expandable === undefined ? true : item.expandable;
                item.classes = Object.assign({}, item.classes, {
                    expandable: expandable,
                    hover: this.isExpanded(item),
                    expanded: this.isExpanded(item)
                });
                return item;
            });
        },
        columnsWithArrow() {
            let arrowWidth;
            switch (this.variant) {
                case "dense":
                    arrowWidth = 40;
                    break;
                default:
                    arrowWidth = 60;
                    break;
            }

            return [
                ...this.columns,
                {
                    value: "arrow",
                    label: "",
                    width: `${arrowWidth}px`,
                    sortable: false,
                    style: { "text-align": "right" }
                }
            ];
        }
    },
    methods: {
        expand(item) {
            this.expanded = this.isExpanded(item) ? null : item.id;
            this.expandedHeight = null;
        },
        isExpanded(item) {
            return item.id === this.expanded;
        },
        expandedRowClasses(item) {
            const base = { expanded: this.isExpanded(item) };
            return base;
        },
        expandedContentStyle(item, index) {
            const base = {};

            // in case the element is expanded then the max height
            // must be changed according to the contents height
            if (this.isExpanded(item)) {
                // get a reference to the item's expandable content in case
                // there's a valid one visible and in case the expanded height
                // requires re-computation performs it
                const expandedContent = this.$refs[`expandedContent-${index}`];
                if (expandedContent && this.expandedHeight === null) {
                    // get the height expandable content needs to
                    // be fully displayed and set it as max height
                    expandedContent.style.maxHeight = "none";
                    try {
                        this.expandedHeight = expandedContent.offsetHeight;
                    } finally {
                        expandedContent.style.maxHeight = "0px";
                    }
                }

                // updates the max height value of the currently expanded
                // item according to the found and need height
                base.maxHeight = `${this.expandedHeight}px`;
            }

            return base;
        },
        onItemClick(item, index) {
            this.expand(item);
        }
    }
};

export default TableExpandable;
</script>
