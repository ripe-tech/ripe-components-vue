import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Radio", () => ({
        props: {
            error: {
                default: boolean("Error", false)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            checkedValue: {
                default: text("Checked Value", "Pepperoni")
            },
            labelTitle: {
                default: text("Label title", "Favorite Pizza")
            },
            labelFooter: {
                default: text("Label footer", "End footer")
            }
        },
        data: function() {
            return {
                itens: [
                    {
                        label: "Margherita",
                        value: "margherita"
                    },
                    {
                        value: "bbq_chicken",
                        label: "BBQ chicken"
                    },
                    {
                        value: "Pepperoni"
                    },
                    {
                        value: "hawaiian",
                        label: "Hawaiian w/ pineapple"
                    }
                ]
            };
        },
        template:
            "<radio-platforme v-bind:checkedValue='checkedValue' v-bind:itens='itens' v-bind:label-title='labelTitle' v-bind:disabled='disabled' v-bind:label-footer='labelFooter' v-bind:error='error'/>"
    }));
