<template>
    <div class="transfer-list">
        <select-list
            class="container"
            v-bind:items="itemsLeftData"
            v-bind:values.sync="valuesLeftData"
        />
        <div class="buttons">
            <div class="button to-right-all" v-on:click="onMoveAllRightClick()">
                <div class="icon to-right-all-icon" />
            </div>
            <div class="button to-right" v-on:click="onMoveRightClick()">
                <div class="icon to-right-icon" />
            </div>
            <div class="button to-left" v-on:click="onMoveLeftClick()">
                <div class="icon to-left-icon" />
            </div>
            <div class="button to-left-all" v-on:click="onMoveAllLeftClick()">
                <div class="icon to-left-all-icon" />
            </div>
        </div>
        <select-list
            class="container"
            v-bind:items="itemsRightData"
            v-bind:values.sync="valuesRightData"
        />
    </div>
</template>

<style lang="scss" scoped>
.transfer-list {
    min-height: 265px;
}

.transfer-list > .container {
    border: solid 1px #e4e8f0;
    border-radius: 6px;
    box-shadow: 0px 6px 24px 0px #43566426;
    display: inline-block;
    height: 260px;
    margin: 20px 0px 0px 0px;
    vertical-align: top;
    width: 320px;
}

.transfer-list > .buttons {
    display: inline-block;
    margin-left: 49px;
    margin-right: 49px;
    margin-top: 34px;
}

.transfer-list > .buttons .button {
    background-color: #f9fafd;
    border: solid 2px #e4e8f0;
    border-radius: 6px;
    cursor: pointer;
    height: 32px;
    margin-top: 4px;
    width: 32px;
}

.transfer-list > .buttons .button > .icon {
    height: 32px;
}

.transfer-list > .buttons .button > .icon.to-right-icon {
    background: url("~./assets/chevron-right.svg") no-repeat center;
}

.transfer-list > .buttons .button > .icon.to-right-all-icon {
    background: url("~./assets/chevron-group-right.svg") no-repeat center;
}

.transfer-list > .buttons .button > .icon.to-left-icon {
    background: url("~./assets/chevron-left.svg") no-repeat center;
}

.transfer-list > .buttons .button > .icon.to-left-all-icon {
    background: url("~./assets/chevron-group-left.svg") no-repeat center;
}
</style>

<script>
import Vue from "vue";

export const SelectListController = Vue.component("transfer-list", {
    inheritAttrs: false,
    props: {
        itemsLeft: {
            type: Array,
            default: () => []
        },
        itemsRight: {
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
            valuesLeftData: this.valuesLeft,
            valuesRightData: this.valuesRight,
            itemsLeftData: this.itemsLeft,
            itemsRightData: this.itemsRight
        };
    },
    watch: {
        valuesLeft(value) {
            this.valuesLeftData = value;
        },
        valuesRight(value) {
            this.valuesRightData = value;
        },
        itemsLeft(value) {
            this.itemsLeftData = value;
        },
        itemsRight(value) {
            this.itemsRightData = value;
        },
        valuesLeftData(value) {
            this.$emit("update:valuesLeft", value);
        },
        valuesRightData(value) {
            this.$emit("update:valuesRight", value);
        },
        itemsRightData(value) {
            this.$emit("update:itemsRight", value);
        },
        itemsLeftData(value) {
            this.$emit("update:itemsLeft", value);
        }
    },
    methods: {
        moveAllRight() {
            this.itemsRightData = [...this.itemsRightData, ...this.itemsLeftData];
            this.itemsLeftData = [];
            this.valuesLeftData = {};
            this.valuesRightData = {};
        },
        moveAllLeft() {
            this.itemsLeftData = [...this.itemsLeftData, ...this.itemsRightData];
            this.itemsRightData = [];
            this.valuesLeftData = {};
            this.valuesRightData = {};
        },
        moveRight() {
            this.itemsLeftData = this._move(
                this.itemsLeftData,
                this.valuesLeftData,
                this.itemsRightData
            );
        },
        moveLeft() {
            this.itemsRightData = this._move(
                this.itemsRightData,
                this.valuesRightData,
                this.itemsLeftData
            );
        },
        _move(fromItems, fromValues, toItems) {
            const newFromItems = [];

            fromItems.forEach((item, index) => {
                // ignore items that are not selected
                if (!fromValues[item.value]) {
                    newFromItems.push(item);
                    return;
                }

                // move the item between lists
                toItems.push(item);

                // remove the item from the selected set
                this.$delete(fromValues, item.value);
            });

            return newFromItems;
        },
        onMoveRightClick() {
            this.moveRight();
        },
        onMoveLeftClick() {
            this.moveLeft();
        },
        onMoveAllRightClick() {
            this.moveAllRight();
        },
        onMoveAllLeftClick() {
            this.moveAllLeft();
        }
    }
});

export default SelectListController;
</script>
