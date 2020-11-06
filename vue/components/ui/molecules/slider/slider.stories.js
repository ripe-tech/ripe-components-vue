import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Slider", () => ({
        props: {
            value: {
                default: number("Value", 0)
            },
            min: {
                default: number("Minimum", 0)
            },
            max: {
                default: number("Maximum", 100)
            },
            step: {
                default: number("Step", 1)
            },
            disabled: {
                default: boolean("Disabled", false)
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
                <slider
                    v-bind:input-props="{ min: min, max: max, step: step, disabled: disabled }"
                    v-bind:value.sync="valueData" />
                <p>Value: {{ valueData }}</p>
            </div>
        `
    }));
