import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Header", module)
    .addDecorator(withKnobs)
    .add("Platforme", () => ({
        props: {
            search: {
                default: boolean("Search", true)
            },
            logo: {
                default: text("Logo URL", "https://cdn.platforme.com/images/platforme.png")
            }
        },
        data: function() {
            return {
                apps: {
                    copper: {
                        text: "Copper",
                        link: "https://copper.platforme.com"
                    },
                    pulse: {
                        text: "Pulse",
                        link: "https://pulse.platforme.com"
                    }
                },
                mockLinks: [
                    { id: "enabled", text: "Enabled" },
                    { id: "selected", text: "Selected", selected: true },
                    { id: "separator" },
                    { id: "disabled", text: "Disabled", disabled: true }
                ],
                mockAccount: {
                    email: "john_doe@platforme.com",
                    avatar_url: "http://i.pravatar.cc",
                    meta: {
                        name: "John Doe",
                        company: "Platforme",
                        position: "Software Engineer"
                    }
                }
            };
        },
        template: `
        <div>
            <overlay v-bind:visible='true' v-bind:global='true'></overlay>
            <side v-bind:links="mockLinks"></side>
            <header-platforme v-bind:platforme-account="mockAccount" v-bind:apps="apps" v-bind:search="search" v-bind:logo="logo"></header-platforme>
        </div>`
    }));
