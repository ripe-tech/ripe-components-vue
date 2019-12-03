<template>
    <div class="dropdown-platforme">
        <global-events v-on:keydown.esc="onEscKey()" />
        <label-platforme class="label" v-bind:text="fieldLabel" for="dropdown" v-if="fieldLabel" />
        <div class="dropdown-container" v-if="!isMobile" id="dropdown">
            <div
                class="dropdown-button"
                v-bind:class="{disabled: disabled, focused: focused}"
                v-bind:style="dropdownButtonStyle"
                v-on:click="onToggleDropdown"
            >
                {{ placeholder }}
            </div>
            <div class="dropdown" v-bind:style="dropdownStyle" v-show="visible">
                <div class="options-container" v-for="option in options" v-bind:key="option.id">
                    <slot name="options" v-bind:option="option">
                        <div class="option" v-on:mouseup="onDropdownButton(option)">
                            {{ option.text }}
                        </div>
                    </slot>
                </div>
            </div>
        </div>
        <select class="mobile-dropdown" v-else v-model="selectedOption.id">
            <option v-bind:value="options.id" v-for="options in options" v-bind:key="options.id">
                {{ options.text }}
            </option>
            <option value="empty_id" style="display: none;">
                {{ placeholder }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

//TODO on click outside, close dropdown

.label {
    display: block;
    margin-bottom: 7px;
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
    padding: 0px 8px;
}

.dropdown-platforme .dropdown-container .dropdown-button:hover {
    background-color: $lightgrey;
    border: solid 1px $dropdown-border-hover-color;
    color: $grey;
}

.dropdown-platforme .dropdown-container .dropdown-button.disabled,
.dropdown-platforme .dropdown-container .dropdown-button.disabled:active {
    border: solid 1px #e4e8f0;
    background-color: $dropdown-disabled-background-color;
    color: $dropdown-disabled-color;
    margin:inherit;
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
</style>

<script>
export const DropdownPlatforme = {
    name: "dropdown-platforme",
    props: {
        options: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            required: true
        },
        fieldLabel: {
            type: String,
            default: ""
        },
        isMobile: {
            type: Boolean,
            default: false
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
            selectedOption: { id: "empty_id", text: "empty" }
        };
    },
    mounted: function() {
        this.selectedOption.id = "empty_id";
    },
    watch: {
        disabled() {
            if (this.disabled) this.closeDropdown();
        },
        visible() {
            this.focused = this.visible;
        }
    },
    methods: {
        onEscKey() {
            this.closeDropdown();
        },
        onDropdownButton(option)
        {
            if (!this.disabled) 
            {
                this.focused = true;
                this.selectOption(option);
            }
        },
        selectOption(option) {
            this.$emit("update:option", option);
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
        }
    },
    computed: {
        dropdownButtonStyle() {
            const base = {
                width: `${this.width}px`
            };


            if (!this.allowTextSelection) {
                base['user-select'] = "none";
            }

            return base;
        },
        dropdownStyle() {
            const base = {
                width: `${this.width + 16}px`
            };

            return base;
        }
    }
};

export default DropdownPlatforme;
</script>
