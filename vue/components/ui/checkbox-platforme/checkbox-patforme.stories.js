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
                        value: "bali"
                    },
                    {
                        label: "Tibet",
                        value: "tibet"
                    }
                ],
                value: ["japan", "China", "dubai", "Canada", "bali"]
            };
        },
        template: `
            <div>
                <checkbox-platforme
                    v-on:update:value="(newValue) => value = newValue"                 
                    v-bind:items='items'
                    v-bind:initialValue='value'
                    v-bind:value='value'
                    v-bind:label-title='labelTitle'
                    v-bind:disabled='disabled'
                    v-bind:label-footer='labelFooter'
                    v-bind:error='error'
                />
                <p> Value: {{ value }} </p>
            </div>
            `
    }));
