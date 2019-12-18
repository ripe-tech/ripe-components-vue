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
                default: text("Announcements Modal Title", "Changelog")
            },
            announcement_description: {
                default: text("Announcements Modal Description", "Here you will see the changelog.")
            },
            new_delta: {
                default: number("New Delta", 430000)
            },
            reactions: {
                default: boolean("Announcements Reactions", false)
            },
            user_read: {
                default: boolean("Clickable User Read Dot", false)
            }
        },
        computed: {
            announcements() {
                return {
                    title: this.announcement_title,
                    description: this.announcement_description,
                    new_delta: this.new_delta,
                    show_notify: false,
                    reaction: this.reactions,
                    user_read: this.user_read,
                    items: [
                        {
                            title: "Quality Assurance got even more easier, really!",
                            timestamp: Date.now(),
                            content:
                                "Doggo ipsum many pats ruff you are doing me a frighten long doggo wrinkler extremely cuuuuuute, wow such tempt long water shoob boofers maximum borkdrive. Big ol pupper woofer smol much ruin diet heckin blop, porgo long woofer mlem. Floofs fluffer maximum borkdrive h*ck ruff, fluffer big ol pupper super chub, smol wow such tempt borkdrive. Dat tungg tho tungg extremely cuuuuuute sub woofer blep, shoober waggy wags heckin good boys and girls. Stop it fren h*ck very hand that feed shibe borking doggo smol, very taste wow puggorino blep. Corgo smol h*ck aqua doggo fluffer doggo, wrinkler borkf wow such tempt.",
                            link: "https://platforme.com"
                        },
                        {
                            title: "Quality Assurance got even more easier",
                            timestamp: Date.now(),
                            content:
                                "Doggo mlem shoober heckin good boys and girls blop, such treat long woofer you are doing me the shock. long bois big ol clouds.",
                            link: "https://platforme.com"
                        },
                        {
                            title: "Quality Assurance got easier",
                            timestamp: 1029381,
                            content:
                                "Aqua doggo heckin angery woofer adorable doggo shoob bork, boofers boof. Floofs doing me a frighten very jealous pupper, much ruin diet. ",
                            link: "https://platforme.com"
                        }
                    ]
                };
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
            <header-ripe 
                v-bind:platforme-account="mockAccount" 
                v-bind:apps="apps" 
                v-bind:search="search" 
                v-bind:logo="logo" 
                v-bind:announcements="announcements">
            </header-ripe>
        </div>`
    }));
