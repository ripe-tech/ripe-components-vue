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
            <div
                class="select-button"
                tabindex="0"
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
                v-bind:items="options"
                v-bind:max-height="maxHeight"
                v-bind:visible.sync="visibleData"
                v-bind:global-events="true"
                v-bind:highlighted="highlightedObject"
                v-bind:highlightable="highlightable"
                v-bind:style="dropdownStyle"
                v-bind:selected="selected"
                v-bind:direction="direction"
                v-bind:owners="$refs.select ? [$refs.select] : []"
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

.select .dropdown-select {
    background-image: unset;
}

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
import { partMixin, scrollMixin } from "../../../../mixins";

export const Select = {
    name: "select-ripe",
    mixins: [partMixin, scrollMixin],
    props: {
        options: {
            type: Array,
            default: () => []
        },
        value: {
            default: null
        },
        visible: {
            type: Boolean,
            default: false
        },
        highlightable: {
            type: Boolean,
            default: true
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
            keyTimestamp: 0
        };
    },
    watch: {
        disabled: {
            handler: function(value) {
                if (value) this.closeDropdown();
            }
        },
        visible: {
            handler: function(value) {
                this.visibleData = value;
            }
        },
        visibleData: {
            handler: function(value) {
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
            }
        },
        options: {
            handler: function(value) {
                if (value?.length === 1) this.valueData = value[0].value;
            },
            immediate: true,
            deep: true
        },
        value: {
            handler: function(value) {
                this.valueData = value;
            }
        },
        valueData: {
            handler: function(value) {
                this.$emit("update:value", value);
            },
            immediate: true
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
        },
        closeDropdown() {
            if (!this.visibleData) return;
            this.dehighlight();
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
                this.highlight(Math.min(this.options.length - 1, this.highlighted + 1), scroll);
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
            const dropdownElements = dropdown.getElementsByClassName("dropdown-item");
            this.scrollToIndex(dropdown, dropdownElements, index);
        },
        onGlobalClick(event) {
            const owners = Array.isArray(this.owners)
                ? this.owners.concat(this.$refs.select)
                : [this.owners, this.$refs.select];
            const insideOwners = owners.some(owner => {
                owner = owner.$el ? owner.$el : owner;
                return owner.contains(event.target);
            });
            if (insideOwners) return;
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
            if (!key) return;
            if (Date.now() - this.keyTimestamp > this.keyTimeout) {
                this.keyBuffer = "";
            }
            this.keyBuffer += key.toUpperCase();
            this.keyTimestamp = Date.now();
            this.$emit("select:keydown", key, this.keyBuffer);
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
        },
        onDropdownAnimationCloseEnd() {
            this.$emit("animation:close:end");
        }
    },
    computed: {
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
            const base = {};
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
            if (this.highlightable && this.highlighted !== null) base[this.highlighted] = true;
            return base;
        }
    }
};

export default Select;
</script>
