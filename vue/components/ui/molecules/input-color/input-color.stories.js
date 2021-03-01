import { storiesOf } from "@storybook/vue";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Input Color", module)
    .addDecorator(withKnobs)
    .add("Input Color", () => ({
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
            value: {
                default: text("Value", "386cd2")
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
                <input-color
                    v-bind:value.sync="valueData"
                    v-bind:input-props="{ disabled: disabled, variant: variant}" />
                <p>Color Value: {{ valueData }}</p>
            </div>
        `
    }));
