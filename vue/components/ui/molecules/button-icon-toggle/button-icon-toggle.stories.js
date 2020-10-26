import { storiesOf } from "@storybook/vue";
import { withKnobs, number, select, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Button Icon Toggle", () => ({
        props: {
            icon: {
                default: select(
                    "Icon",
                    {
                        "Zoom In": "zoom-in",
                        "Zoom Out": "zoom-out",
                        Close: "close",
                        Chat: "chat",
                        Cart: "cart",
                        Walking: "walking"
                    },
                    "zoom-in"
                )
            },
            iconSecondary: {
                default: select(
                    "Icon Secondary",
                    {
                        "Zoom Out": "zoom-out",
                        "Zoom In": "zoom-in",
                        Close: "close",
                        Chat: "chat",
                        Cart: "cart",
                        Walking: "walking"
                    },
                    "zoom-out"
                )
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
            colorSecondary: {
                default: select(
                    "Color Secondary",
                    {
                        None: "",
                        Grey: "grey",
                        White: "white",
                        Black: "black"
                    },
                    "black"
                )
            },
            size: {
                default: number("Size", 40)
            },
            value: {
                default: boolean("Value", false)
            }
        },
        watch: {
            value(value) {
                this.valueData = value;
            }
        },
        data: function() {
            return {
                valueData: this.value
            };
        },
        template: `
        <div>
            <button-icon-toggle
                v-bind:icon="icon"
                v-bind:icon-secondary="iconSecondary"
                v-bind:color="color"
                v-bind:color-secondary="colorSecondary"
                v-bind:size="size"
                v-bind:value.sync="valueData" />
            <div>Value: {{ valueData }}</div>
        </div>
        `
    }));
