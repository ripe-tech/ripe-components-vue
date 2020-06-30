import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, color, select, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Notification", () => ({
        props: {
            icon: {
                default: select(
                    "Icon",
                    {
                        Ok: "ok-circle",
                        Close: "close",
                        Unset: null
                    },
                    "ok-circle"
                )
            },
            iconColor: {
                default: color("Icon Color", "#00d684")
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        White: "white",
                        Dark: "dark",
                        Unset: null
                    },
                    "white"
                )
            },
            text: {
                default: text("Text", "Copied to Clipboard")
            },
            visible: {
                default: boolean("Visible", true)
            },
            topHeight: {
                default: number("Top Height", 100)
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
                <notification
                    v-bind:text="text"
                    v-bind:variant="variant"
                    v-bind:icon="icon"
                    v-bind:icon-color="iconColor"
                    v-bind:visible="visible"
                    v-bind:top-height="topHeight"
                />
            </div>
        `
    }));
