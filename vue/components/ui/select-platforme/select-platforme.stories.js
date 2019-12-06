import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Select", () => ({
        props: {
            id: {
                default: text("Dropdown Id", "select-platforme-id")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            options: {
                type: Array,
                default: () => [
                    { id: "option_1", text: "A" },
                    { id: "option_2", text: "B" },
                    { id: "option_3", text: "C" },
                    { id: "option_4", text: "D" },
                    { id: "option_5", text: "E" }
                ]
            },
            initialValue: {
                default: select(
                    "Initial Value",
                    {
                        Placeholder: "placeholder_id",
                        A: "option_1",
                        B: "option_2",
                        C: "option_3",
                        D: "option_4",
                        E: "option_5"
                    },
                    "placeholder_id"
                )
            },
            initialDropdownVisible: {
                default: boolean("Initial Dropdown Visible", false)
            },
            fieldLabel: {
                default: text("Field Label", "Field label")
            },
            helpLabel: {
                default: text("Help Label", "Help information here")
            },
            width: {
                default: number("Width", 300)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            allowTextSelection: {
                default: boolean("Allow text selection", false)
            }
        },
        data: function() {
            return {
                value: this.initialValue,
                dropdownVisible: this.initialDropdownVisible
            };
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            },
            initialDropdownVisible() {
                this.dropdownVisible = this.initialDropdownVisible;
            }
        },
        methods: {
            onValue(value) {
                this.value = value;
            },
            onDropdownVisible(value) {
                this.dropdownVisible = value;
            }
        },
        template: `
            <div>
                <global-platforme/>
                <select-platforme
                    v-bind:id="id"
                    v-bind:placeholder="placeholder"
                    v-bind:field-label="fieldLabel"
                    v-bind:help-label="helpLabel"
                    v-bind:width="width"
                    v-bind:disabled="disabled"
                    v-bind:allow-text-selection="allowTextSelection"
                    v-bind:options="options"
                    v-bind:value="value"
                    v-bind:dropdown-visible="dropdownVisible"
                    v-on:update:value="value => onValue(value)"
                    v-on:update:dropdownVisible="value => onDropdownVisible(value)"
                >
                </select-platforme>
                <p>Selected option: {{ value }}</p>
            </div>
            `
    }))
    .add("Select Custom", () => ({
        props: {
            id: {
                default: text("Dropdown Id", "select-platforme-id")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            options: {
                type: Array,
                default: () => [
                    { id: "option_1", text: "A" },
                    { id: "option_2", text: "B" },
                    { id: "option_3", text: "C" },
                    { id: "option_4", text: "D" },
                    { id: "option_5", text: "E" }
                ]
            },
            initialValue: {
                default: select(
                    "Initial Value",
                    {
                        Placeholder: "placeholder_id",
                        A: "option_1",
                        B: "option_2",
                        C: "option_3",
                        D: "option_4",
                        E: "option_5"
                    },
                    "placeholder_id"
                )
            },
            initialDropdownVisible: {
                default: boolean("Initial Dropdown Visible", false)
            },
            fieldLabel: {
                default: text("Field Label", "Field label")
            },
            helpLabel: {
                default: text("Help Label", "Help information here")
            },
            width: {
                default: number("Width", 300)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            allowTextSelection: {
                default: boolean("Allow text selection", false)
            }
        },
        data: function () {
            return {
                value: this.initialValue,
                dropdownVisible: this.initialDropdownVisible
            };
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            },
            initialDropdownVisible() {
                this.dropdownVisible = this.initialDropdownVisible;
            }
        },
        methods: {
            onValue(value) {
                this.value = value;
            },
            onDropdownVisible(value) {
                this.dropdownVisible = value;
            }
        },
        template: `
            <div>
                <global-platforme/>
                <select-platforme
                    v-bind:id="id"
                    v-bind:placeholder="placeholder"
                    v-bind:field-label="fieldLabel"
                    v-bind:help-label="helpLabel"
                    v-bind:width="width"
                    v-bind:disabled="disabled"
                    v-bind:allow-text-selection="allowTextSelection"
                    v-bind:options="options"
                    v-bind:value="value"
                    v-bind:dropdown-visible="dropdownVisible"
                    v-on:update:value="value => onValue(value)"
                    v-on:update:dropdownVisible="value => onDropdownVisible(value)"
                >
                    <template v-bind:slot="'item-option_4'">
                        <div style="color:chocolate">Special Option</div>
                    </template>
                    <template v-bind:slot="'item-option_5'">
                        <div style="color:green">Another Special Option</div>
                    </template>
                </select-platforme>
                <p>Selected option: {{ value }}</p>
            </div>
            `
    }));
