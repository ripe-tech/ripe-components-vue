import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Rich Textarea", () => ({
        props: {
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Dark: "dark"
                    },
                    null
                )
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
            resize: {
                default: boolean("Resize", true)
            },
            attachment: {
                default: boolean("Attachment", true)
            },
            smile: {
                default: boolean("Smile", true)
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
                    v-bind:variant="variant"
                    v-bind:value.sync="valueData"
                    v-bind:placeholder="placeholder"
                    v-bind:disabled="disabled"
                    v-bind:resize="resize"
                    v-bind:attachment="attachment"
                    v-bind:smile="smile"
                />
                <div>
                    <p>Text: {{ valueData }}</p>
                </div>
            </div>
            `
    }));
