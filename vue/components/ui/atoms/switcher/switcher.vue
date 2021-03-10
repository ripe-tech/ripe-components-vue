<template>
    <div class="switcher" v-bind:style="style" v-bind:class="classes" v-on:click="onClick">
        <div class="switcher-button" v-bind:style="toggleAnimation" />
        <div class="switcher-text" v-if="text">
            {{ text }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.switcher {
    background-color: $upper-grey;
    border: 2px solid $upper-grey;
    border-radius: 500px 500px 500px 500px;
    cursor: pointer;
    height: 20px;
    position: relative;
    transition-duration: 0.4s;
    transition-property: border-color, background-color;
    width: 40px;
}

.switcher.disabled {
    cursor: default;
    opacity: 0.3;
}

.switcher > .switcher-button {
    background-color: $white;
    border-radius: 10px 10px 10px 10px;
    height: 20px;
    transition-duration: 0.2s;
    transition-property: margin;
    width: 20px;
}

.switcher > .switcher-text {
    font-size: 12px;
    left: 50px;
    line-height: 12px;
    position: absolute;
    top: 4px;
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
        checkedColor: {
            type: String,
            default: null
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
        style() {
            const base = {};
            if (this.checkedData) {
                base.borderColor = this.checkedColor || "#1d1d1d";
                base.backgroundColor = this.checkedColor || "#1d1d1d";
            }
            return base;
        },
        classes() {
            const base = {
                checked: this.checkedData,
                disabled: this.disabled
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
