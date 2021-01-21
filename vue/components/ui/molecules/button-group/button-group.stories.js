import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Button Group", () => ({
        props: {
            items: {
                type: Array,
                default: () => [
                    { value: "1", label: "Item 1", color: "blue" },
                    { value: "2", label: "Item 2" },
                    { value: "3", label: "Item 3" },
                    { value: "4", label: "Item 4", color: "red" },
                    { value: "5", label: "Item 5", disabled: true }
                ]
            },
            disabled: {
                type: Boolean,
                default: boolean("Disabled", false)
            }
        },
        data: function() {
            return {
                valueData: null
            };
        },
        template: `
            <div>
                <button-group
                    v-bind:items="items"
                    v-bind:disabled="disabled"
                    v-bind:value.sync="valueData"
                >
                    <template v-slot:button-3>
                        Special Item 3
                    </template>
                </button-group>
                <div>
                    Selected value: {{ valueData }}
                </div>
            </div>
        `
    }));
