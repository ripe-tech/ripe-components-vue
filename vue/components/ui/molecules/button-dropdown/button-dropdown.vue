<template>
    <div class="button-dropdown" v-bind:class="classes">
        <div class="button button-primary" v-on:click="onPrimaryClick">
            <template v-if="primaryIcon">
                <img class="icon icon-front" v-bind:src="blackPrimaryIcon" />
                <img class="icon icon-back" v-bind:src="whitePrimaryIcon" />
            </template>
            <span class="label">{{ label }} </span>
        </div>
        <div class="button button-secondary" v-on:click.stop="onSecondaryClick">
            <img class="icon icon-front" v-bind:src="blackSecondaryIcon" />
            <img class="icon icon-back" v-bind:src="whiteSecondaryIcon" />
        </div>
        <dropdown
            v-bind:items="items"
            v-bind:visible.sync="dropdownVisible"
            v-on:item-clicked="onDropdownItemClicked"
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

.button-dropdown.button-dropdown-small {
    line-height: 30px;
}

.button-dropdown > .button {
    background-color: $white;
    border: 1px solid #e4e8f0;
    box-sizing: border-box;
    color: $pale-grey;
    cursor: pointer;
    display: inline-block;
    font-size: 13px;
    height: 38px;
    min-width: 20px;
    user-select: none;
    vertical-align: top;
    line-height: 36px;
}

.button-dropdown.button-dropdown-small > .button {
    font-size: 12px;
    height: 30px;
    line-height: 28px;
}

.button-dropdown > .button:hover {
    background-color: $black;
    border-color: $black;
    color: $white;
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

.button-dropdown > .button > .icon.icon-back {
    display: none;
}

.button-dropdown > .button:hover > .icon.icon-back {
    display: inline;
}

.button-dropdown > .button:hover > .icon.icon-front {
    display: none;
}

.button-dropdown > .dropdown-container {
    min-width: 120px;
    position: absolute;
    right: 0px;
    top: 34px;
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
        dropdownVisible: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
            color: "white",
            dropdownVisibleData: this.dropdownVisible
        };
    },
    computed: {
        blackPrimaryIcon() {
            return this._getIconPath(this.primaryIcon, "black");
        },
        whitePrimaryIcon() {
            return this._getIconPath(this.primaryIcon, "white");
        },
        blackSecondaryIcon() {
            return this._getIconPath(this.secondaryIcon, "black");
        },
        whiteSecondaryIcon() {
            return this._getIconPath(this.secondaryIcon, "white");
        },
        classes() {
            const base = {};
            base["button-dropdown-" + this.size] = true;
            return base;
        }
    },
    watch: {
        dropdownVisible(value) {
            this.dropdownVisibleData = value;
        },
        dropdownVisibleData(value) {
            this.$emit("update:dropdown-visible", value);
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        onSecondaryClick() {
            this.toggleDropdown();
        },
        onPrimaryClick(event) {
            this.$emit("click", event);
        },
        onDropdownItemClicked(item) {
            this.$emit(`click:${item.event}`);
        },
        _getIconPath(icon, color) {
            return require(`./../../../../assets/icons/${color}/${icon}.svg`);
        }
    }
};

export default ButtonDropdown;
</script>
