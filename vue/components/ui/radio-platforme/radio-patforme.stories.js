import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Radio", () => ({
        props: {
            labelTitle: {
                default: text("Label title", "Favorite Pizza")
            },
            initialValue: {
                default: select(
                    "Initial Value",
                    {
                        Nothing: null,
                        Margherita: "margherita",
                        "BBQ chicken": "bbq_chicken",
                        Pepperoni: "pepperoni",
                        "Hawaiian w/ pineapple": "hawaiian"
                    },
                    null
                )
            },
            labelFooter: {
                default: text("Label footer", "End footer")
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            error: {
                default: boolean("Error", false)
            },
            items: {
                default: () => [
                    {
                        label: "Margherita",
                        value: "margherita"
                    },
                    {
                        value: "bbq_chicken",
                        label: "BBQ chicken"
                    },
                    {
                        label: "Pepperroni",
                        value: "pepperoni",
                        disabled: true
                    },
                    {
                        value: "hawaiian",
                        label: "Hawaiian w/ pineapple"
                    }
                ]
            }
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            }
        },
        data: function() {
            return {
                value: this.initialValue
            };
        },
        template: `
            <div>
                <radio-platforme
                    v-on:update:value="(newValue) => value = newValue" 
                    v-bind:value="value"
                    v-bind:items="items"
                    v-bind:label-title = 'labelTitle'
                    v-bind:disabled = 'disabled'
                    v-bind:label-footer = 'labelFooter'
                    v-bind:error = 'error'
                />
                <p>Value selected: {{ value }}</p>
            </div>`
    }));
