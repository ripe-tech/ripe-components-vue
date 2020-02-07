<template>
    <div class="button-dropdown">
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
    position: relative;
    font-size: 0px;
}

.button-dropdown > .button {
    background-color: $white;
    border: 1px solid #e4e8f0;
    box-sizing: border-box;
    color: $pale-grey;
    display: inline-block;
    cursor: pointer;
    min-width: 20px;
    transition: background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        color 0.15s ease-in-out;
    user-select: none;
    vertical-align: top;
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
    padding: 4px 8px 4px 6px;
}

.button-dropdown > .button.button-secondary {
    border-radius: 0px 6px 6px 0px;
    padding: 4px 4px 4px 4px;
}

.button-dropdown > .button.button-primary > .label {
    float: right;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    line-height: 22px;
    padding: 0px 0px 0px 6px;
}

.button-dropdown > .button > .icon {
    height: 22px;
    vertical-align: middle;
    width: 22px;
    transition: opacity 0.15s ease-in-out;
}

.button-dropdown > .button > .icon.icon-back {
    opacity: 0;
    margin-left: -22px;
}

.button-dropdown > .button:hover > .icon.icon-back {
    opacity: 1;
}

.button-dropdown > .button:hover > .icon.icon-front {
    opacity: 0;
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
