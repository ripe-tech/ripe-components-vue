import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Button Dropdown", module)
    .addDecorator(withKnobs)
    .add("Button Dropdown", () => ({
        props: {
            size: {
                default: select(
                    "Size",
                    {
                        Default: null,
                        Tiny: "tiny",
                        Small: "small",
                        Medium: "medium"
                    },
                    null
                )
            },
            colorVariant: {
                default: select(
                    "Color Variant",
                    {
                        White: "white",
                        Black: "black"
                    },
                    "white"
                )
            },
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
                default: text("Label", "Edit dropdown")
            },
            disabled: {
                type: Boolean,
                default: boolean("Disabled", false)
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
                v-bind:size="size"
                v-bind:color-variant="colorVariant"
                v-bind:label="label"
                v-bind:disabled="disabled"
                v-bind:primary-icon="primaryIcon"
                v-bind:secondary-icon="secondaryIcon"
                v-bind:items="mockItems"
            />
        `
    }));
