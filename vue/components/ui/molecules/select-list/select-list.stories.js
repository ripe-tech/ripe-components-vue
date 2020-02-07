import { storiesOf } from "@storybook/vue";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select List", () => ({
        props: {
            search: {
                default: boolean("Search", true)
            },
            selectMinHeight: {
                default: number("Min Height", null)
            },
            selectMaxHeight: {
                default: number("Max Height", 288)
            },
            options: {
                type: Array,
                default: () => [
                    { value: "option_1", label: "Aureo" },
                    { value: "option_2", label: "Bernardo" },
                    { value: "option_3", label: "Carlos" },
                    { value: "option_4", label: "Cristiano" },
                    { value: "option_5", label: "Daniel" },
                    { value: "option_61", label: "Gabriel11" },
                    { value: "option_62", label: "Gabriel12" },
                    { value: "option_6", label: "Gabriel" },
                    { value: "option_63", label: "Gabriel13" },
                    { value: "option_7", label: "Geraldo" },
                    { value: "option_8", label: "Mauro" },
                    { value: "option_9", label: "Mário" },
                    { value: "option_10", label: "Márcio" },
                    { value: "option_11", label: "Narciso" },
                    { value: "option_12", label: "Nataniel" },
                    { value: "option_13", label: "Paulo" },
                    { value: "option_14", label: "Paulino" }
                ]
            }
        },
        data: function() {
            return {
                valuesData: {}
            };
        },
        template: `
            <div>
                <global />
                <select-list
                    v-bind:search="search"
                    v-bind:min-height="selectMinHeight"
                    v-bind:max-height="selectMaxHeight"
                    v-bind:values.sync="valuesData"
                    v-bind:items="options"
                >
                </select-list>
                <p>Value: {{ valuesData }}</p>
            </div>
        `
    }));
