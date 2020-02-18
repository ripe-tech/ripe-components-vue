import { storiesOf } from "@storybook/vue";
import { withKnobs, number } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Breadcrumbs", () => ({
        props: {
            breadcrumbs: {
                type: Array,
                default: () => [
                    {
                        text: "Builds",
                        route: "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
                    },
                    {
                        text: "Swear",
                        route: "https://id.platforme.com/admin/accounts/t-ms%40platforme.com/avatar"
                    },
                    { text: 7 }
                ]
            },
            fontSize: {
                default: number("Font Size", 26)
            },
        },
        template: `
            <div>
                <breadcrumbs v-bind:breadcrumbs="breadcrumbs" v-bind:font-size="fontSize" />
            </div>
        `
    }));
