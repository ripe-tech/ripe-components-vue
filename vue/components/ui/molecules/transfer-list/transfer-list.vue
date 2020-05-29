<template>
    <div class="transfer-list" v-bind:style="style">
        <select-list
            class="select-list"
            v-bind:items="itemsLeftData"
            v-bind:values.sync="valuesLeftData"
            v-bind:search="search"
            v-on:dblclick="onDblclickLeft"
            v-on:update:items:visible="onVisibleItemsLeft"
        />
        <div class="buttons">
            <div class="button-move button-move-all-right" v-on:click="onMoveAllRightClick" />
            <div class="button-move button-move-right" v-on:click="onMoveRightClick" />
            <div class="button-move button-move-left" v-on:click="onMoveLeftClick" />
            <div class="button-move button-move-left-all" v-on:click="onMoveAllLeftClick" />
        </div>
        <select-list
            class="select-list"
            v-bind:items="itemsRightData"
            v-bind:values.sync="valuesRightData"
            v-bind:search="search"
            v-on:dblclick="onDblclickRight"
            v-on:update:items:visible="onVisibleItemsRight"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.transfer-list {
    height: 288px;
}

.transfer-list > .select-list {
    vertical-align: middle;
}

.transfer-list > .buttons {
    display: inline-block;
    margin: 0px 50px 0px 50px;
    vertical-align: middle;
}

.transfer-list > .buttons > .button-move {
    background-color: $soft-blue;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid $light-white;
    border-radius: 6px;
    cursor: pointer;
    height: 32px;
    margin-top: 10px;
    width: 32px;
}

.transfer-list > .buttons > .button-move:first-child {
    margin-top: 0px;
}

.transfer-list > .buttons > .button-move:hover {
    background-color: $white;
}

.transfer-list > .buttons > .button-move:active {
    background-color: $hard-blue;
}

.transfer-list > .buttons > .button-move.button-move-right {
    background-image: url("~../../../../assets/icons/chevron-right.svg");
    background-size: 20px 20px;
}

.transfer-list > .buttons > .button-move.button-move-all-right {
    background-image: url("~../../../../assets/icons/chevrons-right.svg");
    background-size: 20px 20px;
}

.transfer-list > .buttons > .button-move.button-move-left {
    background-image: url("~../../../../assets/icons/chevron-left.svg");
    background-size: 20px 20px;
}

.transfer-list > .buttons > .button-move.button-move-left-all {
    background-image: url("~../../../../assets/icons/chevrons-left.svg");
    background-size: 20px 20px;
}
</style>

<script>
export const TransferList = {
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
        search: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            valuesLeftData: this.valuesLeft,
            valuesRightData: this.valuesRight,
            itemsLeftData: this.itemsLeft,
            itemsRightData: this.itemsRight,
            visibleLeftData: null,
            visibleRightData: null
        };
    },
    computed: {
        style() {
            const base = { height: this.height ? `${this.height}px` : null };
            return base;
        }
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
        moveLeft(index) {
            this._move(
                this.itemsRightData,
                this.valuesRightData,
                this.itemsLeftData,
                this.itemsRightData[index]
            );
            this.$delete(this.itemsRightData, index);
        },
        moveRight(index) {
            this._move(
                this.itemsLeftData,
                this.valuesLeftData,
                this.itemsRightData,
                this.itemsLeftData[index]
            );
            this.$delete(this.itemsLeftData, index);
        },
        moveAllRight() {
            this.itemsLeftData = this._moveVisible(
                this.itemsLeftData,
                this.valuesLeftData,
                this.itemsRightData,
                this.visibleLeftData
            );
            this.valuesLeftData = {};
            this.valuesRightData = {};
        },
        moveAllLeft() {
            this.itemsRightData = this._moveVisible(
                this.itemsRightData,
                this.valuesRightData,
                this.itemsLeftData,
                this.visibleRightData
            );
            this.valuesLeftData = {};
            this.valuesRightData = {};
        },
        moveSelectedRight() {
            this.itemsLeftData = this._moveSelected(
                this.itemsLeftData,
                this.valuesLeftData,
                this.itemsRightData
            );
        },
        moveSelectedLeft() {
            this.itemsRightData = this._moveSelected(
                this.itemsRightData,
                this.valuesRightData,
                this.itemsLeftData
            );
        },
        /**
         * Moves the selected items from one list to the other.
         *
         * @param {Array} fromItems The list to move items from.
         * @param {Object} fromValues The set of selected items in 'fromItems'.
         * @param {Array} toItems The list to move items to.
         * @returns {Array} The value of 'fromItems' after the selected items
         * have been moved.
         */
        _moveSelected(fromItems, fromValues, toItems) {
            const newFromItems = [];
            fromItems.forEach((item, index) => {
                if (fromValues[item.value]) {
                    this._move(fromItems, fromValues, toItems, item);
                } else {
                    newFromItems.push(item);
                }
            });
            return newFromItems;
        },
        _moveVisible(fromItems, fromValues, toItems, fromVisible) {
            const newFromItems = [];
            fromItems.forEach((item, index) => {
                if (!fromVisible || fromVisible[item.value]) {
                    this._move(fromItems, fromValues, toItems, item);
                } else {
                    newFromItems.push(item);
                }
            });
            return newFromItems;
        },
        _move(fromItems, fromValues, toItems, item) {
            toItems.push(item);
            this.$delete(fromValues, item.value);
        },
        onMoveRightClick() {
            this.moveSelectedRight();
        },
        onMoveLeftClick() {
            this.moveSelectedLeft();
        },
        onMoveAllRightClick() {
            this.moveAllRight();
        },
        onMoveAllLeftClick() {
            this.moveAllLeft();
        },
        onDblclickLeft(event, value, index) {
            this.moveRight(index);
        },
        onDblclickRight(event, value, index) {
            this.moveLeft(index);
        },
        onVisibleItemsLeft(values) {
            this.visibleLeftData = values;
        },
        onVisibleItemsRight(values) {
            this.visibleRightData = values;
        }
    }
};

export default TransferList;
</script>
