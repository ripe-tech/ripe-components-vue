<template>
    <div class="select" v-bind:class="classes" ref="select">
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
                class="select-input"
                tabindex="0"
                v-bind:value.sync="filterText"
                v-if="filter && visibleData"
                ref="input"
                v-on:click="onClickDropdownButton"
                v-on:keydown.exact="() => onKey($event.key)"
                v-on:keydown.esc.exact="onEscKey"
                v-on:keydown.up.exact="onUpKey"
                v-on:keydown.down.exact="onDownKey"
                v-on:keydown.left.exact="onLeftKey"
                v-on:keydown.right.exact="onRightKey"
                v-on:keydown.alt.down="onAltDownKey"
                v-on:keydown.alt.up="onAltUpKey"
                v-on:keydown.enter.exact="onEnterKey"
                v-on:keydown.space.exact="onSpaceKey"
            />
            <div
                class="select-button"
                tabindex="0"
                v-else
                ref="selectButton"
                v-on:click="onClickDropdownButton"
                v-on:keydown.exact="() => onKey($event.key)"
                v-on:keydown.esc.exact="onEscKey"
                v-on:keydown.up.exact="onUpKey"
                v-on:keydown.down.exact="onDownKey"
                v-on:keydown.alt.down="onAltDownKey"
                v-on:keydown.alt.up="onAltUpKey"
                v-on:keydown.enter.exact="onEnterKey"
            >
                {{ buttonText }}
            </div>
            <dropdown
                v-bind:items="filteredOptions"
                v-bind:max-height="maxHeight"
                v-bind:visible.sync="visibleData"
                v-bind:highlighted="highlightedObject"
                v-bind:style="dropdownStyle"
                v-bind:direction="direction"
                v-bind:owners="[$refs.selectButton, $refs.select]"
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

.select .dropdown-select,
.select .select-container {
    position: relative;
    width: 100%;
}

.select .dropdown-select,
.select .select-container .select-button {
    background-color: $soft-blue;
    background-image: url("~./assets/chevron-down.svg");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 14px 14px;
    border: 1px solid $light-white;
    border-radius: 6px 6px 6px 6px;
    box-sizing: border-box;
    color: $black;
    cursor: pointer;
    font-family: $font-family;
    font-size: 13px;
    height: 34px;
    letter-spacing: 0.25px;
    line-height: 34px;
    outline: none;
    overflow: hidden;
    padding-left: 12px;
    padding-right: 34px;
    text-overflow: ellipsis;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    user-select: none;
    white-space: nowrap;
}

.select .select-container .select-input {
    background-color: $soft-blue;
    background-image: url("~./assets/chevron-down.svg");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 14px 14px;
}

.select.direction-top .dropdown-select,
.select.direction-top .select-container .select-input,
.select.direction-top .select-container .select-button {
    background-image: url("~./assets/chevron-up.svg");
}

.select .dropdown-select > .placeholder {
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

.select .select-container .dropdown-container {
    margin-top: 3px;
    position: absolute;
    width: 100%;
    z-index: 1;
}

.select.direction-top .select-container .dropdown-container {
    bottom: 37px;
}

.select.select-align-right .select-container .dropdown-container {
    right: 0px;
}

.select.select-align-left .select-container .dropdown-container {
    left: 0px;
}
</style>

<script>
import { partMixin } from "../../../../mixins";

export const Select = {
    name: "select-ripe",
    mixins: [partMixin],
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
        autoScroll: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: "right"
        },
        filter: {
            type: Boolean,
            default: false
        },
        filterFunction: {
            type: Function,
            default: (option, filter) =>
                option.label && option.label.toUpperCase().startsWith(filter.toUpperCase())
        },
        direction: {
            type: String,
            default: "bottom"
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
            filterText: ""
        };
    },
    watch: {
        disabled(value) {
            if (value) this.closeDropdown();
        },
        visible(value) {
            this.visibleData = value;
        },
        visibleData(value) {
            if (value && this.valueData) {
                const highlightIndex = this.options.findIndex(
                    option => option.value === this.valueData
                );
                this.highlight(highlightIndex);
                if (this.autoScroll) {
                    this.$nextTick(() => this.scrollTo(highlightIndex));
                }
            }
            if (!value) this.dehighlight();
            this.$emit("update:visible", value);
        },
        value(value) {
            this.valueData = value;
        },
        filterText(value) {
            if (this.filteredOptions.length > 0) {
                this.highlight(0);
            }
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
            this.visibleData = true;
            if (this.filter) {
                this.filterText = "";
                this.$nextTick(() => this.$refs.input.focus());
            }
        },
        closeDropdown() {
            if (!this.visibleData) return;
            this.visibleData = false;
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
                this.highlight(
                    Math.min(this.filteredOptions.length - 1, this.highlighted + 1),
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
            if (!dropdown) return;

            const dropdownElements = dropdown.getElementsByClassName("dropdown-item");
            if (dropdownElements.length === 0) return;

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
        onAltUpKey() {
            this.openDropdown();
            this.highlight(0);
        },
        onAltDownKey() {
            this.openDropdown();
            this.highlight(this.filteredOptions.length - 1);
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

            this.setValue(this.filteredOptions[this.highlighted].value);
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

            this.setValue(this.filteredOptions[this.highlighted].value);
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
        filteredOptions() {
            if (!this.filter || !this.filterText) return this.options;
            return this.options.filter(option => this.filterFunction(option, this.filterText));
        },
        buttonText() {
            return this.options && this.options[this.valueIndex]
                ? this.options[this.valueIndex].label
                : this.placeholder;
        },
        valueIndex() {
            return this.options.findIndex(option => option.value === this.valueData);
        },
        classes() {
            const base = {
                disabled: this.disabled,
                "select-filter": this.filter
            };
            if (this.align) base[`select-align-${this.align}`] = this.align;
            if (this.direction) base[`direction-${this.direction}`] = this.direction;
            return base;
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
