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
                        value: "text_2"
                    },
                    {
                        value: "text_3",
                        label: "Text 3"
                    },
                    {
                        value: "text_platforme",
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
                visibleData: this.visible,
                highlightedData: {}
            };
        },
        watch: {
            visible(value) {
                this.visibleData = value;
            }
        },
        template: `
            <div style="max-width: 200px">
                <dropdown v-bind:items="items" v-bind:visible.sync="visibleData" v-bind:highlighted.sync="highlightedData"></dropdown>
                <p>The dropdown is: {{ visibleData ? "visible" : "invisible" }}</p>
                <p>Highlighted: {{ highlightedData }}</p>
            </div>
        `
    }));
