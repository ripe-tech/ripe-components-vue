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
                    { value: "option_1", label: "Aureo" },
                    { value: "option_2", label: "Bernardo" },
                    { value: "option_3", label: "Carlos" },
                    { value: "option_4", label: "Cristiano" },
                    { value: "option_5", label: "Daniel" },
                    { value: "option_6", label: "Gabriel" },
                    { value: "option_61", label: "Gabriel Candal" },
                    { value: "option_62", label: "Gabriel Moreira" },
                    { value: "option_63", label: "Gabriel Silva" },
                    { value: "option_7", label: "Geraldo" },
                    { value: "option_8", label: "João" },
                    { value: "option_81", label: "João Leal" },
                    { value: "option_82", label: "João Magalhães" },
                    { value: "option_83", label: "João Nadais" },
                    { value: "option_9", label: "Margarida" },
                    { value: "option_10", label: "Mauro" },
                    { value: "option_11", label: "Nuno" },
                    { value: "option_12", label: "Pedro" }
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
                        Gabriel: "option_6",
                        Geraldo: "option_7",
                        Joao: "option_10",
                        Margarida: "option_9",
                        Mauro: "option_10",
                        Nuno: "option_11",
                        Pedro: "option_12"
                    },
                    null
                )
            },
            filter: {
                default: boolean("Filter", false)
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
                    v-bind:filter="filter"
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
