import { storiesOf } from "@storybook/vue";
import { withKnobs, number, text } from "@storybook/addon-knobs";

import "./transfer-list.stories.css";

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
            },
            titleLeft: {
                type: String,
                default: text("left title")
            },
            titleRight: {
                type: String,
                default: text("Right tilte")
            },
            selectMinHeight: {
                default: number("Min Height", 300)
            },
            selectMaxHeight: {
                default: number("Max Height", 300)
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
                    v-bind:items-left.sync="itemsLeftData"
                    v-bind:values-left.sync="valuesLeftData"
                    v-bind:items-right.sync="itemsRightData"
                    v-bind:values-right.sync="valuesRightData"
                    v-bind:title-left="titleLeft"
                    v-bind:title-right="titleRight"
                    v-bind:select-min-height="selectMinHeight"
                    v-bind:select-max-height="selectMaxHeight"

                />
                <p>Items Left: {{ itemsLeftData }}</p>
                <p>Selected Left: {{ valuesLeftData }}</p>
                <p>Items Right: {{ itemsRightData }}</p>
                <p>Selected Right: {{ valuesRightData }}</p>
            </div>
        `
    }));
