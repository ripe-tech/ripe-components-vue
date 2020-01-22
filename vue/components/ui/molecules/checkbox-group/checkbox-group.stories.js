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
                        value: true
                    },
                    {
                        label: "Morocco",
                        value: true
                    },
                    {
                        label: "Canada",
                        value: false
                    },
                    {
                        label: "China"
                    },
                    {
                        label: "Dubai",
                        value: true
                    },
                    {
                        label: "Bali",
                        value: true,
                        disabled: true
                    },
                    {
                        label: "Tibet",
                        value: true,
                        error: true
                    }
                ]
            }
        },
        data: function() {
            return {
                itemsData: this.items
            };
        },
        watch: {
            items(value) {
                this.itemsData = value;
            }
        },
        template: `
            <div>
                <checkbox-group
                    v-bind:items.sync="items"
                    v-bind:error="error"
                    v-bind:disabled="disabled"
                />
                <p>Values: {{ itemsData }}</p>
            </div>
        `
    }));
