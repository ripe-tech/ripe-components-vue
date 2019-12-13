import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Radio", () => ({
        props: {
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
            error: {
                default: boolean("Error", false)
            },
            disabled: {
                default: boolean("Disabled", false)
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
        data: function() {
            return {
                value: this.initialValue
            };
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            }
        },
        methods: {
            onValue(value) {
                this.value = value;
            }
        },
        template: `
            <div>
                <radio
                    v-on:update:value="value => onValue(value)" 
                    v-bind:value="value"
                    v-bind:items="items"
                    v-bind:disabled="disabled"
                    v-bind:error="error"
                />
                <p>Value selected: {{ value }}</p>
            </div>`
    }));
