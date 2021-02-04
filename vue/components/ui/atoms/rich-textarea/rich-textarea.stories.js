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
            border: {
                default: select(
                    "Border",
                    {
                        Unset: null,
                        Strong: "strong",
                        Thin: "thin"
                    },
                    "thin"
                )
            },
            value: {
                default: text("Value", "This is a text")
            },
            attachments: {
                type: Array,
                default: () => [
                    new File(["Hello World 1"], "file-1.txt"),
                    new File(["Hello World 2"], "file-2.txt")
                ]
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            sendButtonDisabled: {
                default: boolean("Send Button Disabled", false)
            },
            resize: {
                default: boolean("Resize", true)
            },
            attachment: {
                default: boolean("Attachment", true)
            },
            smile: {
                default: boolean("Smile", false)
            }
        },
        data: function() {
            return {
                valueData: this.value,
                attachmentsData: this.attachments,
                sendMessageClickCounter: 0
            };
        },
        watch: {
            value(value) {
                this.valueData = value;
            },
            attachments(value) {
                this.attachmentsData = value;
            }
        },
        methods: {
            onSendMessageClick() {
                this.sendMessageClickCounter++;
            }
        },
        template: `
            <div>
                <rich-textarea
                    v-bind:variant="variant"
                    v-bind:border="border"
                    v-bind:value.sync="valueData"
                    v-bind:attachments.sync="attachmentsData"
                    v-bind:placeholder="placeholder"
                    v-bind:disabled="disabled"
                    v-bind:send-button-disabled="sendButtonDisabled"
                    v-bind:resize="resize"
                    v-bind:attachment="attachment"
                    v-bind:smile="smile"
                    v-on:click:send-message="onSendMessageClick"
                />
                <div>
                    <p>Text: {{ valueData }}</p>
                    <p>Number of files: {{ attachmentsData.length }}</p>
                    <p>Send Message button clicked counter: {{ sendMessageClickCounter }}</p>
                </div>
            </div>
            `
    }));
