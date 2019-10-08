import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Dropdown", module)
    .addDecorator(withKnobs)
    .add("Visible", () => ({
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
                <dropdown-platforme v-bind:items="items" v-bind:visible="visible" v-bind:visibleData="visibleData"></dropdown-platforme>
            </div>
        `
    }))
    .add("Custom", () => ({
        props: {
            visible: {
                default: boolean("Visible", true)
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
                        text: "Text 2",
                        subtext: "Subtext"
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
                <dropdown-platforme v-bind:items="items" v-bind:visible="visible">
                    <template slot-scope="{ item: { id, text, subtext } }">
                        <b>{{ text }}</b>
                        <pre v-if="subtext">{{ subtext }}</pre>
                    </template>
                </dropdown-platforme>
            </div>
        `
    }));
