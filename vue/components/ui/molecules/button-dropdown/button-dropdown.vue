<template>
    <div class="button-dropdown" v-bind:class="classes">
        <div
            class="button button-primary"
            v-on:click="onPrimaryClick"
            v-on:mouseover="onMouseOverPrimary"
            v-on:mouseout="onMouseOutPrimary"
        >
            <icon
                class="icon"
                v-bind:class="classesPrimary"
                v-bind:icon="primaryIcon"
                v-bind:color="buttonColorPrimary"
                v-if="primaryIcon"
            />
            <span class="label">{{ label }} </span>
        </div>
        <div
            class="button button-secondary"
            v-bind:class="classesSecondary"
            ref="button-secondary"
            v-on:click="onSecondaryClick"
            v-on:mouseover="onMouseOverSecondary"
            v-on:mouseout="onMouseOutSecondary"
        >
            <icon class="icon" v-bind:icon="secondaryIcon" v-bind:color="buttonColorSecondary" />
        </div>
        <dropdown
            v-bind:items="items"
            v-bind:visible.sync="dropdownVisibleData"
            v-bind:owners="$refs['button-secondary']"
            v-on:click:item="onDropdownItemClicked"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-dropdown {
    display: inline-block;
    font-size: 0px;
    line-height: 38px;
    position: relative;
}

.button-dropdown.disabled {
    cursor: default;
    opacity: 0.4;
    pointer-events: none;
}

.button-dropdown.button-dropdown-small {
    line-height: 30px;
}

.button-dropdown.button-dropdown-tiny {
    line-height: 22px;
}

.button-dropdown > .button {
    background-color: #ffffff;
    border: 1px solid #e4e8f0;
    box-sizing: border-box;
    color: $pale-grey;
    cursor: pointer;
    display: inline-block;
    height: 38px;
    line-height: 36px;
    min-width: 20px;
    user-select: none;
    vertical-align: top;
}

.button-dropdown.button-dropdown-small > .button {
    height: 30px;
    line-height: 28px;
}

.button-dropdown.button-dropdown-tiny > .button {
    height: 22px;
    line-height: 20px;
}

.button-dropdown > .button > .label {
    font-size: 13px;
}

.button-dropdown.button-dropdown-small > .button > .label {
    font-size: 12px;
}

.button-dropdown.button-dropdown-tiny > .button > .label {
    font-size: 10px;
}

.button-dropdown > .button:hover {
    background-color: $black;
    border-color: $black;
    color: #ffffff;
}

.button-dropdown > .button:active {
    background-color: #2d2d2d;
    border-color: #2d2d2d;
}

.button-dropdown > .button.button-primary {
    border-radius: 6px 0px 0px 6px;
    padding: 0px 8px 0px 6px;
}

.button-dropdown > .button.button-secondary {
    border-left: none;
    border-radius: 0px 6px 6px 0px;
    font-size: 0px;
    padding: 0px 4px 0px 4px;
}

.button-dropdown > .button.button-primary > .label {
    font-weight: 600;
    letter-spacing: 0.3px;
    padding: 0px 0px 0px 6px;
    vertical-align: middle;
}

.button-dropdown > .button > .icon {
    height: 22px;
    vertical-align: middle;
    width: 22px;
}

.button-dropdown.button-dropdown-small > .button > .icon {
    height: 20px;
    width: 20px;
}

.button-dropdown.button-dropdown-tiny > .button > .icon {
    height: 16px;
    width: 16px;
}

.button-dropdown.button-dropdown-black > .button {
    background-color: #2d2d2d;
    color: #ffffff;
}

.button-dropdown.button-dropdown-black > .button:hover,
.button-dropdown.button-dropdown-black > .button:active {
    background-color: #ffffff;
    color: #2d2d2d;
}

.button-dropdown > .dropdown-container {
    margin-top: 3px;
    min-width: 120px;
    position: absolute;
    right: 0px;
    width: fit-content;
}
</style>

<script>
export const ButtonDropdown = {
    name: "button-dropdown",
    props: {
        size: {
            type: String,
            default: "medium"
        },
        colorVariant: {
            type: String,
            default: "white"
        },
        primaryIcon: {
            type: String,
            default: null
        },
        secondaryIcon: {
            type: String,
            default: "chevron-down"
        },
        label: {
            type: String,
            default: null
        },
        items: {
            type: Array,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        dropdownVisible: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            primaryActive: false,
            secondaryActive: false,
            dropdownVisibleData: this.dropdownVisible
        };
    },
    computed: {
        classes() {
            const base = {
                disabled: this.disabled
            };
            base["button-dropdown-" + this.size] = true;
            base["button-dropdown-" + this.colorVariant] = true;
            return base;
        },
        buttonColorPrimary() {
            if (this.primaryActive) return this.colorVariant === "black" ? "#000000" : "#ffffff";
            return this.colorVariant === "black" ? "#ffffff" : "#000000";
        },
        buttonColorSecondary() {
            if (this.secondaryActive) return this.colorVariant === "black" ? "#000000" : "#ffffff";
            return this.colorVariant === "black" ? "#ffffff" : "#000000";
        },
        classesPrimary() {
            return {
                "icon-front": !this.primaryActive,
                "icon-back": this.primaryActive
            };
        },
        classesSecondary() {
            return {
                "icon-front": !this.secondaryActive,
                "icon-back": this.secondaryActive
            };
        }
    },
    watch: {
        dropdownVisible(value) {
            this.dropdownVisibleData = value;
        },
        dropdownVisibleData(value) {
            this.$emit("update:dropdownVisible", value);
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisibleData = !this.dropdownVisibleData;
        },
        onSecondaryClick() {
            if (this.disabled) return;
            this.toggleDropdown();
        },
        onPrimaryClick(event) {
            if (this.disabled) return;
            this.$emit("click", event);
        },
        onDropdownItemClicked(event, item) {
            this.$emit("click:item", event, item);
        },
        onMouseOverPrimary() {
            this.primaryActive = true;
        },
        onMouseOutPrimary() {
            this.primaryActive = false;
        },
        onMouseOverSecondary() {
            this.secondaryActive = true;
        },
        onMouseOutSecondary() {
            this.secondaryActive = false;
        }
    }
};

export default ButtonDropdown;
</script>
