import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Button Group", module)
    .addDecorator(withKnobs)
    .add("Button Group", () => ({
        props: {
            items: {
                type: Array,
                default: () => [
                    {
                        value: "A",
                        label: "Item 1",
                        buttonProps: { icon: "ok", color: "red", colorSecondary: "green" }
                    },
                    { value: "B", label: "Item 2" },
                    {
                        value: "C",
                        label: "Item 3",
                        buttonProps: { color: "red", colorSecondary: "green" }
                    },
                    { value: "D", label: "Item 4", buttonProps: { icon: "alarm" } },
                    { value: "E", label: "Item 5", disabled: true, buttonProps: { icon: "bell" } }
                ]
            },
            value: {
                default: select(
                    "Value",
                    {
                        Unset: undefined,
                        A: "A",
                        B: "B",
                        C: "C",
                        D: "D",
                        E: "E"
                    },
                    undefined
                )
            },
            direction: {
                type: String,
                default: select(
                    "Direction",
                    {
                        Vertical: "vertical",
                        Horizontal: "horizontal"
                    },
                    "horizontal"
                )
            },
            toggle: {
                type: Boolean,
                default: boolean("Toggle", true)
            },
            disabled: {
                type: Boolean,
                default: boolean("Disabled", false)
            }
        },
        data: function() {
            return {
                valueData: this.value
            };
        },
        watch: {
            value(value) {
                this.valueData = value;
            }
        },
        template: `
            <div>
                <button-group
                    v-bind:items="items"
                    v-bind:disabled="disabled"
                    v-bind:value.sync="valueData"
                    v-bind:direction="direction"
                    v-bind:toggle="toggle"
                />
            </div>
            `
    }));
