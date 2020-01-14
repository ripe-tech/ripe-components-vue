import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select-List", () => ({
        props: {
            options: {
                type: Array,
                default: () => [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" },
                    { value: "option_4", label: "D" },
                    { value: "option_5", label: "E" },
                    { value: "option_6", label: "F" },
                    { value: "option_7", label: "G" },
                    { value: "option_8", label: "H" },
                    { value: "option_9", label: "I" },
                    { value: "option_10", label: "J" },
                    { value: "option_11", label: "K" },
                    { value: "option_12", label: "L" },
                    { value: "option_13", label: "M" },
                    { value: "option_14", label: "N" }
                ]
            },
            values: {
                type: Object,
                default: () => ({})
            }
        },
        data: function() {
            return {
                valuesData: this.values
            };
        },
        template: `
            <div>
                <global />
                <select-list
                    v-bind:items="options"
                    v-bind:values.sync="valuesData"
                >
                </select-list>
                <p>Value: {{ valuesData }}</p>
            </div>
            `
    }));
