<template>
    <button-icon
        class="button-icon-toggle"
        v-bind="buttonIconProps"
        v-bind:icon="iconComputed"
        v-bind:color="colorComputed"
        v-on:click="onClick"
    />
</template>

<style lang="scss" scoped></style>

<script>
export const ButtonIconToggle = {
    name: "button-icon-toggle",
    props: {
        /**
         * The name of the primary icon to appear in the middle of the button.
         * This icon will show when `value` is true.
         */
        icon: {
            type: String,
            mandatory: true
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
            default: "gray"
        },
        /**
         * The color of the button when `value` is true.
         */
        colorSecondary: {
            type: String,
            default: "black"
        },
        /**
         * The value of the button.
         */
        value: {
            type: Boolean,
            default: false
        },
        buttonIconProps: {
            type: Object,
            default: () => {}
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
        colorComputed() {
            return this.valueData ? this.colorSecondary : this.color;
        },
        iconComputed() {
            return this.valueData ? this.iconSecondaryComputed : this.icon;
        },
        iconSecondaryComputed() {
            return this.iconSecondary ? this.iconSecondary : this.icon;
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

export default ButtonIconToggle;
</script>
