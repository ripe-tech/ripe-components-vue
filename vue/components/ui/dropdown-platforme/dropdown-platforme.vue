<template>
    <div class="dropdown-platforme">
        <global-events v-on:keydown.esc="onEscKey()" />
        <label-platforme v-bind:text="fieldLabel" for="dropdown" v-if="fieldLabel" />
        <div class="dropdown-container" v-bind:id="id">
            <div
                class="dropdown-button"
                v-bind:class="{ disabled: disabled, focused: focused }"
                v-bind:style="dropdownButtonStyle"
                v-on:click="onToggleDropdown"
            >
                {{ selectedOption.text }}
            </div>
            <div class="dropdown" v-bind:style="dropdownStyle" v-show="visible">
                <div class="options-container">
                    <slot
                        v-bind:name="`options-${option - id}`"
                        v-bind:option="option"
                        v-for="option in options"
                    >
                        <div
                            class="option"
                            v-bind:key="option.id"
                            v-on:click="onDropdownSelect(option.id)"
                        >
                            {{ option.text }}
                        </div>
                    </slot>
                </div>
            </div>
        </div>
        <select
            class="mobile-dropdown"
            v-bind:value="value"
            v-on:change="onDropdownSelect($event.target.value)"
        >
            <option v-bind:value="options.id" v-for="options in options" v-bind:key="options.id">
                {{ options.text }}
            </option>
            <option value="placeholder_id" style="display: none;">
                {{ placeholder }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.label {
    display: block;
    margin-bottom: 7px;
}

body.mobile .dropdown-platforme .dropdown-container {
    display: none;
}

body.desktop .dropdown-platforme .mobile-dropdown,
body.tablet .dropdown-platforme .mobile-dropdown {
    display: none;
}

.dropdown-platforme .dropdown-container .dropdown-button,
.dropdown-platforme .dropdown-container .dropdown {
    color: $dark;
    cursor: pointer;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
}

.dropdown-platforme .dropdown-container .dropdown-button {
    background: url("~./assets/chevron-down.svg") no-repeat;
    background-color: #f9fafd;
    background-position: right 12px center;
    background-size: 14px 14px;
    border: solid 1px #e4e8f0;
    border-radius: 6px;
    height: 40px;
    line-height: 40px;
    margin: 0px 0px 1px 1px;
    padding: 0px 8px 0px 8px;
}

.dropdown-platforme .dropdown-container .dropdown-button:hover {
    background-color: $lightgrey;
    border: solid 1px $dropdown-border-hover-color;
    color: $grey;
}

.dropdown-platforme .dropdown-container .dropdown-button.disabled,
.dropdown-platforme .dropdown-container .dropdown-button.disabled:active {
    background-color: $dropdown-disabled-background-color;
    border: solid 1px #e4e8f0;
    color: $dropdown-disabled-color;
    margin: inherit;
}

.dropdown-platforme .dropdown-container .dropdown-button.focused {
    background-color: $white;
    border: solid 2px $dropdown-focus-border-color;
    margin: -1px 0px -1px 0px;
}

.dropdown-platforme .dropdown-container .dropdown {
    background-color: $white;
    border: solid 1px $dropdown-border-color;
    border-radius: 6px;
    box-shadow: 0 6px 24px 0 rgba(67, 86, 100, 0.15);
    margin: 8px 0px 0px 0px;
    position: absolute;
}

.dropdown-platforme .dropdown-container .dropdown .options-container ::v-deep .option {
    height: 32px;
    line-height: 32px;
    padding: 0px 0px 0px 16px;
}

.dropdown-platforme .dropdown-container .dropdown .options-container ::v-deep .option:hover {
    background-color: $lightgrey;
}

.dropdown-platforme .dropdown-container .dropdown .options-container ::v-deep .option:active {
    background-color: $option-pressed-background-color;
}
</style>

<script>
export const DropdownPlatforme = {
    name: "dropdown-platforme",
    props: {
        id: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: null
        },
        placeholder: {
            type: String,
            required: true
        },
        fieldLabel: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        allowTextSelection: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 300
        }
    },
    data: function() {
        return {
            visible: false,
            focused: false,
            selectedOption: this.getOption(this.value)
        };
    },
    mounted: function() {
        document.addEventListener("click", this.onClick);
    },
    destroyed: function() {
        window.removeEventListener("click", this.onClick);
    },
    watch: {
        disabled() {
            if (this.disabled) this.closeDropdown();
        },
        visible() {
            this.focused = this.visible;
        },
        value() {
            this.selectedOption = this.getOption(this.value);
        }
    },
    methods: {
        onClick(event) {
            const dropdownElement = document.getElementById(this.id);
            const targetElement = event.target;

            if (!dropdownElement.contains(targetElement)) this.closeDropdown();
        },
        onEscKey() {
            this.closeDropdown();
        },
        onDropdownSelect(optionId) {
            if (this.disabled) return;
            this.focused = true;
            this.selectOption(optionId);
        },
        selectOption(optionId) {
            this.$emit("update:value", optionId);
            this.toggleDropdown();
        },
        onToggleDropdown() {
            if (!this.disabled) this.toggleDropdown();
        },
        openDropdown() {
            this.visible = true;
        },
        closeDropdown() {
            this.visible = false;
        },
        toggleDropdown() {
            this.visible = !this.visible;
        },
        getOption(optionID) {
            return optionID === "placeholder_id"
                ? { id: optionID, text: this.placeholder }
                : this.options.find(option => option.id === optionID);
        }
    },
    computed: {
        dropdownButtonStyle() {
            const base = {
                width: `${this.width}px`
            };

            if (!this.allowTextSelection) {
                base["user-select"] = "none";
            }

            return base;
        },
        dropdownStyle() {
            const base = {
                width: `${this.width + 16}px`
            };

            if (!this.allowTextSelection) {
                base["user-select"] = "none";
            }

            return base;
        }
    }
};

export default DropdownPlatforme;
</script>
