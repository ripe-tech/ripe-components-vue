<template>
    <div class="select" v-bind:class="classes">
        <global-events v-on:click="onGlobalClick" />
        <select
            class="dropdown-select"
            v-bind:value="value"
            v-if="isDevice()"
            v-on:change="onSelectChange($event.target.value)"
        >
            <option
                v-bind:value="options.value"
                v-for="options in options"
                v-bind:key="options.value"
            >
                {{ options.label }}
            </option>
            <option class="placeholder" v-bind:value="null">
                {{ placeholder }}
            </option>
        </select>
        <div class="select-container" v-bind:style="style" v-else>
            <input-ripe
                v-bind:value.sync="filterText"
                v-bind:placeholder="buttonText"
                v-bind:min-width="0"
                v-show="isFilterMode && visibleData"
                ref="input"
                v-on:keydown.esc.exact="onEscKey"
                v-on:keydown.up.exact.prevent="onUpKey"
                v-on:keydown.down.exact.prevent="onDownKey"
                v-on:keydown.alt.down="onAltDownKey"
                v-on:keydown.alt.up="onAltUpKey"
                v-on:keydown.page-down="onPageDownKey"
                v-on:keydown.page-up="onPageUpKey"
                v-on:keydown.enter.exact="onEnterKey"
                v-on:click.stop.prevent
            />
            <div
                class="select-button"
                tabindex="0"
                v-show="!isFilterMode || !visibleData"
                v-on:click.stop.prevent="onClickDropdownButton"
                v-on:keydown.exact="() => onKey($event.key)"
                v-on:keydown.esc.exact="onEscKey"
                v-on:keydown.up.exact.prevent="onUpKey"
                v-on:keydown.down.exact.prevent="onDownKey"
                v-on:keydown.alt.down="onAltDownKey"
                v-on:keydown.alt.up="onAltUpKey"
                v-on:keydown.page-down="onPageDownKey"
                v-on:keydown.page-up="onPageUpKey"
                v-on:keydown.enter.exact="onEnterKey"
                v-on:keydown.space.exact.prevent="onSpaceKey"
            >
                {{ buttonText }}
            </div>
            <dropdown
                v-bind:items="computedOptions"
                v-bind:max-height="maxHeight"
                v-bind:visible.sync="visibleData"
                v-bind:global-events="false"
                v-bind:highlighted="highlightedObject"
                v-bind:style="dropdownStyle"
                ref="dropdown"
                v-on:update:highlighted="onDropdownHighlighted"
                v-on:item-clicked="value => onDropdownItemClicked(value.value)"
                v-on:animation:close:end="onDropdownAnimationCloseEnd"
            >
                <slot v-bind:name="slot" v-for="slot in Object.keys($slots)" v-bind:slot="slot" />
                <template
                    v-for="slot in Object.keys($scopedSlots)"
                    v-bind:slot="slot"
                    slot-scope="scope"
                >
                    <slot v-bind:name="slot" v-bind="scope" />
                </template>
            </dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.dropdown-select,
.select .select-container {
    line-height: 0px;
    position: relative;
    width: 100%;
}

.dropdown-select,
.select .select-container .select-button {
    background: url("~./assets/chevron-down.svg") right 12px center / 14px 14px no-repeat $soft-blue;
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    color: $black;
    cursor: pointer;
    font-family: $font-family;
    font-size: 13px;
    height: 34px;
    letter-spacing: 0.25px;
    line-height: 32px;
    outline: none;
    overflow: hidden;
    padding: 0px 34px 0px 12px;
    text-overflow: ellipsis;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    user-select: none;
    white-space: nowrap;
}

.dropdown-select > .placeholder {
    display: none;
}

.select .select-container .select-button:hover {
    border-color: #dfe1e5;
}

.select .select-container .select-button:focus {
    border-color: $aqcua-blue;
}

.select.disabled .select-container .select-button {
    border-color: $soft-blue;
    cursor: default;
    opacity: 0.4;
}

.select.filter-mode .select-container ::v-deep .input {
    background-color: $soft-blue;
    border-color: $aqcua-blue;
    padding-right: 34px;
    position: relative;
    width: 100%;
    z-index: 1;
}

.select .select-container ::v-deep .dropdown-container {
    position: absolute;
    width: 100%;
    z-index: 1;
}

.select.select-align-right .select-container ::v-deep .dropdown-container {
    right: 0px;
}

.select.select-align-left .select-container ::v-deep .dropdown-container {
    left: 0px;
}

.select .dropdown-container ::v-deep .dropdown .dropdown-item.highlighted {
    background-color: $light-grey;
}
</style>

<script>
import { partMixin } from "../../../../mixins";

export const Select = {
    name: "select-ripe",
    mixins: [partMixin],
    props: {
        mode: {
            type: String,
            default: null
        },
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
        align: {
            type: String,
            default: "right"
        },
        width: {
            type: Number,
            default: null
        },
        maxHeight: {
            type: Number,
            default: 206
        },
        dropdownMinWidth: {
            type: Number,
            default: null
        },
        dropdownMaxWidth: {
            type: Number,
            default: null
        }
    },
    data: function() {
        return {
            highlighted: null,
            valueData: this.value,
            visibleData: this.visible,
            filterText: null
        };
    },
    watch: {
        disabled(value) {
            if (value) this.closeDropdown();
        },
        visible(value) {
            this.visibleData = value;
        },
        value(value) {
            this.valueData = value;
        },
        filterText(value) {
            this.highlightFirstOption();
        }
    },
    methods: {
        setValue(value) {
            if (this.disabled) return;
            this.valueData = value;
            this.$emit("update:value", value);
        },
        openDropdown() {
            if (this.disabled || this.visibleData) return;

            if (this.valueData) {
                this.highlight(this.options.findIndex(option => option.value === this.valueData));
            }

            this.visibleData = true;
            if (this.isFilterMode) this.focusFilterInput();
            this.$emit("update:visible", true);
        },
        closeDropdown() {
            if (!this.visibleData) return;
            this.dehighlight();
            this.visibleData = false;
            this.$emit("update:visible", false);
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
            if (index === null || index < 0 || index >= this.computedOptions.length) return;
            this.highlighted = index;
            if (scroll) this.scrollTo(index);
        },
        highlightFirstOption() {
            if (this.computedOptions.length > 0) this.highlight(0);
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
                this.highlight(
                    Math.min(this.computedOptions.length - 1, this.highlighted + 1),
                    scroll
                );
            }
        },
        highlightFirstMatchedOption(key, scroll = true) {
            const index = this.options.findIndex(
                option => option.label && option.label.charAt(0).toUpperCase() === key.toUpperCase()
            );

            if (index > -1) {
                this.openDropdown();
                this.highlight(index, scroll);
            }
        },
        scrollTo(index) {
            const dropdown = this.$refs.dropdown.$refs.dropdown;
            const dropdownElements = dropdown.getElementsByClassName("dropdown-item");
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
        focusFilterInput() {
            this.$nextTick(() => {
                this.filterText = "";
                if (this.$refs.input) this.$refs.input.focus();
            });
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
        onUpKey() {
            this.openDropdown();
            this.highlightPrevious();
        },
        onDownKey() {
            this.openDropdown();
            this.highlightNext();
        },
        onLeftKey() {
            this.openDropdown();
            this.highlightPrevious();
        },
        onRightKey() {
            this.openDropdown();
            this.highlightNext();
        },
        onAltDownKey() {
            this.openDropdown();
            this.highlight(this.options.length - 1, true);
        },
        onAltUpKey(scroll = true) {
            this.openDropdown();
            this.highlight(0, scroll);
        },
        onPageUpKey(scroll = true) {
            this.openDropdown();
            this.highlight(0, scroll);
        },
        onPageDownKey() {
            this.openDropdown();
            this.highlight(this.options.length - 1, true);
        },
        onEnterKey() {
            if (!this.visibleData) {
                this.openDropdown();
                return;
            }

            if (this.highlighted === null) {
                this.closeDropdown();
                return;
            }

            if (this.computedOptions[this.highlighted]) {
                this.setValue(this.computedOptions[this.highlighted].value);
            }
            this.closeDropdown();
        },
        onSpaceKey() {
            if (!this.visibleData) {
                this.openDropdown();
                return;
            }

            if (this.highlighted === null) {
                this.closeDropdown();
                return;
            }

            if (this.computedOptions[this.highlighted]) {
                this.setValue(this.options[this.highlighted].value);
            }
            this.closeDropdown();
        },
        onSelectChange(value) {
            this.setValue(value);
        },
        onDropdownItemClicked(value) {
            if (this.highlighted === null) return;

            this.setValue(value);
            this.closeDropdown();
        },
        onDropdownHighlighted(values) {
            const indexes = Object.keys(values)
                .map(value => parseInt(value))
                .filter(value => value !== this.highlighted);
            if (indexes.length === 0) return;
            this.highlight(indexes[0]);
        },
        onDropdownAnimationCloseEnd() {
            this.$emit("animation:close:end");
        }
    },
    computed: {
        isFilterMode() {
            return this.mode === "filter";
        },
        filteredOptions() {
            if (this.isfilterTextEmpty) return this.options;
            return this.options.filter(option =>
                option.label.toUpperCase().startsWith(this.filterText.toUpperCase())
            );
        },
        computedOptions() {
            return this.mode === "filter" ? this.filteredOptions : this.options;
        },
        isfilterTextEmpty() {
            return this.filterText == null || this.filterText.length === 0;
        },
        buttonText() {
            return this.valueData ? this.options[this.valueIndex].label : this.placeholder;
        },
        valueIndex() {
            return this.options.findIndex(option => option.value === this.valueData);
        },
        classes() {
            return [
                `select-align-${this.align}`,
                { disabled: this.disabled, "filter-mode": this.isFilterMode }
            ];
        },
        style() {
            const base = {};
            if (this.width) base.width = `${this.width}px`;
            return base;
        },
        dropdownStyle() {
            const base = {};
            if (this.dropdownMinWidth) base["min-width"] = `${this.dropdownMinWidth}px`;
            if (this.dropdownMaxWidth) base["max-width"] = `${this.dropdownMaxWidth}px`;
            return base;
        },
        highlightedObject() {
            const base = {};
            if (this.highlighted !== null) base[this.highlighted] = true;
            return base;
        }
    }
};

export default Select;
</script>
