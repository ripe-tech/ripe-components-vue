import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("CheckboxGroup", () => ({
        props: {
            error: {
                default: boolean("Error", false)
            },
            disabled: {
                default: boolean("Disabled", false)
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
                default: () => ({
                    japan: false,
                    morocco: true,
                    canada: false,
                    china: false,
                    dubai: false,
                    bali: true,
                    tibet: true
                })
            }
        },
        data: function() {
            return {
                valuesData: this.values
            };
        },
        watch: {
            values(value) {
                this.valuesData = value;
            }
        },
        template: `
            <div>
                <checkbox-group
                    v-bind:items="items"
                    v-bind:values.sync="values"
                    v-bind:error="error"
                    v-bind:disabled="disabled"
                />
                <p>Values: {{ valuesData }}</p>
            </div>
        `
    }));
