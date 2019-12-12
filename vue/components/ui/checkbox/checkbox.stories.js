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
                default: boolean("Disabled Group", false)
            },
            header: {
                default: text("Header", "Start Header")
            },
            footer: {
                default: text("Footer", "End Footer")
            },
            errorText: {
                default: text("Error Text", "")
            },
            warning: {
                default: text("Warning", "")
            },
            success: {
                default: text("Success", "")
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
                        label: "Morocco",
                        value: "morocco"
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
                <form-input
                    v-bind:id="id"
                    v-bind:header="header"
                    v-bind:footer="footer"
                    v-bind:error="errorText"
                    v-bind:warning="warning"
                    v-bind:success="success"
                >
                    <checkbox-platforme
                        v-on:update:values="setValues"                 
                        v-bind:items="items"
                        v-bind:values="values"
                        v-bind:disabled="disabled"
                        v-bind:error="error"
                    />
                </form-input>
                <p>Values: {{ values }}</p>
            </div>
        `
    }));
