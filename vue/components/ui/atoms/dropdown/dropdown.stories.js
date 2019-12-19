import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Dropdown", () => ({
        props: {
            visible: {
                default: boolean("Visible", true)
            },
            items: {
                default: () => [
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
                    },
                    {
                        id: "text_platforme",
                        text: "Text Platforme",
                        href: "https://www.platforme.com"
                    },
                    {
                        id: "text_platforme_blank",
                        text: "Text Platforme Blank",
                        href: "https://www.platforme.com",
                        target: "_blank"
                    }
                ]
            }
        },
        data: function() {
            return {
                visibleData: this.visible
            };
        },
        watch: {
            visible(value) {
                this.visibleData = value;
            }
        },
        template: `
            <div style="max-width: 200px">
                <dropdown v-bind:items="items" v-bind:visible.sync="visibleData"></dropdown>
                <p>The dropdown is: {{ visibleData ? "visible" : "invisible" }}</p>
            </div>
        `
    }))
    .add("Dropdown Custom", () => ({
        props: {
            visible: {
                default: boolean("Visible", true)
            },
            items: {
                default: () => [
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
            }
        },
        data: function() {
            return {
                visibleData: this.visible
            };
        },
        watch: {
            visible(value) {
                this.visibleData = value;
            }
        },
        template: `
            <div style="max-width: 200px">
                <dropdown v-bind:items="items" v-bind:visible.sync="visibleData">
                    <template v-slot="{ item: { id, text, subtext } }">
                        <b>{{ text }}</b>
                        <pre v-if="subtext">{{ subtext }}</pre>
                    </template>
                </dropdown>
                <p>The dropdown is: {{ visibleData ? "visible" : "invisible" }}</p>
            </div>
        `
    }));
