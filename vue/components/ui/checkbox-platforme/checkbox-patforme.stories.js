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
                default: boolean("Disabled group", false)
            },
            header: {
                default: text("Header", "Start header")
            },
            footer: {
                default: text("Footer", "End footer")
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
                    v-bind:disabled="disabled"
                    v-bind:header="header"
                    v-bind:footer="footer"
                    v-bind:error="error"
                />
                <p>Values: {{ values }}</p>
            </div>
            `
    }));
