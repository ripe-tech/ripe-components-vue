import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select", () => ({
        props: {
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            options: {
                type: Array,
                default: () => [
                    { value: "option_1", label: "A" },
                    { value: "option_2", label: "B" },
                    { value: "option_3", label: "C" },
                    { value: "option_4", label: "D" },
                    { value: "option_5", label: "E" },
                    { value: "option_6", label: "F" },
                    { value: "option_7", label: "G" },
                    { value: "option_8", label: "H" },
                    { value: "option_9", label: "I" },
                    { value: "option_10", label: "J" },
                    { value: "option_11", label: "K" },
                    { value: "option_12", label: "L" },
                    { value: "option_13", label: "M" },
                    { value: "option_14", label: "N" }
                ]
            },
            value: {
                default: select(
                    "Value",
                    {
                        None: null,
                        A: "option_1",
                        B: "option_2",
                        C: "option_3",
                        D: "option_4",
                        E: "option_5"
                    },
                    null
                )
            },
            visible: {
                default: boolean("Visible", false)
            },
            maxHeight: {
                default: number("Max Height", 200)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            dropdownMinWidth: {
                default: number("Dropdown Min Width", null)
            },
            align: {
                default: select(
                    "Align",
                    {
                        None: null,
                        Left: "left",
                        Right: "right"
                    },
                    null
                )
            }
        },
        data: function() {
            return {
                valueData: this.value,
                visibleData: this.visible
            };
        },
        watch: {
            value(value) {
                this.valueData = value;
            },
            visible(value) {
                this.visibleData = value;
            }
        },
        template: `
            <div>
                <global />
                <select-ripe
                    v-bind:placeholder="placeholder"
                    v-bind:max-height="maxHeight"
                    v-bind:disabled="disabled"
                    v-bind:options="options"
                    v-bind:value.sync="valueData"
                    v-bind:visible.sync="visibleData"
                >
                </select-ripe>
                <p>Value: {{ valueData }}, visible: {{ visibleData }}</p>
            </div>
            `
    }));
