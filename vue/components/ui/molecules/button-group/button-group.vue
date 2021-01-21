<template>
    <div class="button-group">
        <div
            class="button-container"
            v-for="item in items"
            v-bind:key="item.value"
            v-on:click="onClick($event, item)"
        >
            <slot v-bind:item="item" v-bind:selected="valueData === item.value">
                <button-color
                    class="button-color"
                    v-bind:class="buttonClasses(item)"
                    v-bind:disabled="disabled || item.disabled"
                    v-bind:color="item.color"
                >
                    <slot
                        v-bind:item="item"
                        v-bind:selected="valueData === item.value"
                        v-bind:name="`button-${item.value}`"
                    >
                        {{ item.label || item.value }}
                    </slot>
                </button-color>
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/colors.scss";

.button-group > .button-container {
    display: inline-block;
}

.button-group > .button-container > .button {
    margin-right: 8px;
}

.button-group > .button-container:last-child > .button {
    margin-right: 0px;
}

.button-group > .button-container > .button.selected {
    background-color: $black;
    border-color: $black;
    color: $white;
}
</style>

<script>
/**
 * A group of values that translate into buttons.
 */
export const ButtonGroup = {
    name: "button-group",
    props: {
        /**
         * The items representing each button. Example:
         * { value: "1", label: "Item 1", color: "blue", disabled: false }.
         */
        items: {
            type: Array,
            default: () => []
        },
        /**
         * The currently selected value.
         */
        value: {
            type: String,
            default: null
        },
        /**
         * Whether the buttons are disabled.
         */
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            valueData: this.value
        };
    },
    watch: {
        value(value) {
            this.valueData = value;
        },
        valueData(value) {
            /**
             * Triggered when the selected value changes.
             *
             * @property {String} value The new selected value.
             */
            this.$emit("update:value", value);
        }
    },
    methods: {
        buttonClasses(item) {
            const base = {
                selected: this.valueData === item.value
            };
            base[item.value] = true;
            return base;
        },
        onClick(event, item) {
            if (this.disabled || item.disabled) return;

            this.valueData = item.value;
            /**
             * Triggered when the user clicks a button.
             *
             * @property {Object} event The native event.
             * @property {Object} item The item that was clicked.
             */
            this.$emit("click", event, item);
        }
    }
};

export default ButtonGroup;
</script>
