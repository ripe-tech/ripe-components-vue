<template>
    <div class="radio-group">
        <div class="radio-item" v-for="(item, index) in items" v-bind:key="index">
            <slot
                name="before-item"
                v-bind:index="index"
                v-bind:item="item"
                v-bind:checked="item.value === value"
            />
            <radio
                v-bind:label="item.label || item.value"
                v-bind:value="item.value"
                v-bind:disabled="disabled || item.disabled"
                v-bind:variant="error || item.error ? 'error' : null"
                v-bind:checked="item.value === value"
                v-bind:index="index"
                v-bind:key="item.value"
                ref="radios"
                v-on:keydown.space="() => onSpaceKey(item)"
                v-on:keydown.up="() => onUpKey(index)"
                v-on:keydown.down="() => onDownKey(index)"
                v-on:click="() => onClick(item)"
            />
            <slot
                name="after-item"
                v-bind:index="index"
                v-bind:item="item"
                v-bind:checked="item.value === value"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.radio-item {
    display: block;
    font-size: 0px;
    line-height: 13px;
    outline: none;
    padding: 10px 0px 10px 0px;
    user-select: none;
    width: fit-content;
}
</style>

<script>
export const RadioGroup = {
    name: "radio-group",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        value: {
            type: String | Number,
            default: null
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
    methods: {
        focus() {
            const firstFocusable = this.$refs.radios.find(r => r.isFocusable());
            if (!firstFocusable) return;
            firstFocusable.focus();
        },
        blur() {
            const firstFocused = this.$refs.radios.find(r => r.isFocused());
            if (!firstFocused) return;
            return firstFocused.blur();
        },
        focusAndSelectItem(item, index) {
            if (item.disabled || this.disabled) return false;
            if (index !== undefined) this.$refs.radios[index].focus();
            this.selectItem(item);
            return true;
        },
        selectItem(item) {
            if (item.disabled || this.disabled) return false;
            if (this.value === item.value) return false;
            this.$emit("update:value", item.value);
            return true;
        },
        onClick(item) {
            this.selectItem(item);
        },
        onSpaceKey(item) {
            this.selectItem(item);
        },
        onUpKey(index) {
            for (let i = index - 1; i > index - this.items.length; i--) {
                const _index = this._negativeModulo(i, this.items.length);
                const item = this.items[_index];
                if (this.focusAndSelectItem(item, _index)) return;
            }
        },
        onDownKey(index) {
            for (let i = index + 1; i < index + this.items.length; i++) {
                const _index = this._negativeModulo(i, this.items.length);
                const item = this.items[_index];
                if (this.focusAndSelectItem(item, _index)) return;
            }
        },
        _negativeModulo(number, modulo) {
            return ((number % modulo) + modulo) % modulo;
        }
    }
};

export default RadioGroup;
</script>
