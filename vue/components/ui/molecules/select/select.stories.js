import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Select", module)
    .addDecorator(withKnobs)
    .add("Select", () => ({
        props: {
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            autoScroll: {
                default: boolean("Auto Scroll", true)
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
                    { value: "option_14", label: "N" },
                    { value: "option_15", label: "O" },
                    { value: "option_16", label: "P" },
                    { value: "option_17", label: "Q" },
                    { value: "option_18", label: "R" },
                    { value: "option_19", label: "S" }
                ]
            },
            value: {
                default: select(
                    "Value",
                    {
                        None: null,
                        A: "option_1",
                        B: "option_2",
                        C: "option_3"
                    },
                    null
                )
            },
            visible: {
                default: boolean("Visible", false)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            inline: {
                default: boolean("Inline", false)
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
            },
            direction: {
                default: select(
                    "Direction",
                    {
                        None: null,
                        Top: "top",
                        Bottom: "bottom"
                    },
                    null
                )
            },
            width: {
                default: number("Width", null)
            },
            maxHeight: {
                default: number("Max Height", 206)
            },
            dropdownMinWidth: {
                default: number("Dropdown Min Width", null)
            },
            dropdownMaxWidth: {
                default: number("Dropdown Max Width", null)
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
            <div v-bind:style="direction === 'top' ? { 'margin-top': '300px' } : {}">
                <global />
                <select-ripe
                    v-bind:placeholder="placeholder"
                    v-bind:auto-scroll="autoScroll"
                    v-bind:options="options"
                    v-bind:value.sync="valueData"
                    v-bind:disabled="disabled"
                    v-bind:visible.sync="visibleData"
                    v-bind:align="align"
                    v-bind:direction="direction"
                    v-bind:width="width"
                    v-bind:max-height="maxHeight"
                    v-bind:dropdown-min-width="dropdownMinWidth"
                    v-bind:dropdown-max-width="dropdownMaxWidth"
                >
                </select-ripe>
                <p>Value: {{ valueData }}, visible: {{ visibleData }}</p>
            </div>
        `
    }));
