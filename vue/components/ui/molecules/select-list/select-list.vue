<template>
    <div class="select-list">
        <div class="container-content">
            <div
                class="content-item"
                v-bind:class="{ selected: item.selected }"
                v-for="item in items"
                v-bind:key="item.index"
                v-on:click="selectItem(item)"
            >
                <span>{{ item.value }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.select-list {
    border-radius: 6px;
    box-shadow: 0px 6px 24px 0px #43566426;
    display: inline-block;
    height: 260px;
    vertical-align: top;
    width: 320px;
}

.container-content {
    height: 100%;
    overflow-y: auto;
    user-select: none;
    width: 100%;
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

.content-item:hover {
    opacity: 0.9;
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
        }
    },
    data: function() {
        return {
            controlPressed: false,
            controledItems: this.items,
            valueData: []
        };
    },
    created: function() {
        this._onCreate();
    },
    mounted: async function() {
        document.addEventListener(
            "keydown",
            event => {
                const keyName = event.key;

                if (keyName === "Control") {
                    this.controlPressed = true;
                }
            },
            false
        );

        document.addEventListener(
            "keyup",
            event => {
                const keyName = event.key;

                // As the user releases the Ctrl key, the key is no longer active,
                // so event.ctrlKey is false.
                if (keyName === "Control") {
                    this.controlPressed = false;
                }
            },
            false
        );
    },
    methods: {
        _onCreate() {
            this.controledItems.forEach((element, index) => {
                element.selected = false;
                this.$set(this.controledItems, index, Object.assign({}, element));
            });
        },
        _removeItem(item) {
            for (var i = 0; i < this.valueData.length; i++) {
                if (this.valueData[i].value === item.value) {
                    this.valueData.splice(i, 1);
                    break;
                }
            }
        },
        _unselectAll() {
            this.controledItems.forEach(element => {
                element.selected = false;
            });
            this.valueData.splice(0);
        },
        selectItem(item) {
            if (!this.controlPressed && !item.selected) {
                this._unselectAll();
            }
            item.selected = !item.selected;

            if (item.selected) {
                this.valueData.push(item);
            } else {
                this._removeItem(item);
            }
            this.$emit("update:value", this.valueData);
        }
    }
});

export default SelectList;
</script>
