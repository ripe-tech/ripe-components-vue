import { storiesOf } from "@storybook/vue";
import { withKnobs, select, text, number, boolean } from "@storybook/addon-knobs";

storiesOf("Button", module)
    .addDecorator(withKnobs)
    .add("Reaction", () => ({
        props: {
            id: {
                default: text("Id", "r1")
            },
            icon: {
                default: select(
                    "Icon Name",
                    {
                        none: null,
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
                default: text("Emoji", "😱")
            },
            initialCount: {
                default: number("Count", 1)
            },
            initialUserReacted: {
                default: boolean("User has reacted", false)
            }
        },
        data: function() {
            return {
                count: this.initialCount,
                userReacted: this.initialUserReacted
            };
        },
        methods: {
            resetCount() {
                this.count = 1;
                this.userReacted = false;
            },
            onClick() {
                this.userReacted ? (this.count -= 1) : (this.count += 1);
                this.userReacted = !this.userReacted;
            }
        },
        watch: {
            initialCount: function(newValue) {
                this.count = newValue;
            },
            initialUserReacted: function(newValue) {
                this.userReacted = newValue;
            }
        },
        template: `
            <div>
                <reaction
                v-on:click="onClick"
                v-bind:id="id" 
                v-bind:icon="icon" 
                v-bind:imgUrl="imgUrl"
                v-bind:emoji="emoji"
                v-bind:count="count"
                v-bind:userReacted="userReacted"/>
                <p v-on:click="resetCount">Reactions (click to reset): {{count}}</p>
            </div>
        `
    }));
