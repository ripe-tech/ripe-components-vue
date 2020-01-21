import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
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
                        value: "bali",
                        disabled: true
                    },
                    {
                        label: "Tibet",
                        value: "tibet"
                    }
                ]
            }
        },
        data: function() {
            return {
                valuesData: {
                    japan: true,
                    China: true,
                    dubai: true,
                    Canada: true
                }
            };
        },
        template: `
            <div>
                <form-input
                    v-bind:header="header"
                    v-bind:footer="footer"
                    v-bind:error="errorText"
                    v-bind:warning="warning"
                    v-bind:success="success"
                >
                    <checkbox
                        v-bind:items="items"
                        v-bind:values.sync="valuesData"
                        v-bind:disabled="disabled"
                        v-bind:error="error"
                    >
                        <template v-slot:before-item="{ item, index }">
                            <p>Custom before checkbox {{ item.label }}</p>
                        </template>
                        <template v-slot:after-item="{ item, index }">
                            <p>Custom After checkbox {{ item.label }}</p>
                        </template>
                    </checkbox>
                </form-input>
                <p>Values: {{ valuesData }}</p>
            </div>
        `
    }));
