import { storiesOf } from "@storybook/vue";
import { withKnobs, text, number } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Breadcrumbs", () => ({
        props: {
            fontSize: {
                default: number("Font Size", 26)
            },
            separator: {
                default: text("Separator", "/")
            },
            breadcrumbs: {
                type: Array,
                default: () => [
                    {
                        text: "Google",
                        href: "https://www.google.com"
                    },
                    {
                        text: "Platforme",
                        href: "https://www.platforme.com",
                        target: "_blank"
                    },
                    {
                        text: "RIPE White"
                    }
                ]
            }
        },
        template: `
            <div>
                <breadcrumbs
                    v-bind:font-size="fontSize"
                    v-bind:separator="separator"
                    v-bind:breadcrumbs="breadcrumbs"
                />
            </div>
        `
    }));
