import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Selector", () => ({
        props: {
            visible: {
                default: boolean("Visible", true)
            },
            visibleData: {
                default: boolean("Visible Data", false)
            }
        },
        data() {
            return {
                items: [
                    {
                        id: "text_1",
                        text: "Text 1"
                    },
                    {
                        id: "text_2",
                        text: "Text 2"
                    },
                    {
                        id: "text_3",
                        text: "Text 3"
                    }
                ]
            };
        },
        template: `
            <div style="max-width: 200px">
                <selector-platforme v-bind:items="items" v-bind:visible="visible" v-bind:visibleData="visibleData"></selector-platforme>
            </div>
        `
    }));
