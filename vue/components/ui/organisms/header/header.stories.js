import { storiesOf } from "@storybook/vue";
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

storiesOf("Components/Organisms/Header", module)
    .addDecorator(withKnobs)
    .add("Header", () => ({
        props: {
            search: {
                default: boolean("Search", true)
            },
            logo: {
                default: text("Logo URL", "https://cdn.platforme.com/images/platforme.png")
            },
            announcementTitle: {
                default: text("Announcements Title", "Changelog")
            },
            announcementDescription: {
                default: text("Announcements Description", "Here you will see the changelog.")
            },
            menuPosition: {
                default: select(
                    "Menu Position",
                    {
                        Left: "left",
                        Right: "right"
                    },
                    "left"
                )
            },
            newThreshold: {
                default: number("New Threshold", 430000)
            },
            showSubscribe: {
                default: boolean("Show Subscribe", true)
            },
            showReactions: {
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
                    },
                    registry: {
                        text: "Registry",
                        link: "https://registry-ui.platforme.com"
                    }
                },
                mockLinks: [
                    { value: "enabled", label: "Enabled" },
                    { value: "selected", label: "Selected", selected: true },
                    { value: "separator" },
                    { value: "disabled", label: "Disabled", disabled: true }
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
        computed: {
            announcements() {
                return {
                    title: this.announcementTitle,
                    description: this.announcementDescription,
                    new_threshold: this.newThreshold,
                    show_subscribe: this.showSubscribe,
                    show_reactions: this.showReactions,
                    items: this.items
                };
            }
        },
        template: `
        <div>
            <overlay v-bind:visible='true' v-bind:global='true'></overlay>
            <side v-bind:links="mockLinks" v-bind:position='menuPosition' v-bind:global='true'></side>
            <header-ripe
                v-bind:platforme-account="mockAccount"
                v-bind:apps="apps"
                v-bind:search="search"
                v-bind:logo="logo"
                v-bind:announcements="announcements"
            ></header-ripe>
        </div>`
    }));
