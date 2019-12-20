import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Rich Textarea", () => ({
        props: {
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
                valueData: this.value
            };
        },
        watch: {
            value(value) {
                this.valueData = value;
            }
        },
        template: `
            <div>
                <rich-textarea
                    v-bind:value.sync="valueData"
                    v-bind:placeholder="placeholder"
                    v-bind:disabled="disabled"
                    v-bind:attachment="attachment"
                    v-bind:resize="resize"
                />
                <div>
                    <p>Text: {{ valueData }}</p>
                </div>
            </div>
            `
    }));
