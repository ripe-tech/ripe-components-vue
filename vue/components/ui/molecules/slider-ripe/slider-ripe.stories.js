import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Slider Ripe", () => ({
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
            width: {
                default: number("Width", 150)
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
                    v-bind:input-props="{ min: min, max: max, step: step, disabled: disabled, width: width }"
                    v-bind:value.sync="valueData" />
                <p>Value: {{ valueData }}</p>
            </div>
        `
    }));
