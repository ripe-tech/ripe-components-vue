import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text, number, boolean } from "@storybook/addon-knobs";

storiesOf("Atoms", module)
    .addDecorator(withKnobs)
    .add("Reaction", () => ({
        props: {
            icon: {
                default: select(
                    "Icon Name",
                    {
                        Unset: null,
                        Close: "close",
                        Chat: "chat",
                        Cart: "cart",
                        Walking: "walking",
                        "Zoom In": "zoom-in",
                        "Zoom Out": "zoom-out"
                    },
                    null
                )
            },
            imgUrl: {
                default: text(
                    "Image URL",
                    "https://a.slack-edge.com/production-standard-emoji-assets/10.2/apple-large/1f4aa@2x.png"
                )
            },
            emoji: {
                default: text("Emoji", "😂")
            },
            count: {
                default: number("Count", 0)
            },
            userReacted: {
                default: boolean("User Reacted", false)
            },
            behavior: {
                default: boolean("Default Behavior", true)
            }
        },
        methods: {
            resetCount() {
                this.countData = this.count;
                this.userReactedData = this.userReacted;
            }
        },
        watch: {
            count(value) {
                this.countData = value;
            },
            userReacted(value) {
                this.userReactedData = value;
            }
        },
        data: function() {
            return {
                countData: this.count,
                userReactedData: this.userReacted
            };
        },
        template: `
            <div>
                <reaction
                v-bind:icon="icon" 
                v-bind:imgUrl="imgUrl"
                v-bind:emoji="emoji"
                v-bind:count.sync="countData"
                v-bind:user-reacted.sync="userReactedData"
                v-bind:behavior="behavior"/>
                <p v-on:click="resetCount">Reactions (click to reset): {{ countData }}, User Reacted: {{ userReactedData }}</p>
            </div>
        `
    }));
