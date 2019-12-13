import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Header", () => ({
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
                        company: "Ripe",
                        position: "Software Engineer"
                    }
                }
            };
        },
        template: `
        <div>
            <overlay v-bind:visible='true' v-bind:global='true'></overlay>
            <side v-bind:links="mockLinks"></side>
            <header-ripe v-bind:platforme-account="mockAccount" v-bind:apps="apps" v-bind:search="search" v-bind:logo="logo"></header-ripe>
        </div>`
    }));
