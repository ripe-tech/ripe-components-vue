import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number, boolean, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select", () => ({
        props: {
            id: {
                default: text("Dropdown Id", "select-platforme-id")
            },
            placeholder: {
                default: text("Placeholder", "This is a placeholder text")
            },
            options: {
                type: Array,
                default: () => [
                    { id: "option_1", text: "A" },
                    { id: "option_2", text: "B" },
                    { id: "option_3", text: "C" },
                    { id: "option_4", text: "D" },
                    { id: "option_5", text: "E" },
                    { id: "option_6", text: "F" },
                    { id: "option_7", text: "G" },
                    { id: "option_8", text: "H" },
                    { id: "option_9", text: "I" },
                    { id: "option_10", text: "J" },
                    { id: "option_11", text: "K" },
                    { id: "option_12", text: "L" },
                    { id: "option_13", text: "M" },
                    { id: "option_14", text: "N" }
                ]
            },
            initialValue: {
                default: select(
                    "Initial Value",
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
            initialVisible: {
                default: boolean("Initial Visible", false)
            },
            maxHeight: {
                default: number("Max Height", 200)
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
                value: this.initialValue,
                visible: this.initialVisible
            };
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            },
            initialVisible() {
                this.visible = this.initialVisible;
            }
        },
        methods: {
            onValue(value) {
                this.value = value;
            },
            onVisible(value) {
                this.visible = value;
            }
        },
        template: `
            <div>
                <global />
                <select-ripe
                    v-bind:id="id"
                    v-bind:placeholder="placeholder"
                    v-bind:width="width"
                    v-bind:max-height="maxHeight"
                    v-bind:disabled="disabled"
                    v-bind:allow-text-selection="allowTextSelection"
                    v-bind:options="options"
                    v-bind:value="value"
                    v-bind:visible="visible"
                    v-on:update:value="value => onValue(value)"
                    v-on:update:visible="value => onVisible(value)"
                >
                </select-ripe>
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
            options: {
                type: Array,
                default: () => [
                    { id: "option_1", text: "A" },
                    { id: "option_2", text: "B" },
                    { id: "option_3", text: "C" },
                    { id: "option_4", text: "D" },
                    { id: "option_5", text: "E" }
                ]
            },
            initialValue: {
                default: select(
                    "Initial Value",
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
            initialVisible: {
                default: boolean("Initial Visible", false)
            },
            width: {
                default: number("Width", 300)
            },
            maxHeight: {
                default: number("Max Height", 200)
            },
            disabled: {
                default: boolean("Disabled", false)
            }
        },
        data: function() {
            return {
                value: this.initialValue,
                visible: this.initialVisible
            };
        },
        watch: {
            initialValue() {
                this.value = this.initialValue;
            },
            initialVisible() {
                this.visible = this.initialVisible;
            }
        },
        methods: {
            onValue(value) {
                this.value = value;
            },
            onVisible(value) {
                this.visible = value;
            }
        },
        template: `
            <div>
                <global />
                <select-ripe
                    v-bind:id="id"
                    v-bind:placeholder="placeholder"
                    v-bind:max-height="maxHeight"
                    v-bind:disabled="disabled"
                    v-bind:options="options"
                    v-bind:value="value"
                    v-bind:visible="visible"
                    v-on:update:value="value => onValue(value)"
                    v-on:update:visible="value => onVisible(value)"
                >
                    <template slot='item-option_4'>
                        <div style="color:chocolate">Special Option</div>
                    </template>
                    <template slot='item-option_5'>
                        <div style="color:green">Another Special Option</div>
                    </template>
                </select-ripe>
                <p>Selected option: {{ value }}</p>
            </div>
            `
    }));
