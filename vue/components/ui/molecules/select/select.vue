<template>
    <div class="select" v-bind:class="classes" ref="select">
        <global-events v-on:click="onGlobalClick" />
        <select
            class="dropdown-select"
            v-bind:value="value"
            v-if="isDevice()"
            v-on:change="event => onSelectChange(event.target.value)"
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
                v-bind:value.sync="filterText"
                v-show="filter && visibleData"
                ref="input"
                v-on:click="onClickDropdownButton"
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
                v-show="!filter || !visibleData"
                ref="selectButton"
                v-on:click="onClickDropdownButton"
                v-on:keydown.exact="event => onKey(event.key)"
                v-on:keydown.esc.exact="onEscKey"
                v-on:keydown.up.exact="onUpKey"
                v-on:keydown.down.exact="onDownKey"
                v-on:keydown.left.exact="onLeftKey"
                v-on:keydown.right.exact="onRightKey"
                v-on:keydown.alt.down="onAltDownKey"
                v-on:keydown.alt.up="onAltUpKey"
                v-on:keydown.enter.exact="onEnterKey"
                v-on:keydown.space.exact="onSpaceKey"
            >
                <slot v-bind:name="'selected'" v-bind:item="selectedOption">
                    {{ buttonText }}
                </slot>
            </div>
            <dropdown
                v-bind:items="filteredOptions"
                v-bind:max-height="maxHeight"
                v-bind:visible.sync="visibleData"
                v-bind:global-events="true"
                v-bind:highlighted="highlightedObject"
                v-bind:style="dropdownStyle"
                v-bind:selected="selected"
                v-bind:direction="direction"
                v-bind:owners="$refs.select ? [$refs.select, $refs.selectButton] : []"
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

.select.inline {
    display: inline-block;
}

.select .dropdown-select,
.select .select-container {
    position: relative;
    width: 100%;
}

.select .select-container .select-input {
    background-color: $soft-blue;
    background-image: url("~./assets/chevron-down.svg");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 14px 14px;
}

.select .dropdown-select,
.select .select-container .select-input,
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

.select .dropdown-select {
    background-image: unset;
}

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

.select .select-container .select-input:focus,
.select .select-container .select-button:focus {
    border-color: $aqcua-blue;
}

.select.select-filter .select-container .select-button {
    transition: width 0.2s ease, background-color 0.2s ease;
}

.select.select-filter .select-container .select-input {
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
            type: String | Number,
            default: null
        },
        visible: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ""
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inline: {
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
        },
        keyTimeout: {
            type: Number,
            default: 500
        },
        owners: {
            type: Node | Array,
            default: () => []
        }
    },
    data: function() {
        return {
            highlighted: null,
            valueData: this.value,
            visibleData: this.visible,
            keyBuffer: "",
            keyTimestamp: 0,
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
        valueData(value) {
            this.$emit("update:value", value);
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
        },
        openDropdown() {
            if (this.disabled || this.visibleData) return;
            this.visibleData = true;
            // focus input and with blank text after dropdown is opened
            if (this.filter) {
                this.filterText = "";
                this.$nextTick(() => this.$refs.input.focus());
            }
        },
        closeDropdown() {
            if (!this.visibleData) return;
            this.dehighlight();
            this.visibleData = false;
            // focus the select button after dropdown is closed
            if (this.filter) this.$nextTick(() => this.$refs.selectButton.focus());
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
        highlightBestMatchOption(scroll = true) {
            const index = this.options.findIndex(option =>
                option.label.toUpperCase().startsWith(this.keyBuffer)
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
        onGlobalClick(event) {
            const owners = Array.isArray(this.owners)
                ? this.owners.concat(this.$refs.select, this.$refs.selectButton)
                : [this.owners, this.$refs.select, this.$refs.selectButton];
            const insideOwners = owners.some(owner => {
                owner = owner?.$el ? owner?.$el : owner;
                return owner?.contains(event.target);
            });
            if (insideOwners) return;
            this.closeDropdown();
        },
        onClickDropdownButton() {
            this.toggleDropdown();
        },
        onSelectButtonEnterKey() {
            // if there's no options for current filter, do nothing
            if (!this.filteredOptions[this.highlighted]) return;
            this.toggleDropdown();
        },
        onSelectButtonSpaceKey() {
            this.toggleDropdown();
        },
        onKey(key) {
            if (!key) return;
            if (Date.now() - this.keyTimestamp > this.keyTimeout) {
                this.keyBuffer = "";
            }
            this.keyBuffer += key.toUpperCase();
            this.keyTimestamp = Date.now();
            this.highlightBestMatchOption();
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
            this.highlight(0, true);
        },
        onAltDownKey() {
            this.openDropdown();
            this.highlight(this.filteredOptions.length - 1, true);
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

            // if there's no options for current filter, do nothing
            if (!this.filteredOptions[this.highlighted]) {
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

            // if there's no options for current filter, do nothing
            if (!this.filteredOptions[this.highlighted]) {
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
        selectedOption() {
            return this.options ? this.options[this.valueIndex] : null;
        },
        buttonText() {
            return this.selectedOption ? this.selectedOption.label : this.placeholder;
        },
        selected() {
            const selected = {};
            selected[this.valueIndex] = true;
            return selected;
        },
        valueIndex() {
            return this.options.findIndex(option => option.value === this.valueData);
        },
        classes() {
            const base = {
                disabled: this.disabled,
                "select-filter": this.filter
            };
            if (this.visibleData) base["select-visible"] = true;
            if (this.align) base[`select-align-${this.align}`] = true;
            if (this.direction) base[`direction-${this.direction}`] = true;
            if (this.inline) base.inline = true;
            if (this.disabled) base.disabled = true;
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
