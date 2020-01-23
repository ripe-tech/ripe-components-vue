<template>
    <div class="button-dropdown">
        <div class="button button-principal" v-on:click.stop="onPrimaryButtonClicked">
            <img class="icon" v-bind:src="iconPath(icon)" />
            <img class="icon-hover" v-bind:src="iconHoverPath(icon)" />
            <span class="label">{{ text }} </span>
        </div>

        <div class="button button-secondary" v-on:click.stop="onToggleDropdown">
            <img class="icon" v-bind:src="iconPath(secondaryIcon)" />
            <img class="icon-hover" v-bind:src="iconHoverPath(secondaryIcon)" />
        </div>
        <dropdown
            class="dropdown-container"
            v-bind:items="items"
            v-bind:visible.sync="dropdownVisible"
            v-bind:class="{ inactive: !dropdownVisible }"
            v-on:item-clicked="onDropdownItemClicked"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.button-dropdown {
    display: inline-block;
    position: relative;
}

.dropdown-container {
    min-width: 120px;
    position: absolute;
    right: 0px;
    top: 34px;
    width: fit-content;
}

.dropdown-container.inactive {
    border: none;
    box-shadow: none;
}

.button {
    background-color: $white;
    border: 1px solid #e4e8f0;
    box-sizing: border-box;
    color: $pale-grey;
    cursor: pointer;
    float: left;
    margin: 0px 0px 0px 0px;
    min-width: 20px;
    transition: background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        color 0.15s ease-in-out,
        opacity 0.15s ease-in-out;
    user-select: none;
}

.button.button-principal {
    border-radius: 6px 0px 0px 6px;
    border-width: 1px 0px 1px 1px;
    padding: 4px 8px 4px 6px;
}

.button.button-secondary {
    border-radius: 0px 6px 6px 0px;
    padding: 4px 4px 4px 4px;
}

.button.button-principal:active,
.button.button-secondary:active {
    background-color: #2d2d2d;
    border-color: #2d2d2d;
}

.button.button-secondary:hover,
.button.button-principal:hover {
    background-color: $black;
    color: $white;
}

.button.button-principal .label {
    float: right;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    line-height: 22px;
    padding: 0px 0px 0px 6px;
}

.button.button-principal .icon,
.button.button-secondary .icon,
.button.button-principal .icon-hover,
.button.button-secondary .icon-hover {
    height: 22px;
    vertical-align: middle;
    width: 22px;
}

.button.button-secondary .icon-hover,
.button.button-principal .icon-hover {
    display: none;
}

.button.button-secondary:hover .icon-hover,
.button.button-principal:hover .icon-hover {
    display: inline;
}

.button.button-secondary .icon,
.button.button-principal .icon {
    display: inline;
}

.button.button-secondary:hover .icon,
.button.button-principal:hover .icon {
    display: none;
}
</style>

<script>
export const ButtonDropdown = {
    name: "button-dropdown",
    props: {
        icon: {
            type: String,
            default: null
        },
        secondaryIcon: {
            type: String,
            default: "chevron-down"
        },
        text: {
            type: String,
            default: null
        },
        items: {
            type: Array,
            default: null
        }
    },
    data: function() {
        return {
            color: "white",
            dropdownVisible: false
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        onToggleDropdown() {
            this.toggleDropdown();
        },
        onPrimaryButtonClicked() {
            this.$emit("click:primary-button");
        },
        onDropdownItemClicked(item) {
            this.$emit("click:item-dropdown", { value: item.value });
        },
        iconPath(iconName) {
            return require(`./../../../../assets/icons/black/${iconName}.svg`);
        },
        iconHoverPath(iconName) {
            return require(`./../../../../assets/icons/white/${iconName}.svg`);
        }
    }
};

export default ButtonDropdown;
</script>
