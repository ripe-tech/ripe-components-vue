import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Button Dropdown", () => ({
        props: {
            icon: {
                default: select(
                    "Icon",
                    {
                        Default: "edit",
                        Drop: "drop"
                    },
                    "edit"
                )
            },
            secondaryIcon: {
                default: select(
                    "Secondary Icon",
                    {
                        Default: "chevron-down",
                        Drop: "drop"
                    },
                    "chevron-down"
                )
            },
            label: {
                default: text("Label", "Edit")
            },
            mockItems: {
                type: Array,
                default: () => [
                    { event: "duplicate", label: "Duplicate" },
                    { event: "delete", label: "Delete" }
                ]
            }
        },
        template: `
            <button-dropdown
                v-bind:label="label"
                v-bind:icon="icon"
                v-bind:secondary-icon="secondaryIcon"
                v-bind:items="mockItems"
            />
        `
    }));
