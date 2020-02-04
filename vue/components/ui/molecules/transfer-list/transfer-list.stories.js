import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Transfer List", () => ({
        props: {
            search: {
                default: boolean("Search", false)
            },
            height: {
                default: number("Height", 288)
            },
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
            <div class="transfer-list-stories">
                <transfer-list
                    v-bind:search="search"
                    v-bind:height="height"
                    v-bind:items-left.sync="itemsLeftData"
                    v-bind:values-left.sync="valuesLeftData"
                    v-bind:items-right.sync="itemsRightData"
                    v-bind:values-right.sync="valuesRightData"
                />
                <p>Items Left: {{ itemsLeftData }}</p>
                <p>Selected Left: {{ valuesLeftData }}</p>
                <p>Items Right: {{ itemsRightData }}</p>
                <p>Selected Right: {{ valuesRightData }}</p>
            </div>
        `
    }));
