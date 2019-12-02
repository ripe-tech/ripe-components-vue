import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Dropdown", module)
    .addDecorator(withKnobs)
    .add("Dropdown", () => ({
        props: {
            placeholder: {
                default: text("Dropdown Placeholder", "This is a placeholder text")
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
                    text: ""
                }
            };
        },
        methods: {
            optionChanged(value) {
                this.selectedOption = value;
            }
        },
        mounted: function() {
            this.selectedOption.text = this.placeholder;
        },
        template: `
                <div>
                    <dropdown-platforme
                        v-bind:options="options"
                        v-on:update:option="optionChanged($event)"
                        v-bind:placeholder="selectedOption.text"/>
                    <p>Selected option: {{ selectedOption.text }}</p>
                </div>
                `
    }));
