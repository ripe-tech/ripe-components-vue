<template>
    <div class="switcher" v-bind:class="classes">
        <div class="switcher-button-container" v-on:click="onClick">
            <div class="switcher-button" v-bind:style="toggleAnimation" />
        </div>
        <div class="switcher-text" v-if="text">
            {{ text }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.switcher {
    align-items: center;
    display: inline-flex;
}

.switcher.disabled {
    cursor: default;
    opacity: 0.3;
}

.switcher > .switcher-button-container {
    border: 2px solid;
    border-radius: 500px 500px 500px 500px;
    cursor: pointer;
    height: 20px;
    transition-duration: 0.4s;
    transition-property: border-color, background-color;
    width: 40px;
}

.switcher.switcher-colored > .switcher-button-container {
    background-color: $upper-grey;
    border-color: $upper-grey;
}

.switcher.switcher-colored.checked > .switcher-button-container {
    background-color: $green;
    border-color: $green;
}

.switcher.switcher-grey > .switcher-button-container {
    background-color: $upper-grey;
    border-color: $upper-grey;
}

.switcher.switcher-grey.checked > .switcher-button-container {
    background-color: $black;
    border-color: $black;
}

.switcher > .switcher-button-container > .switcher-button {
    background-color: $white;
    border-radius: 10px 10px 10px 10px;
    height: 20px;
    transition-duration: 0.2s;
    transition-property: margin;
    width: 20px;
}

.switcher > .switcher-text {
    font-size: 12px;
    margin-left: 5px;
}
</style>

<script>
export const Switcher = {
    name: "switcher",
    props: {
        checked: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: "colored"
        },
        checkedText: {
            type: String,
            default: null
        },
        uncheckedText: {
            type: String,
            default: null
        }
    },
    data: function() {
        return {
            checkedData: this.checked
        };
    },
    computed: {
        toggleAnimation() {
            const base = {};
            if (this.checkedData) {
                base.marginLeft = "20px";
            }
            return base;
        },
        classes() {
            const base = {
                checked: this.checkedData,
                disabled: this.disabled
            };
            base[`switcher-${this.variant}`] = true;
            return base;
        },
        styleContainer() {
            const base = {
                borderColor: this.checkedData ? this.checkedColor : this.uncheckedColor,
                backgroundColor: this.checkedData ? this.checkedColor : this.uncheckedColor
            };
            return base;
        },
        text() {
            return this.checkedData ? this.checkedText : this.uncheckedText;
        }
    },
    watch: {
        checked(value) {
            this.checkedData = value;
        },
        checkedData(value) {
            this.$emit("update:checked", value);
        }
    },
    methods: {
        isDisabled() {
            return this.disabled;
        },
        toggle() {
            if (this.disabled) return;
            this.checkedData = !this.checkedData;
        },
        onClick() {
            this.toggle();
        }
    }
};

export default Switcher;
</script>
