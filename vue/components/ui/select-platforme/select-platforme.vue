<template>
    <div class="select-platforme" v-bind:style="selectStyle">
        <global-events v-on:click="onClick($event)" />
        <div class="dropdown-container" v-bind:id="`dropdown-${id}`">
            <div
                class="dropdown-button"
                v-bind:class="{ disabled: disabled }"
                tabindex="0"
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
                {{ selectedOption }}
            </div>
            <dropdown-platforme
                class="dropdown"
                v-bind:items="options"
                v-bind:width="width"
                v-bind:max-height="maxHeight"
                v-bind:highlighted-index="highlightedIndex"
                v-bind:selected-index="selectedIndex"
                v-bind:visible="dropdownVisible"
                v-bind:global-events="false"
                v-bind:id="dropdownId"
                v-on:update:visible="value => onVisible(value)"
                v-on:item-clicked="value => onDropdownSelect(value.id)"
                v-on:update:highlightedIndex="value => onHighlightedIndex(value)"
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

body.mobile .select-platforme .dropdown-container {
    display: none;
}

body.desktop .select-platforme .mobile-dropdown,
body.tablet .select-platforme .mobile-dropdown {
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
    background-color: $light-grey;
    border: solid 1px $dropdown-border-hover-color;
    color: $grey;
}

.select-platforme .dropdown-container .dropdown-button.disabled,
.select-platforme .dropdown-container .dropdown-button.disabled:active {
    background-color: $dropdown-disabled-background-color;
    border: solid 1px #e4e8f0;
    color: $medium-grey;
    margin: inherit;
}

.select-platforme .dropdown-container .dropdown-button:focus {
    background-color: $white;
    border: solid 2px $dropdown-focus-border-color;
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

.select-platforme .dropdown-container ::v-deep .dropdown-platforme .dropdown-item.selectHighlight {
    background-color: red; //TODO change to a grey darker than $light-grey
}

.select-platforme .dropdown-container ::v-deep .dropdown-platforme .dropdown-item.optionHighlight { //TODO add lighter color
    background-color: $light-grey;
}

.select-platforme .dropdown-container ::v-deep .dropdown-platforme .dropdown-item:active {
    background-color: $option-pressed-background-color;
}
</style>

<script>
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
        },
        maxHeight: {
            type: Number,
            default: 200
        }
    },
    data: function() {
        return {
            highlightedIndex: null
        };
    },
    watch: {
        disabled() {
            if (this.disabled) this.closeDropdown();
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
            this.scrollToOption();
        },
        onEscKey() {
            this.closeDropdown();
        },
        onArrowUpKey() {
            this.highlightPreviousOption();
            this.scrollToOption();
        },
        onArrowDownKey() {
            this.highlightNextOption();
            this.scrollToOption();
        },
        onArrowLeftKey() {
            this.highlightPreviousOption();
            this.scrollToOption();
        },
        onArrowRightKey() {
            this.highlightNextOption();
            this.scrollToOption();
        },
        onAltUpKey() {
            this.highlightFirstOption();
            this.scrollToOption();
        },
        onAltDownKey() {
            this.highlightLastOption();
            this.scrollToOption();
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
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].text.charAt(0).toUpperCase() === key.toUpperCase()) {
                    this.highlightedIndex = i;
                    return;
                }
            }
        },
        scrollToOption() {
            if (!this.highlightedIndex) return;

            const highlightedElementId = `${this.dropdownId}-${
                this.options[this.highlightedIndex].id
            }`;

            const highlightedElement = document.getElementById(highlightedElementId);
            const dropdownElement = document.getElementById(this.dropdownId);

            const selectedElementDistance =
                (this.highlightedIndex + 1) * highlightedElement.offsetHeight;

            dropdownElement.scrollTop =
                dropdownElement.offsetHeight < selectedElementDistance
                    ? selectedElementDistance - dropdownElement.offsetHeight
                    : 0;       
        }
    },
    computed: {
        selectStyle() {
            const base = {
                width: `${this.width}px`
            };

            if (!this.allowTextSelection) base["user-select"] = "none";

            return base;
        },
        selectedOption() {
            return this.getOption(this.value).text;
        },
        selectedIndex() {
            return this.options.findIndex(option => option.id === this.value);
        },
        dropdownId() {
            return `${this.id}-dropdown-platforme`;
        }
    }
};

export default SelectPlatforme;
</script>
