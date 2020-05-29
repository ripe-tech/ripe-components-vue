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
                        Ok: "ok",
                        Close: "close",
                        Unset: null
                    },
                    "ok"
                )
            },
            iconColor: {
                default: color("Icon Color", "green")
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
                    v-bind:icon="icon"
                    v-bind:icon-color="iconColor"
                    v-bind:visible="visible"
                    v-bind:top-height="topHeight"
                />
            </div>
        `
    }));
