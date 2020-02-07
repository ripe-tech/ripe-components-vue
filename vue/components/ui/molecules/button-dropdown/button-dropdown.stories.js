import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Button Dropdown", () => ({
        props: {
            primaryIcon: {
                default: select(
                    "Primary Icon",
                    {
                        Unset: null,
                        Edit: "edit",
                        Drop: "drop"
                    },
                    null
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
                v-bind:primary-icon="primaryIcon"
                v-bind:secondary-icon="secondaryIcon"
                v-bind:items="mockItems"
            />
        `
    }));
