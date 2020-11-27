import { storiesOf } from "@storybook/vue";
import { withKnobs, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select Checkboxes", () => ({
        props: {
            label: {
                default: text("Label", "Label Example")
            },
            items: {
                type: Array,
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
                        value: "canada"
                    },
                    {
                        label: "China",
                        value: "china"
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
                        value: "tibet",
                        error: true
                    }
                ]
            },
            values: {
                type: Object,
                default: () => ({
                    japan: false,
                    morocco: true,
                    canada: false,
                    china: false,
                    dubai: false,
                    bali: true
                })
            }
        },
        data: function() {
            return {
                valuesData: this.values
            };
        },
        template: `
            <div>
                <select-checkboxes
                    v-bind:label="label"
                    v-bind:items="items"
                    v-bind:values.sync="valuesData"
                />
                <div>Values: {{ valuesData }}</div>
            </div>
        `
    }));
