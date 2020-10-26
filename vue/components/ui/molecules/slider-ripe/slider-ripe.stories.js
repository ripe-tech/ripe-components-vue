import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Slider Ripe", () => ({
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
            align: {
                default: select(
                    "Align",
                    {
                        Unset: null,
                        Left: "left",
                        Center: "center",
                        Right: "right"
                    },
                    "right"
                )
            },
            value: {
                default: number("Value", 40)
            },
            symbol: {
                default: text("Symbol", "€")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            height: {
                default: number("Height", null)
            },
            width: {
                default: number("Width", 300)
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
                <slider-ripe
                    v-bind:value.sync="valueData"
                    v-bind:height="height"
                    v-bind:width="width"
                    v-bind:border="border" />
                <p>Value: {{ valueData }}</p>
            </div>
        `
    }));
