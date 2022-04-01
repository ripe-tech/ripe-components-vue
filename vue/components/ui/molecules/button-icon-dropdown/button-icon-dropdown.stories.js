import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Components/Molecules/Button Icon Dropdown", module)
    .addDecorator(withKnobs)
    .add("Button Icon Dropdown", () => ({
        props: {
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
            },
            disabled: {
                default: boolean("Disabled", false)
            }
        },
        template: `
            <div>
                <button-icon-dropdown v-bind:items="items" v-bind:disabled="disabled" />
            </div>
        `
    }));
