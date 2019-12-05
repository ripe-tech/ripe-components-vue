<template>
    <div class="select-platforme" v-bind:style="dropdownStyle">
        <global-events v-on:click="onClick($event)" />
        <label-platforme
            class="label-field"
            v-bind:text="fieldLabel"
            v-bind:for="`dropdown-${id}`"
            v-if="fieldLabel"
        />
        <div class="dropdown-container" v-bind:id="`dropdown-${id}`">
            <div
                class="dropdown-button"
                v-bind:class="{ disabled: disabled }"
                tabindex="0"
                v-bind:id="`dropdown-button-${id}`"
                v-on:click="onToggleDropdown"
                v-on:keydown.exact="onKey($event.key)"
                v-on:keydown.esc.exact="onEscKey()"
                v-on:keydown.up.exact="onArrowUpKey()"
                v-on:keydown.down.exact="onArrowDownKey()"
                v-on:keydown.left.exact="onArrowLeftKey()"
                v-on:keydown.right.exact="onArrowRightKey()"
                v-on:keydown.alt.down="onAltDownKey()"
                v-on:keydown.alt.up="onAltUpKey()"
                v-on:keydown.enter.exact="onEnterKey()"
                v-on:keydown.space.exact="onSpaceKey()"
            >
                {{ selectedOption.text }}
            </div>
            <slot v-bind:name="`dropdown-slot`">
                <div class="dropdown" v-bind:style="dropdownStyle" v-show="dropdownVisible">
                    <div class="options-container">
                        <slot
                            v-bind:name="`option-${option.id}`"
                            v-bind:option="option"
                            v-for="(option, idx) in options"
                        >
                            <div
                                class="option"
                                v-bind:class="{ keyboardHighlighted: idx === selectedIdx }"
                                v-bind:key="option.id"
                                v-on:click="onDropdownSelect(option.id)"
                            >
                                {{ option.text }}
                            </div>
                        </slot>
                    </div>
                </div>
            </slot>
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
        <label-platforme
            class="label-help"
            v-bind:size="'small'"
            v-bind:text="helpLabel"
            v-bind:for="`dropdown-${id}`"
            v-if="helpLabel"
        />
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.label {
    display: block;
    user-select: text;
}

.label-field {
    margin-bottom: 7px;
}

body.mobile .select-platforme .dropdown-container {
    display: none;
}

body.desktop .select-platforme .mobile-dropdown,
body.tablet .select-platforme .mobile-dropdown {
    display: none;
}

.select-platforme .dropdown-container .dropdown-button,
.select-platforme .dropdown-container .dropdown {
    color: $dark;
    cursor: pointer;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
}

.select-platforme .dropdown-container .dropdown-button {
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

.select-platforme .dropdown-container .dropdown-button:hover {
    background-color: $lightgrey;
    border: solid 1px $dropdown-border-hover-color;
    color: $grey;
}

.select-platforme .dropdown-container .dropdown-button.disabled,
.select-platforme .dropdown-container .dropdown-button.disabled:active {
    background-color: $dropdown-disabled-background-color;
    border: solid 1px #e4e8f0;
    color: $dropdown-disabled-color;
    margin: inherit;
}

.select-platforme .dropdown-container .dropdown-button:focus {
    background-color: $white;
    border: solid 2px $dropdown-focus-border-color;
    margin: -1px 0px -1px 0px;
    outline: none;
}

.select-platforme .dropdown-container .dropdown {
    background-color: $white;
    border: solid 1px $dropdown-border-color;
    border-radius: 6px;
    box-shadow: 0 6px 24px 0 rgba(67, 86, 100, 0.15);
    margin: 8px 0px 0px 0px;
    position: absolute;
}

.select-platforme .dropdown-container .dropdown .options-container ::v-deep .option {
    height: 32px;
    line-height: 32px;
    padding: 0px 0px 0px 16px;
}

.select-platforme .dropdown-container .dropdown .options-container ::v-deep .option.keyboardHighlighted,
.select-platforme .dropdown-container .dropdown .options-container ::v-deep .option:hover {
    background-color: $lightgrey;
}

.select-platforme .dropdown-container .dropdown .options-container ::v-deep .option:active {
    background-color: $option-pressed-background-color;
}

.label-help {
    color: $medium-grey;
    margin-top: 4px;
}
</style>

<script>
// TODO
// Fix dropdown-slot not inheriting width

export const SelectPlatforme = {
    name: "select-platforme",
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
        dropdownVisible: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            required: true
        },
        fieldLabel: {
            type: String,
            default: null
        },
        helpLabel: {
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
            selectedOption: this.getOption(this.value),
            selectedIdx: null
        };
    },
    watch: {
        disabled() {
            if (this.disabled) this.closeDropdown();
        },
        value() {
            this.selectedOption = this.getOption(this.value);
        }
    },
    methods: {
        onClick(event) {
            const dropdownElement = document.getElementById(`dropdown-${this.id}`);
            const targetElement = event.target;

            if (!dropdownElement.contains(targetElement)) this.closeDropdown();
        },
        onKey(key) {
            this.highlightFirstMatchedOption(key);
        },
        onEscKey() {
            this.closeDropdown();
        },
        onArrowUpKey() {
            this.highlightPreviousOption();
        },
        onArrowDownKey() {
            this.highlightNextOption();
        },
        onArrowLeftKey() {
            this.highlightPreviousOption();
        },
        onArrowRightKey() {
            this.highlightNextOption();
        },
        onAltUpKey() {
            this.highlightFirstOption();
        },
        onAltDownKey() {
            this.highlightLastOption();
        },
        onEnterKey() {
            this.selectOptionByIndex(this.selectedIdx);
        },
        onSpaceKey() {
            this.selectOptionByIndex(this.selectedIdx);
        },
        onDropdownSelect(optionId) {
            if (this.disabled) return;

            this.selectOptionById(optionId);
        },
        selectOptionById(optionId) {
            this.$emit("update:value", optionId);
            this.toggleDropdown();
        },
        selectOptionByIndex(index) {
            if (index === null) return;

            if (index < 0 || index > this.options.length - 1) {
                throw new Error("Invalid index value");
            }

            this.selectOptionById(this.options[index].id);
        },
        onToggleDropdown() {
            if (!this.disabled) this.toggleDropdown();
        },
        openDropdown() {
            this.$emit("update:dropdownVisible", true);
        },
        closeDropdown() {
            this.$emit("update:dropdownVisible", false);
        },
        toggleDropdown() {
            this.$emit("update:dropdownVisible", !this.dropdownVisible);
        },
        getOption(optionID) {
            return optionID === "placeholder_id"
                ? { id: optionID, text: this.placeholder }
                : this.options.find(option => option.id === optionID);
        },
        highlightPreviousOption() {
            if (this.selectedIdx === null) this.selectedIdx = 0;
            else if (this.selectedIdx > 0) this.selectedIdx--;
        },
        highlightNextOption() {
            if (this.selectedIdx === null) this.selectedIdx = 0;
            else if (this.selectedIdx < this.options.length - 1) this.selectedIdx++;
        },
        highlightFirstOption() {
            this.selectedIdx = 0;
        },
        highlightLastOption() {
            this.selectedIdx = this.options.length - 1;
        },
        highlightFirstMatchedOption(key) {
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].text.charAt(0).toUpperCase() === key.toUpperCase()) {
                    this.selectedIdx = i;
                    return;
                }
            }
        }
    },
    computed: {
        dropdownStyle() {
            const base = {
                width: `${this.width}px`
            };

            if (!this.allowTextSelection) base["user-select"] = "none";

            return base;
        }
    }
};

export default SelectPlatforme;
</script>
