import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Organisms", module)
    .addDecorator(withKnobs)
    .add("Header", () => ({
        props: {
            search: {
                default: boolean("Search", true)
            },
            logo: {
                default: text("Logo URL", "https://cdn.platforme.com/images/platforme.png")
            },
            announcement_title: {
                default: text("Announcements Title", "Changelog")
            },
            announcement_description: {
                default: text("Announcements Description", "Here you will see the changelog.")
            },
            new_threshold: {
                default: number("New Threshold", 430000)
            },
            show_subscribe: {
                default: boolean("Show Subscribe", true)
            },
            show_reactions: {
                default: boolean("Show Reactions", true)
            },
            items: {
                default: () => [
                    {
                        title: "New cool stuff",
                        timestamp: 1576774151.187,
                        content:
                            "As you may have noticed everything is better now... PS: Thanks Hugo",
                        show_reactions: true,
                        reactions: 5,
                        user_reacted: true,
                        link: "https://www.platforme.com"
                    },
                    {
                        title: "We now have support for order cancellation",
                        timestamp: 1029381,
                        content:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ipsum neque, ac venenatis elit convallis ut. Nulla facilisi.",
                        show_reactions: false
                    }
                ]
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
        computed: {
            announcements() {
                return {
                    title: this.announcement_title,
                    description: this.announcement_description,
                    new_threshold: this.new_threshold,
                    show_subscribe: this.show_subscribe,
                    show_reactions: this.show_reactions,
                    items: this.items
                };
            }
        },
        template: `
        <div>
            <overlay v-bind:visible='true' v-bind:global='true'></overlay>
            <side v-bind:links="mockLinks"></side>
            <header-ripe
                v-bind:platforme-account="mockAccount"
                v-bind:apps="apps"
                v-bind:search="search"
                v-bind:logo="logo"
                v-bind:announcements="announcements"
            ></header-ripe>
        </div>`
    }));
