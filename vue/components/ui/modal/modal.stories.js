import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

storiesOf("Modal", module)
    .addDecorator(withKnobs)
    .add("Modal", () => ({
        props: {
            confirmText: {
                default: text("Confirm text", "Confirm")
            },
            buttonsAlignment: {
                default: select(
                    "Buttons Alignment",
                    {
                        Center: "center",
                        Right: "right",
                        Left: "left"
                    },
                    "center"
                )
            },
            buttonClose: {
                default: boolean("Button Close", true)
            },
            cancelText: {
                default: text("Cancel Text", "Cancel")
            },
            globalEvents: {
                default: boolean("Global Events", true)
            },
            name: {
                default: text("Name", "Modal")
            },
            text: {
                default: text(
                    "Text",
                    "This action is irreversible and you will lose your current progress. This is considered to be a very dangerous operation!"
                )
            },
            title: {
                default: text("Title", "Do you want to cancel the Job #1?")
            },
            subTitle: {
                default: text("Sub-Title", "")
            },
            overlay: {
                default: boolean("Overlay", true)
            },
            overlayLeave: {
                default: boolean("Overlay Leave", true)
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
                <modal
                    v-bind:confirm-text="confirmText"
                    v-bind:buttons-alignment="buttonsAlignment"
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
                    <div><p>{{ text }}</p></div>
                </modal>
            </div>
        `
    }));
