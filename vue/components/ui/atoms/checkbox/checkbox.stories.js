import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Checkbox", () => ({
        props: {
            error: {
                default: boolean("Error", false)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            slots: {
                default: boolean("Slots", false)
            },
            items: {
                default: () => [
                    {
                        label: "Japan",
                        value: "japan"
                    },
                    {
                        label: "Morocco",
                        value: "morocco"
                    },
                    {
                        value: "Canada"
                    },
                    {
                        value: "China"
                    },
                    {
                        label: "Dubai",
                        value: "dubai"
                    },
                    {
                        label: "Bali",
                        value: "bali",
                        disabled: true
                    },
                    {
                        label: "Tibet",
                        value: "tibet"
                    }
                ]
            }
        },
        data: function() {
            return {
                valuesData: {
                    japan: true,
                    China: true,
                    dubai: true,
                    Canada: true
                }
            };
        },
        template: `
            <div>
                <checkbox
                    v-bind:items="items"
                    v-bind:values.sync="valuesData"
                    v-bind:disabled="disabled"
                    v-bind:error="error"
                >
                    <template v-slot:before-item="{ item, index }" v-if="slots">
                        <p>Custom before checkbox {{ item.label }}</p>
                    </template>
                    <template v-slot:after-item="{ item, index }" v-if="slots">
                        <p>Custom After checkbox {{ item.label }}</p>
                    </template>
                </checkbox>
                <p>Values: {{ valuesData }}</p>
            </div>
        `
    }));
