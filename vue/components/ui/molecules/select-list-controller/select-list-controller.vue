<template>
    <div class="dual">
        <div class="container container-left">
            <select-list v-bind:items="leftData" v-bind:values.sync="valuesLeft" />
        </div>
        <div class="buttons">
            <div class="button to-right-all" v-on:click="moveAll(true)">
                <div class="icon to-right-all-icon" />
            </div>

            <div class="button to-right" v-on:click="moveSelected((toRight = true))">
                <div class="icon to-right-icon" />
            </div>

            <div class="button to-left" v-on:click="moveSelected((toRight = false))">
                <div class="icon to-left-icon" />
            </div>

            <div class="button to-left-all" v-on:click="moveAll(false)">
                <div class="icon to-left-all-icon" />
            </div>
        </div>
        <div class="container container-right">
            <select-list v-bind:items="rightData" v-bind:values.sync="valuesRight" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dual {
    min-height: 265px;
}

.container {
    border: solid 1px #e4e8f0;
    border-radius: 6px;
    box-shadow: 0px 6px 24px 0px #43566426;
    display: inline-block;
    height: 260px;
    margin: 20px 0px 0px 0px;
    vertical-align: top;
    width: 320px;
}

.buttons {
    display: inline-block;
    margin-left: 49px;
    margin-right: 49px;
    margin-top: 34px;
}

.button {
    background-color: #f9fafd;
    border: solid 2px #e4e8f0;
    border-radius: 6px;
    cursor: pointer;
    height: 32px;
    margin-top: 4px;
    width: 32px;
}

.icon {
    height: 32px;
}

.to-right-all-icon {
    background: url("~./assets/group-4_2.svg") no-repeat center;
}

.to-right-icon {
    background: url("~./assets/chevron-right.svg") no-repeat center;
}

.to-left-icon {
    background: url("~./assets/chevron-left.svg") no-repeat center;
}

.to-left-all-icon {
    background: url("~./assets/group-4.svg") no-repeat center;
}

.content-item {
    color: #1d2631;
    cursor: pointer;
    font-size: 14px;
    height: 32px;
    width: 303px;
}

.content-item > span {
    line-height: 32px;
    margin-left: 5px;
}

.content-item.selected,
.content-item:hover {
    background-color: #1d2631;
    color: #ffffff;
}
</style>

<script>
import Vue from "vue";

export const SelectListController = Vue.component("select-list-controller", {
    inheritAttrs: false,
    props: {
        leftItems: {
            type: Array,
            default: () => []
        },
        rightItems: {
            type: Array,
            default: () => []
        },
        valuesLeft: {
            type: Object,
            default: () => ({})
        },
        valuesRight: {
            type: Object,
            default: () => ({})
        },
        leftTitle: {
            type: String,
            default: null
        },
        rightTile: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            selectedItemsLeft: this.valuesLeft,
            selectedItemsRight: this.valuesRight,
            leftData: this.leftItems,
            rightData: this.rightItems
        };
    },
    mounted: async function() {},
    methods: {
        removeItem(value, fromLeft = true) {
            let index = -1;
            if (fromLeft) {
                index = this.leftData.findIndex(element => element.value === value);
                this.leftData.splice(index, 1);
            }
            if (!fromLeft) {
                index = this.rightData.findIndex(element => element.value === value);
                this.rightData.splice(index, 1);
            }
        },
        moveSelected(toRight = true) {
            let values = {};

            if (toRight) {
                const selectedItems = Object.entries(this.selectedItemsLeft);
                selectedItems.forEach(element => {
                    values.value = element[0];
                    this.rightData.push(values);
                    this.$delete(this.selectedItemsLeft, values.value);
                    this.removeItem(values.value, true);
                    values = {};
                });
            } else {
                const selectedItems = Object.entries(this.selectedItemsRight);
                selectedItems.forEach(element => {
                    values.value = element[0];
                    this.leftData.push(values);
                    this.$delete(this.selectedItemsRight, values.value);
                    this.removeItem(values.value, false);
                    values = {};
                });
            }
            this.$emit("update:value", this.rightData);
        },
        moveAll(toRight = true) {
            if (toRight) {
                this.rightData = [...this.leftData, ...this.rightData];
                this.leftData = [];
            } else {
                this.leftData = [...this.rightData, ...this.leftData];
                this.rightData = [];
            }
            this.$emit("update:value", this.rightData);
        }
    }
});

export default SelectListController;
</script>
