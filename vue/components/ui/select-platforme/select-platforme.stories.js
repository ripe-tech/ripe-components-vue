import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean, select } from "@storybook/addon-knobs";

storiesOf("Components", module)
    .addDecorator(withKnobs)
    .add("Select", () => ({
        props: {
            id: {
                default: text("Dropdown Id", "select-platforme-id")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            initialValue: {
                default: select(
                    "Initial Value",
                    {
                        Placeholder: "placeholder_id",
                        A: "option_1",
                        B: "option_2",
                        C: "option_3",
                        D: "option_4",
                        E: "option_5"
                    },
                    "placeholder_id"
                )
            },
            fieldLabel: {
                default: text("Field Label", "Field label")
            },
            helpLabel: {
                default: text("Help Label", "Help information here")
            },
            width: {
                default: number("Width", 300)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            allowTextSelection: {
                default: boolean("Allow text selection", false)
            }
        },
        data: function() {
            return {
                options: [
                    {
                        id: "option_1",
                        text: "A"
                    },
                    {
                        id: "option_2",
                        text: "B"
                    },
                    {
                        id: "option_3",
                        text: "C"
                    },
                    {
                        id: "option_4",
                        text: "D"
                    },
                    {
                        id: "option_5",
                        text: "E"
                    }
                ],
                value: this.initialValue
            };
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            }
        },
        methods: {
            onValue(value) {
                this.value = value;
            },
            optionChanged(value) {
                this.selectedOption = value;
            }
        },
        template: `
            <div>
                <global-platforme/>
                <select-platforme
                    v-bind:id="id"
                    v-bind:placeholder="placeholder"
                    v-bind:field-label="fieldLabel"
                    v-bind:help-label="helpLabel"
                    v-bind:width="width"
                    v-bind:disabled="disabled"
                    v-bind:allow-text-selection="allowTextSelection"
                    v-bind:options="options"
                    v-bind:value="value"
                    v-on:update:value="value => onValue(value)">
                    <template v-slot:option-option_4>
                        <p style="color: blue">Special option</p>
                    </template>
                </select-platforme>
                <p>Selected option: {{ value }}</p>
            </div>
            `
    }))
    .add("Select Custom", () => ({
        props: {
            id: {
                default: text("Dropdown Id", "select-platforme-id")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            initialValue: {
                default: select(
                    "Initial Value",
                    {
                        Placeholder: "placeholder_id",
                        A: "option_1",
                        B: "option_2",
                        C: "option_3",
                        D: "option_4",
                        E: "option_5"
                    },
                    "placeholder_id"
                )
            },
            fieldLabel: {
                default: text("Field Label", "Field label")
            },
            helpLabel: {
                default: text("Help Label", "Help information here")
            },
            width: {
                default: number("Width", 300)
            },
            disabled: {
                default: boolean("Disabled", false)
            },
            allowTextSelection: {
                default: boolean("Allow text selection", false)
            },
            visible: {
                default: boolean("Visible", true)
            }
        },
        data: function() {
            return {
                options: [
                    {
                        id: "option_1",
                        text: "A"
                    },
                    {
                        id: "option_2",
                        text: "B"
                    },
                    {
                        id: "option_3",
                        text: "C"
                    },
                    {
                        id: "option_4",
                        text: "D"
                    },
                    {
                        id: "option_5",
                        text: "E"
                    }
                ],
                value: this.initialValue
            };
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            }
        },
        methods: {
            onValue(value) {
                this.value = value;
            },
            optionChanged(value) {
                this.selectedOption = value;
            }
        },
        template: `
            <div>
                <global-platforme/>
                <select-platforme
                    v-bind:id="id"
                    v-bind:placeholder="placeholder"
                    v-bind:field-label="fieldLabel"
                    v-bind:help-label="helpLabel"
                    v-bind:width="width"
                    v-bind:disabled="disabled"
                    v-bind:allow-text-selection="allowTextSelection"
                    v-bind:options="options"
                    v-bind:value="value"
                    v-on:update:value="value => onValue(value)" 
                >
                    <template v-slot:dropdown-slot>
                        <dropdown-platforme v-bind:items="options" v-bind:visible="visible"/>
                    </template>
                    <template v-slot:option-option_4>
                        <p style="color: blue">Special option</p>
                    </template>
                </select-platforme>
            </div>
            `
    }));
