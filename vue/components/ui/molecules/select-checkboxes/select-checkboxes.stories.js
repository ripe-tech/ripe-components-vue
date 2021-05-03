import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Select Checkboxes", module)
    .addDecorator(withKnobs)
    .add("Select Checkboxes", () => ({
        props: {
            placeholder: {
                default: text("Placeholder", null)
            },
            label: {
                default: text("Label", "Label")
            },
            labelSeparator: {
                default: text("Label Separator", " / ")
            },
            showAll: {
                default: boolean("Show All", false)
            },
            allLabel: {
                default: text("All Label", "All")
            },
            allValue: {
                default: text("All Value", "$ALL")
            },
            items: {
                type: Array,
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
                        value: "canada"
                    },
                    {
                        label: "China",
                        value: "china"
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
                        value: "tibet",
                        error: true
                    }
                ]
            },
            values: {
                type: Object,
                default: () => ({
                    japan: false,
                    morocco: true,
                    canada: false,
                    china: false,
                    dubai: false,
                    bali: true
                })
            }
        },
        data: function() {
            return {
                valuesData: this.values
            };
        },
        template: `
            <div>
                <select-checkboxes
                    v-bind:placeholder="placeholder"
                    v-bind:label="label"
                    v-bind:label-separator="labelSeparator"
                    v-bind:show-all="showAll"
                    v-bind:all-label="allLabel"
                    v-bind:all-value="allValue"
                    v-bind:items="items"
                    v-bind:values.sync="valuesData"
                />
                <div>Values: {{ valuesData }}</div>
            </div>
        `
    }));
