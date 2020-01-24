<template>
    <div class="select-list" tabindex="0">
        <p class="title">
            {{ title }}
        </p>
        <div class="select-list-seach">
            <search
                class="search-containter"
                v-bind:icon-visible="true"
                v-bind:clear-visible="true"
                v-bind:value.sync="searchKeyData"
            />
        </div>
        <ul class="items" v-bind:style="style">
            <li
                class="item"
                v-bind:class="{ selected: isSelected(item.value) }"
                v-for="(item, index) in itemsData"
                v-bind:key="item.index"
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
    border: 1px solid transparent;
    border-radius: 6px;
    display: inline-block;
    outline: none;
    vertical-align: top;
    width: 320px;
}

.select-list > .title {
    background-color: transparent;
    font-size: 14px;
    padding: 5px 0px 0px 0px;
}

.select-list > .select-list-seach {
    background-color: #ffffff;
    border: 1px solid #e4e8f0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    padding: 12px 12px 12px 12px;
}

.select-list > .items:focus {
    border-color: $aqcua-blue;
}

.select-list > .items {
    box-shadow: 0px 6px 24px 0px #43566426;
    height: 100%;
    list-style: none;
    margin: 0px 0px 0px 0px;
    overflow-y: auto;
    padding: 0px 0px 0px 0px;
    user-select: none;
    width: 100%;
}

.select-list > .items > .item {
    box-sizing: border-box;
    color: #1d2631;
    cursor: pointer;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    padding-left: 15px;
    width: 303px;
}

.select-list .search-container {
    background-color: $mild-dark-blue;
}

.select-list > .items > .item:hover {
    background-color: $mild-dark-blue;
    color: $white;
}

.select-list > .items > .item.selected,
.select-list > .items > .item.selected:hover {
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
        minHeight: {
            type: Number,
            default: 100
        },
        maxHeight: {
            type: Number,
            default: null
        },
        title: {
            type: String,
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
        isSelected(value) {
            return Boolean(this.valuesData[value]);
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
            this.$emit("update:values", this.valuesData);
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
