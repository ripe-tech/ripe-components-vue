<template>
    <div class="select-list" v-bind:class="classes">
        <div class="select-list-search" v-if="search">
            <search
                class="search-container"
                v-bind:icon-visible="true"
                v-bind:clear-visible="true"
                v-bind:value.sync="filter"
            />
        </div>
        <ul
            class="select-list-items"
            v-bind:style="style"
            v-if="visibleItems && visibleItems.length > 0"
        >
            <li
                class="select-list-item"
                v-bind:class="{ selected: isSelected(item.value) }"
                v-for="(item, index) in visibleItems"
                v-bind:key="index"
                v-on:dblclick="event => onDblclick(event, item.value, index)"
                v-on:click.exact="event => onClick(event, item.value, index)"
                v-on:click.ctrl="event => onCtrlClick(event, item.value, index)"
                v-on:click.meta="event => onMetaClick(event, item.value, index)"
                v-on:click.shift="event => onShiftClick(event, item.value, index)"
            >
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.select-list {
    border: 1px solid #e4e8f0;
    border-radius: 6px 6px 6px 6px;
    box-shadow: 0px 6px 18px 0px rgba(196, 196, 196, 0.3);
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    height: 100%;
    width: 320px;
}

.select-list > .select-list-search {
    background-color: $white;
    border-radius: 6px 6px 0px 0px;
    padding: 12px 12px 12px 12px;
}

.select-list > .select-list-items {
    border-radius: 6px 6px 6px 6px;
    border-top: none;
    height: 100%;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow-y: auto;
    padding: 0px 0px 0px 0px;
    user-select: none;
}

.select-list.select-list-search > .select-list-items {
    border-radius: 0px 0px 6px 6px;
    border-top: 1px solid $light-white;
    height: calc(100% - 61px);
}

.select-list > .select-list-items > .select-list-item {
    box-sizing: border-box;
    color: $dark-grey;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    padding: 0px 16px 0px 16px;
}

.select-list > .select-list-items > .select-list-item:hover {
    background-color: $mild-dark-blue;
    color: $white;
}

.select-list > .select-list-items > .select-list-item.selected,
.select-list > .select-list-items > .select-list-item.selected:hover {
    background-color: $dark-blue;
    color: $white;
}
</style>

<script>
export const SelectList = {
    inheritAttrs: false,
    props: {
        items: {
            type: Array,
            default: () => []
        },
        values: {
            type: Object,
            default: () => ({})
        },
        search: {
            type: Boolean,
            default: false
        },
        minHeight: {
            type: Number,
            default: 100
        },
        maxHeight: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            valuesData: this.values,
            lastSelected: null,
            filter: ""
        };
    },
    computed: {
        style() {
            const base = {};
            if (this.minHeight !== null) base["min-height"] = `${this.minHeight}px`;
            if (this.maxHeight !== null) base["max-height"] = `${this.maxHeight}px`;
            return base;
        },
        classes() {
            const base = { "select-list-search": this.search };
            return base;
        },
        visibleItems() {
            return this.items
                .map((item, index) => ({ ...item, _originalIndex: index }))
                .filter(item => this._isVisible(item));
        }
    },
    watch: {
        values(value) {
            this.valuesData = value;
        },
        valuesData(value) {
            this.$emit("update:values", value);
        },
        filter(value) {
            this.lastSelected = null;
        },
        visibleItems(value) {
            const items = {};
            value.forEach(item => {
                items[item.value] = true;
            });
            this.$emit("update:items:visible", items);
        }
    },
    methods: {
        unselectAll() {
            this.valuesData = {};
        },
        selectItem(value) {
            if (this.isSelected(value)) return;
            this.$set(this.valuesData, value, true);
            this.$emit("selected:value", value);
        },
        unselectItem(value) {
            if (!this.isSelected(value)) return;
            this.$delete(this.valuesData, value);
            this.$emit("unselected:value", value);
        },
        toggleItem(value) {
            if (this.isSelected(value)) {
                this.unselectItem(value);
            } else {
                this.selectItem(value);
            }
        },
        isSelected(value) {
            return Boolean(this.valuesData[value]);
        },
        onCtrlClick(event, value, index) {
            this.toggleItem(value);
            this.lastSelected = index;
            this.$emit("ctrl-click", event, value, index);
        },
        onMetaClick(event, value, index) {
            this.toggleItem(value);
            this.lastSelected = index;
            this.$emit("meta-click", event, value, index);
        },
        onClick(event, value, index) {
            this.unselectAll();
            this.toggleItem(value);
            this.lastSelected = index;
            this.$emit("click", event, value, index);
        },
        onShiftClick(event, value, index) {
            this.unselectAll();

            if (this.lastSelected !== null) {
                const lower = Math.min(index, this.lastSelected);
                const upper = Math.max(index, this.lastSelected);
                for (let i = lower; i <= upper; i++) {
                    const item = this.visibleItems[i];
                    this.selectItem(item.value);
                }
            }

            this.$emit("shift-click", event, value, index);
        },
        onDblclick(event, value, index) {
            this.$emit("dblclick", event, value, index);
        },
        _isVisible(item) {
            return item.label.toLowerCase().startsWith(this.filter.toLowerCase());
        }
    }
};

export default SelectList;
</script>
