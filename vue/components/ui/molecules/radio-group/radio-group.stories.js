import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Radio Group", module)
    .addDecorator(withKnobs)
    .add("Radio Group", () => ({
        props: {
            value: {
                default: select(
                    "Value",
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
            slots: {
                default: boolean("Slots", false)
            },
            items: {
                default: () => [
                    {
                        label: "Margherita",
                        value: "margherita",
                        disabled: true
                    },
                    {
                        value: "bbq_chicken",
                        label: "BBQ chicken"
                    },
                    {
                        label: "Pepperoni",
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
                <radio-group
                    ref="radio-group"
                    v-bind:value.sync="valueData"
                    v-bind:items="items"
                    v-bind:disabled="disabled"
                    v-bind:error="error"
                />
                <p>Value selected: {{ valueData }}</p>
                <div>
                    <button-color
                        v-bind:text="'Focus'"
                        v-bind:size="'small'"
                        v-on:click="() => $refs['radio-group'].focus()" />
                    <button-color
                        v-bind:text="'Blur'"
                        v-bind:size="'small'"
                        v-on:click="() => $refs['radio-group'].blur()" />
                </div>
            </div>`
    }));
