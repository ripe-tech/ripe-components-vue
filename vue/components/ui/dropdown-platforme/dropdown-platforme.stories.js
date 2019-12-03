import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Dropdown", () => ({
        props: {
            id: {
                default: text("Dropdown Id", "dropdown-platforme-id")
            },
            placeholder: {
                default: text("Dropdown Placeholder", "This is a placeholder text")
            },
            fieldLabel: {
                default: text("Field Label", "Field label")
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
                selectedOption: {
                    id: "",
                    text: ""
                }
            };
        },
        methods: {
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
                        v-bind:width="width"
                        v-bind:disabled="disabled"
                        v-bind:allow-text-selection="allowTextSelection"
                        v-bind:options="options"
                        v-on:update:option="optionChanged($event)"
                    />
                    <p>Selected option: {{ selectedOption.text }}</p>
                </div>
                `
    }));
