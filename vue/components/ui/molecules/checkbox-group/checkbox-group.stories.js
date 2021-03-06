import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Checkbox Group", module)
    .addDecorator(withKnobs)
    .add("Checkbox Group", () => ({
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
            }
        },
        data: function() {
            return {
                valuesData: {
                    japan: false,
                    morocco: true,
                    canada: false,
                    china: false,
                    dubai: false,
                    bali: true
                }
            };
        },
        template: `
            <div>
                <checkbox-group
                    ref="checkbox-group"
                    v-bind:items="items"
                    v-bind:values.sync="valuesData"
                    v-bind:error="error"
                    v-bind:disabled="disabled"
                />
                <p>Items: {{ items }}</p>
                <p>Values: {{ valuesData }}</p>
                <div>
                    <button-color
                        v-bind:text="'Focus'"
                        v-bind:size="'small'"
                        v-on:click="() => $refs['checkbox-group'].focus()" />
                    <button-color
                        v-bind:text="'Blur'"
                        v-bind:size="'small'"
                        v-on:click="() => $refs['checkbox-group'].blur()" />
                </div>
            </div>
        `
    }));
