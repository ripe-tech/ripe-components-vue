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
                v-bind:tabindex="_getTabIndex(item, index)"
                v-bind:key="item.value"
                v-bind:ref="`radio-${index}`"
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
            type: String,
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
    computed: {
        firstEnabledIndex() {
            if (this.disabled) return null;

            const firstEnabled = this.items
                .map((item, index) => [item, index])
                .find(([item, index]) => !item.disabled);

            return firstEnabled ? firstEnabled[1] : null;
        },
        firstEnabledItem() {
            return this.$refs[`radio-${this.firstEnabledIndex}`];
        }
    },
    methods: {
        focus() {
            return this.firstEnabledItem.focus();
        },
        blur() {
            return this.firstEnabledItem.blur();
        },
        focusAndSelectItem(item, index) {
            if (item.disabled || this.disabled) return false;
            if (index !== undefined) this.$refs[`radio-${index}`][0].$refs.root.focus();
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
        _getTabIndex(item, index) {
            if (this.disabled || item.disabled) return null;
            return this.firstEnabledIndex === index ? 0 : -1;
        },
        _negativeModulo(number, modulo) {
            return ((number % modulo) + modulo) % modulo;
        }
    }
};

export default RadioGroup;
</script>
