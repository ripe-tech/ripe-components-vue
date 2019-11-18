import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Modal", module)
    .addDecorator(withKnobs)
    .add("Modal", () => ({
        props: {
            buttonClose: {
                default: boolean("Button close", true)
            },
            globalEvents: {
                default: boolean("Global events", true)
            },
            name: {
                default: text("Name", "Modal")
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
                    v-bind:button-close="buttonClose"
                    v-bind:global-events="globalEvents"
                    v-bind:name="name"
                    v-bind:overlay="overlay"
                    v-bind:overlay-leave="overlayLeave"
                    v-bind:visible="visible"
                >
                    <p>This is a modal.</p>
                </modal-platforme>
            </div>
        `
    }));
