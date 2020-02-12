import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select Filter", () => ({
        props: {
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            options: {
                type: Array,
                default: () => [
                    { value: "A", label: "Aurea" },
                    { value: "B", label: "Bernardina" },
                    { value: "C", label: "Carla" },
                    { value: "D", label: "Cristiana" },
                    { value: "E", label: "Daniela" },
                    { value: "F", label: "Gabriela11" },
                    { value: "G", label: "Gabriela12" },
                    { value: "H", label: "Gabriela" },
                    { value: "I", label: "Gabriela13" },
                    { value: "J", label: "Geraldina" },
                    { value: "K", label: "Maura" },
                    { value: "L", label: "Maria" },
                    { value: "M", label: "Márcia" },
                    { value: "N", label: "Narcisa" },
                    { value: "O", label: "Nataniela" },
                    { value: "P", label: "Paula" },
                    { value: "Q", label: "Paulina" }
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
            disabled: {
                default: boolean("Disabled", false)
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
            <div>
                <global />
                <select-filter
                    v-bind:placeholder="placeholder"
                    v-bind:options="options"
                    v-bind:value.sync="valueData"
                    v-bind:disabled="disabled"
                    v-bind:visible.sync="visibleData"
                    v-bind:align="align"
                    v-bind:width="width"
                    v-bind:max-height="maxHeight"
                    v-bind:dropdown-min-width="dropdownMinWidth"
                    v-bind:dropdown-max-width="dropdownMaxWidth"
                >
                </select-filter>
                <p>Value: {{ valueData }}, visible: {{ visibleData }}</p>
            </div>
            `
    }));
