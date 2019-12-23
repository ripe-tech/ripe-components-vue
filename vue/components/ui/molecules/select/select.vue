<template>
    <div class="select">
        <global-events v-on:click="onGlobalClick" />
        <div class="select-container">
            <div
                class="select-button"
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
                v-bind:max-height="maxHeight"
                v-bind:visible="isVisible"
                v-bind:global-events="false"
                ref="dropdown"
                v-on:item-clicked="value => onDropdownSelect(value.id)"
            />
        </div>
        <select
            class="dropdown-select"
            v-bind:value="value"
            v-on:change="onDropdownSelect($event.target.value)"
        >
            <option v-bind:value="options.id" v-for="options in options" v-bind:key="options.id">
                {{ options.text }}
            </option>
            <option v-bind:value="null" style="display: none;">
                {{ placeholder }}
            </option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
@import "css/variables.scss";

.select .dropdown-select {
    display: none;
}

body.mobile-device .select .dropdown-select,
body.tablet-device .select .dropdown-select {
    display: block;
}

.select .select-container {
    width: 100%;
}

body.mobile-device .select .select-container,
body.tablet-device .select .select-container {
    display: none;
}

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
    padding-right: 12px;
    text-overflow: ellipsis;
    transition: width 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
    user-select: none;
    white-space: nowrap;
}

.select .select-container .select-button:hover {
    border-color: #dfe1e5;
}

.select .select-container .select-button:focus {
    border: 1px solid $aqcua-blue;
}

.select .select-container .select-button.disabled {
    opacity: 0.4;
}

.select .select-container ::v-deep .dropdown-container {
    margin-top: 3px;
    position: absolute;
    width: 100%;
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
        placeholder: {
            type: String,
            default: "None"
        },
        visible: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
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
            if (!this.isVisible) {
                this.openDropdown();
                return;
            }

            if (this.highlighted === null) {
                this.closeDropdown();
                return;
            }

            this.setValue(this.options[this.highlighted].id);
            this.closeDropdown();
        },
        onSpaceKey() {
            if (!this.isVisible) {
                this.openDropdown();
                return;
            }

            if (this.highlighted === null) {
                this.closeDropdown();
                return;
            }

            this.setValue(this.options[this.highlighted].id);
            this.closeDropdown();
        },
        onDropdownSelect(optionId) {
            if (this.highlighted === null) return;

            this.setValue(this.options[this.highlighted].id);
            this.closeDropdown();
        },
        onDropdownMouseover(index) {
            this.highlight(index);
        }
    },
    computed: {
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
