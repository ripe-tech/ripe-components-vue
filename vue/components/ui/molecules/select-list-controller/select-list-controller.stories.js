import { storiesOf } from "@storybook/vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Select Items Controller", () => ({
        props: {
            itemsLeft: {
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
                    { value: "option_9", label: "I" }
                ]
            },
            valuesLeft: {
                type: Object,
                default: () => ({ option_1: true, option_6: true })
            },
            itemsRight: {
                type: Array,
                default: () => [
                    { value: "option_10", label: "J" },
                    { value: "option_11", label: "K" },
                    { value: "option_12", label: "L" },
                    { value: "option_13", label: "M" },
                    { value: "option_14", label: "N" }
                ]
            },
            valuesRight: {
                type: Object,
                default: () => ({})
            }
        },
        data: function() {
            return {
                itemsLeftData: this.itemsLeft,
                itemsRightData: this.itemsRight,
                valuesLeftData: this.valuesLeft,
                valuesRightData: this.valuesRight
            };
        },
        template: `
            <div>
                <select-list-controller
                    v-bind:items-left.sync="itemsLeftData"
                    v-bind:values-left.sync="valuesLeftData"
                    v-bind:items-right.sync="itemsRightData"
                    v-bind:values-right.sync="valuesRightData"
                />
                <p>Items Left: {{ itemsLeftData }}</p><br>
                <p>Selected Left: {{ valuesLeftData }}</p><br>
                <p>Items Right: {{ itemsRightData }}</p><br>
                <p>Selected Right: {{ valuesRightData }}</p><br>
            </div>
        `
    }));
