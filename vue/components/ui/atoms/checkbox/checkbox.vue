<template>
    <div class="checkbox">
        <div
            class="choice"
            v-bind:class="{
                active: activeItems[index],
                checked: values[item.value],
                disabled: disabled || item.disabled,
                error: error || item.error
            }"
            v-bind:index="index"
            v-bind:tabindex="item.disabled ? '' : '0'"
            v-for="(item, index) in items"
            v-bind:key="index"
        >
            <div
                class="checkbox-input"
                v-on:click="onClick(item)"
                v-on:keydown.space="onSpace(item)"
                v-on:mousedown="onMouseDown(index)"
                v-on:mouseup="onMouseUp(index)"
            >
                <input type="checkbox" class="value" v-bind:id="item.value" />
                <div class="checkbox-square" />
                <label class="label" for="item.value">{{
                    item.label ? item.label : item.value
                }}</label>
            </div>
            <slot v-bind:item="item" v-bind:index="index" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.choice {
    display: block;
    line-height: 13px;
    outline: none;
    padding: 10px 0px 10px 0px;
    user-select: none;
    width: fit-content;
}

.choice > .checkbox-input {
    display: inline-block;
}

.choice > .checkbox-input > .value {
    display: none;
}

.choice > .checkbox-input > .checkbox-square {
    background-color: #fafbfc;
    border: 2px solid #dfe1e5;
    border-radius: 2px 2px 2px 2px;
    cursor: pointer;
    display: inline-block;
    height: 4px;
    padding: 3px 3px 3px 3px;
    vertical-align: middle;
    width: 4px;
}

.choice:not(.disabled):not(.error).active > .checkbox-input > .checkbox-square {
    background: url("~./assets/check-dark.svg") center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #c3c9cf;
    padding: 3px 3px 3px 3px;
}

.choice.error > .checkbox-input > .checkbox-square {
    background-color: #f4f5f7;
    border: 2px solid $dark-red;
}

.choice.disabled > .checkbox-input > .checkbox-square {
    background: none center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f4f5f7;
    cursor: default;
}

.choice.checked > .checkbox-input > .checkbox-square {
    background: url("~./assets/check.svg") center / 7px 6px no-repeat $dark;
    border: 2px solid $dark;
    padding: 3px 3px 3px 3px;
}

.choice.error.checked > .checkbox-input > .checkbox-square {
    background: url("~./assets/check.svg") center / 7px 6px no-repeat $dark;
    border: 2px solid $dark-red;
}

.choice.disabled.checked > .checkbox-input > .checkbox-square {
    background: url("~./assets/check-gray.svg") center / 7px 6px no-repeat #f4f5f7;
    border: 2px solid #f6f7f9;
    padding: 3px 3px 3px 3px;
}

.choice:focus:not(.disabled) > .checkbox-input > .checkbox-square {
    border-color: $aqcua-blue;
}

.choice > .checkbox-input > .label {
    color: $grey;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    margin: 0px 0px 0px 4px;
    vertical-align: middle;
}

.choice.disabled > .checkbox-input > .label {
    cursor: default;
}
</style>
<script>
export const Checkbox = {
    name: "checkbox",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        values: {
            type: Object,
            default: () => {}
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            activeItems: new Array(this.items.length).fill(false)
        };
    },
    methods: {
        selectItem(item) {
            if (this.disabled || item.disabled) return;
            if (this.values[item.value]) return;

            const updated = Object.assign({}, this.values);
            updated[item.value] = true;

            this.$emit("selected:value", item.value);
            this.$emit("update:values", updated);
        },
        deselectItem(item) {
            if (this.disabled || item.disabled) return;
            if (!this.values[item.value]) return;

            const updated = Object.assign({}, this.values);
            delete updated[item.value];

            this.$emit("deselected:value", item.value);
            this.$emit("update:values", updated);
        },
        toggleItem(item) {
            this.values[item.value] ? this.deselectItem(item) : this.selectItem(item);
        },
        isChoiceActive(index) {
            return this.activeItems[index];
        },
        onSpace(item) {
            this.toggleItem(item);
        },
        onClick(item) {
            this.toggleItem(item);
        },
        onMouseDown(index) {
            this.$set(this.activeItems, index, true);
        },
        onMouseUp(index) {
            this.$set(this.activeItems, index, false);
        }
    }
};

export default Checkbox;
</script>
