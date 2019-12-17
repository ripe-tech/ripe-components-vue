<template>
    <div
        class="select"
        v-bind:style="selectStyle"
        v-on:keydown.enter.exact="onSelectButtonEnterKey()"
        v-on:keydown.space.exact="onSelectButtonSpaceKey()"
    >
        <global-events v-on:click="onGlobalClick" />
        <div class="dropdown-container">
            <div
                class="dropdown-button"
                v-bind:class="{ disabled: disabled }"
                tabindex="0"
                v-on:click="onClickDropdownButton()"
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
                v-on:click.stop.prevent
            >
                {{ buttonText }}
            </div>
            <dropdown
                v-bind:items="options"
                v-bind:width="width"
                v-bind:max-height="maxHeight"
                v-bind:visible="isVisible"
                v-bind:global-events="false"
                ref="dropdown"
                v-on:item-clicked="value => onDropdownSelect(value.id)"
            >
                <template v-slot="{ item, index }">
                    <div
                        class="dropdown-item-content"
                        v-bind:class="{
                            separator: item.separator,
                            highlighted: index === highlighted,
                            selected: index === valueIndex
                        }"
                        v-on:mouseover="onDropdownMouseover(index)"
                    >
                        {{ item.text }}
                    </div>
                </template>
            </dropdown>
        </div>
        <select
            class="mobile-dropdown"
            v-bind:value="value"
            v-on:change="onDropdownSelect($event.target.value)"
        >
            <option v-bind:value="options.id" v-for="options in options" v-bind:key="options.id">
                {{ options.text }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

body.desktop-device .select .mobile-dropdown {
    display: none;
}

body.mobile-device .select .dropdown-container,
body.tablet-device .select .dropdown-container {
    display: none;
}

.select .dropdown-container .dropdown-button,
.select .dropdown-container .dropdown {
    color: $dark-blue;
    cursor: pointer;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    user-select: none;
}

.select .dropdown-container .dropdown-button {
    background: url("~./assets/chevron-down.svg") no-repeat;
    background-color: $lighter-grey;
    background-position: right 12px center;
    background-size: 14px 14px;
    border: 1px solid $light-white;
    border-radius: 6px;
    height: 40px;
    line-height: 40px;
    margin: 0px 0px 1px 1px;
    padding: 0px 8px 0px 8px;
}

.select .dropdown-container .dropdown-button:hover {
    background-color: $light-grey;
    border: 1px solid $light-grey;
    color: $grey;
}

.select .dropdown-container .dropdown-button.disabled,
.select .dropdown-container .dropdown-button.disabled:active {
    background-color: $light-grey;
    border: 1px solid $light-white;
    color: $medium-grey;
    margin: inherit;
}

.select .dropdown-container .dropdown-button:focus {
    background-color: $white;
    border: 2px solid $aqcua-blue;
    margin: -1px 0px -1px 0px;
    outline: none;
}

.select .dropdown-container .dropdown {
    background-color: $white;
    border: 1px solid $light-white;
    border-radius: 6px;
    box-shadow: 0 6px 24px 0 rgba(67, 86, 100, 0.15);
    margin: 8px 0px 0px 0px;
    position: absolute;
}

.dropdown .dropdown-item-content {
    height: 32px;
    line-height: 32px;
    padding: 0px 0px 0px 16px;
}

.dropdown-item-content > * {
    padding: 0px 0px 0px 0px;
}

.dropdown-item-content:hover {
    background-color: $white;
}

.dropdown-item-content.selected.highlighted,
.dropdown-item-content.selected {
    background-color: $lighter-grey;
}

.dropdown-item-content.highlighted {
    background-color: $light-grey;
}
</style>

<script>
export const Select = {
    name: "select-ripe",
    props: {
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: null
        },
        visible: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: "None"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: null
        },
        maxHeight: {
            type: Number,
            default: 200
        }
    },
    data: function() {
        return {
            highlighted: null,
            visibleData: this.visible
        };
    },
    watch: {
        disabled() {
            if (this.disabled) this.closeDropdown();
        },
        visible(value) {
            this.visibleData = value;
        }
    },
    methods: {
        setValue(value) {
            if (this.disabled) return;
            this.$emit("update:value", value);
        },
        openDropdown() {
            if (this.disabled || this.visibleData) return;

            if (this.value) {
                this.highlight(this.options.findIndex(option => option.id === this.value));
            }

            this.visibleData = true;
            this.$emit("update:visible", this.visibleData);
        },
        closeDropdown() {
            if (!this.visibleData) return;
            this.dehighlight();
            this.visibleData = false;
            this.$emit("update:visible", this.visibleData);
        },
        toggleDropdown() {
            if (this.visibleData) {
                this.closeDropdown();
            } else {
                this.openDropdown();
            }
        },
        dehighlight() {
            this.highlighted = null;
        },
        highlight(index, scroll = false) {
            if (index === null || index < 0 || index >= this.options.length) return;
            this.highlighted = index;
            if (scroll) this.scrollTo(index);
        },
        highlightPrevious(scroll = true) {
            if (this.highlighted === null) {
                this.highlight(0, scroll);
            } else {
                this.highlight(Math.max(0, this.highlighted - 1), scroll);
            }
        },
        highlightNext(scroll = true) {
            if (this.highlighted === null) {
                this.highlight(0, scroll);
            } else {
                this.highlight(Math.min(this.options.length - 1, this.highlighted + 1), scroll);
            }
        },
        highlightFirstMatchedOption(key, scroll = true) {
            const index = this.options.findIndex(
                option => option.text.charAt(0).toUpperCase() === key.toUpperCase()
            );

            if (index > -1) this.highlight(index, scroll);
        },
        scrollTo(index) {
            const dropdown = this.$refs.dropdown.$refs.dropdown;
            const dropdownElements = document.getElementsByClassName("dropdown-item");

            const visibleStart = dropdown.scrollTop;
            const visibleEnd = visibleStart + dropdown.clientHeight;

            let indexStart = 0;
            for (let i = 0; i < index; i++) {
                const dropdownElement = dropdownElements[i];
                indexStart += dropdownElement.offsetHeight;
            }

            const indexHeight = dropdownElements[index].offsetHeight;
            const indexEnd = indexStart + indexHeight;

            if (indexStart < visibleStart) {
                dropdown.scrollTop = indexStart;
            } else if (indexEnd > visibleEnd) {
                dropdown.scrollTop = indexEnd - dropdown.clientHeight;
            }
        },
        onGlobalClick() {
            this.closeDropdown();
        },
        onClickDropdownButton() {
            this.toggleDropdown();
        },
        onSelectButtonEnterKey() {
            this.toggleDropdown();
        },
        onSelectButtonSpaceKey() {
            this.toggleDropdown();
        },
        onKey(key) {
            this.highlightFirstMatchedOption(key);
        },
        onEscKey() {
            this.closeDropdown();
        },
        onArrowUpKey() {
            this.openDropdown();
            this.highlightPrevious();
        },
        onArrowDownKey() {
            this.openDropdown();
            this.highlightNext();
        },
        onArrowLeftKey() {
            this.openDropdown();
            this.highlightPrevious();
        },
        onArrowRightKey() {
            this.openDropdown();
            this.highlightNext();
        },
        onAltUpKey() {
            this.openDropdown();
            this.highlight(0);
        },
        onAltDownKey() {
            this.openDropdown();
            this.highlight(this.options.length - 1);
        },
        onEnterKey() {
            if (!this.highlighted) return;

            this.setValue(this.options[this.highlighted].id);
            this.closeDropdown();
        },
        onSpaceKey() {
            if (!this.highlighted) return;

            this.setValue(this.options[this.highlighted].id);
            this.closeDropdown();
        },
        onDropdownSelect(optionId) {
            if (!this.highlighted) return;

            this.setValue(this.options[this.highlighted].id);
            this.closeDropdown();
        },
        onDropdownMouseover(index) {
            this.highlight(index);
        }
    },
    computed: {
        selectStyle() {
            const base = {};

            if (this.width) base.width = `${this.width}px`;

            return base;
        },
        buttonText() {
            return this.value ? this.options[this.valueIndex].text : this.placeholder;
        },
        valueIndex() {
            return this.options.findIndex(option => option.id === this.value);
        },
        isVisible() {
            return this.visible && this.visibleData;
        }
    }
};

export default Select;
</script>
