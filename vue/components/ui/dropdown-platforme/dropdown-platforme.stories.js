import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Dropdown", () => ({
        props: {
            id: {
                default: text("Dropdown Id", "dropdown-platforme-id")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            initialValue: {
                default: select(
                    "Initial Value",
                    {
                        Placeholder: "placeholder_id",
                        "Option 1": "option_1",
                        "Option 2": "option_2",
                        "Option 3": "option_3",
                        "Option 4": "option_4",
                        "Option 5": "option_5"
                    },
                    "placeholder_id"
                )
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
                options: [
                    {
                        id: "option_1",
                        text: "Option 1"
                    },
                    {
                        id: "option_2",
                        text: "Option 2"
                    },
                    {
                        id: "option_3",
                        text: "Option 3"
                    },
                    {
                        id: "option_4",
                        text: "Option 4"
                    },
                    {
                        id: "option_5",
                        text: "Option 5"
                    }
                ],
                value: this.initialValue
            };
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            }
        },
        methods: {
            onValue(value) {
                this.value = value;
            },
            optionChanged(value) {
                this.selectedOption = value;
            }
        },
        template: `
            <div>
                <global-platforme/>
                <dropdown-platforme
                    v-bind:id="id"
                    v-bind:placeholder="placeholder"
                    v-bind:field-label="fieldLabel"
                    v-bind:help-label="helpLabel"
                    v-bind:width="width"
                    v-bind:disabled="disabled"
                    v-bind:allow-text-selection="allowTextSelection"
                    v-bind:options="options"
                    v-bind:value="value"
                    v-on:update:value="value => onValue(value)">
                </dropdown-platforme>
                <p>Selected option: {{ value }}</p>
            </div>
            `
    }));
