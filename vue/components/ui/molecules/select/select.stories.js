import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select", () => ({
        props: {
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            mode: {
                default: select(
                    "Filter Mode",
                    {
                        filter: "filter",
                        normal: "normal"
                    },
                    "filter"
                )
            },
            options: {
                type: Array,
                default: () => [
                    { value: "option_1", label: "Aureo" },
                    { value: "option_2", label: "Bernardo" },
                    { value: "option_3", label: "Carlos" },
                    { value: "option_4", label: "Cristiano" },
                    { value: "option_5", label: "Daniel" },
                    { value: "option_61", label: "Gabriel11" },
                    { value: "option_62", label: "Gabriel12" },
                    { value: "option_6", label: "Gabriel" },
                    { value: "option_63", label: "Gabriel13" },
                    { value: "option_7", label: "Geraldo" },
                    { value: "option_8", label: "Mauro" },
                    { value: "option_9", label: "Mário" },
                    { value: "option_10", label: "Márcio" },
                    { value: "option_11", label: "Narciso" },
                    { value: "option_12", label: "Nataniel" },
                    { value: "option_13", label: "Paulo" },
                    { value: "option_14", label: "Paulino" }
                ]
            },
            value: {
                default: select(
                    "Value",
                    {
                        None: null,
                        Aureo: "option_1",
                        Bernardo: "option_2",
                        Carlos: "option_3",
                        Cristiano: "option_4",
                        Daniel: "option_5",
                        Gabriel11: "option_61",
                        Gabriel12: "option_62",
                        Geraldo: "option_6",
                        Mauro: "option_63",
                        Mário: "option_7",
                        Márcio: "option_8",
                        Narciso: "option_9",
                        Nataniel: "option_10",
                        Paulo: "option_11",
                        Paulino: "option_12"
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
                <select-ripe
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
                    v-bind:mode="mode"
                >
                </select-ripe>
                <p>Value: {{ valueData }}, visible: {{ visibleData }}</p>
            </div>
            `
    }));
