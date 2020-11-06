import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number, text, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Input Slider", () => ({
        props: {
            value: {
                default: number("Value", 0)
            },
            min: {
                default: number("Minimum Value", 0)
            },
            max: {
                default: number("Maximum Value", 100)
            },
            step: {
                default: number("Step Value", 1)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            symbol: {
                default: text("Symbol", "%")
            },
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Dark: "dark"
                    },
                    "dark"
                )
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
                <input-slider
                    v-bind:value.sync="valueData"
                    v-bind:slider-props="{ min: min, max: max, step: step}"
                    v-bind:input-props="{ symbol: symbol, variant: variant }"
                    v-bind:disabled="disabled" />
                <p>Value: {{ valueData }}</p>
            </div>
        `
    }));
