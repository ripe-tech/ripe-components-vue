import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select-List", () => ({
        props: {
            options: {
                type: Array,
                default: () => [
                    { value: "option_1", label: "Aureo" },
                    { value: "option_2", label: "Bernardo" },
                    { value: "option_3", label: "Carlos" },
                    { value: "option_4", label: "Cristiano" },
                    { value: "option_5", label: "Daniel" },
                    { value: "option_6", label: "Gabriel" },
                    { value: "option_7", label: "Geraldo" },
                    { value: "option_8", label: "Mauro" },
                    { value: "option_9", label: "Mário" },
                    { value: "option_10", label: "Márcio" },
                    { value: "option_11", label: "Narciso" },
                    { value: "option_12", label: "Nataniel" },
                    { value: "option_13", label: "Paulo" },
                    { value: "option_14", label: "Paulino" }
                ]
            },
            values: {
                type: Object,
                default: () => ({})
            },
            selectMinHeight: {
                default: number("Min Height", 100)
            },
            selectMaxHeight: {
                default: number("Max Height", 100)
            },
            title: {
                default: text("Title")
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
                    v-bind:min-height="selectMinHeight"
                    v-bind:max-height="selectMaxHeight"
                    v-bind:values.sync="valuesData"
                    v-bind:title="title"
                >
                </select-list>
                <p>Value: {{ valuesData }}</p>
            </div>
            `
    }));
