<template>
    <div class="select-list" tabindex="0">
        <ul class="items">
            <li
                class="item"
                v-bind:class="{ selected: isSelected(item.value) }"
                v-for="(item, index) in items"
                v-bind:key="item.index"
                v-on:click.exact="onClick(item.value, index)"
                v-on:click.shift="onShiftClick(item.value, index)"
            >
                {{ item.label || item.value }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.select-list {
    border: 1px solid transparent;
    border-radius: 6px;
    box-shadow: 0px 6px 24px 0px #43566426;
    display: inline-block;
    height: 260px;
    outline: none;
    vertical-align: top;
    width: 320px;
}

.select-list:focus {
    border-color: $aqcua-blue;
}

.select-list > .items {
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
import Vue from "vue";

export const SelectList = Vue.component("select-list", {
    inheritAttrs: false,
    props: {
        items: {
            type: Array,
            default: () => []
        },
        values: {
            type: Object,
            default: () => ({})
        }
    },
    data: function() {
        return {
            valuesData: this.values,
            lastSelected: null
        };
    },
    watch: {
        values(value) {
            this.valuesData = value;
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
});

export default SelectList;
</script>
