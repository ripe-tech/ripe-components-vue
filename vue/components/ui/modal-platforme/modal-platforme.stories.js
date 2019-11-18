import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Modal", module)
    .addDecorator(withKnobs)
    .add("Modal", () => ({
        props: {
            applyText: {
                default: text("Apply text", "Ok")
            },
            buttonClose: {
                default: boolean("Button close", true)
            },
            cancelText: {
                default: text("Cancel text", "Cancel")
            },
            globalEvents: {
                default: boolean("Global events", true)
            },
            name: {
                default: text("Name", "Modal")
            },
            text: {
                default: text("Text", "This is a modal.")
            },
            title: {
                default: text("Title", "RIPE Components Vue")
            },
            subTitle: {
                default: text("Sub-title", "Modal")
            },
            overlay: {
                default: boolean("Overlay", true)
            },
            overlayLeave: {
                default: boolean("Overlay leave", true)
            },
            visible: {
                default: boolean("Visible", true)
            }
        },
        computed: {
            style: function() {
                return {
                    "background-color": this.color
                };
            }
        },
        template: `
            <div>
                <modal-platforme
                    v-bind:apply-text="applyText"
                    v-bind:button-close="buttonClose"
                    v-bind:cancel-text="cancelText"
                    v-bind:global-events="globalEvents"
                    v-bind:name="name"
                    v-bind:overlay="overlay"
                    v-bind:overlay-leave="overlayLeave"
                    v-bind:title="title"
                    v-bind:sub-title="subTitle"
                    v-bind:visible="visible"
                >
                    <p>{{ text }}</p>
                </modal-platforme>
            </div>
        `
    }));
