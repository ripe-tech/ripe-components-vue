import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean, select } from "@storybook/addon-knobs";

storiesOf("Molecules", module)
    .addDecorator(withKnobs)
    .add("Search", () => ({
        props: {
            variant: {
                default: select(
                    "Variant",
                    {
                        Unset: null,
                        Dark: "dark"
                    },
                    null
                )
            },
            iconVisible: {
                default: boolean("Icon Visible", true)
            },
            enableDelete: {
                default: boolean("Delete button enabled", true)
            },
            loading: {
                default: boolean("Loading", false)
            },
            availableSuggestions: {
                default: () => [
                    {
                        value: "João",
                        label: "João",
                        link: "https://id.platforme.com/admin/accounts/jm%40platforme.com/avatar"
                    },
                    {
                        value: "Hugo",
                        label: "Hugo",
                        link: "https://id.platforme.com/admin/accounts/hg%40platforme.com/avatar"
                    },
                    {
                        value: "Gabriel",
                        label: "Gabriel",
                        link: "https://id.platforme.com/admin/accounts/gcc%40platforme.com/avatar"
                    },
                    {
                        value: "Mauro",
                        label: "Mauro",
                        link: "https://id.platforme.com/admin/accounts/v-mb%40platforme.com/avatar"
                    },
                    {
                        value: "Nuno",
                        label: "Nuno",
                        link: "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
                    },
                    {
                        value: "Margarida",
                        label: "Margarida",
                        link: "https://id.platforme.com/admin/accounts/t-ms%40platforme.com/avatar"
                    },
                    {
                        value: "Daniel I",
                        label: "Daniel I",
                        link: "https://id.platforme.com/admin/accounts/v-da%40platforme.com/avatar"
                    },
                    {
                        value: "Daniel II",
                        label: "Daniel II",
                        link: "https://id.platforme.com/admin/accounts/v-db%40platforme.com/avatar"
                    },
                    {
                        value: "Jorge",
                        label: "Jorge",
                        link: "https://id.platforme.com/admin/accounts/jf%40platforme.com/avatar"
                    }
                ]
            }
        },
        data: function() {
            return {
                textData: ""
            };
        },
        computed: {
            suggestions() {
                return this.availableSuggestions.filter(suggestion =>
                    suggestion.label.toLowerCase().startsWith(this.textData.toLowerCase())
                );
            }
        },
        template: `
            <div>
                <search
                    v-bind:variant="variant"
                    v-bind:icon-visible="iconVisible"
                    v-bind:enable-delete="enableDelete"
                    v-bind:loading="loading"
                    v-bind:suggestions="suggestions"
                    v-bind:value.sync="textData"
                />
                <p>Searching: {{textData}}</p>
            </div>
        `
    }));
