<template>
    <button-color
        class="button-toggle"
        v-bind:class="classes"
        v-bind:text="textComputed"
        v-bind:icon="iconComputed"
        v-bind:color="colorComputed"
        v-bind:disabled="disabled"
        v-bind:min-width="0"
        v-bind="buttonProps"
        v-on:click="onClick"
    />
</template>

<style lang="scss" scoped>
.button-toggle.default {
    border-radius: 5px;
}

.button-toggle.left {
    border-radius: 5px 0px 0px 5px;
}

.button-toggle.middle {
    border-radius: 0px;
}

.button-toggle.right {
    border-radius: 0px 5px 5px 0px;
}
</style>

<script>
export const ButtonToggle = {
    name: "button-toggle",
    props: {
        /**
         * The name of the primary icon to appear in the middle of the button.
         * This icon will show when `value` is true.
         */
        icon: {
            type: String,
            default: null
        },
        /**
         * The name of the icon to appear in the middle of the button.
         * This icon will show when `value` is false.
         */
        iconSecondary: {
            type: String,
            default: null
        },
        /**
         * The color of the button when `value` is false.
         */
        color: {
            type: String,
            default: "white"
        },
        /**
         * The color of the button when `value` is true.
         */
        colorSecondary: {
            type: String,
            default: "black"
        },
        /**
         * The text of the button, will be shown if no
         * icon is provided.
         */
        text: {
            type: String,
            default: null
        },
        /**
         * The value of the button.
         */
        value: {
            type: Boolean,
            default: false
        },
        /**
         * The orientation of the button that modified its borders
         * ("default", "left", "center" and "right").
         */
        orientation: {
            type: String,
            default: "default"
        },
        /**
         * If the button is disabled.
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Button color props.
         */
        buttonProps: {
            type: Object,
            default: () => ({})
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
            this.$emit("update:value", value);
        }
    },
    computed: {
        iconComputed() {
            return this.valueData ? this.iconSecondaryComputed : this.icon;
        },
        iconSecondaryComputed() {
            return this.iconSecondary ? this.iconSecondary : this.icon;
        },
        colorComputed() {
            return this.valueData ? this.colorSecondary : this.color;
        },
        textComputed() {
            // shows text if no icon is provided
            return this.icon ? null : this.text;
        },
        classes() {
            const base = { active: this.valueData };
            base[this.orientation] = true;
            return base;
        }
    },
    methods: {
        toggleValue() {
            this.valueData = !this.valueData;
        },
        onClick(event) {
            this.toggleValue();
            this.$emit("click", event);
        }
    }
};

export default ButtonToggle;
</script>
