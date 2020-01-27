import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, select, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Button Icon", () => ({
        props: {
            icon: {
                default: select(
                    "Icon",
                    {
                        Close: "close",
                        "Zoom In": "zoom-in",
                        "Zoom Out": "zoom-out",
                        Chat: "chat",
                        Cart: "cart",
                        Walking: "walking"
                    },
                    "close"
                )
            },
            text: {
                default: text("Text", null)
            },
            color: {
                default: select(
                    "Color",
                    {
                        None: "",
                        Grey: "grey",
                        White: "white",
                        Black: "black"
                    },
                    "grey"
                )
            },
            size: {
                default: number("Size", 30)
            },
            padding: {
                default: number("Padding", null)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            loading: {
                default: boolean("Loading", false)
            }
        },
        template: `
            <button-icon
                v-bind:icon="icon"
                v-bind:text="text"
                v-bind:color="color"
                v-bind:size="size"
                v-bind:padding="padding"
                v-bind:disabled="disabled"
                v-bind:loading="loading"
            />
        `
    }));
