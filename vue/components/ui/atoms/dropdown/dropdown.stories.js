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
                        label: "text_1",
                        value: "Text 1"
                    },
                    {
                        label: "text_2",
                        value: "Text 2"
                    },
                    {
                        label: "text_3",
                        value: "Text 3"
                    },
                    {
                        label: "text_platforme",
                        value: "Text Platforme",
                        href: "https://www.platforme.com"
                    },
                    {
                        label: "text_platforme_blank",
                        value: "Text Platforme Blank",
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
                        label: "text_1",
                        value: "Text 1"
                    },
                    {
                        label: "text_2",
                        value: "Text 2",
                        subtext: "Subtext"
                    },
                    {
                        label: "text_3",
                        value: "Text 3"
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
                    <template v-slot="{ item: { label, value, subtext } }">
                        <b>{{ value }}</b>
                        <pre v-if="subtext">{{ subtext }}</pre>
                    </template>
                    <template v-slot:text_3="{ item: { label, value, subtext } }">
                        <b>Special {{ value }}</b>
                    </template>
                </dropdown>
                <p>The dropdown is: {{ visibleData ? "visible" : "invisible" }}</p>
            </div>
        `
    }));
