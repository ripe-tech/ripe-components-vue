import { storiesOf } from "@storybook/vue";
import { withKnobs, boolean } from "@storybook/addon-knobs";

storiesOf("Input", module)
    .addDecorator(withKnobs)
    .add("Search", () => ({
        props: {
            iconVisible: {
                default: boolean("Icon Visible", true)
            },
            availableSuggestions: {
                default: () => [
                    {
                        id: "João",
                        text: "João",
                        link: "https://id.platforme.com/admin/accounts/jm%40platforme.com/avatar"
                    },
                    {
                        id: "Hugo",
                        text: "Hugo",
                        link: "https://id.platforme.com/admin/accounts/hg%40platforme.com/avatar"
                    },
                    {
                        id: "Gabriel",
                        text: "Gabriel",
                        link: "https://id.platforme.com/admin/accounts/gcc%40platforme.com/avatar"
                    },
                    {
                        id: "Mauro",
                        text: "Mauro",
                        link: "https://id.platforme.com/admin/accounts/v-mb%40platforme.com/avatar"
                    },
                    {
                        id: "Nuno",
                        text: "Nuno",
                        link: "https://id.platforme.com/admin/accounts/ns%40platforme.com/avatar"
                    },
                    {
                        id: "Margarida",
                        text: "Margarida",
                        link: "https://id.platforme.com/admin/accounts/t-ms%40platforme.com/avatar"
                    },
                    {
                        id: "Daniel I",
                        text: "Daniel I",
                        link: "https://id.platforme.com/admin/accounts/v-da%40platforme.com/avatar"
                    },
                    {
                        id: "Daniel II",
                        text: "Daniel II",
                        link: "https://id.platforme.com/admin/accounts/v-db%40platforme.com/avatar"
                    },
                    {
                        id: "Jorge",
                        text: "Jorge",
                        link: "https://id.platforme.com/admin/accounts/jf%40platforme.com/avatar"
                    }
                ]
            }
        },
        data: function() {
            return {
                text: ""
            };
        },
        computed: {
            suggestions() {
                return this.availableSuggestions.filter(suggestion =>
                    suggestion.text.toLowerCase().startsWith(this.text.toLowerCase())
                );
            }
        },
        methods: {
            onUpdateValue(value) {
                this.text = value;
            }
        },
        template: `
            <search-platforme v-bind:icon-visible="iconVisible" v-bind:suggestions="suggestions" v-on:update:value="onUpdateValue" />
        `
    }));
