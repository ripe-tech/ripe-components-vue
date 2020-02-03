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
            <div
                class="select-button"
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
                v-bind:max-height="maxHeight"
                v-bind:visible.sync="visibleData"
                v-bind:global-events="false"
                v-bind:highlighted="highlightedObject"
                v-bind:style="dropdownStyle"
                ref="dropdown"
                v-on:update:highlighted="onDropdownHighlighted"
                v-on:item-clicked="value => onDropdownItemClicked(value.value)"
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
    position: relative;
    width: 100%;
}

.dropdown-select,
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

.select .select-container ::v-deep .dropdown-container {
    margin-top: 3px;
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
            visibleData: this.visible
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
                option => option.label && option.label.charAt(0).toUpperCase() === key.toUpperCase()
            );

            if (index > -1) {
                this.openDropdown();
                this.highlight(index, scroll);
            }
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
            if (!this.visibleData) {
                this.openDropdown();
                return;
            }

            if (this.highlighted === null) {
                this.closeDropdown();
                return;
            }

            this.setValue(this.options[this.highlighted].value);
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

            this.setValue(this.options[this.highlighted].value);
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
        }
    },
    computed: {
        buttonText() {
            return this.valueData ? this.options[this.valueIndex].label : this.placeholder;
        },
        valueIndex() {
            return this.options.findIndex(option => option.value === this.valueData);
        },
        classes() {
            return [`select-align-${this.align}`, { disabled: this.disabled }];
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
