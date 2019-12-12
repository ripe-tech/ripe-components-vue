import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Rich Text Area", () => ({
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
            disabled: {
                default: boolean("Disabled", false)
            },
            attachment: {
                default: boolean("Attachment", true)
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
                <rich-textarea
                    v-bind:id="id"
                    v-bind:value="textAreaText"
                    v-bind:placeholder="placeholder"
                    v-bind:disabled="disabled"
                    v-bind:attachment="attachment"
                    v-bind:resize="resize"
                    v-on:update:value="value => onValue(value)"
                />
                <div>
                    <p>Text: {{ textAreaText }}</p>
                </div>
            </div>
            `
    }));
