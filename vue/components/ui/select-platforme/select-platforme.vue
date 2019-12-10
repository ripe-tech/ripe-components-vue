<template>
    <div class="select-platforme" v-bind:style="selectStyle">
        <global-events v-on:click="onClick($event)" />
        <div class="dropdown-container" ref="select">
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
            >
                {{ buttonText }}
            </div>
            <dropdown-platforme
                class="dropdown"
                v-bind:items="options"
                v-bind:width="width"
                v-bind:max-height="maxHeight"
                v-bind:highlighted-index="highlightedIndex"
                v-bind:selected-index="selectedIndex"
                v-bind:visible="isVisible"
                v-bind:global-events="false"
                ref="dropdown"
                v-on:update:visible="value => onVisible(value)"
                v-on:item-clicked="value => onDropdownSelect(value.id)"
                v-on:highlighted="value => onHighlightedIndex(value)"
            >
                <slot v-bind:name="name" v-for="(_, name) in $slots" v-bind:slot="name" />
            </dropdown-platforme>
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

body.mobile-device .select-platforme .dropdown-container,
body.tablet-device .select-platforme .dropdown-container {
    display: none;
}

body.desktop-device .select-platforme .mobile-dropdown {
    display: none;
}

.select-platforme .dropdown-container .dropdown-button,
.select-platforme .dropdown-container ::v-deep .dropdown-platforme {
    color: $dark-blue;
    cursor: pointer;
    font-family: $font-family;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
}

.select-platforme .dropdown-container .dropdown-button {
    background: url("~./assets/chevron-down.svg") no-repeat;
    background-color: $grey-6;
    background-position: right 12px center;
    background-size: 14px 14px;
    border: solid 1px $light-white;
    border-radius: 6px;
    height: 40px;
    line-height: 40px;
    margin: 0px 0px 1px 1px;
    padding: 0px 8px 0px 8px;
}

.select-platforme .dropdown-container .dropdown-button:hover {
    background-color: $light-grey;
    border: solid 1px $light-grey;
    color: $grey;
}

.select-platforme .dropdown-container .dropdown-button.disabled,
.select-platforme .dropdown-container .dropdown-button.disabled:active {
    background-color: $grey-5;
    border: solid 1px $light-white;
    color: $medium-grey;
    margin: inherit;
}

.select-platforme .dropdown-container .dropdown-button:focus {
    background-color: $white;
    border: solid 2px $aqcua-blue;
    margin: -1px 0px -1px 0px;
    outline: none;
}

.select-platforme .dropdown-container ::v-deep .dropdown-platforme {
    background-color: $white;
    border: solid 1px $light-white;
    border-radius: 6px;
    box-shadow: 0 6px 24px 0 rgba(67, 86, 100, 0.15);
    margin: 8px 0px 0px 0px;
    position: absolute;
}

.select-platforme .dropdown-container ::v-deep .dropdown-platforme .dropdown-item {
    height: 32px;
    line-height: 32px;
    padding: 0px 0px 0px 16px;
}

.select-platforme .dropdown-container ::v-deep .dropdown-platforme > .dropdown-item > * {
    padding: 0px 0px 0px 0px;
}

.select-platforme .dropdown-container ::v-deep .dropdown-platforme > .dropdown-item:hover {
    background-color: $white;
}

.select-platforme .dropdown-container ::v-deep .dropdown-platforme .dropdown-item.selected.highlighted,
.select-platforme .dropdown-container ::v-deep .dropdown-platforme .dropdown-item.selected {
    background-color: $grey-3;
}

.select-platforme .dropdown-container ::v-deep .dropdown-platforme .dropdown-item.highlighted {
    background-color: $light-grey;
}
</style>

<script>
export const SelectPlatforme = {
    name: "select-platforme",
    props: {
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
            default: null
        },
        maxHeight: {
            type: Number,
            default: 200
        }
    },
    data: function() {
        return {
            highlightedIndex: null,
            visibleData: this.dropdownVisible
        };
    },
    watch: {
        disabled() {
            if (this.disabled) this.closeDropdown();
        },
        dropdownVisible(value) {
            this.visibleData = value;
        }
    },
    methods: {
        onClick(event) {
            const dropdownElement = this.$refs.select;
            const targetElement = event.target;

            if (!dropdownElement.contains(targetElement)) this.closeDropdown();
        },
        onClickDropdownButton() {
            this.onToggleDropdown();
        },
        onKey(key) {
            this.highlightFirstMatchedOption(key);
            this.scrollToOption(null);
        },
        onEscKey() {
            this.closeDropdown();
        },
        onArrowUpKey() {
            this.openDropdown();
            this.highlightPreviousOption();
            this.scrollToOption(false);
        },
        onArrowDownKey() {
            this.openDropdown();
            this.highlightNextOption();
            this.scrollToOption(true);
        },
        onArrowLeftKey() {
            this.openDropdown();
            this.highlightPreviousOption();
            this.scrollToOption(false);
        },
        onArrowRightKey() {
            this.openDropdown();
            this.highlightNextOption();
            this.scrollToOption(true);
        },
        onAltUpKey() {
            this.openDropdown();
            this.highlightFirstOption();
            this.scrollToOption(null);
        },
        onAltDownKey() {
            this.openDropdown();
            this.highlightLastOption();
            this.scrollToOption(null);
        },
        onEnterKey() {
            this.selectOptionByIndex(this.highlightedIndex);
        },
        onSpaceKey() {
            this.selectOptionByIndex(this.highlightedIndex);
        },
        onDropdownSelect(optionId) {
            if (this.disabled) return;

            this.selectOptionById(optionId);
        },
        onVisible(value) {
            this.$emit("update:dropdownVisible", value);
        },
        onHighlightedIndex(value) {
            this.highlightedIndex = value;
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
            if (this.visibleData) return;
            this.visibleData = true;
            this.$emit("update:dropdownVisible", this.visibleData);
        },
        closeDropdown() {
            if (!this.visibleData) return;
            this.visibleData = false;
            this.$emit("update:dropdownVisible", this.visibleData);
        },
        toggleDropdown() {
            this.visibleData = !this.visibleData;
            this.$emit("update:dropdownVisible", this.visibleData );
        },
        highlightPreviousOption() {
            if (this.highlightedIndex === null) this.highlightedIndex = 0;
            else if (this.highlightedIndex > 0) this.highlightedIndex--;
        },
        highlightNextOption() {
            if (this.highlightedIndex === null) this.highlightedIndex = 0;
            else if (this.highlightedIndex < this.options.length - 1) this.highlightedIndex++;
        },
        highlightFirstOption() {
            this.highlightedIndex = 0;
        },
        highlightLastOption() {
            this.highlightedIndex = this.options.length - 1;
        },
        highlightFirstMatchedOption(key) {
            const index = this.options.findIndex(
                option => option.text.charAt(0).toUpperCase() === key.toUpperCase()
            );

            if (index > -1) this.highlightedIndex = index;
        },
        scrollToOption(isKeyDown = null) {
            if (this.highlightedIndex === null || this.highlightedIndex < 0) return;

            const optionID = this.options[this.highlightedIndex].id;

            const highlightedElement = this.$refs.dropdown.$refs[optionID][0];
            const dropdownElement = this.$refs.dropdown.$refs.dropdown;

            const highlightedElementStartPx =
                this.highlightedIndex * highlightedElement.offsetHeight;
            const highlightedElementEndPx =
                highlightedElementStartPx + highlightedElement.offsetHeight;

            const visibleDropdownStartPx = dropdownElement.scrollTop;
            const visibleDropdownEndPx = visibleDropdownStartPx + dropdownElement.offsetHeight;

            const isHighlightedElementInView =
                highlightedElementStartPx >= visibleDropdownStartPx &&
                highlightedElementStartPx <= visibleDropdownEndPx &&
                highlightedElementEndPx >= visibleDropdownStartPx &&
                highlightedElementEndPx <= visibleDropdownEndPx;

            if (isHighlightedElementInView) return;

            let selectedElementDistance;
            if (isKeyDown === null) {
                // When I want to simply scroll to the highlighted option
                // Ex: Useful for highlighting the option where the keystrokes matches the option words)
                selectedElementDistance =
                    highlightedElement.offsetTop - highlightedElement.offsetHeight;
            } else {
                // Using keyboard to move select the next or previous option in the dropdown
                selectedElementDistance = isKeyDown
                    ? highlightedElementEndPx - dropdownElement.offsetHeight
                    : dropdownElement.scrollTop - highlightedElement.offsetHeight;
            }

            dropdownElement.scrollTop = selectedElementDistance;
        }
    },
    computed: {
        selectStyle() {
            const base = { };

            if (this.width) base.width = `${this.width}px`
            if (!this.allowTextSelection) base["user-select"] = "none";

            return base;
        },
        buttonText() {
            const option =
                this.value === "placeholder_id"
                    ? { id: this.value, text: this.placeholder }
                    : this.options.find(option => option.id === this.value);
            return option.text;
        },
        selectedIndex() {
            return this.options.findIndex(option => option.id === this.value);
        },
        isVisible() {
            return this.dropdownVisible && this.visibleData;
        }
    }
};

export default SelectPlatforme;
</script>
