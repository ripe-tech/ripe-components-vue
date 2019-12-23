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
                        value: "text_1",
                        label: "Text 1"
                    },
                    {
                        value: "text_2",
                        label: "Text 2"
                    },
                    {
                        value: "text_3",
                        label: "Text 3"
                    },
                    {
                        value: "text_platforme",
                        label: "Text Platforme",
                        href: "https://www.platforme.com"
                    },
                    {
                        value: "text_platforme_blank",
                        label: "Text Platforme Blank",
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
                        value: "text_1",
                        label: "Text 1"
                    },
                    {
                        value: "text_2",
                        label: "Text 2",
                        subtext: "Subtext"
                    },
                    {
                        value: "text_3",
                        label: "Text 3"
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
                    <template v-slot="{ item: { value, label, subtext } }">
                        <b>{{ label }}</b>
                        <pre v-if="subtext">{{ subtext }}</pre>
                    </template>
                    <template v-slot:text_3="{ item: { value, label, subtext } }">
                        <b>Special {{ label }}</b>
                    </template>
                </dropdown>
                <p>The dropdown is: {{ visibleData ? "visible" : "invisible" }}</p>
            </div>
        `
    }));
