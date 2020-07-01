import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select, text } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Dropdown", () => ({
        props: {
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Dense: "dense"
                    },
                    null
                )
            },
            visible: {
                default: boolean("Visible", true)
            },
            managed: {
                default: boolean("Managed", true)
            },
            direction: {
                default: select(
                    "Direction",
                    {
                        None: null,
                        Top: "top",
                        Bottom: "bottom"
                    },
                    null
                )
            },
            selected: {
                default: () => ({
                    1: true
                })
            },
            messageEmpty: {
                default: text("Message Empty", "No Items")
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
                        label: "Icon with text",
                        icon: "clipboard"
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
                <dropdown
                    v-bind:items="items"
                    v-bind:selected="selected"
                    v-bind:variant="variant"
                    v-bind:visible.sync="visibleData"
                    v-bind:managed="managed"
                    v-bind:direction="direction"
                    v-bind:message-empty="messageEmpty"
                />
                <p>The dropdown is: {{ visibleData ? "visible" : "invisible" }}</p>
                <p>Highlighted: {{ highlightedData }}</p>
            </div>
        `
    }));
