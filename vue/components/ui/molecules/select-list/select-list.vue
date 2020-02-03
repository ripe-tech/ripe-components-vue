<template>
    <div class="select-list" tabindex="0">
        <div class="select-list-search" v-if="search">
            <search
                class="search-container"
                v-bind:icon-visible="true"
                v-bind:clear-visible="true"
                v-bind:value.sync="searchKeyData"
            />
        </div>
        <ul class="select-list-items" v-bind:style="style" v-if="itemsData && itemsData.length > 0">
            <li
                class="select-list-item"
                v-bind:class="{ selected: isSelected(item.value) }"
                v-for="(item, index) in itemsData"
                v-bind:key="index"
                v-on:click.exact="onClick(item.value, index)"
                v-on:click.shift="onShiftClick(item.value, index)"
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
    box-shadow: 0px 6px 24px 0px rgba(128, 128, 128, 0.4);
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    outline: none;
    width: 320px;
}

.select-list > .select-list-search {
    background-color: $white;
    border-radius: 6px 6px 0px 0px;
    padding: 12px 12px 12px 12px;
}

.select-list > .select-list-items {
    border-radius: 0px 0px 6px 6px;
    border-top: 1px solid $light-white;
    height: 100%;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow-y: auto;
    padding: 0px 0px 0px 0px;
    user-select: none;
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
            itemsData: this.items,
            searchKeyData: ""
        };
    },
    computed: {
        style() {
            const base = {};
            if (this.minHeight !== null) base["min-height"] = `${this.minHeight}px`;
            if (this.maxHeight !== null) base["max-height"] = `${this.maxHeight}px`;
            return base;
        }
    },
    watch: {
        values(value) {
            this.valuesData = value;
        },
        searchKeyData(value) {
            this.itemsData = this.items.filter(item =>
                item.label.toLowerCase().startsWith(value.toLowerCase())
            );
        }
    },
    methods: {
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
            this.$emit("update:values", this.valuesData);
        },
        isSelected(value) {
            return Boolean(this.valuesData[value]);
        },
        onClick(value, index) {
            this.toggleItem(value);
            this.lastSelected = index;
        },
        onShiftClick(item, index) {
            if (this.lastSelected !== null) {
                const lower = Math.min(index, this.lastSelected);
                const upper = Math.max(index, this.lastSelected);
                for (let i = lower; i <= upper; i++) {
                    this.selectItem(this.items[i].value);
                }
            }
        }
    }
};

export default SelectList;
</script>
