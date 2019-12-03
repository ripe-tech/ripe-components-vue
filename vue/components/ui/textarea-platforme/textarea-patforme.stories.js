import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Text Area", () => ({
        props: {
            id: {
                default: text("Id", "textarea-id")
            },
            value: {
                default: text("Value", "This is a text")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            },
            descriptionLabel: {
                default: text("Description text", "Description")
            },
            helpLabel: {
                default: text("Help text", "Help or instruction text goes here")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            initialWidth: {
                default: number("Initial Width", 250)
            },
            initialHeight: {
                default: number("Initial Height", 78)
            },
            resize: {
                default: boolean("Resize", true)
            }
        },
        data: function() {
            return {
                textAreaText: this.value
            };
        },
        methods: {
            onValue(value) {
                this.textAreaText = value;
            }
        },
        template: `
            <div>
                <textarea-platforme
                    v-bind:id="id"
                    v-bind:value="value"
                    v-on:update:value="value => onValue(value)"
                    v-bind:placeholder="placeholder"
                    v-bind:description-label="descriptionLabel"
                    v-bind:help-label="helpLabel"
                    v-bind:disabled="disabled"
                    v-bind:initial-width="initialWidth"
                    v-bind:initial-height="initialHeight"
                    v-bind:resize="resize"
                />
                <p>Text: {{ textAreaText }}</p>
            </div>`
    }));
