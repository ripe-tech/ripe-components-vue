import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Checkbox", () => ({
        props: {
            error: {
                default: boolean("Error", false)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            labelTitle: {
                default: text("Label title", "Holidays next year")
            },
            labelFooter: {
                default: text("Label footer", "End footer")
            }
        },
        data: function() {
            return {
                items: [
                    {
                        label: "Japan",
                        value: "japan"
                    },
                    {
                        label: "Morroco",
                        value: "morroco"
                    },
                    {
                        value: "Canada",
                        checked: true
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
                ],
                values: {
                    japan: true,
                    China: true,
                    dubai: true,
                    Canada: true
                }
            };
        },
        methods: {
            setValues(newValues) {
                this.values = newValues;
            }
        },
        template: `
            <div>
                <checkbox-platforme
                    v-on:update:values="setValues"                 
                    v-bind:items="items"
                    v-bind:values="values"
                    v-bind:label-title="labelTitle"
                    v-bind:disabled="disabled"
                    v-bind:label-footer="labelFooter"
                    v-bind:error="error"
                />
                <p>Values: {{ values }}</p>
            </div>
            `
    }));
